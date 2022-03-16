import { Tokens } from "modules/common";

export type TokenCache = {
  mainnet: Tokens;
  testnet: Tokens;
};

// Any tokens specified here will not be queried for info,
// so all token info (protocol/name, symbol, and decimals)
// must be accurate. icon is optional. If decimals
// are omitted, 6 will be used.
//
// Native token info is never fetched,
// so if a protocol or symbol are desired, the token should
// have an entry here.
const tokenCache: TokenCache = {
  mainnet: {
    terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3: {
      protocol: "Astroport",
      symbol: "ASTRO",
      token: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
      icon: "/tokens/astro.png",
      decimals: 6,
    },
    uluna: {
      protocol: "Terra",
      symbol: "LUNA",
      token: "uluna",
      icon: "https://assets.terra.money/icon/60/Luna.png",
    },
    uusd: {
      protocol: "Terra USD",
      symbol: "UST",
      token: "uusd",
      icon: "https://assets.terra.money/icon/60/UST.png",
    },
    terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76: {
      protocol: "Anchor",
      symbol: "ANC",
      token: "terra14z56l0fp2lsf86zy3hty2z47ezkhnthtr9yq76",
      icon: "https://whitelist.anchorprotocol.com/logo/ANC.png",
      decimals: 6,
    },
    terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n: {
      protocol: "StarTerra",
      symbol: "STT",
      token: "terra13xujxcrc9dqft4p9a8ls0w3j0xnzm6y2uvve8n",
      icon: "https://starterra.io/assets/100x100_starterra.png",
      decimals: 6,
    },
    terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03: {
      protocol: "Orion",
      symbol: "ORION",
      token: "terra1mddcdx0ujx89f38gu7zspk2r2ffdl5enyz2u03",
      icon: "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
      decimals: 8,
    },
    terra100yeqvww74h4yaejj6h733thgcafdaukjtw397: {
      protocol: "Apollo",
      symbol: "APOLLO",
      token: "terra100yeqvww74h4yaejj6h733thgcafdaukjtw397",
      icon: "https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png",
      decimals: 6,
    },
    terra12897djskt9rge8dtmm86w654g7kzckkd698608: {
      protocol: "Nexus",
      symbol: "Psi",
      token: "terra12897djskt9rge8dtmm86w654g7kzckkd698608",
      icon: "https://terra.nexusprotocol.app/assets/psi.png",
      decimals: 6,
    },
    terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5: {
      protocol: "Valkyrie",
      symbol: "VKR",
      token: "terra1dy9kmlm4anr92e42mrkjwzyvfqwz66un00rwr5",
      icon: "https://app.valkyrieprotocol.com/icon_vkr.png",
      decimals: 6,
    },
    terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6: {
      protocol: "Mirror",
      symbol: "MIR",
      token: "terra15gwkyepfc6xgca5t5zefzwy42uts8l2m4g40k6",
      icon: "https://whitelist.mirror.finance/icon/MIR.png",
      decimals: 6,
    },
    terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy: {
      protocol: "Pylon",
      symbol: "MINE",
      token: "terra1kcthelkax4j9x8d3ny6sdag0qmxxynl3qtcrpy",
      icon: "https://assets.pylon.rocks/logo/MINE.png",
      decimals: 6,
    },
    terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp: {
      protocol: "Terra Bonded Luna",
      symbol: "bLUNA",
      token: "terra1kc87mu460fwkqte29rquh4hc20m54fxwtsx7gp",
      icon: "https://whitelist.anchorprotocol.com/logo/bLUNA.png",
      decimals: 6,
    },
    terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk: {
      protocol: "Wormhole Solana",
      symbol: "wSOL",
      token: "terra190tqwgqx7s8qrknz6kckct7v607cu068gfujpk",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/SOL_wh.png",
      decimals: 8,
    },
    terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m: {
      protocol: "Wormhole Avalanche",
      symbol: "wAVAX",
      token: "terra1hj8de24c3yqvcsv9r8chr03fzwsak3hgd8gv3m",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/AVAX_wh.png",
      decimals: 8,
    },
    terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8: {
      protocol: "Wormhole BNB Coin",
      symbol: "wBNB",
      token: "terra1cetg5wruw2wsdjp7j46rj44xdel00z006e9yg8",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/BNB_wh.png",
      decimals: 8,
    },
    terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r: {
      protocol: "Wormhole Ether",
      symbol: "wETH",
      token: "terra14tl83xcwqjy0ken9peu4pjjuu755lrry2uy25r",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/ETH_wh.png",
      decimals: 8,
    },
    terra1dtqlfecglk47yplfrtwjzyagkgcqqngd5lgjp8: {
      protocol: "Wormhole Matic",
      symbol: "wMATIC",
      token: "terra1dtqlfecglk47yplfrtwjzyagkgcqqngd5lgjp8",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/MATICpo_wh.png",
      decimals: 8,
    },
    terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh: {
      protocol: "XDEFI",
      symbol: "XDEFI",
      token: "terra169edevav3pdrtjcx35j6pvzuv54aevewar4nlh",
      icon: "/tokens/xdefi.png",
      decimals: 8,
    },
    terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06: {
      protocol: "Wormhole Eth USDC",
      symbol: "weUSDC",
      token: "terra1pepwcav40nvj3kh60qqgrk8k07ydmc00xyat06",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCet_wh.png",
      decimals: 6,
    },
    terra1e6mq63y64zcxz8xyu5van4tgkhemj3r86yvgu4: {
      protocol: "Wormhole Solana USDC",
      symbol: "wsoUSDC",
      token: "terra1e6mq63y64zcxz8xyu5van4tgkhemj3r86yvgu4",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCso_wh.png",
      decimals: 6,
    },
    terra1pvel56a2hs93yd429pzv9zp5aptcjg5ulhkz7w: {
      protocol: "Wormhole Avax USDC",
      symbol: "wavUSDC",
      token: "terra1pvel56a2hs93yd429pzv9zp5aptcjg5ulhkz7w",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCav_wh.png",
      decimals: 6,
    },
    terra1skjr69exm6v8zellgjpaa2emhwutrk5a6dz7dd: {
      protocol: "Wormhole Binance USD",
      symbol: "wBUSD",
      token: "terra1skjr69exm6v8zellgjpaa2emhwutrk5a6dz7dd",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/BUSDbs_wh.png",
      decimals: 8,
    },
    terra1kkyyh7vganlpkj0gkc2rfmhy858ma4rtwywe3x: {
      protocol: "Wormhole Polygon USDC",
      symbol: "wpoUSDC",
      token: "terra1kkyyh7vganlpkj0gkc2rfmhy858ma4rtwywe3x",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/USDCpo_wh.png",
      decimals: 6,
    },
    terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc: {
      protocol: "Lido Staked LUNA",
      symbol: "stLUNA",
      token: "terra1yg3j2s986nyp5z7r2lvt0hx3r0lnd7kwvwwtsc",
      icon: "https://static.lido.fi/stLUNA/stLUNA.png",
      decimals: 6,
    },
    terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap: {
      protocol: "Wormhole Wrapped stSOL",
      symbol: "wsstSOL",
      token: "terra1t9ul45l7m6jw6sxgvnp8e5hj8xzkjsg82g84ap",
      icon: "https://static.lido.fi/stSOL/stSOL.png",
      decimals: 8,
    },
    terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur: {
      protocol: "Wormhole Wrapped stETH",
      symbol: "wewstETH",
      token: "terra133chr09wu8sakfte5v7vd8qzq9vghtkv4tn0ur",
      icon: "https://static.lido.fi/wstETH/wstETH.png",
      decimals: 8,
    },
    terra178v546c407pdnx5rer3hu8s2c0fc924k74ymnn: {
      protocol: "Nexus bETH",
      symbol: "nETH",
      token: "terra178v546c407pdnx5rer3hu8s2c0fc924k74ymnn",
      icon: "https://terra.nexusprotocol.app/nEth.svg",
      decimals: 6,
    },
    terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j: {
      protocol: "Nexus bLUNA",
      symbol: "nLUNA",
      token: "terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j",
      icon: "https://terra.nexusprotocol.app/nLuna.svg",
      decimals: 6,
    },
    terra1jxypgnfa07j6w92wazzyskhreq2ey2a5crgt6z: {
      protocol: "Wormhole Lido DAO",
      symbol: "weLDO",
      token: "terra1jxypgnfa07j6w92wazzyskhreq2ey2a5crgt6z",
      icon: "https://static.lido.fi/LDO/LDO.png",
      decimals: 8,
    },
    terra1fpfn2kkr8mv390wx4dtpfk3vkjx9ch3thvykl3: {
      protocol: "Wormhole Governance OHM",
      symbol: "wgOHM",
      token: "terra1fpfn2kkr8mv390wx4dtpfk3vkjx9ch3thvykl3",
      icon: "https://assets.coingecko.com/coins/images/21129/large/token_wsOHM_logo.png",
      decimals: 8,
    },
    terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf: {
      protocol: "Orne",
      symbol: "ORNE",
      token: "terra1hnezwjqlhzawcrfysczcxs6xqxu2jawn729kkf",
      icon: "/tokens/orne.png",
      decimals: 6,
    },
    terra1vchw83qt25j89zqwdpmdzj722sqxthnckqzxxp: {
      protocol: "Local Terra Token",
      symbol: "LOCAL",
      token: "terra1vchw83qt25j89zqwdpmdzj722sqxthnckqzxxp",
      icon: "/tokens/local.png",
      decimals: 6,
    },
    terra1vwz7t30q76s7xx6qgtxdqnu6vpr3ak3vw62ygk: {
      protocol: "LUART token",
      symbol: "LUART",
      token: "terra1vwz7t30q76s7xx6qgtxdqnu6vpr3ak3vw62ygk",
      icon: "/tokens/luart.png",
      decimals: 6,
    },
    terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn: {
      protocol: "Kuji",
      symbol: "KUJI",
      token: "terra1xfsdgcemqwxp4hhnyk4rle6wr22sseq7j07dnn",
      icon: "/tokens/kuji.png",
      decimals: 6,
    },
    terra188w26t95tf4dz77raftme8p75rggatxjxfeknw: {
      protocol: "Staked KUJI",
      symbol: "sKUJI",
      token: "terra188w26t95tf4dz77raftme8p75rggatxjxfeknw",
      icon: "/tokens/skuji.png",
      decimals: 6,
    },
    terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n: {
      protocol: "MARS",
      symbol: "MARS",
      token: "terra12hgwnpupflfpuual532wgrxu2gjp0tcagzgx4n",
      icon: "/tokens/mars.png",
      decimals: 6,
    },
    terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr: {
      protocol: "loterra",
      symbol: "LOTA",
      token: "terra1ez46kxtulsdv07538fh5ra5xj8l68mu8eg24vr",
      icon: "/tokens/lota.png",
      decimals: 6,
    },
    terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup: {
      protocol: "Stader LunaX Token",
      symbol: "LunaX",
      token: "terra17y9qkl8dfkeg4py7n0g5407emqnemc3yqk5rup",
      icon: "/tokens/lunax.svg",
      decimals: 6,
    },
    terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun: {
      protocol: "Bonded ETH",
      symbol: "bETH",
      token: "terra1dzhzukyezv0etz22ud940z7adyv7xgcjkahuun",
      icon: "/tokens/bETH.svg",
      decimals: 6,
    },
  },
  testnet: {
    terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x: {
      protocol: "Terra Bonded Luna",
      symbol: "bLUNA",
      token: "terra1u0t35drzyy0mujj8rkdyzhe264uls4ug3wdp3x",
      icon: "https://whitelist.anchorprotocol.com/logo/bLUNA.png",
      decimals: 6,
    },
    terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc: {
      protocol: "Anchor",
      symbol: "ANC",
      token: "terra1747mad58h0w4y589y3sk84r5efqdev9q4r02pc",
      icon: "https://whitelist.anchorprotocol.com/logo/ANC.png",
      decimals: 6,
    },
    terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u: {
      protocol: "Mirror",
      symbol: "MIR",
      token: "terra10llyp6v3j3her8u3ce66ragytu45kcmd9asj3u",
      icon: "https://whitelist.mirror.finance/icon/MIR.png",
      decimals: 6,
    },
    terra1a8hskrwnccq0v7gq3n24nraaqt7yevzy005uf5: {
      protocol: "Valkyrie",
      symbol: "VKR",
      token: "terra1a8hskrwnccq0v7gq3n24nraaqt7yevzy005uf5",
      icon: "https://app.valkyrieprotocol.com/icon_vkr.png",
      decimals: 6,
    },
    terra18nle009rtynpjgleh2975rleu5zts0zdtqryte: {
      protocol: "Nexus",
      symbol: "Psi",
      token: "terra18nle009rtynpjgleh2975rleu5zts0zdtqryte",
      icon: "https://terra.nexusprotocol.app/assets/psi.png",
      decimals: 6,
    },
    terra13qdskca8xavmed88htplse0z396tesgh63tn9r: {
      protocol: "Orion",
      symbol: "ORION",
      token: "terra13qdskca8xavmed88htplse0z396tesgh63tn9r",
      icon: "https://orion.money/assets/ORION-LOGO-2.1-GREEN@256x256.png",
      decimals: 8,
    },
    terra1lqm5tutr5xcw9d5vc4457exa3ghd4sr9mzwdex: {
      protocol: "Pylon",
      symbol: "MINE",
      token: "terra1lqm5tutr5xcw9d5vc4457exa3ghd4sr9mzwdex",
      icon: "https://assets.pylon.rocks/logo/MINE.png",
      decimals: 6,
    },
    terra1a0dx9xeh7sh6amn69zxg35twvdm44cghrlh87d: {
      protocol: "Apollo",
      symbol: "APOLLO",
      token: "terra1a0dx9xeh7sh6amn69zxg35twvdm44cghrlh87d",
      icon: "https://d14knz87alb4l4.cloudfront.net/icons/APOLLO.png",
      decimals: 6,
    },
    terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd: {
      protocol: "Lido Staked LUNA",
      symbol: "stLUNA",
      token: "terra1e42d7l5z5u53n7g990ry24tltdphs9vugap8cd",
      icon: "https://static.lido.fi/stLUNA/stLUNA.png",
      decimals: 6,
    },
    terra1ayee07wl7z965hw20pw75rx2ychgwv5jf5u7cn: {
      protocol: "LDO",
      symbol: "LDO",
      token: "terra1ayee07wl7z965hw20pw75rx2ychgwv5jf5u7cn",
      icon: "https://static.lido.fi/LDO/LDO.png",
      decimals: 8,
    },
    terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls: {
      protocol: "StarTerra",
      symbol: "STT",
      token: "terra1szee0j4m8c75etfs9le9tepa4mc80t3vpf72ls",
      icon: "https://starterra.io/assets/100x100_starterra.png",
      decimals: 6,
    },
    terra186tpamwvve5c7dhymrmk2r3zz3ynnurhupd7p9: {
      protocol: "xDEFI",
      symbol: "XDEFI",
      token: "terra186tpamwvve5c7dhymrmk2r3zz3ynnurhupd7p9",
      icon: "/tokens/xdefi.png",
      decimals: 8,
    },
    terra1hp84qsfk6qv0x2en8hdul3370a79qk90e59a5v: {
      protocol: "Wormhole Wrapped stETH",
      symbol: "wewstETH",
      token: "terra1hp84qsfk6qv0x2en8hdul3370a79qk90e59a5v",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/stETH_wh.png",
      decimals: 8,
    },
    terra1lty87kmhht8hr0q5w62uszhs2sk85evwtyv6hy: {
      protocol: "Wormhole Wrapped stSOL",
      symbol: "wsstSOL",
      token: "terra1lty87kmhht8hr0q5w62uszhs2sk85evwtyv6hy",
      icon: "https://raw.githubusercontent.com/certusone/wormhole-token-list/main/assets/SOL_wh.png",
      decimals: 8,
    },
    terra1em8dvzln8quptj9tuptf8tu73jyuv5jn6kqdwv: {
      protocol: "Nexus bETH",
      symbol: "nETH",
      token: "terra1em8dvzln8quptj9tuptf8tu73jyuv5jn6kqdwv",
      icon: "https://terra.nexusprotocol.app/nEth.svg",
      decimals: 6,
    },
    terra1gzq2zd4skvnvgm2z48fdp0mxy2djmtk7sz4uhe: {
      protocol: "Nexus bLUNA",
      symbol: "nLUNA",
      token: "terra1gzq2zd4skvnvgm2z48fdp0mxy2djmtk7sz4uhe",
      icon: "https://terra.nexusprotocol.app/nLuna.svg",
      decimals: 6,
    },
    terra1azu2frwn9a4l6gl5r39d0cuccs4h7xlu9gkmtd: {
      protocol: "Kujira",
      symbol: "KUJI",
      token: "terra1azu2frwn9a4l6gl5r39d0cuccs4h7xlu9gkmtd",
      icon: "https://assets.kujira.app/kuji.png",
      decimals: 6,
    },
    terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5: {
      protocol: "Astroport",
      symbol: "ASTRO",
      token: "terra1jqcw39c42mf7ngq4drgggakk3ymljgd3r5c3r5",
      icon: "/tokens/astro.png",
      decimals: 6,
    },
    terra1nlyd0f9mhuy5gsm6vsql5wx6avmqc8g7hz87np: {
      protocol: "Astroport",
      symbol: "xASTRO",
      token: "terra1nlyd0f9mhuy5gsm6vsql5wx6avmqc8g7hz87np",
      icon: "/tokens/xAstro.png",
      decimals: 6,
    },
    uluna: {
      protocol: "Terra",
      symbol: "LUNA",
      token: "uluna",
      icon: "https://assets.terra.money/icon/60/Luna.png",
    },
    uusd: {
      protocol: "Terra USD",
      symbol: "UST",
      token: "uusd",
      icon: "https://assets.terra.money/icon/60/UST.png",
    },
    terra182zp52a95r3qg6lt0njxr7l0ujkfwan5h7t3l6: {
      protocol: "Orne",
      symbol: "ORNE",
      token: "terra182zp52a95r3qg6lt0njxr7l0ujkfwan5h7t3l6",
      icon: "/tokens/orne.png",
      decimals: 6,
    },
    terra1j5xyaw8pjg665juf4rwgtn6wvkrvph3lzvwzer: {
      protocol: "Local Terra Token",
      symbol: "LOCAL",
      token: "terra1j5xyaw8pjg665juf4rwgtn6wvkrvph3lzvwzer",
      icon: "/tokens/local.png",
      decimals: 6,
    },
    terra16t7x97wuckxm5h927jygjfrt3tcwrzh3u2rlqm: {
      protocol: "Sayve",
      symbol: "SAYVE",
      token: "terra16t7x97wuckxm5h927jygjfrt3tcwrzh3u2rlqm",
      icon: "/tokens/sayve.png",
      decimals: 6,
    },
    terra1qqaufxewaygpcnc7er0x02wl03f0wanz65v0ya: {
      protocol: "Governance OHM",
      symbol: "gOHM",
      token: "terra1qqaufxewaygpcnc7er0x02wl03f0wanz65v0ya",
      icon: "https://assets.coingecko.com/coins/images/21129/large/token_wsOHM_logo.png",
      decimals: 8,
    },
    terra1xgadan68ufnd0am08xd2vurqmz0wayctexv5fh: {
      protocol: "gOHM reward token",
      symbol: "rgOHM",
      token: "terra1xgadan68ufnd0am08xd2vurqmz0wayctexv5fh",
      icon: "/tokens/default.png",
      decimals: 6,
    },
  },
};

export default tokenCache;
