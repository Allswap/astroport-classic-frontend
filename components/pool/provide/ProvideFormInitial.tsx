import React, { FC } from "react";
import { Flex, Box, Checkbox, Text, useMediaQuery } from "@chakra-ui/react";
import { MOBILE_MAX_WIDTH } from "constants/constants";
import { useFormContext, Controller } from "react-hook-form";
import num from "libs/num";
import { PoolFormType, ProvideFormMode } from "types/common";
import { ProvideState, Pool } from "modules/pool";
import {
  useBalance,
  useTokenInfo,
  FormActions,
  FormActionItem,
} from "modules/common";
import Card from "components/Card";
import CircularIcon from "components/common/CircularIcon";
import WarningMessage from "components/common/WarningMessage";
import PlusIcon from "components/icons/PlusIcon";
import NewAmountInput, { Balance } from "components/NewAmountInput";
import TokenInput from "components/TokenInput";
import PoolHeader from "components/pool/PoolHeader";
import ProvideFormFooter from "components/pool/provide/ProvideFormFooter";
import AstroSlider from "components/AstroSlider";

type Props = {
  pool: Pool;
  mode: ProvideFormMode;
  type: PoolFormType;
  onModeClick: any;
  onTypeClick: any;
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  canStake: boolean;
  txFeeNotEnough?: boolean;
  state: ProvideState;
  error: any;
  onClick: () => void;
};

