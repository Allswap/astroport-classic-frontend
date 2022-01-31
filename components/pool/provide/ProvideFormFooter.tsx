import React, { FC } from "react";
import { TxStep } from "@arthuryeti/terra";
import numeral from "numeral";
import { handleBigPercentage, handleTinyAmount } from "modules/common";
import { useEstShareOfPool, useEstShareInUst, Pool } from "modules/pool";
import CommonFooter, { ConfirmButton } from "components/CommonFooter";
import AprFooter from "components/pool/AprFooter";

type Props = {
  pool: Pool;
  data: any;
  amount1: string;
  amount2: string;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({
  pool,
  amount1,
  amount2,
  data,
  onConfirmClick,
}) => {
  const shareOfPool = useEstShareOfPool({
    pool,
    amount1: amount1,
    amount2: amount2,
  });
  const shareInUst = useEstShareInUst({
    pool,
    amount1: amount1,
    amount2: amount2,
  });
  const formattedShareInUst = numeral(shareInUst).format("0,0.00");
  const formattedApr = handleBigPercentage(pool.rewards.total * 100);

  const cells = [
    {
      title: "My Liquidity",
      value: `$ ${formattedShareInUst || "0"}`,
    },
    {
      title: "Share of Pool",
      value: `${handleTinyAmount(shareOfPool, "0.00") || 0}%`,
    },
    {
      title: "APR",
      value: formattedApr,
      render: () => <AprFooter pool={pool} />,
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Add Liquidity",
    isLoading: data.txStep == TxStep.Estimating,
    isDisabled: data.txStep != TxStep.Ready,
    type: "submit",
    onClick: onConfirmClick,
  };

  return (
    <CommonFooter fee={data.fee} cells={cells} confirmButton={confirmButton} />
  );
};

export default ProvideFormFooter;
