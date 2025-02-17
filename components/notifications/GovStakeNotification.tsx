import React, { FC, useEffect } from "react";
import { TxInfo } from "@terra-money/terra.js";
import { Text } from "@chakra-ui/react";
import num from "libs/num";
import { useQueryClient } from "react-query";

import {
  useContracts,
  useTokenInfo,
  handleTinyAmount,
  getEventsByType,
} from "modules/common";
import { ONE_TOKEN } from "constants/constants";

type Props = {
  txInfo: TxInfo;
};

const GovStakeNotification: FC<Props> = ({ txInfo }) => {
  const queryClient = useQueryClient();
  const { astroToken, xAstroToken } = useContracts();
  const { getSymbol } = useTokenInfo();
  const eventsByType = getEventsByType(txInfo);
  const amount = eventsByType?.wasm.amount[0];
  const displayAmount = handleTinyAmount(
    num(amount).div(ONE_TOKEN).dp(6).toNumber()
  );

  useEffect(() => {
    queryClient.invalidateQueries("balance");
    queryClient.invalidateQueries("supply");
  }, []);

  return (
    <Text textStyle={["small", "medium"]}>
      Staked {displayAmount} {getSymbol(astroToken)} to {getSymbol(xAstroToken)}
    </Text>
  );
};

export default GovStakeNotification;
