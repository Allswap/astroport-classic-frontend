import React, { FC } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Text,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverTrigger,
} from "@chakra-ui/react";
import { DEFAULT_SLIPPAGE } from "constants/constants";

type Props = {
  triggerElement: React.ReactElement;
  slippage: number;
  onSlippageChange: (slippage: number) => void;
  expertMode: boolean;
  onExpertModeChange: (expertMode: boolean) => void;
};

const tolerances = [DEFAULT_SLIPPAGE, 0.5, 1, 2];

const SlippagePopover: FC<Props> = ({
  triggerElement,
  slippage,
  onSlippageChange,
  expertMode,
  onExpertModeChange,
}) => {
  return (
    <Popover placement="left">
      <PopoverTrigger>{triggerElement}</PopoverTrigger>
      <PopoverContent color="brand.deepBlue">
        <PopoverCloseButton />
        <PopoverHeader>Settings</PopoverHeader>
        <PopoverBody>
          <Box width="sm" px={6}>
            <Text textStyle="minibutton">Expert mode</Text>
            <HStack mt={2}>
              <Button
                variant="filter"
                bg="brand.lightPurple"
                isActive={expertMode}
                onClick={() => onExpertModeChange(true)}
              >
                On
              </Button>
              <Button
                variant="filter"
                bg="brand.lightPurple"
                isActive={!expertMode}
                onClick={() => onExpertModeChange(false)}
              >
                Off
              </Button>
            </HStack>

            <Text mt={3} textStyle="minibutton">
              Set slippage tolerance
            </Text>
            <HStack mt={2} align="stretch">
              {tolerances.map((tolerance, index) => (
                <Button
                  key={index}
                  variant="filter"
                  bg="brand.lightPurple"
                  isActive={slippage === tolerance}
                  onClick={() => {
                    onSlippageChange(tolerance);
                  }}
                >
                  {tolerance.toPrecision(1)}%
                </Button>
              ))}
              <InputGroup
                size="xs"
                maxW="30%"
                _focusWithin={{
                  color: "brand.purple",
                }}
              >
                <Input
                  type="number"
                  min={DEFAULT_SLIPPAGE}
                  step={0.01}
                  value={slippage || undefined}
                  onChange={(e) => onSlippageChange(Number(e.target.value))}
                  placeholder="Custom"
                  borderColor="brand.deepBlue"
                  _focus={{
                    borderColor: "brand.purple",
                  }}
                  textStyle="minibutton"
                  fontSize="10px"
                />
                <InputRightElement pointerEvents="none" fontSize="sm">
                  <Text>%</Text>
                </InputRightElement>
              </InputGroup>
            </HStack>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default SlippagePopover;