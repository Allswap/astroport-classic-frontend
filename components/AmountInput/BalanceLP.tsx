import React, { FC } from "react";
import { Box, Text, Flex, chakra } from "@chakra-ui/react";
import { useTokenInfo, useTerra, getTokenDenoms } from "@arthuryeti/terra";

import { lookup, format } from "libs/parse";
import { useBalance } from "hooks/useBalance";

type Props = {
  asset: string;
  initial?: string;
  onChange: (value: string) => void;
};

const BalanceLP: FC<Props> = ({ asset, initial, onChange }) => {
  const { pairs } = useTerra();
  const { getSymbol } = useTokenInfo();
  const pair = pairs.find((v) => v.lpToken == asset);
  const balance = useBalance(asset);
  const [token1, token2] = getTokenDenoms(pair.asset_infos);
  const amount = lookup(balance, asset);

  return (
    <Flex align="center" justify="space-between" mt="1">
      <Box>
        <Text>
          <Text as="span" fontSize="sm" fontWeight="500" color="white.400">
            In Wallet:
          </Text>{" "}
          <Text as="span" fontSize="sm" color="white" ml="2">
            {format(initial ?? balance, "uusd")} {getSymbol(token1)}-
            {getSymbol(token2)} LP
          </Text>
        </Text>
      </Box>
      <Box>
        <chakra.button
          type="button"
          outline="none"
          color="white.600"
          fontSize="xs"
          textTransform="uppercase"
          bg="white.100"
          fontWeight="bold"
          px="3"
          borderRadius="md"
          letterSpacing="widest"
          onClick={() => onChange(amount)}
        >
          Max
        </chakra.button>
      </Box>
    </Flex>
  );
};

export default BalanceLP;
