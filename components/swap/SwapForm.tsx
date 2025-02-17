import React, { FC, useState, useEffect, useCallback, useMemo } from "react";
import { chakra } from "@chakra-ui/react";
import { useForm, FormProvider } from "react-hook-form";
import num from "libs/num";
import { useRouter } from "next/router";
import { useWallet } from "@terra-money/wallet-provider";
import { DEFAULT_SLIPPAGE, ONE_TOKEN } from "constants/constants";
import { useSwap, useSwapRoute } from "modules/swap";
import {
  useBalance,
  useAstroswap,
  useTokenInfo,
  useNotEnoughUSTBalanceToPayFees,
  useTx,
} from "modules/common";
import useDebounceValue from "hooks/useDebounceValue";
import useLocalStorage from "hooks/useLocalStorage";
import SwapFormConfirm from "components/swap/SwapFormConfirm";
import SwapFormInitial from "components/swap/SwapFormInitial";
import SwapFormFooter from "components/swap/SwapFormFooter";
import FormLoading from "components/common/FormLoading";
import useEstimateFee from "hooks/useEstimateFee";
import { useTaxCap, useTaxRate } from "hooks/useTaxRates";
import { Coin, Coins, Fee } from "@terra-money/terra.js";
import { calcMinimumTaxAmount } from "libs/terra";

type FormValues = {
  token1: string;
  amount1: string;
  token2: string;
  amount2: string;
  slippage: number;
};

type Props = {
  defaultToken1?: string;
  defaultToken2?: string;
};

