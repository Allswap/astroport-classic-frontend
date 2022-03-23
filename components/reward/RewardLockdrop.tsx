import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import numeral from "numeral";

import { useContracts } from "modules/common";
import { usePhase1Rewards, usePhase2Rewards } from "modules/reward";
import { useOneTimeLockdropRewards } from "modules/lockdrop";

import RewardLineItem from "components/reward/RewardLineItem";

const RewardLockdrop: FC = () => {
  const { astroToken } = useContracts();
  const phase1Rewards = usePhase1Rewards();
  const phase2Rewards = usePhase2Rewards();
  const total = useOneTimeLockdropRewards();

  return (
    <Box mb="6">
      {total > 0 && (
        <Box mt={6}>
          <Text textStyle="minibutton" fontSize="xs">
            Your ASTRO Rewards
          </Text>
        </Box>
      )}

      {phase1Rewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase1Rewards}
            desc="ASTRO from Phase 1"
          />
        </Box>
      )}

      {phase2Rewards > 0 && (
        <Box mt={4}>
          <RewardLineItem
            token={astroToken}
            amount={phase2Rewards}
            desc="ASTRO from Phase 2"
          />
        </Box>
      )}
    </Box>
  );
};

export default RewardLockdrop;
