import React, { FC, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import num from "libs/num";
import { usePrice } from "modules/swap";
import { handleDollarTinyAmount } from "modules/common";

type Props = {
  rewards: {
    token: string;
    amount: number;
  }[];
};

const RewardsTd: FC<Props> = ({ rewards }) => {
  const { getPriceInUst } = usePrice();

  const { data } = useQuery(
    ["prices", rewards],
    () => {
      const promises = rewards.map((reward) => getPriceInUst(reward.token));
      return Promise.all(promises);
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const totalPrice = useMemo(() => {
    if (data == null) {
      return 0;
    }

    const total = rewards.reduce((acc, reward, index) => {
      // TODO: Make sure the tokens are in the same order as the query
      return acc + data[index] * reward.amount;
    }, 0);

    return num(total).toNumber();
  }, [data]);

  return <Box fontSize="sm">{handleDollarTinyAmount(totalPrice)}</Box>;
};

export default RewardsTd;
