import { useMemo } from "react";
import num from "libs/num";
import { gql } from "graphql-request";
import { useHive, useTokenInfo } from "modules/common";
import { useAstroswap } from "../context";
import { AssetInfo } from "types/common";

const createQuery = (pools: any) => {
  if (pools.length === 0) {
    return;
  }

  return gql`
    {
      ${pools.map((pool: any) => {
        return `
        ${pool.pool_address}: wasm {
          contractQuery(
            contractAddress: "${pool.pool_address}"
            query: {
              pool: { }
            }
          )
        }
      `;
      })}
    }
`;
};

export const useTokenPrices = () => {
  const { getDecimals } = useTokenInfo();
  const { pools } = useAstroswap();

  const xykPairsUst = (pools || []).filter((pool) => {
    const xyk = pool.pool_type === "xyk";
    const ustPair = pool.assets.find(
      (asset: AssetInfo) => asset.native_token?.denom === "uusd"
    );
    return xyk && ustPair;
  });
  const xykPairsNonUst = (pools || []).filter((pool) => {
    const xyk = pool.pool_type === "xyk";
    return (
      xyk && !xykPairsUst.map((p) => p.pool_address).includes(pool.pool_address)
    );
  });

  const query = createQuery(xykPairsUst.concat(xykPairsNonUst));

  const result = useHive({
    name: ["tokens", "price"],
    query,
    options: {
      enabled: !!query,
    },
  });

  return useMemo(() => {
    if (result == null) {
      return {};
    }

    let tokens: any = {};

    xykPairsUst.forEach(({ pool_address }) => {
      const pool = result[pool_address];

      // in the event of switching networks, pair and price queries are still being refetched
      // and pool info may not be in the result yet.
      if (!pool) return;

      const pair1 = pool.contractQuery.assets[0];
      const pair2 = pool.contractQuery.assets[1];
      const token1 =
        pair1.info.token?.contract_addr || pair1.info.native_token?.denom;
      const token2 =
        pair2.info.token?.contract_addr || pair2.info.native_token?.denom;
      const token1Amount = pair1.amount;
      const token2Amount = pair2.amount;

      if (token2 === "uusd") {
        tokens[token1] = num(token2Amount)
          .div(10 ** getDecimals(token2))
          .div(
            num(token1Amount)
              .div(10 ** getDecimals(token1))
              .toNumber()
          )
          .toNumber();
      } else {
        tokens[token2] = num(token1Amount)
          .div(10 ** getDecimals(token1))
          .div(
            num(token2Amount)
              .div(10 ** getDecimals(token2))
              .toNumber()
          )
          .toNumber();
      }
    });

    xykPairsNonUst.forEach(({ pool_address }) => {
      const pool = result[pool_address];

      // in the event of switching networks, pair and price queries are still being refetched
      // and pool info may not be in the result yet.
      if (!pool) return;

      const pair1 = pool.contractQuery.assets[0];
      const pair2 = pool.contractQuery.assets[1];
      const token1 =
        pair1.info.token?.contract_addr || pair1.info.native_token?.denom;
      const token2 =
        pair2.info.token?.contract_addr || pair2.info.native_token?.denom;
      const token1Amount = pair1.amount;
      const token2Amount = pair2.amount;

      if (tokens[token2] && !tokens[token1]) {
        const ratio = num(token2Amount)
          .div(10 ** getDecimals(token2))
          .div(
            num(token1Amount)
              .div(10 ** getDecimals(token1))
              .toNumber()
          )
          .toNumber();
        tokens[token1] = ratio * tokens[token2];
      }

      if (tokens[token1] && !tokens[token2]) {
        const ratio = num(token1Amount)
          .div(10 ** getDecimals(token1))
          .div(
            num(token2Amount)
              .div(10 ** getDecimals(token2))
              .toNumber()
          )
          .toNumber();
        tokens[token2] = ratio * tokens[token1];
      }
    });

    return tokens;
  }, [result]);
};

export default useTokenPrices;
