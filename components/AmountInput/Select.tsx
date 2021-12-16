import React, { FC, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Menu,
  Button,
  MenuButton,
  MenuList,
  Image,
  VStack,
} from "@chakra-ui/react";
import { fromTerraAmount } from "@arthuryeti/terra";

import ChevronDownIcon from "components/icons/ChevronDownIcon";
import { CommonTokensList, List } from "components/AmountInput";
import Search from "components/common/Search";
import { useTokenPriceInUst } from "modules/swap";
import { useTokenInfo } from "modules/common";

type Props = {
  value: string;
  onClick: (token: string) => void;
  tokens?: string[];
};

const Select: FC<Props> = ({ value, onClick, tokens }) => {
  const { getIcon, getSymbol } = useTokenInfo();
  const price = useTokenPriceInUst(value);
  const [filter, setFilter] = useState("");

  const renderButton = () => {
    const icon = getIcon(value);

    if (value) {
      return (
        <Flex align="center" justify="space-between">
          <Box>
            <Image src={icon} width="2.5rem" height="2.5rem" alt="Logo" />
          </Box>

          <Box ml="3" fontWeight="500" flex="1">
            <Text textStyle="h3">{getSymbol(value)}</Text>
            {/* TODO: Fix type */}
            <Text fontSize="xs" color="white.400">
              Price: ${fromTerraAmount(price as string)}
            </Text>
          </Box>
          <Box>
            <ChevronDownIcon />
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
          <Menu>
            <Flex pr="8">
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
            </Flex>
            <MenuList bg="otherColours.overlay">
              <VStack spacing={6} align="stretch" p="4" minW="26rem">
                <Text>Select Token</Text>
                <Search
                  placeholder="Search token"
                  borderColor="brand.deepBlue"
                  color="brand.deepBlue"
                  bg="white.200"
                  onChange={(e) => setFilter(e.target.value)}
                />
                <CommonTokensList onClick={onClick} />
                <List onClick={onClick} tokens={tokens} filter={filter} />
              </VStack>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Select;
