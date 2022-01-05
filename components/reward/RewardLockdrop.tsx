import React, { FC } from "react";
import { Box, Text, Flex, VStack } from "@chakra-ui/react";
import numeral from "numeral";

import { useContracts } from "modules/common";
import {
  usePhase1Rewards,
  usePhase2Rewards,
  useTotalRewardValue,
} from "modules/reward";
import { useAirdropBalance, useAirdrop2Balance } from "modules/airdrop";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardLockdrop: FC = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const airdropBalance = useAirdropBalance();
  const airdrop2Balance = useAirdrop2Balance();
  const airdrop = numeral(airdropBalance)
    .add(airdrop2Balance)
    .format("0,0.000000");
  const phase1 = numeral(phase1Rewards).format("0,0.000000");
  const phase2 = numeral(phase2Rewards).format("0,0.000000");
  const total = useTotalRewardValue();
  const formatted = numeral(total).format("0,0.000000");

  return (
    <Box mb="6">
      <Flex justify="space-between" align="flex-start">
        <Text textStyle="minibutton" fontSize="xs">
          Total Rewards
        </Text>
        <VStack align="flex-end" spacing={1} ml="8">
          <Text textStyle="h3" lineHeight="1">
            {formatted} ASTRO
          </Text>
          <Text textStyle="small" variant="dimmed">
            Unclaimed Balance
          </Text>
        </VStack>
      </Flex>

      {total > 0 && (
        <Box mt={6}>
          <Text textStyle="minibutton" fontSize="xs">
            Your ASTRO Rewards
          </Text>
        </Box>
      )}

      {airdropBalance + airdrop2Balance > 0 && (
        <Box mt={6}>
          <RewardLineItem
            token={astroToken}
            amount={airdrop}
            desc="ASTRO from Airdrop"
          />
        </Box>
      )}

      {phase1Rewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase1}
            desc="ASTRO from Phase 1"
          />
        </Box>
      )}

      {phase2Rewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase2}
            desc="ASTRO from Phase 2"
          />
        </Box>
      )}
    </Box>
  );
};

export default RewardLockdrop;