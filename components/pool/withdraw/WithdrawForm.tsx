import React, { FC, useCallback, useState, useEffect, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import useDebounceValue from "hooks/useDebounceValue";
import { TxStep, useNotEnoughUSTBalanceToPayFees } from "modules/common";
import { PoolFormType } from "types/common";
import { useWithdraw, Pool } from "modules/pool";
import FormLoading from "components/common/FormLoading";
import WithdrawFormInitial from "components/pool/withdraw/WithdrawFormInitial";
import WithdrawFormConfirm from "components/pool/withdraw//WithdrawFormConfirm";
import { toTerraAmount } from "libs/terra";

type FormValues = {
  amount: string;
  token: string;
};

type Props = {
  pool: Pool;
  type: PoolFormType;
  onTypeClick: (v: PoolFormType) => void;
};

const WithdrawForm: FC<Props> = ({ pool, type, onTypeClick }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      token: pool.lpTokenContract,
      amount: "",
    },
  });
  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees();

  const error = useMemo(() => {
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    return false;
  }, [notEnoughUSTToPayFees]);

  const { token, amount } = methods.watch();

  const debouncedAmount = useDebounceValue(amount, 500);

  const state = useWithdraw({
    contract: pool.pairContract,
    lpToken: pool.lpTokenContract,
    amount: toTerraAmount(debouncedAmount),
    onBroadcasting: () => {
      router.push("/pools");
    },
    onError: () => {
      resetForm();
    },
  });

  const {
    txStep,
    withdraw,
    token1,
    token1Amount,
    token2,
    token2Amount,
    reset,
  } = state;

  const resetForm = useCallback(() => {
    setShowConfirm(false);
    methods.reset();
    reset();
  }, [reset, methods]);

  const submit = async () => {
    withdraw();
  };

  useEffect(() => {
    if (txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [txStep]);

  if (
    state.txHash &&
    (txStep == TxStep.Broadcasting || txStep == TxStep.Posting)
  ) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (!pool) {
    return null;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(submit)} width="full">
        {!showConfirm && (
          <WithdrawFormInitial
            pool={pool}
            type={type}
            onTypeClick={onTypeClick}
            token={token}
            error={error}
            amount={amount}
            state={state}
            txFeeNotEnough={notEnoughUSTToPayFees}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <WithdrawFormConfirm
            pool={pool}
            token1={token1}
            amount1={token1Amount}
            token2={token2}
            amount2={token2Amount}
            fee={state.fee}
            txFeeNotEnough={notEnoughUSTToPayFees}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default WithdrawForm;