const ProvideFormInitial: FC<Props> = ({
  pool,
  mode,
  type,
  onModeClick,
  onTypeClick,
  token1,
  amount1,
  token2,
  amount2,
  error,
  state,
  canStake,
  txFeeNotEnough,
  onClick,
}) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const { getDecimals } = useTokenInfo();
  const token1Balance = useBalance(token1) ?? 0;
  const token2Balance = useBalance(token2) ?? 0;
  const token1Decimals = getDecimals(token1);
  const token2Decimals = getDecimals(token2);
  const showSlider = num(pool.total.share).gt(0);
  const { control, setValue } = useFormContext();
  const ratio = num(pool.token2.share)
    .div(10 ** token2Decimals)
    .div(num(pool.token1.share).div(10 ** token1Decimals))
    .toNumber();
  const priceSource =
    pool.poolType === "xyk" ? "pool-ratio" : "swap-simulation";

  const balances = {
    token1: num(token1Balance)
      .div(10 ** token1Decimals)
      .dp(6)
      .toNumber(),
    token2: num(token2Balance)
      .div(10 ** token2Decimals)
      .dp(6)
      .toNumber(),
  };

  let maxAmounts = {
    token1: num(Math.min(balances.token1, balances.token2 / ratio))
      .dp(6)
      .toNumber(),
    token2: num(Math.min(balances.token2, balances.token1 * ratio))
      .dp(6)
      .toNumber(),
  };

  if (num(ratio).isNaN() || ratio === Infinity) {
    maxAmounts = balances;
  }

  const getInputProps = (field: any) => {
    return {
      ...field,
      onChange: (value: string) => {
        if (num(ratio).gt(0) && ratio !== Infinity) {
          let newAmount = num(value).times(ratio).dp(6).toString();
          let fieldToUpdate = "amount2";

          if (field.name === "amount2") {
            fieldToUpdate = "amount1";
            newAmount = num(value).div(ratio).dp(6).toString();
          }

          setValue(fieldToUpdate, newAmount);

          if (num(value).eq(0) || value == "") {
            setValue(fieldToUpdate, "");
          }
        }

        field.onChange(value);
      },
    };
  };

  const handleChange = (value: number) => {
    if (num(ratio).gt(0)) {
      let newAmount = num(value).times(ratio).dp(6).toString();
      setValue("amount2", newAmount);
    }

    setValue("amount1", String(value));
  };

  return (
    <>
      <FormActions>
        <FormActionItem
          label="Provide"
          value={type}
          type={PoolFormType.Provide}
          onClick={() => onTypeClick(PoolFormType.Provide)}
        />
        <FormActionItem
          label="Withdraw"
          type={PoolFormType.Withdraw}
          value={type}
          onClick={() => onTypeClick(PoolFormType.Withdraw)}
        />
      </FormActions>
      <PoolHeader
        pool={pool}
        type={type}
        mode={mode}
        onModeClick={onModeClick}
      />
      <Box position="relative">
        <Card {...(isMobile && { px: "4", py: "4" })}>
          <Flex {...(isMobile && { borderRadius: "2xl", overflow: "hidden" })}>
            <Box
              flex="1"
              {...(isMobile && { width: "50%", overflow: "hidden" })}
              {...(!isMobile && { pr: "8" })}
            >
              <Controller
                name="token1"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TokenInput
                    isSingle
                    isMobile={!!isMobile}
                    priceSource={priceSource}
                    {...field}
                  />
                )}
              />
            </Box>
            <Box
              flex="1"
              {...(isMobile && { width: "50%", overflow: "hidden" })}
            >
              <Controller
                name="amount1"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <NewAmountInput
                    asset={token1}
                    max={maxAmounts.token1}
                    isMobile={!!isMobile}
                    {...getInputProps(field)}
                  />
                )}
              />
            </Box>
          </Flex>
          {isMobile && (
            <Controller
              name="amount1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Balance
                  asset={token1}
                  max={maxAmounts.token1}
                  isMobile={isMobile}
                  {...getInputProps(field)}
                />
              )}
            />
          )}
        </Card>

        {mode == ProvideFormMode.Double && (
          <>
            <Box
              position="absolute"
              zIndex={10}
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            >
              <CircularIcon>
                <PlusIcon />
              </CircularIcon>
            </Box>
            <Card mt="2" {...(isMobile && { px: "4", py: "4" })}>
              <Flex
                {...(isMobile && { borderRadius: "2xl", overflow: "hidden" })}
              >
                <Box
                  flex="1"
                  {...(isMobile && { width: "50%", overflow: "hidden" })}
                  {...(!isMobile && { pr: "8" })}
                >
                  <Controller
                    name="token2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TokenInput
                        isSingle
                        isMobile={!!isMobile}
                        priceSource={priceSource}
                        {...field}
                      />
                    )}
                  />
                </Box>
                <Box
                  flex="1"
                  {...(isMobile && { width: "50%", overflow: "hidden" })}
                >
                  <Controller
                    name="amount2"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <NewAmountInput
                        asset={token2}
                        max={maxAmounts.token2}
                        isMobile={isMobile}
                        {...getInputProps(field)}
                      />
                    )}
                  />
                </Box>
              </Flex>
              {isMobile && (
                <Controller
                  name="amount2"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Balance
                      asset={token2}
                      max={maxAmounts.token2}
                      isMobile={isMobile}
                      {...getInputProps(field)}
                    />
                  )}
                />
              )}
            </Card>
          </>
        )}
      </Box>
      {showSlider && (
        <Card mt="2">
          <AstroSlider
            min={0}
            minLabel="0%"
            max={maxAmounts.token1}
            maxLabel="100%"
            step={0.0001}
            value={+amount1}
            onChange={handleChange}
          />
        </Card>
      )}
      <ProvideFormFooter
        pool={pool}
        amount1={amount1}
        amount2={amount2}
        data={state}
        txFeeNotEnough={!!txFeeNotEnough}
        onConfirmClick={onClick}
      />

      {canStake && (
        <Flex mt={4} mb={8} justifyContent="center">
          <Controller
            name="autoStake"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Checkbox
                colorScheme="whatsapp"
                iconColor="brand.deepBlue"
                color="green.500"
                borderColor="green.500"
                defaultChecked
                {...field}
              >
                <Text fontSize="xs">Stake LP Token</Text>
              </Checkbox>
            )}
          />
        </Flex>
      )}
      {error && <WarningMessage mb="8" content={error} />}
    </>
  );
};

export default ProvideFormInitial;
