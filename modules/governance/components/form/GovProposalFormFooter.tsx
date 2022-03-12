import React, { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Fee } from "@terra-money/terra.js";

import CommonFooter, { ConfirmButton } from "components/CommonFooter";

type Props = {
  fee: Fee;
  balanceError?: boolean;
  txFeeNotEnough?: boolean;
};

const GovProposalFormFooter: FC<Props> = ({
  fee,
  balanceError,
  txFeeNotEnough,
}) => {
  const confirmButton: ConfirmButton = {
    title: "Submit Proposal",
    borderRadius: "md",
    variant: "primarywhite",
    isLoading: false,
    isDisabled: balanceError || txFeeNotEnough,
    type: "submit",
    onClick: null,
  };

  return (
    <Box
      bg="brand.defaultTable"
      py="1"
      px={["4", "8"]}
      mb="5"
      borderWidth="none"
      borderRadius="xl"
      position="relative"
      color="white"
    >
      <CommonFooter fee={fee} confirmButton={confirmButton} />
    </Box>
  );
};

export default GovProposalFormFooter;
