import React, { FC, useCallback, useMemo, useState } from "react";
import useAddress from "hooks/useAddress";
import { useRouter } from "next/router";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import {
  NextLink,
  useNotEnoughUSTBalanceToPayFees,
  useTx,
} from "modules/common";
import { handleBigAndTinyAmount, truncateStr } from "modules/common/helpers";
import { PROPOSAL_VOTE_POWER } from "constants/constants";
import num from "libs/num";
import {
  useProposalApi,
  useProposalClient,
  useVote,
  useVotingPower,
} from "modules/governance";

import Card from "components/Card";
import CloseIcon from "components/icons/CloseIcon";
import FormLoading from "components/common/FormLoading";
import WarningMessage from "components/common/WarningMessage";
import GovVoteFormFooter from "./GovVoteFormFooter";
import Warning from "components/icons/Warning";
import useEstimateFee from "hooks/useEstimateFee";

type Props = {
  id: string;
  action: string;
};

const TitleBox = ({ title }: { title: string }) => {
  return (
    <Box mb="5">
      <Text fontSize="sm" mb="3">
        Proposal Title
      </Text>
      <Box bg="white.50" p="5" borderRadius="lg">
        {truncateStr(title, 35)}
      </Box>
    </Box>
  );
};

const ActionBox = ({
  action,
  amount,
  percentage,
}: {
  action: string;
  amount: string;
  percentage: string;
}) => {
  const actionColor = action === "for" ? "green.500" : "red.500";

  return (
    <Box mb="5">
      <Text fontSize="sm" mb="3">
        Your Vote
      </Text>
      <Flex bg="white.50" p="5" borderRadius="lg" justify="space-between">
        <Text color={actionColor} textTransform="capitalize">
          {action}
        </Text>
        <Flex flexDirection="column" align="flex-end">
          <Text>{amount}</Text>
          <Text fontSize="sm" color="white.400">
            {percentage}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

const WarningBox = () => {
  return (
    <Box
      bg="white.50"
      p="4"
      mt="4"
      borderWidth="2px"
      borderColor="white.100"
      borderRadius="2xl"
      color="white"
    >
      <Flex align="center">
        <Warning />
        <Text mx="3" fontSize="xs">
          Please be aware that voting figures can take a few mins to update on
          the dashboard.
        </Text>
      </Flex>
    </Box>
  );
};

const GovVoteForm: FC<Props> = ({ id, action }) => {
  const address = useAddress();
  const { proposal, proposalExists } = useProposalApi(id);
  const proposalContract = useProposalClient(id);
  const userVotingPower = useVotingPower({ proposal_id: Number(id) });
  const userVotingPowerPerc =
    userVotingPower && proposal && proposal.total_voting_power
      ? (userVotingPower /
          num(proposal.total_voting_power)
            .div(PROPOSAL_VOTE_POWER)
            .toNumber()) *
        100
      : `-`;
  const [isPosting, setIsPosting] = useState(false);
  const router = useRouter();

  const { msgs } = useVote({
    proposal_id: Number(id),
    // capitalize vote for contract
    vote: action.charAt(0).toUpperCase() + action.slice(1),
  });

  const { fee, isLoading: feeIsLoading } = useEstimateFee({
    msgs,
  });

  const notEnoughUSTToPayFees = useNotEnoughUSTBalanceToPayFees(fee);

  const error = useMemo(() => {
    // fee is not enough
    if (notEnoughUSTToPayFees) {
      return "Insufficient UST to pay for the transaction.";
    }

    // user is creator
    if (proposalContract?.submitter === address) {
      return "You cannot vote on your own proposal.";
    }

    // user already voted
    if (
      proposalContract?.for_voters.includes(address) ||
      proposalContract?.against_voters.includes(address)
    ) {
      return `You have already voted ${
        proposalContract?.for_voters.includes(address) ? "for" : "against"
      } this proposal.`;
    }

    // voting period over
    if (proposalContract?.status !== "Active") {
      return "Voting period is over.";
    }

    return false;
  }, [notEnoughUSTToPayFees, proposalContract]);

  const { submit } = useTx({
    notification: {
      type: "govVote",
      data: {
        proposal_id: id,
        action,
      },
    },
    onPosting: () => {
      setIsPosting(true);
    },
    onBroadcasting: () => {
      router.push("/governance");
    },
    onError: () => {
      setIsPosting(false);
    },
  });

  const onSubmit = useCallback(() => {
    submit({
      msgs,
      fee,
    });
  }, [msgs, fee]);

  // proposal doesn't exist
  if (proposalExists === false) {
    router.push("/404");
  }

  if (!proposal) {
    return null;
  }

  if (isPosting) {
    return <FormLoading />;
  }

  return (
    <>
      <Card>
        <Flex justify="space-between" align="center" mb="8">
          <Text fontSize="md">Confirm Vote</Text>
          <NextLink href={`/governance/proposal/${id}`} passHref>
            <Button
              aria-label="Close"
              variant="simple"
              _hover={{
                bg: "rgba(255,255,255,0.1)",
              }}
            >
              <CloseIcon
                w={["4", "6"]}
                h={["4", "6"]}
                color="white"
                BackgroundOpacity="0"
              />
            </Button>
          </NextLink>
        </Flex>
        <TitleBox title={proposal.title} />
        {!!userVotingPower && (
          <ActionBox
            action={action}
            amount={userVotingPower.toLocaleString()}
            percentage={`${handleBigAndTinyAmount(userVotingPowerPerc)}%`}
          />
        )}
        <GovVoteFormFooter
          action={action}
          fee={fee}
          isLoading={feeIsLoading}
          txFeeNotEnough={notEnoughUSTToPayFees}
          error={error}
          onClick={onSubmit}
        />
      </Card>
      {!error && <WarningBox />}
      {error && <WarningMessage mb="8" content={error} />}
    </>
  );
};

export default GovVoteForm;
