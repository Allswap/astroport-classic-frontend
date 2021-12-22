import React, { FC } from "react";
import { Flex, Image, Text, Box, HStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useTokenInfo } from "modules/common";
import { useTokenPriceInUst } from "modules/swap";

type Props = {
  token: string;
  amount: number | string;
};

const RewardLineItem: FC<Props> = ({ token, amount }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(token);
  const balance = numeral(amount).format("0,0.00");

  return (
    <Flex mt={2} justify="space-between">
      <Flex align="center" justify="space-between" w="full">
        <Box mr="4">
          <Image src={getIcon(token)} alt={getSymbol(token)} boxSize="10" />
        </Box>
        <Box flex="1">
          <Text fontSize="xl" fontWeight="500" lineHeight="normal">
            {getSymbol(token)}
          </Text>
          <Text fontSize="sm" opacity="0.4">
            Terra
          </Text>
        </Box>
        <Box>
          <Box minW="24">
            <Text fontSize="sm" textAlign="right" fontWeight="500">
              {balance}
            </Text>
            <Text fontSize="sm" textAlign="right" variant="dimmed">
              ${price}
            </Text>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default RewardLineItem;