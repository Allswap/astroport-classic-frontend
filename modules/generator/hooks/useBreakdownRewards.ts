import { useMemo } from "react";
import { gql } from "graphql-request";
import { num, useAddress } from "@arthuryeti/terra";
import { sortBy, compact } from "lodash";

import {
  getPoolTokenDenoms,
  useAstroswap,
  useContracts,
  useLunaPrice,
} from "modules/common";
import { useHive } from "hooks/useHive";
import { getAssetAmountsInPool } from "libs/terra";
import { ONE_TOKEN } from "constants/constants";

const createQuery = (pairs, address, generator) => {
  if (pairs.length === 0) {
    return;
  }

  return gql`
    {
      ${pairs.map((lp) => {
        return `
          ${lp}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                pending_token: {
                  lp_token: "${lp}"
                  user: "${address}"
                }
              }
            )
          }

          info${lp}: wasm {
            contractQuery(
              contractAddress: "${generator}"
              query: {
                reward_info: {
                  lp_token: "${lp}"
                }
              }
            )
          }
        `;
      })}
    }
`;
};

export const useBreakdownRewards = () => {
  const { pairs } = useAstroswap();
  const { generator, stakableLp } = useContracts();
  const address = useAddress();
  const lunaPrice = useLunaPrice();
  const query = createQuery(stakableLp, address, generator);

  const result = useHive({
    name: ["rewards", address],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return [];
    }

    const data = [];

    stakableLp.forEach((lp) => {
      const tokens = result[`info${lp}`].contractQuery;
      const amounts = result[`${lp}`].contractQuery;

      if (num(amounts.pending).gt(0)) {
        data.push({
          token: tokens.base_reward_token,
          amount: amounts.pending,
          lp,
        });
      }

      if (num(amounts.pending_on_proxy).gt(0)) {
        data.push({
          token: tokens.proxy_reward_token,
          amount: amounts.pending_on_proxy,
          lp,
        });
      }
    });

    return data;
  }, [lunaPrice, pairs, result]);
};

export default useBreakdownRewards;
