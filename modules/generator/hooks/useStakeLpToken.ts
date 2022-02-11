import { useMemo } from "react";
import { useAddress, toTerraAmount, num } from "@arthuryeti/terra";

import { createStakeLpMsgs } from "modules/generator";
import {
  useContracts,
  useTransaction,
  TxStep,
  TxErrorHandler,
} from "modules/common";

export type StakeLpTokenState = {
  error: any;
  fee: any;
  txHash?: string;
  txStep: TxStep;
  reset: () => void;
  submit: () => void;
};

type Params = {
  amount: string | null;
  token: string | null;
  onBroadcasting?: (txHash: string) => void;
  onError?: TxErrorHandler;
};

export const useStakeLpToken = ({
  amount,
  token,
  onBroadcasting,
  onError,
}: Params): StakeLpTokenState => {
  const address = useAddress();
  const { generator } = useContracts();

  const msgs = useMemo(() => {
    if (amount == "" || num(amount).eq(0) || address == null || token == null) {
      return null;
    }

    return createStakeLpMsgs(
      { amount: toTerraAmount(amount), token, contract: generator },
      address
    );
  }, [address, amount, generator, token]);

  return useTransaction({ msgs, onBroadcasting, onError });
};
