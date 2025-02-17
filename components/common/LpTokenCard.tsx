import React, { FC, useMemo } from "react";
import { Box, Flex, Text, HStack, Image } from "@chakra-ui/react";
import num from "libs/num";
import numeral from "numeral";
import { useAstroswap, getTokenDenoms, useTokenInfo } from "modules/common";
import { useTokenPriceInUstWithSimulate } from "modules/swap";
import { useGetPool, useLpToTokens, orderPoolTokens } from "modules/pool";

type Props = {
  token: any;
};

const LpTokenCard: FC<Props> = ({ token }) => {
  const { pools } = useAstroswap();
  const { getProtocol, getIcon, getSymbol } = useTokenInfo();
  const pool = (pools || []).find((p) => p.lp_address == token.asset);
  const assets = pool ? getTokenDenoms(pool.assets) : [];
  const [token1, token2] = orderPoolTokens(
    { asset: assets[0] || "", symbol: getSymbol(assets[0] || "") },
    { asset: assets[1] || "", symbol: getSymbol(assets[1] || "") }
  );

  const { data: poolData } = useGetPool(pool?.pool_address);
  const protocol1 = getProtocol(token1 || "");
  const icon1 = getIcon(token1 || "");
  const symbol1 = getSymbol(token1 || "");
  const protocol2 = getProtocol(token2 || "");
  const icon2 = getIcon(token2 || "");
  const symbol2 = getSymbol(token2 || "");
  const price1 = useTokenPriceInUstWithSimulate(token1 || "");
  const price2 = useTokenPriceInUstWithSimulate(token2 || "");
  const tokenAmounts = useLpToTokens({ pool: poolData, amount: token.amount });

  const totalInUst = useMemo(() => {
    if (poolData == null || tokenAmounts == null || !token1 || !token2) {
      return 0;
    }

    const totalPrice1 = num(tokenAmounts[token1]).times(price1);
    const totalPrice2 = num(tokenAmounts[token2]).times(price2);

    return totalPrice1.plus(totalPrice2).toString();
  }, [poolData]);

  const tokenAmount = numeral(token.amount).format("0,0.00[0000]");
  const totalAmount = numeral(totalInUst).format("0,0.00");

  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      borderColor="white.200"
      bg="white.100"
      px="4"
      py="3"
      lineHeight="1.3"
    >
      <Flex justify="space-between">
        <Box>
          <HStack spacing="4">
            <HStack spacing="-2">
              <Image src={icon1} width="1.5rem" height="1.5rem" alt="Logo" />
              <Image src={icon2} width="1.5rem" height="1.5rem" alt="Logo" />
            </HStack>
            <Box>
              <Text textStyle="h3">
                {symbol1}-{symbol2}-LP
              </Text>
              <Text textStyle="small" variant="dimmed">
                {protocol1} - {protocol2}
              </Text>
            </Box>
          </HStack>
        </Box>
        <Box fontWeight="500" textAlign="right">
          <Text textStyle="h3">{tokenAmount}</Text>
          <Text textStyle="small" variant="dimmed">
            ${totalAmount}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default LpTokenCard;
