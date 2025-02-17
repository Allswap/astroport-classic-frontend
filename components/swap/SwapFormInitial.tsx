import React, { FC, useEffect } from "react";
import { Box, Flex, Text, HStack, IconButton } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";
import { motion, useAnimation } from "framer-motion";
import useAddress from "hooks/useAddress";
import { useBalance, useTokenInfo } from "modules/common";
import TokenInput from "components/TokenInput";
import NewAmountInput from "components/NewAmountInput";
import WarningMessage from "components/common/WarningMessage";
import SlippagePopover from "components/popovers/SlippagePopover";
import ArrowDownIcon from "components/icons/ArrowDown";
import num from "libs/num";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionHStack = motion(HStack);

type Props = {
  token1: string;
  token2: string;
  error: any;
  expertMode: boolean;
  isSecondInputDisabled: boolean;
  isLoading?: boolean;
  isReverse?: boolean;
  onInputChange: (name: string) => void;
  onExpertModeChange: (expertMode: boolean) => void;
};

const SwapFormInitial: FC<Props> = ({
  token1,
  token2,
  error,
  expertMode,
  isSecondInputDisabled,
  isReverse = false,
  isLoading = false,
  onInputChange,
  onExpertModeChange,
}) => {
  const address = useAddress();
  const { control, setValue } = useFormContext();
  const card1Control = useAnimation();
  const card2Control = useAnimation();
  const token1Balance = useBalance(token1);
  const { getDecimals } = useTokenInfo();
  const balance = num(token1Balance)
    .div(10 ** getDecimals(token1))
    .dp(6)
    .toNumber();

  const reverse = async () => {
    setValue("token1", token2);
    setValue("token2", token1);
  };

  const getInputProps = (field: any) => {
    return {
      ...field,
      onChange: (value: string) => {
        onInputChange(field.name);
        const fieldToUpdate = field.name === "amount1" ? "amount2" : "amount1";
        if (num(value).eq(0) || value == "") {
          setValue(fieldToUpdate, "");
        }
        field.onChange(value);
      },
    };
  };

  useEffect(() => {
    card1Control.start({ y: 0 });
    card2Control.start({ y: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Flex
        justify="space-between"
        align="center"
        color="white"
        mb={["3", "6"]}
        px="6"
      >
        <MotionBox
          flex="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Text fontSize={["md", "xl"]}>Swap</Text>
        </MotionBox>
        <MotionHStack
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          spacing="2"
        >
          <Controller
            name="slippage"
            control={control}
            rules={{ required: true }}
            render={({ field: { value, onChange } }) => (
              <SlippagePopover
                value={value}
                onChange={onChange}
                expertMode={expertMode}
                onExpertModeChange={onExpertModeChange}
              />
            )}
          />
        </MotionHStack>
      </Flex>
      <MotionBox
        key="card1"
        borderRadius="xl"
        bg="brand.blue"
        py={["4", "8"]}
        px={["4", "8", "12"]}
        border="solid 2px rgba(255, 255, 255, 0.1)"
        initial={{ y: -30 }}
        animate={card1Control}
      >
        <Flex direction={["column", null, "row"]}>
          <Box flex="1">
            <Controller
              name="token1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput
                  {...field}
                  onChange={(value: string) => {
                    if (value === token2) {
                      reverse();
                    } else {
                      setValue("token1", value);
                    }
                  }}
                />
              )}
            />
          </Box>
          <Box flex="1" ml={[null, null, "8"]} mt={["4", null, "0"]}>
            <Controller
              name="amount1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token1}
                  max={balance}
                  isLoading={isReverse && isLoading}
                  clampValueOnBlur={false}
                  {...getInputProps(field)}
                />
              )}
            />
          </Box>
        </Flex>
      </MotionBox>
      <MotionFlex
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        justify="center"
        position="relative"
        h="2"
      >
        <Flex
          justify="center"
          align="center"
          borderRadius="100%"
          bg="brand.deepBlue"
          p="1"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <IconButton
            aria-label="Switch"
            icon={<ArrowDownIcon />}
            onClick={reverse}
            variant="icon"
            size="xs"
            bg="brand.deepBlue"
            isRound
          />
        </Flex>
      </MotionFlex>
      <MotionBox
        key="card2"
        borderRadius="xl"
        bg="brand.purple"
        py={["4", "8"]}
        px={["4", "8", "12"]}
        border="solid 2px rgba(255, 255, 255, 0.1)"
        initial={{ y: 30 }}
        animate={card2Control}
      >
        <Flex direction={["column", null, "row"]}>
          <Box flex="1">
            <Controller
              name="token2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TokenInput
                  {...field}
                  onChange={(value: string) => {
                    if (value === token1) {
                      reverse();
                    } else {
                      setValue("token2", value);
                    }
                  }}
                />
              )}
            />
          </Box>
          <Box flex="1" ml={[null, null, "8"]} mt={["4", null, "0"]}>
            <Controller
              name="amount2"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <NewAmountInput
                  asset={token2}
                  isDisabled={isSecondInputDisabled}
                  isLoading={!isReverse && isLoading}
                  hideMaxButton
                  {...getInputProps(field)}
                />
              )}
            />
          </Box>
        </Flex>
      </MotionBox>

      {address && error ? (
        <WarningMessage content={error} />
      ) : (
        <WarningMessage />
      )}
    </Box>
  );
};

export default SwapFormInitial;
