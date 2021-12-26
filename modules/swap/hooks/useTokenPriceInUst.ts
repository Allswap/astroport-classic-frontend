import { useMemo } from "react";
import { num } from "@arthuryeti/terra";

import { ONE_TOKEN } from "constants/constants";
import { useAstroswap, useLunaPrice } from "modules/common";
import { useSwapRoute } from "modules/swap";
import { useGetPool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

export const useTokenPriceInUst = (token: string | null) => {
  const { routes } = useAstroswap();
  const lunaPrice = useLunaPrice();
  const swapRouteInUst = useSwapRoute({ routes, from: token, to: "uusd" });
  const swapRouteInLuna = useSwapRoute({ routes, from: token, to: "uluna" });

  const { data: ustData } = useGetPool(swapRouteInUst?.[0]?.contract_addr);
  const { data: lunaData } = useGetPool(swapRouteInLuna?.[0]?.contract_addr);

  return useMemo(() => {
    if (token == "uusd") {
      return 1;
    }

    if (
      (swapRouteInUst == null && swapRouteInLuna == null) ||
      (ustData == null && lunaData == null)
    ) {
      return 0;
    }

    if (swapRouteInUst.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(ustData.assets, "uusd");

      if (num(token1).eq(0) || num(token2).eq(0)) {
        return 0;
      }

      return num(token1).div(token2).dp(6).toNumber();
    }

    if (swapRouteInLuna.length == 1) {
      const { token1, token2 } = getAssetAmountsInPool(
        lunaData.assets,
        "uluna"
      );

      if (num(token1).eq(0) || num(token2).eq(0)) {
        return 0;
      }

      const lunaInUst = num(token1)
        .div(ONE_TOKEN)
        .times(lunaPrice)
        .dp(6)
        .toNumber();

      return num(lunaInUst).div(token2).dp(6).toNumber();
    }

    return 0;
  }, [ustData, lunaPrice, swapRouteInUst, swapRouteInLuna, token, lunaData]);
};

export default useTokenPriceInUst;