const SwapForm: FC<Props> = ({ defaultToken1, defaultToken2 }) => {
  const { tokenGraph } = useAstroswap();
  const { getDecimals } = useTokenInfo();
  const router = useRouter();
  const {
    network: { chainID },
  } = useWallet();
  const [currentInput, setCurrentInput] = useState(null);
  const [customError, setCustomError] = useState<string>("");
  const [isPosting, setIsPosting] = useState(false);
  const [txHash, setTxHash] = useState<string>();
  const [slippageSetting, setSlippageSetting] = useLocalStorage<number>(
    "slippageSetting",
    DEFAULT_SLIPPAGE
  );
  const [expertMode, setExpertMode] = useLocalStorage("expertMode", false);
  const isReverse = currentInput == "amount2";

  const [showConfirm, setShowConfirm] = useState(false);

  const methods = useForm<FormValues>({
    defaultValues: {
      token1: defaultToken1 || "",
      amount1: "",
      token2: defaultToken2 || "",
      amount2: "",
      slippage: slippageSetting || DEFAULT_SLIPPAGE,
    },
    mode: "all",
    reValidateMode: "onChange",
  });

  const { watch, setValue } = methods;

  const { slippage, token1, amount1, token2, amount2 } = watch();

  const debouncedAmount1 = useDebounceValue(amount1, 500);
  const debouncedAmount2 = useDebounceValue(amount2, 500);
  const token1Balance = useBalance(token1);

  const swapRoute = useSwapRoute({
    tokenGraph,
    from: token1,
    to: token2,
  });

  const handleSuccess = useCallback(
    (result) => {
      const inputToUpdate = isReverse ? "amount1" : "amount2";
      const tokenToUpdate = isReverse ? token1 : token2;

      const divideBy = num(10).pow(getDecimals(tokenToUpdate));
      const newAmount = num(result.amount).div(divideBy).dp(6).toString();

      setValue(inputToUpdate, newAmount);
    },
    [isReverse, token1, token2]
  );

  const handleError = useCallback(() => {
    setCustomError("Invalid amount of tokens to receive.");
  }, []);

  useEffect(() => {
    methods.reset();
  }, [chainID]);

  useEffect(() => {
    if (slippage !== undefined && slippage != slippageSetting) {
      setSlippageSetting(slippage);
    }
  }, [slippage]);

  useEffect(() => {
    if (defaultToken2 != token2 || defaultToken1 != token1) {
      router.push(`/swap?from=${token1}&to=${token2}`, undefined, {
        shallow: true,
      });
    }
  }, [token1, token2]);

  useEffect(() => {
    if (customError) {
      setCustomError("");
    }
  }, [token1, token2, amount1, amount2]);

  const handleInputChange = (value: any) => {
    setCurrentInput(value);
  };

  const { msgs, minReceive, simulated, exchangeRate } = useSwap({
    swapRoute,
    token1: token1,
    token2: token2,
    amount1: debouncedAmount1,
    amount2: debouncedAmount2,
    slippage: num(slippage).div(100).toString(),
    onSimulateSuccess: handleSuccess,
    onSimulateError: handleError,
    reverse: isReverse,
  });

  const { fee, isLoading: feeIsLoading } = useEstimateFee({
    msgs,
  });

  /* new burn tax*/
  const taxEnabled = token1 === "uusd" || token1 === "uluna";
  const { data: taxRate = "0" } = useTaxRate(taxEnabled);
  const { data: taxCap = "0" } = useTaxCap(taxEnabled);

  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees(fee);

  const { submit } = useTx({
    notification: {
      type: "swap",
      data: {
        token1,
        token2,
      },
    },
    onPosting: () => {
      setSlippageSetting(slippage);
      setShowConfirm(false);
      setTxHash(undefined);
      setIsPosting(true);
    },
    onBroadcasting: (txHash) => {
      setTxHash(txHash);
      setIsPosting(false);
      resetWithSameTokens();
    },
    onError: () => {
      setShowConfirm(false);
      setIsPosting(false);
    },
  });

  const onSubmit = useCallback(() => {
    let submitFee: Fee | undefined;

    if (taxEnabled) {
      // fee
      const gasFee = {
        amount: fee?.amount.toString().slice(0, -4) || "0",
        denom: "uusd",
      };
      const gasCoins = new Coins([Coin.fromData(gasFee)]);
      // tax
      const taxCoin = new Coin(
        token1,
        calcMinimumTaxAmount(num(amount1).times(num(10).pow(6)), {
          taxRate,
          taxCap,
        })
      );
      // fee + tax
      const feeCoins = gasCoins.add(taxCoin);
      submitFee = new Fee(fee?.gas_limit || 0, feeCoins);
    } else {
      submitFee = fee;
    }

    submit({
      msgs,
      fee: submitFee,
    });
  }, [msgs, fee, token1, amount1, taxEnabled, taxRate, taxCap]);

  const resetWithSameTokens = useCallback(() => {
    methods.reset({
      token1,
      token2,
      amount1: "",
      amount2: "",
    });
  }, [token1, token2]);

  const isFormValid = useMemo<boolean>(() => {
    if (
      amount1 == "" ||
      amount2 == "" ||
      num(amount1).eq(0) ||
      num(amount2).eq(0) ||
      customError
    ) {
      return false;
    }

    return true;
  }, [token1, amount1, token2, amount2, customError]);

  const error = useMemo(() => {
    if (customError) {
      return customError;
    }

    if (amount1 == "" || amount2 == "") {
      return false;
    }

    if (num(amount1).eq(0) || num(amount2).eq(0)) {
      return "Both amounts must be greater than 0";
    }

    if (notEnoughUSTToPayFees) {
      return "Insufficient USTC to pay for the transaction.";
    }

    if (num(amount1).gt(0) && num(token1Balance).div(ONE_TOKEN).lt(amount1)) {
      return "insufficient assets in wallet";
    }

    return false;
  }, [
    token1,
    amount1,
    token2,
    amount2,
    simulated,
    customError,
    notEnoughUSTToPayFees,
  ]);

  if (isPosting) {
    return <FormLoading txHash={txHash} />;
  }

  return (
    <FormProvider {...methods}>
      <chakra.form onSubmit={methods.handleSubmit(onSubmit)} width="full">
        {!showConfirm && (
          <>
            <SwapFormInitial
              token1={token1}
              token2={token2}
              error={error}
              expertMode={expertMode}
              onInputChange={handleInputChange}
              onExpertModeChange={setExpertMode}
              isReverse={isReverse}
              isSecondInputDisabled={
                (swapRoute && swapRoute.length > 1) || simulated.isLoading
              }
              isLoading={simulated.isLoading}
            />
            <SwapFormFooter
              from={token1}
              amount1={amount1}
              to={token2}
              isLoading={feeIsLoading}
              price={simulated?.price}
              exchangeRate={exchangeRate}
              swapRoute={swapRoute}
              fee={fee}
              taxEnabled={taxEnabled}
              error={error}
              isFormValid={isFormValid}
              txFeeNotEnough={notEnoughUSTToPayFees}
              onConfirmClick={() => {
                expertMode ? onSubmit() : setShowConfirm(true);
              }}
              taxRate={Number(taxRate)}
            />
          </>
        )}

        {showConfirm && (
          <SwapFormConfirm
            swapRoute={swapRoute}
            token1={token1}
            token2={token2}
            amount1={amount1}
            amount2={amount2}
            slippage={slippage}
            fee={fee}
            taxEnabled={taxEnabled}
            price={simulated?.price}
            exchangeRate={exchangeRate}
            commission={simulated?.commission}
            minReceive={minReceive}
            onCloseClick={() => setShowConfirm(false)}
            taxRate={Number(taxRate)}
          />
        )}
      </chakra.form>
    </FormProvider>
  );
};

export default SwapForm;
