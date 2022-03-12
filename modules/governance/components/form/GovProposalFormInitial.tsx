import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { FormActions, FormTextItem, useContracts } from "modules/common";
import { GovProposalFormFooter, useAstroMintRatio } from "modules/governance";
import { GovernanceProposal } from "types/common";
import { ONE_TOKEN } from "constants/constants";
import DepositBox from "components/proposal/DepositBox";
import { useTokenPriceInUstWithSimulate } from "modules/swap";

type Props = {
  fee: Fee;
  txFeeNotEnough?: boolean;
  xAstroRequired?: string;
  xAstroBalance?: string;
  inputErrors: any;
  methods: UseFormReturn<GovernanceProposal, object>;
};

const CommonFormProps = (
  type: "input" | "textarea",
  id: string,
  title: string
) => {
  return { type, id, title };
};

const GovProposalFormInitial: FC<Props> = ({
  fee,
  txFeeNotEnough,
  xAstroRequired,
  xAstroBalance,
  inputErrors,
  methods,
}) => {
  const { astroToken } = useContracts();
  const astroMintRatio = useAstroMintRatio();
  let astroPrice = useTokenPriceInUstWithSimulate(astroToken);

  const { watch } = useFormContext();
  const [title, description, msg, link] = [
    watch("title"),
    watch("description"),
    watch("msg"),
    watch("link"),
  ];

  const xAstroRequiredTokens = Number(xAstroRequired) / ONE_TOKEN || null;
  const xAstroBalanceTokens = Number(xAstroBalance) / ONE_TOKEN || null;
  const xAstroPrice = astroMintRatio ? astroPrice * astroMintRatio : null;
  const balanceError = xAstroRequiredTokens > xAstroBalanceTokens || false;

  return (
    <>
      <FormActions>
        <Flex flexDirection="column">
          <Heading fontSize="lg">Submit Proposal</Heading>
          {xAstroRequiredTokens && (
            <Heading fontSize="sm" mt="2px" color="white.300">
              You need {xAstroRequiredTokens} xASTRO that will be locked in
              order to submit a proposal
            </Heading>
          )}
        </Flex>
      </FormActions>

      <FormTextItem
        {...CommonFormProps("input", "title", "Set Title:")}
        value={title}
        formRegister={methods.register}
        error={inputErrors?.title || null}
        required={true}
        onChange={(text) => {
          methods.setValue("title", text);
          methods.clearErrors("title");
        }}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "description", "Insert Description:")}
        value={description}
        formRegister={methods.register}
        error={inputErrors?.description || null}
        required={true}
        onChange={(text) => {
          methods.setValue("description", text);
          methods.clearErrors("description");
        }}
      />
      <FormTextItem
        {...CommonFormProps("textarea", "msg", "Executable Messages:")}
        fontFamily="mono"
        fontSize="sm"
        _placeholder={{ color: "white.400" }}
        value={msg}
        formRegister={methods.register}
        error={inputErrors?.msg || null}
        required={false}
        onChange={(text) => {
          methods.setValue("msg", text);
          methods.clearErrors("msg");
        }}
      />
      <FormTextItem
        {...CommonFormProps("input", "link", "Insert Link to Discussion:")}
        placeholder="https://discord.gg/..."
        value={link}
        formRegister={methods.register}
        error={inputErrors?.link || null}
        required={false}
        onChange={(text) => {
          methods.setValue("link", text);
          methods.clearErrors("link");
        }}
      />

      <DepositBox
        xAstroRequiredTokens={xAstroRequiredTokens}
        xAstroBalanceTokens={xAstroBalanceTokens}
        xAstroPrice={xAstroPrice}
        balanceError={balanceError}
      />

      <GovProposalFormFooter
        fee={fee}
        txFeeNotEnough={txFeeNotEnough}
        balanceError={balanceError}
      />
    </>
  );
};

export default GovProposalFormInitial;
