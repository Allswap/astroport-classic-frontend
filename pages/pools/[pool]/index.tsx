import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Flex } from "@chakra-ui/react";

import Pool from "components/pages/Pool";
import { useAstroswap } from "modules/common";
import HideOnMobile from "components/common/HideOnMobile";

const PoolPage: NextPage = () => {
  const { query } = useRouter();
  const { pools } = useAstroswap();

  const pool =
    pools &&
    pools.find(({ pool_address }) => {
      return query["pool"] === pool_address;
    });

  return (
    <HideOnMobile>
      <Head>
        <title>Astroport</title>
      </Head>
      <Flex>{pool != null && <Pool pool={pool} />}</Flex>
    </HideOnMobile>
  );
};

export default PoolPage;