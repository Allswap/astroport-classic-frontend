import React, { FC } from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/react";

import { useTokenInfo } from "modules/common";
import FormFee from "components/common/FormFee";
import numeral from "numeral";

type Props = {
  from: string;
  to: string;
  fee: any;
  price: string;
  isLoading: boolean;
  isDisabled: boolean;
  onConfirmClick: () => void;
};

const SwapFormFooter: FC<Props> = ({
  from,
  to,
  price,
  isLoading,
  isDisabled,
  fee,
  onConfirmClick,
}) => {
  const { getSymbol } = useTokenInfo();
  const formattedPrice = numeral(price).format("0,0.00[0]").toString();

  return (
    <Flex justify="space-between" px="12" mt="8">
      <Box flex="1">
        {!isDisabled && (
          <>
            <Text color="white" fontSize="sm">
              1 {getSymbol(from)} = {formattedPrice} {getSymbol(to)}
            </Text>
            <Text variant="light">Exchange Rate</Text>
          </>
        )}
      </Box>
      <Flex flex="1" align="center" flexDirection="column">
        <Button
          variant="primary"
          type="button"
          onClick={onConfirmClick}
          isLoading={isLoading}
          isDisabled={isDisabled}
        >
          Swap Tokens
        </Button>
        {!isDisabled && <FormFee fee={fee} />}
      </Flex>
      <Box flex="1" textAlign="right">
        {!isDisabled && (
          <>
            <Text color="green.500" fontSize="sm">
              0.002%
            </Text>
            <Text variant="light">Price Impact</Text>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default SwapFormFooter;
