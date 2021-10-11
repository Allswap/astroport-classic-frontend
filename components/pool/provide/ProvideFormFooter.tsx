import React, { FC } from "react";

import { useFeeToString } from "hooks/useFeeToString";
import { format } from "libs/parse";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  pool: any;
  data: any;
  onConfirmClick: () => void;
};

const ProvideFormFooter: FC<Props> = ({ pool, data, onConfirmClick }) => {
  // const percentage = calculatePercentage(
  //   pool.myShareInUST,
  //   pool.totalShareInUST
  // );
  const percentage = "199";
  const feeString = useFeeToString(data.fee);

  const cells = [
    {
      title: "Liquidity",
      value: format(pool.totalShareInUST, "uusd"),
    },
    {
      title: "Share of Pool",
      value: `${percentage || "0"}%`,
    },
    {
      title: "TX Fee",
      value: feeString || "0.00",
    },
  ];

  const confirmButton: ConfirmButton = {
    title: "Provide Liquidity",
    isDisabled: !data.isReady,
    type: "submit",
    onClick: onConfirmClick,
  };

  return <CommonFooter cells={cells} confirmButton={confirmButton} />;
};

export default ProvideFormFooter;
