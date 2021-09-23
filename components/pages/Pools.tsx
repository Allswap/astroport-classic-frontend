import React, { FC } from "react";
import { Box, Heading } from "@chakra-ui/react";

import { usePools } from "modules/pool";

import PoolsOverview from "components/pool/PoolsOverview";
import PoolList from "components/pool/PoolList";
import Card from "components/Card";

const Pools: FC = () => {
  const pools = usePools();

  return (
    <Box w="container.xl" m="0 auto" pt="12">
      <Box px="6" mb="4">
        <Heading variant="brand">Pools Overview</Heading>
      </Box>
      <PoolsOverview />

      <Box px="6" mb="4" mt="12">
        <Heading variant="brand">My Pools</Heading>
      </Box>
      {pools.mine && (
        <Card noPadding>
          <PoolList items={pools.mine} />
        </Card>
      )}

      <Box px="6" mb="4" mt="12">
        <Heading variant="brand">All Pools</Heading>
      </Box>
      {pools.all && (
        <Card noPadding>
          <PoolList items={pools.all} />
        </Card>
      )}
    </Box>
  );
};

export default Pools;
