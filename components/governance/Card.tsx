import React, { FC } from "react";
import {
  GridItem,
  Center,
  Flex,
  Box,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import useFinder from "hooks/useFinder";
import { NextLink } from "modules/common";
import { truncateStr } from "modules/common/helpers";
import { getProposalEndDateString } from "modules/governance/helpers";
import { GovernanceProposal } from "types/common";

import ProgressBar from "components/governance/ProgressBar";
import ProgressLabel from "components/governance/ProgressLabel";
import StatusTitle from "components/proposal/StatusTitle";

type Props = {
  proposal: GovernanceProposal;
};

const CardHeader = ({ status, title, endDate }) => {
  const voteTimeLabel = getProposalEndDateString(endDate);

  return (
    <Box h="105px" w="100%">
      <Box pl="5" pt="5">
        <Flex
          justify="space-between"
          fontSize="sm"
          height="24px"
          lineHeight="24px"
        >
          <StatusTitle status={status} />
          <Flex width="170px" bg="brand.dark" pl="2" borderLeftRadius="md">
            <Text color="white.400">{voteTimeLabel[0]}</Text>
            <Text pl="1">{voteTimeLabel[1]}</Text>
          </Flex>
        </Flex>
        <Flex pt="5">{truncateStr(title, 35)}</Flex>
      </Box>
    </Box>
  );
};

const CardBody = ({ voteFor, voteAgainst, quorum }) => {
  return (
    <Box h="150px" w="100%">
      <Flex
        flexDirection="column"
        borderY="1px"
        borderColor="white.100"
        height="100%"
        fontSize="sm"
        p="5"
      >
        <Flex mt="5">
          <ProgressBar
            voteFor={voteFor}
            voteAgainst={voteAgainst}
            quorum={quorum}
          />
        </Flex>
        <ProgressLabel voteFor={voteFor} voteAgainst={voteAgainst} />
      </Flex>
    </Box>
  );
};

const CardFooter = ({ description, address, id }) => {
  const finder = useFinder();

  return (
    <Box flex="1" w="100%">
      <Flex p="5" flexDirection="column" height="100%">
        <Box fontSize="sm" color="white.400" maxH="80px" overflow="hidden">
          {description}
        </Box>
        <Box mt="3" mb="auto" color="white.700" fontSize="sm" title={address}>
          by:{" "}
          <Link href={finder(address)} isExternal>
            {address}
          </Link>
        </Box>
        <Flex justify="center" mb="2">
          <NextLink href={`/governance/proposal/${id}`} passHref>
            <Button
              variant="primarywhite"
              type="button"
              borderRadius="md"
              w="250px"
            >
              View Proposal
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Box>
  );
};

const Card: FC<Props> = ({ proposal }) => {
  return (
    <GridItem h="485px" overflow="hidden">
      <Center
        h="100%"
        flexDirection="column"
        bg="brand.defaultTable"
        borderWidth="2px"
        borderColor="white.100"
        borderRadius="2xl"
      >
        <CardHeader
          status={proposal.status}
          title={proposal.title}
          endDate={proposal.endDate}
        />
        <CardBody voteFor={20} voteAgainst={20} quorum={40} />
        <CardFooter
          description={proposal.description}
          address={proposal.address}
          id={proposal.id}
        />
      </Center>
    </GridItem>
  );
};

export default Card;
