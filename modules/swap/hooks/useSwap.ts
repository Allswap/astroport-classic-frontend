import { useMemo } from "react";
import { num, useAddress } from "@arthuryeti/terra";

import { useContracts, Route } from "modules/common";
import { minAmountReceive, useSwapSimulate } from "modules/swap";
import { createSwapMsgs as createMultiSwapMsgs } from "modules/swap/multiSwap";
import { createSwapMsgs as createMonoSwapMsgs } from "modules/swap/monoSwap";
import { useGetPool, usePool } from "modules/pool";
import { getAssetAmountsInPool } from "libs/terra";

type Params = {
  swapRoute: Route[] | null;
  token1: string | null;
  token2: string | null;
  amount1: string | null;
  amount2: string | null;
  slippage: string;
  reverse: boolean;
  onSimulateSuccess?: (item: any) => void;
};

export const useSwap = ({
  swapRoute,
  token1,
  token2,
  amount1,
  amount2,
  slippage,
  reverse = false,
  onSimulateSuccess,
}: Params) => {
  const address = useAddress();
  const { router } = useContracts();

  const { data: pool } = useGetPool(swapRoute?.[0]?.contract_addr);

  const simulated = useSwapSimulate({
    swapRoute,
    amount: reverse ? amount2 : amount1,
    token: reverse ? token2 : token1,
    reverse,
    onSuccess: onSimulateSuccess,
  });

  const price = useMemo(() => {
    if (pool == null) {
      return "0";
    }

    const { token1: tok1, token2: tok2 } = getAssetAmountsInPool(
      pool.assets,
      token2
    );
    return num(tok2).div(tok1).toFixed(18);
  }, [slippage, amount2]);

  const minReceive = useMemo(() => {
    if (amount2 == "") {
      return null;
    }

    return minAmountReceive({
      amount: amount2,
      maxSpread: slippage,
    });
  }, [slippage, amount2]);

  const msgs = useMemo(() => {
    if (
      swapRoute == null ||
      token1 == null ||
      amount1 == "" ||
      num(amount1).eq(0) ||
      simulated.isLoading ||
      simulated.amount == null
    ) {
      return null;
    }

    if (swapRoute.length > 1) {
      return createMultiSwapMsgs(
        {
          token: token1,
          swapRoute,
          amount: amount1,
          minReceive,
          router,
        },
        address
      );
    }

    return createMonoSwapMsgs(
      {
        token: token1,
        swapRoute,
        amount: amount1,
        slippage,
        price,
      },
      address
    );
  }, [
    address,
    token1,
    amount1,
    simulated,
    slippage,
    swapRoute,
    reverse,
    minReceive,
    router,
    price,
  ]);

  return useMemo(() => {
    return {
      msgs,
      minReceive,
      simulated,
      price,
    };
  }, [msgs, minReceive, simulated]);
};

export default useSwap;
