import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { TerraWebappProvider } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import { AstroswapProvider } from "modules/common";
import whitelist from "constants/whitelist";

import Navbar from "components/Navbar";

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  return (
    <Flex height="100vh" direction="column">
      <Global
        styles={{
          "html,body": {
            height: "100%",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          },
          body: {
            backgroundColor: "#000D37",
          },
          "*::-webkit-scrollbar": {
            width: "6px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#5643F2",
            borderRadius: "6px",
          },
          "#chakra-toast-manager-bottom-right": {
            right: "32px!important",
            bottom: "32px!important",
          },
          "#chakra-toast-manager-top-right": {
            top: "64px!important",
            right: "32px!important",
          },
          "@font-face": {
            fontFamily: "WhyteInktrap",
            src: "url('/WhyteInktrap-Regular.woff') format('woff')",
          },
        }}
      />
      {!isInitializing && (
        <TerraWebappProvider
        // config={{
        //   lcdClientUrl:
        //     "https://terra-testnet-lcd.everstake.one/3WwtQlaFdSV3XHqGqkGFUX7terraTest",
        // }}
        >
          <AstroswapProvider data={whitelist}>
            <Navbar />
            <Box flex="1">{children}</Box>
          </AstroswapProvider>
        </TerraWebappProvider>
      )}
    </Flex>
  );
};

export default Layout;
