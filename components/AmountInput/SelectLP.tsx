import React, { FC } from "react";
import { Denom } from "@terra-money/terra.js";
import {
  Box,
  HStack,
  Text,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { useTokenInfo, getTokenDenoms, useTerra } from "@arthuryeti/terra";

import { format } from "libs/parse";
import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { ListLP } from "components/AmountInput";
import { useTokenPrice } from "modules/swap";

type Props = {
  value: string;
  onClick: (token: string) => void;
};

const SelectLP: FC<Props> = ({ value, onClick }) => {
  const { pairs } = useTerra();
  const { getIcon, getSymbol } = useTokenInfo();
  const pair = pairs.find((v) => v.lpToken == value);
  const [token1, token2] = getTokenDenoms(pair.asset_infos);
  const icon1 = getIcon(token1);
  const symbol1 = getSymbol(token1);
  const icon2 = getIcon(token2);
  const symbol2 = getSymbol(token2);
  const price = useTokenPrice(value);

  const renderButton = () => {
    if (pair) {
      return (
        <Flex align="center" justify="space-between">
          <HStack spacing="-4">
            <Image src={icon1} width="2.5rem" height="2.5rem" alt="Logo" />
            <Image src={icon2} width="2.5rem" height="2.5rem" alt="Logo" />
          </HStack>

          <Box ml="3" fontWeight="500" flex="1">
            <Text fontSize="2xl" color="white">
              {symbol1} - {symbol2}
            </Text>
            <Text fontSize="xs" color="white.400">
              Price: ${format(price, Denom.USD)}
            </Text>
          </Box>

          <Box>
            <ChevronDownIcon width="1rem" height="1rem" />
          </Box>
        </Flex>
      );
    }

    return null;
  };

  return (
    <Box>
      <Flex justify="space-between">
        <Box flex="1">
          <Menu isLazy>
            <Box pr="8">
              <MenuButton
                as={Button}
                bg="white.100"
                color="white"
                borderRadius="full"
                borderWidth="1px"
                borderColor="white.200"
                textAlign="left"
                h="16"
                w="full"
                _active={{
                  bg: "white.200",
                }}
                _focus={{
                  outline: "none",
                }}
                _hover={{
                  bg: "white.200",
                }}
              >
                {renderButton()}
              </MenuButton>
            </Box>
            <MenuList>
              <Box p="4" minW="26rem">
                <ListLP onClick={onClick} />
              </Box>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default SelectLP;
