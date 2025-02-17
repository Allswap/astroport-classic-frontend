import React, { FC } from "react";
import { Text } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { handleTinyAmount, handleBigPercentage } from "modules/common";
import { Pool, useEstShareOfPool } from "modules/pool";
import FormSummary from "components/common/FormSummary";
import FormConfirm from "components/common/FormConfirm";

type Props = {
  pool: Pool;
  token1?: string | undefined;
  amount1?: string | undefined;
  token2?: string | undefined;
  amount2?: string | undefined;
  fee: Fee;
  txFeeNotEnough?: boolean;
  onCloseClick: () => void;
};

const WithdrawFormConfirm: FC<Props> = ({
  pool,
  token1,
  amount1,
  token2,
  amount2,
  fee,
  txFeeNotEnough,
  onCloseClick,
}) => {
  const shareOfPool = useEstShareOfPool({ pool, amount1, amount2 });
  const formattedApr = handleBigPercentage(pool.rewards.total * 100);

  return (
    <FormConfirm
      fee={fee}
      txFeeNotEnough={!!txFeeNotEnough}
      title="Confirm Withdraw Liquidity"
      actionLabel="Confirm Withdraw"
      contentComponent={
        <FormSummary
          label="You are receiving:"
          tokens={[
            { asset: token1, amount: amount1 },
            { asset: token2, amount: amount2 },
          ]}
        />
      }
      details={[
        {
          label: "APR",
          value: `${handleTinyAmount(formattedApr, "0.00") || 0}%`,
        },
        {
          label: "Share of Pool",
          value: `${handleTinyAmount(Number(shareOfPool), "0.00") || 0}%`,
        },
      ]}
      onCloseClick={onCloseClick}
      taxRate={0.002}
    >
      <Text mt={6} textStyle="small" variant="secondary">
        The numbers above are estimates based on the current composition of the
        pool. These numbers could change between now and the time your
        transaction completes.
      </Text>
    </FormConfirm>
  );
};

export default WithdrawFormConfirm;
