import React, { FC } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { TerraWebappProvider } from "@arthuryeti/terra";
import { useWallet, WalletStatus } from "@terra-money/wallet-provider";

import Navbar from "components/Navbar";
import whitelist from "constants/whitelist";
import { AstroswapProvider } from "modules/common";

const GlobalStyles = css`
  html, body {
    height: 100%;
    width: 100%;
    position: relative;
  }
  body {
    background-color: #000D37;
  }
  *::-webkit-scrollbar: {
    width: 6px;
    height: 6px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: #5643F2;
    border-radius: 6px;
  }
  #chakra-toast-manager-bottom-right {
    right: 32px !important;
    bottom: 32px !important;
  }
  #chakra-toast-manager-top-right {
    top: 64px !important;
    right: "32px !important;
  }
  @font-face {
    font-family: WhyteInktrap;
    src: url('/WhyteInktrap-Regular.woff') format('woff');
  }
  @font-face {
    font-family: "Roboto Mono";
    src: url('/RobotoMono-Regular.ttf') format('ttf');
  }
`;

const Layout: FC = ({ children }) => {
  const wallet = useWallet();
  const isInitializing = wallet.status == WalletStatus.INITIALIZING;

  return (
    <Flex height="100vh" direction="column">
      <Global styles={GlobalStyles} />
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
