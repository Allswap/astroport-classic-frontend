import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  Code,
  useMediaQuery,
} from "@chakra-ui/react";
import { useWallet } from "@terra-money/wallet-provider";
import { ASTRO_FORUM_LINK, MOBILE_MAX_WIDTH } from "constants/constants";
import { useRouter } from "next/router";
import useFinder from "hooks/useFinder";
import {
  useConfig,
  useProposalApi,
  useProposalClient,
} from "modules/governance";
import {
  composeTwitterLink,
  createHistoryBlocks,
} from "modules/governance/helpers";
import ProposalHeader from "components/proposal/Header";
import ProposalTime from "components/proposal/Time";
import ProposalVoteStats from "components/proposal/VoteStats";
import TimelineBar from "components/governance/TimelineBar";
import { Proposal_History } from "types/common";
import VotePower from "components/proposal/VotePower";
import useAddress from "hooks/useAddress";

const HistoryBox: FC<{ blocks: Proposal_History }> = ({ blocks }) => {
  return (
    <Flex
      flexDirection="column"
      mb="3"
      p="6"
      bg="white.50"
      borderRadius="xl"
      width="100%"
    >
      <Text mb="6">Proposal History</Text>
      <TimelineBar blocks={blocks} />
    </Flex>
  );
};

const DescriptionBox: FC<{ address: string; description: string }> = ({
  address,
  description,
}) => {
  const finder = useFinder();

  return (
    <Box minH="250px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Description</Text>
      <Box mb="3" maxH="40" overflowY="auto">
        <Text color="whiteAlpha.600" fontSize="sm">
          {description}
        </Text>
      </Box>
      <Text mb="3" color="whiteAlpha.800" fontSize="sm">
        by:{" "}
        <Link href={finder(address)} isExternal>
          {address}
        </Link>
      </Text>
    </Box>
  );
};

const MsgBox: FC<{ messages?: string | undefined }> = ({ messages }) => {
  const hasExecMsg = messages && messages.length > 0;

  return (
    <Box minH="150px" bg="white.50" mb="3" p="6" borderRadius="xl" width="100%">
      <Text mb="3">Executable Messages</Text>
      <Box maxH="40" pb="3" overflowY="auto">
        {hasExecMsg && (
          <Code bg="none" color="whiteAlpha.600" fontSize="sm">
            {messages}
          </Code>
        )}
        {!hasExecMsg && (
          <Text fontSize="sm" color="whiteAlpha.600">
            No executable messages.
          </Text>
        )}
      </Box>
    </Box>
  );
};

const DiscussionBox: FC<{ link: string }> = ({ link }) => {
  return (
    <Flex
      flexDirection="column"
      h="190px"
      bg="proposalColours.purpleAlt"
      p="5"
      borderRadius="xl"
      color="blackAlpha.900"
      fontSize=".875rem"
      borderColor="proposalColours.purple"
      borderWidth="2px"
    >
      <Text fontWeight="500">Discuss</Text>
      <Text mt="2" mb="auto">
        Have thoughts about this proposal?
        <br />
        Discuss with others on the forum.
      </Text>
      <Link
        href={link ? link : ASTRO_FORUM_LINK}
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Button variant="primary" borderRadius="md">
          Go to Forum
        </Button>
      </Link>
    </Flex>
  );
};

const GovProposalPage: FC<{ id: string }> = ({ id }) => {
  const [isMobile] = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH})`);
  const { status } = useWallet();
  const address = useAddress() || "";
  const router = useRouter();
  const { proposal, proposalExists } = useProposalApi(id);
  const proposalContract = useProposalClient(id);
  const quorum = useConfig()?.proposal_required_quorum;
  const [addressOpen, setAddressOpen] = useState(false);
  const twitterLink = composeTwitterLink(proposal?.title, id);

  // proposal doesn't exist
  if (proposalExists === false) {
    router.push("/404");
  }

  if (!proposal) {
    return null;
  }

  return isMobile ? (
    <Box>
      <ProposalHeader
        isMobile={isMobile}
        title={proposal.title}
        state={proposal.state}
        twitterLink={twitterLink}
      />
      <ProposalTime
        endTimestamp={proposal.end_timestamp}
        state={proposal.state}
      />
      <ProposalVoteStats
        proposal={proposal}
        quorum={quorum}
        addressOpen={addressOpen}
        onClick={() => setAddressOpen(!addressOpen)}
      />
      <HistoryBox blocks={createHistoryBlocks(proposal)} />
      <DescriptionBox
        address={proposal.submitter}
        description={proposal.description}
      />
      <MsgBox messages={proposal.messages} />
      <DiscussionBox link={proposalContract?.link} />
      <Box mb="3" />
      <VotePower
        id={id}
        address={address}
        status={status}
        totalVotePower={proposal.total_voting_power}
        proposalContract={proposalContract}
      />
    </Box>
  ) : (
    <Box>
      <ProposalHeader
        isMobile={isMobile}
        title={proposal.title}
        state={proposal.state}
        twitterLink={twitterLink}
      />
      <Flex>
        <Flex flexDirection="column" w="66.6%" mr="5">
          <ProposalTime
            endTimestamp={proposal.end_timestamp}
            state={proposal.state}
          />
          <ProposalVoteStats
            proposal={proposal}
            quorum={quorum}
            addressOpen={addressOpen}
            onClick={() => setAddressOpen(!addressOpen)}
          />
          <HistoryBox blocks={createHistoryBlocks(proposal)} />
          <DescriptionBox
            address={proposal.submitter}
            description={proposal.description}
          />
          <MsgBox messages={proposal.messages} />
        </Flex>
        <Flex flexDirection="column" w="33.3%">
          <VotePower
            id={id}
            address={address}
            status={status}
            totalVotePower={proposal.total_voting_power}
            proposalContract={proposalContract}
          />
          <DiscussionBox link={proposalContract?.link} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default GovProposalPage;
