// @ts-nocheck

import { render, screen, within } from "@testing-library/react";
import OtherPools from "components/pool/OtherPools";
import { useAllPools } from "modules/pool";
import { useTokenInfo, useBalances } from "modules/common";
import userEvent from "@testing-library/user-event";

jest.mock("@terra-money/wallet-provider", () => ({
  useWallet: () => ({
    network: {
      name: "foonet",
    },
  }),
}));

jest.mock("hooks/useAddress", () => jest.fn(() => "terra123"));

jest.mock("modules/common", () => {
  const original = jest.requireActual("modules/common");

  return {
    ...original,
    useTokenTooltip: jest.fn(() => []),
    useTokenInfo: jest.fn(),
    useBalances: jest.fn(),
  };
});

jest.mock("modules/pool", () => {
  const original = jest.requireActual("modules/pool");

  return {
    ...original,
    useAllPools: jest.fn(),
    usePoolFee: jest.fn((poolType) => (poolType === "xyk" ? 30 : 5)),
  };
});

const mockPool = (
  contract: string,
  assets: string[],
  apy: number,
  totalLiquidityInUst: number,
  pairType: string,
  favorite: boolean = false
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getSymbol } = useTokenInfo();

  return {
    contract,
    assets,
    rewards: { total: apy },
    totalLiquidityInUst,
    pairType,
    sortingAssets: [
      getSymbol(assets[0] || "").toLowerCase(),
      getSymbol(assets[1] || "").toLowerCase(),
      ...assets,
      contract,
    ],
    favorite,
  };
};

const mockSymbols = (symbolMap: any) => {
  (useTokenInfo as jest.Mock).mockReturnValue({
    getSymbol: (token: string) => symbolMap[token],
    getIcon: () => {},
  });
};

