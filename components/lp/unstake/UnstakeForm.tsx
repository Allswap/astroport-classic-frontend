import React, { FC, useState, useEffect } from "react";
import { chakra, Link, Text, useToast } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import { TxStep } from "@arthuryeti/terra";
import useFinder from "hooks/useFinder";

import { useUnstakeLpToken } from "modules/pool";
import { useFeeToString } from "hooks/useFeeToString";
import { PairResponse, useTokenInfo } from "modules/common";
import { PoolFormType } from "types/common";

import FormLoading from "components/common/FormLoading";
import FormError from "components/common/FormError";
import FormConfirm from "components/common/FormConfirm";
import FormSuccess from "components/common/FormSuccess";
import FormSummary from "components/common/FormSummary";
import UnstakeFormInitial from "components/lp/unstake/UnstakeFormInitial";
import NotificationSuccess from "components/notifications/NotificationSuccess";

type FormValues = {
  lpToken: {
    amount: string;
    asset: string;
  };
};

type Props = {
  pair: PairResponse;
  pool: any;
  type: PoolFormType;
  onTypeClick: (v: PoolFormType) => void;
  isChartOpen: boolean;
  onChartClick: () => void;
};

const UnstakeForm: FC<Props> = ({
  pair,
  type,
  onTypeClick,
  isChartOpen,
  onChartClick,
}) => {
  const toast = useToast();
  const finder = useFinder();
  const { getSymbol } = useTokenInfo();
  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      lpToken: {
        amount: undefined,
        asset: pair.liquidity_token,
      },
    },
  });

  const { watch, getValues, handleSubmit } = methods;
  const lpToken = watch("lpToken");

  const showNotification = (txHash: string) => {
    const { lpToken } = getValues();
    toast({
      position: "top-right",
      duration: 9000,
      render: ({ onClose }) => (
        <NotificationSuccess onClose={onClose}>
          <Text textStyle="medium">
            Unstaked {lpToken.amount} {getSymbol(lpToken.asset)}
          </Text>
          <Link href={finder(txHash, "tx")} isExternal>
            <Text textStyle="medium" color="otherColours.overlay">
              View on Terra Finder
            </Text>
          </Link>
        </NotificationSuccess>
      ),
    });
  };

  const state = useUnstakeLpToken({
    ...lpToken,
    onSuccess: showNotification,
  });

  const submit = async () => {
    state.submit();
  };

  useEffect(() => {
    if (state.txStep == TxStep.Broadcasting) {
      setShowConfirm(false);
    }
  }, [state.txStep]);

  // @ts-expect-error
  const feeString = useFeeToString(state.fee);

  if (state.txStep == TxStep.Broadcasting || state.txStep == TxStep.Posting) {
    return <FormLoading txHash={state.txHash} />;
  }

  if (state.txStep == TxStep.Success) {
    return (
      <FormSuccess
        contentComponent={
          <FormSummary label1="You are staking" token1={lpToken} />
        }
        details={[{ label: "APY", value: "12%" }]}
        onCloseClick={state.reset}
      />
    );
  }

  if (state.txStep == TxStep.Failed) {
    return (
      <FormError
        content={state.error}
        onCloseClick={state.reset}
        onClick={state.reset}
      />
    );
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={handleSubmit(submit)} width="full">
        {!showConfirm && (
          <UnstakeFormInitial
            state={state}
            type={type}
            onTypeClick={onTypeClick}
            isChartOpen={isChartOpen}
            onChartClick={onChartClick}
            onClick={() => setShowConfirm(true)}
          />
        )}

        {showConfirm && (
          <FormConfirm
            fee={state.fee}
            actionLabel="Confirm Unstaking LP Token"
            contentComponent={
              <FormSummary label1="You are staking" token1={lpToken} />
            }
            details={[{ label: "APY", value: "12%" }]}
            onCloseClick={() => setShowConfirm(false)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default UnstakeForm;
