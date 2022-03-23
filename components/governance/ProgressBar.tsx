import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { handleTinyAmount } from "modules/common";

// min value to display quorum UI on progress bar
const QuorumMinPosition = 2;

// hide left tooltip value
const QuorumHideLeftToolTip = 5;

type ProgressElements = {
  voteFor: number;
  voteAgainst: number;
  quorum: number | null;
  height?: number;
};

type BarValues = {
  value: number;
  color: string;
};

type QuorumTipProps = {
  quorum: number;
};

const LeftFixedTip = () => {
  return (
    <>
      <Text
        pos="absolute"
        top="-20px"
        left="0"
        color="whiteAlpha.600"
        fontSize="xs"
      >
        0%
      </Text>
    </>
  );
};

const RightFixedTip = () => {
  return (
    <>
      <Text
        pos="absolute"
        top="-20px"
        right="0"
        color="whiteAlpha.600"
        fontSize="xs"
      >
        100%
      </Text>
    </>
  );
};

const QuorumFixedTip: FC<QuorumTipProps> = ({ quorum }) => {
  const leftPosition = `${
    quorum > QuorumMinPosition ? quorum : QuorumMinPosition
  }%`;

  return (
    <>
      <Flex
        pos="absolute"
        top="-20px"
        left={leftPosition}
        pl="2"
        color="whiteAlpha.600"
        bg="brand.defaultTable"
        zIndex="1"
        p="0"
        fontSize="xs"
      >
        <Text>Quorum</Text>
        <Text pl="1" color="white">
          {handleTinyAmount(quorum)}%
        </Text>
      </Flex>
    </>
  );
};

const QuorumSplit: FC<QuorumTipProps> = ({ quorum }) => {
  const leftPosition = `calc(${
    quorum > QuorumMinPosition ? quorum : QuorumMinPosition
  }% - 4px)`;

  return (
    <Box
      pos="absolute"
      w="8px"
      h="100%"
      left={leftPosition}
      bg="blackAlpha.500"
      zIndex="2"
      borderRadius={quorum < QuorumMinPosition ? "xl" : null}
    >
      <Box
        pos="absolute"
        w="2px"
        top="-3px"
        left="3px"
        height="calc(100% + 6px)"
        bg="white"
        borderRadius="sm"
      />
    </Box>
  );
};

const createBars = (bars: BarValues[]) => {
  let offset = 0;
  let newBars = [] as any[];

  bars.forEach((bar, i) => {
    const borderRadius =
      i == 0
        ? "40px 0 0 40px"
        : i === bars.length - 1
        ? "0 40px 40px 0"
        : "0 0 0 0";

    newBars.push(
      <Box
        key={i}
        pos="absolute"
        top="0"
        left={`${offset}%`}
        width={`${bar.value}%`}
        bg={bar.color}
        height="100%"
        borderRadius={borderRadius}
      />
    );

    offset += bar.value;
  });

  return newBars;
};

const ProgressBar: FC<ProgressElements> = ({
  voteFor,
  voteAgainst,
  quorum,
  height = 40,
}) => {
  const bars = [
    { value: voteFor, color: "green.500" },
    { value: voteAgainst, color: "red.500" },
  ];

  return (
    <Box pos="relative" width="100%" height={`${height}px`}>
      {(quorum > QuorumHideLeftToolTip || !quorum) && <LeftFixedTip />}
      <RightFixedTip />
      {quorum && <QuorumFixedTip quorum={quorum} />}
      <Box
        pos="relative"
        bg="blackAlpha.500"
        mt="10px"
        borderRadius="full"
        width="100%"
        height={`${height - 20}px`}
      >
        {quorum && <QuorumSplit quorum={quorum} />}
        {createBars(bars).map((element, i) => (
          <Box key={i}>{element}</Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProgressBar;