describe("OtherPools", () => {
  describe("user cannot provide any liquidity (does not have both sides of any pool in wallet)", () => {
    beforeEach(() => {
      const getSymbol = (token: string) => {
        const tokens: any = {
          uusd: {
            symbol: "USTC",
          },
          uluna: {
            symbol: "LUNAC",
          },
          terratoken123: {
            symbol: "FOO",
          },
        };

        return tokens[token]?.symbol;
      };

      (useTokenInfo as jest.Mock).mockReturnValue({
        getSymbol,
        getIcon: () => {},
      });

      (useAllPools as jest.Mock).mockReturnValue([
        mockPool("terra123", ["uluna", "uusd"], 0.4242, 200_000_000, "xyk"),
        mockPool(
          "terra456",
          ["terratoken123", "uusd"],
          0.2409,
          1_000_000,
          "xyk"
        ),
        mockPool(
          "terra789",
          ["uluna", "terratoken123"],
          0.07,
          100_000_000,
          "stable"
        ),
      ]);

      (useBalances as jest.Mock).mockReturnValue({
        uusd: 0,
        uluna: 0,
        terratoken123: 0,
      });
    });

    it("renders table with pools sorted by default by total liquidity descending and does not include 'assets not in my wallet' separator", () => {
      render(<OtherPools />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");
      expect(within(headers[1]).getByText("Pool Name")).toBeInTheDocument();
      expect(within(headers[2]).getByText("Combined APR")).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Total Liquidity")
      ).toBeInTheDocument();

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(row1[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row1[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("42.42%");
      expect(within(row1[3]).getByText("200.00M USTC")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[1]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(row2[1]).getByText("(0.05% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row2[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("7.00%");
      expect(within(row2[3]).getByText("100.00M USTC")).toBeInTheDocument();

      const row3 = within(rows[3]).getAllByRole("cell");
      expect(within(row3[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(row3[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row3[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("24.09%");
      expect(
        within(row3[3]).getByText("1,000,000.00 USTC")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("Assets not in my wallet")
      ).not.toBeInTheDocument();
    });

    it("sorts by total liquidity ascending when heading is clicked once (it's sorted descending by default)", async () => {
      render(<OtherPools />);

      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("LUNAC - USTC")).toBeInTheDocument();
    });

    it("removes sort when Total Liquidity heading is clicked thrice (it's sorted descending by default)", async () => {
      render(<OtherPools />);

      await userEvent.click(screen.getByText("Total Liquidity"));
      await userEvent.click(screen.getByText("Total Liquidity"));
      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");
      // This is the order the pools are returned from useAllPools
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNAC")).toBeInTheDocument();
    });

    it("sorts by APR ascending when heading is clicked once", async () => {
      render(<OtherPools />);

      await userEvent.click(screen.getByText("Combined APR"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("LUNAC - USTC")).toBeInTheDocument();
    });

    it("sorts by APR descending when heading is clicked twice", async () => {
      render(<OtherPools />);

      await userEvent.click(screen.getByText("Combined APR"));
      await userEvent.click(screen.getByText("Combined APR"));

      const rows = screen.getAllByRole("row");
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNAC")).toBeInTheDocument();
    });

    it("removes sort when APR heading is clicked thrice", async () => {
      render(<OtherPools />);

      await userEvent.click(screen.getByText("Combined APR"));
      await userEvent.click(screen.getByText("Combined APR"));
      await userEvent.click(screen.getByText("Combined APR"));

      const rows = screen.getAllByRole("row");
      // This is the order the pools are returned from useAllPools
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - LUNAC")).toBeInTheDocument();
    });

    it("only shows matching pools when searching by token name", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "FOO"
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3); // header + 2 matching pools
      expect(within(rows[1]).getByText("FOO - LUNAC")).toBeInTheDocument(); // second token name
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument(); // first token name
    });

    it("only shows matching pools when searching by pool contract address", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "terra456" // matches FOO - USTC pool contract address
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(2); // header + 1 matching pool
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("only shows matching pools when searching by partial pool contract address", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "terra4"
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(2); // header + 1 matching pool
      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument(); // contract address
    });

    it("only shows matching pools when searching by token address", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "terratoken123" // FOO
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3); // header + 2 matching pools
      expect(within(rows[1]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("only shows matching pools when searching by partial token address", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "terratoken" // Only matching token is FOO
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3); // header + 2 matching pools
      expect(within(rows[1]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("does not match pools on latter portion of token address", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "123" // Partial match for FOO token (terratoken123), but query mustC match beginning of address
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(1); // justC header

      expect(screen.getByText("No pools.")).toBeInTheDocument();
    });

    it("does not match beginning of address if query does not begin with 'terra'", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "t" // not enough to match on addresses, but does match all USTC pools
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3); // header + 2 USTC pools
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("matches contract and token addresses with 'terra' query", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "terra" // Matches all addresses
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(4); // header + all 3 pools
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("only shows matching pools when searching by token denom", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "uluna"
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(3); // header + 2 matching pools
      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - LUNAC")).toBeInTheDocument();
    });

    it("shows message when no pools match search query", async () => {
      render(<OtherPools />);

      await userEvent.type(
        screen.getByPlaceholderText("Search Token or Address"),
        "nothing"
      );

      const rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(1); // header

      expect(screen.getByText("No pools.")).toBeInTheDocument();
    });

    it("does not display pagination controls when there's less than one page of pools", () => {
      render(<OtherPools />);

      expect(screen.queryByText("Page")).not.toBeInTheDocument();
    });

    it("displays pagination controls and renders next and previous pages when user clicks button", () => {
      const pools = [];

      for (let i = 0; i < 20; i++) {
        pools.push(
          mockPool("terra123", ["uluna", "uusd"], 0.4242, 200_000_000, "xyk")
        );
      }

      (useAllPools as jest.Mock).mockReturnValue(pools);

      render(<OtherPools />);

      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

      let rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(16); // header + 15 rows on first page

      userEvent.click(screen.getByRole("button", { name: "Go to next page" }));

      rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(6); // header + 5 remaining rows on second page

      userEvent.click(
        screen.getByRole("button", { name: "Go to previous page" })
      );

      rows = screen.getAllByRole("row");
      expect(rows.length).toEqual(16); // header + 15 rows on first page
    });
  });

  describe("user can provide liquidity to some pools", () => {
    beforeEach(() => {
      mockSymbols({
        uusd: "USTC",
        uluna: "LUNAC",
        terratoken1: "FOO",
        terratoken2: "BAR",
      });

      (useAllPools as jest.Mock).mockReturnValue([
        mockPool("terra123", ["uluna", "uusd"], 0.4242, 200_000_000, "xyk"), // LUNAC - USTC
        mockPool("terra456", ["terratoken1", "uusd"], 0.2409, 1_000_000, "xyk"), // BAR - USTC
        mockPool(
          // FOO - LUNA
          "terra789",
          ["uluna", "terratoken1"],
          0.07,
          100_000_000,
          "stable"
        ),
        mockPool("terra678", ["terratoken2", "uusd"], 0.101, 500_000, "xyk"), // BAR - USTC
        mockPool("terra789", ["terratoken1", "terratoken2"], 0, 0, "xyk", true), // FOO - BAR (favorited)
      ]);

      (useBalances as jest.Mock).mockReturnValue({
        uusd: 1_000_000,
        uluna: 1_000_000,
        terratoken1: 0,
        terratoken2: 1_000_000,
      });
    });

    it("renders table grouped by pools user can provide liquidity to, each sorted by default by total liquidity descending (with favorites on top)", () => {
      render(<OtherPools />);

      const rows = screen.getAllByRole("row");

      const headers = within(rows[0]).getAllByRole("columnheader");
      expect(within(headers[1]).getByText("Pool Name")).toBeInTheDocument();
      expect(within(headers[2]).getByText("Combined APR")).toBeInTheDocument();
      expect(
        within(headers[3]).getByText("Total Liquidity")
      ).toBeInTheDocument();

      const row1 = within(rows[1]).getAllByRole("cell");
      expect(within(row1[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(row1[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row1[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("42.42%");
      expect(within(row1[3]).getByText("200.00M USTC")).toBeInTheDocument();

      const row2 = within(rows[2]).getAllByRole("cell");
      expect(within(row2[1]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(within(row2[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row2[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("10.10%");
      expect(within(row2[3]).getByText("500,000.00 USTC")).toBeInTheDocument();

      const row3 = within(rows[3]).getAllByRole("cell");
      expect(
        within(row3[0]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();

      // Favorited pool is displayed first despite it having the lowest total liquidity
      const row4 = within(rows[4]).getAllByRole("cell");
      expect(within(row4[1]).getByText("FOO - BAR")).toBeInTheDocument();
      expect(within(row4[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row4[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("0.00%");
      expect(within(row4[3]).getByText("0.00 USTC")).toBeInTheDocument();

      const row5 = within(rows[5]).getAllByRole("cell");
      expect(within(row5[1]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(row5[1]).getByText("(0.05% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row5[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("7.00%");
      expect(within(row5[3]).getByText("100.00M USTC")).toBeInTheDocument();

      const row6 = within(rows[6]).getAllByRole("cell");
      expect(within(row6[1]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(row6[1]).getByText("(0.30% fee)")).toBeInTheDocument();
      expect(
        // eslint-disable-next-line testing-library/no-node-access
        row6[2].querySelector('p[aria-haspopup="dialog"]').innerHTML
      ).toEqual("24.09%");
      expect(
        within(row6[3]).getByText("1,000,000.00 USTC")
      ).toBeInTheDocument();
    });

    it("sorts pools user can provide liquidity to separately", async () => {
      render(<OtherPools />);

      // Combined APR ascending
      await userEvent.click(screen.getByText("Combined APR"));

      let rows = screen.getAllByRole("row");

      expect(within(rows[1]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(
        within(rows[3]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();
      expect(within(rows[4]).getByText("FOO - BAR")).toBeInTheDocument();
      expect(within(rows[5]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[6]).getByText("FOO - USTC")).toBeInTheDocument();

      // Combined APR descending
      await userEvent.click(screen.getByText("Combined APR"));

      rows = screen.getAllByRole("row");

      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(
        within(rows[3]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();
      expect(within(rows[4]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[5]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[6]).getByText("FOO - BAR")).toBeInTheDocument();
    });

    it("sorts by favorited pools, grouped by 'assets in my wallet', when sort column is removed", async () => {
      render(<OtherPools />);

      // Click Total Liquidity header 3x times to remove it
      await userEvent.click(screen.getByText("Total Liquidity"));
      await userEvent.click(screen.getByText("Total Liquidity"));
      await userEvent.click(screen.getByText("Total Liquidity"));

      const rows = screen.getAllByRole("row");

      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(
        within(rows[3]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();
      expect(within(rows[4]).getByText("FOO - BAR")).toBeInTheDocument(); // Favorited, but not in user's wallet
      expect(within(rows[5]).getByText("FOO - USTC")).toBeInTheDocument();
      expect(within(rows[6]).getByText("FOO - LUNAC")).toBeInTheDocument();
    });

    it("renders divider on first page and not second page when first page contains pools the user can and cannot provide liquidity to", () => {
      const pools = useAllPools() as object[];

      // Add 10 more FOO - LUNAC pools (total 12)
      for (let i = 0; i < 11; i++) {
        pools.push(
          mockPool(
            "terra789",
            ["uluna", "terratoken1"],
            0.07,
            100_000_000,
            "stable"
          )
        );
      }

      (useAllPools as jest.Mock).mockReturnValue(pools);

      render(<OtherPools />);

      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

      let rows = screen.getAllByRole("row");

      expect(rows.length).toEqual(17); // header + divider + 15 rows on first page

      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(
        within(rows[3]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();
      expect(within(rows[4]).getByText("FOO - BAR")).toBeInTheDocument();

      // Remaining rows are the FOO - LUNAC pool
      for (let i = 5; i < 17; i++) {
        expect(within(rows[i]).getByText("FOO - LUNAC")).toBeInTheDocument();
      }

      userEvent.click(screen.getByRole("button", { name: "Go to next page" }));

      // No divider on second page
      expect(
        screen.queryByText("Assets not in my wallet")
      ).not.toBeInTheDocument();

      rows = screen.getAllByRole("row");

      expect(rows.length).toEqual(2); // header + 1 row on second page

      expect(within(rows[1]).getByText("FOO - USTC")).toBeInTheDocument();
    });

    it("renders divider on second page when first page is filled with pools user can provide liquidity to", () => {
      const pools = useAllPools() as object[];

      // Add 14 more LUNAC - USTC pools (total 15)
      for (let i = 0; i < 14; i++) {
        pools.push(
          mockPool("terra123", ["uluna", "uusd"], 0.4242, 200_000_000, "xyk")
        );
      }

      (useAllPools as jest.Mock).mockReturnValue(pools);

      render(<OtherPools />);

      expect(screen.getByText("Page 1 of 2")).toBeInTheDocument();

      let rows = screen.getAllByRole("row");

      expect(rows.length).toEqual(16); // header + 15 rows on first page

      // All rows are the LUNAC - USTC pool
      for (let i = 1; i <= 15; i++) {
        expect(within(rows[i]).getByText("LUNAC - USTC")).toBeInTheDocument();
      }

      // No divider on first page
      expect(
        screen.queryByText("Assets not in my wallet")
      ).not.toBeInTheDocument();

      userEvent.click(screen.getByRole("button", { name: "Go to next page" }));

      rows = screen.getAllByRole("row");

      expect(rows.length).toEqual(6); // header + divider + 5 rows on second page

      expect(within(rows[1]).getByText("BAR - USTC")).toBeInTheDocument();
      expect(
        within(rows[2]).getByText("Assets not in my wallet")
      ).toBeInTheDocument();
      expect(within(rows[3]).getByText("FOO - BAR")).toBeInTheDocument();
      expect(within(rows[4]).getByText("FOO - LUNAC")).toBeInTheDocument();
      expect(within(rows[5]).getByText("FOO - USTC")).toBeInTheDocument();
    });
  });

  describe("user can provide liquidity to all pools", () => {
    beforeEach(() => {
      mockSymbols({
        uusd: "USTC",
        uluna: "LUNAC",
        terratoken1: "FOO",
      });

      (useAllPools as jest.Mock).mockReturnValue([
        mockPool("terra123", ["uluna", "uusd"], 0.4242, 200_000_000, "xyk"), // LUNAC - USTC
        mockPool("terra456", ["terratoken1", "uusd"], 0.2409, 1_000_000, "xyk"), // FOO - USTC
      ]);

      (useBalances as jest.Mock).mockReturnValue({
        uusd: 1_000_000,
        uluna: 1_000_000,
        terratoken1: 1_000_000,
      });
    });

    it("renders all pools sorted by total liquidity descending and no divider", () => {
      render(<OtherPools />);

      const rows = screen.getAllByRole("row");

      expect(within(rows[1]).getByText("LUNAC - USTC")).toBeInTheDocument();
      expect(within(rows[2]).getByText("FOO - USTC")).toBeInTheDocument();

      expect(
        screen.queryByText("Assets not in my wallet")
      ).not.toBeInTheDocument();
    });
  });
});
