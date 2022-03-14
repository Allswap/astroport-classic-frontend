import { useQuery } from "react-query";
import { gql } from "graphql-request";
import {
  Tokens,
  PairResponse,
  useHiveEndpoint,
  requestInChunks,
} from "modules/common";
import { CW20AssetInfo } from "types/common";
import tokenCache from "constants/tokenCache";
import { useTerraWebapp } from "@arthuryeti/terra";

export type UseAllTokens = {
  tokens: Tokens | null;
  isLoading: boolean;
  isError: boolean;
};

type NamedTokenInfoResponses = {
  [token: string]: {
    contractQuery: {
      name: string;
      symbol: string;
      decimals: number;
      total_supply: string;
    };
  };
};

const uniqueTokens = (pairs: PairResponse[]): string[] => {
  const tokens = new Set<string>();

  for (const { asset_infos } of pairs) {
    for (const asset of asset_infos) {
      const { token } = asset as CW20AssetInfo;

      if (token) {
        tokens.add(token.contract_addr);
      }
    }
  }

  return Array.from(tokens);
};

const buildQuery = (tokens: string[]) => gql`
  {
    ${tokens.map(
      (token) => `
      ${token}: wasm {
        contractQuery(
          contractAddress: "${token}"
          query: {
            token_info: {}
          }
        )
      }
    `
    )} 
  }
`;

interface Props {
  pairs: PairResponse[];
}

// TODO: Should we exclude cached tokens that are not part of any pairs?
//       If we did, we could get rid of useTokenInfo's isHidden
export const useAllTokens = ({ pairs }: Props): UseAllTokens => {
  const {
    network: { name },
  } = useTerraWebapp();

  const hiveEndpoint = useHiveEndpoint();
  const cachedTokens = tokenCache[name];

  const {
    data: tokens,
    isLoading,
    isError,
  } = useQuery<Tokens>(
    [hiveEndpoint, "tokens", name],
    async () => {
      const tokensToFetch = uniqueTokens(pairs).filter(
        (token) => !(token in cachedTokens)
      );

      if (tokensToFetch.length === 0) {
        return cachedTokens;
      }

      // Request in 100 token chunks to ensure we always stay below request size limits
      const response = await requestInChunks<string, NamedTokenInfoResponses>(
        100,
        hiveEndpoint,
        tokensToFetch,
        buildQuery
      );

      const fetchedTokens = Object.entries(response).reduce(
        (
          tokens,
          [
            token,
            {
              contractQuery: { name: protocol, symbol, decimals },
            },
          ]
        ) => ({
          ...tokens,
          [token]: { protocol, symbol, decimals, token },
        }),
        {}
      );

      return {
        ...cachedTokens,
        ...fetchedTokens,
      };
    },
    {
      enabled: pairs?.length > 0,
      refetchOnWindowFocus: false,
    }
  );

  return {
    tokens,
    isLoading,
    isError,
  };
};