import { Tokens } from "modules/common";

export type TokenCache = {
  "phoenix-1": Tokens;
  "pisco-1": Tokens;
  "columbus-5": Tokens;
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
  "phoenix-1": {},
  "pisco-1": {},
  "columbus-5": {
    terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3: {
      protocol: "Astroport Classic",
      symbol: "ASTROC",
      token: "terra1xj49zyqrwpv5k928jwfpfy2ha668nwdgkwlrg3",
      icon: "/tokens/astro.png",
      decimals: 6,
    },
    terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7: {
      protocol: "Astroport Classic",
      symbol: "xASTROC",
      token: "terra14lpnyzc9z4g3ugr4lhm8s4nle0tq8vcltkhzh7",
      icon: "/tokens/xAstro.png",
      decimals: 6,
    },
    uluna: {
      protocol: "Terra Classic",
      symbol: "LUNAC",
      token: "uluna",
      icon: "https://assets.terra.money/icon/60/Luna.png",
    },
    uusd: {
      protocol: "Terra USD Classic",
      symbol: "USTC",
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
      symbol: "bLUNAC",
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
      icon: "/tokens/avax.png",
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
      protocol: "Lido Staked LUNAC",
      symbol: "stLUNAC",
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
      protocol: "Nexus bLUNAC",
      symbol: "nLUNAC",
      token: "terra10f2mt82kjnkxqj2gepgwl637u2w4ue2z5nhz5j",
      icon: "/tokens/bLuna.svg",
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
      icon: "/tokens/wgohm.png",
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
    terra1a04v570f9cxp49mk06vjsm8axsswndpwwt67k4: {
      protocol: "MARS",
      symbol: "xMARS",
      token: "terra1a04v570f9cxp49mk06vjsm8axsswndpwwt67k4",
      icon: "/tokens/xMARS.svg",
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
      symbol: "LunaXC",
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
    terra14v9wrjs55qsn9lkvylsqela3w2ytwxzkycqzcr: {
      protocol: "Sayve",
      symbol: "SAYVE",
      token: "terra14v9wrjs55qsn9lkvylsqela3w2ytwxzkycqzcr",
      icon: "/tokens/sayve.png",
      decimals: 6,
    },
    terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw: {
      protocol: "Prism",
      symbol: "PRISM",
      token: "terra1dh9478k2qvqhqeajhn75a2a7dsnf74y5ukregw",
      icon: "/tokens/prism.png",
      decimals: 6,
    },
    terra1042wzrwg2uk6jqxjm34ysqquyr9esdgm5qyswz: {
      protocol: "Prism Governance Token",
      symbol: "xPRISM",
      token: "terra1042wzrwg2uk6jqxjm34ysqquyr9esdgm5qyswz",
      icon: "/tokens/xPRISM.svg",
      decimals: 6,
    },
    terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu: {
      protocol: "Anchor Terra USD",
      symbol: "aUSTC",
      token: "terra1hzh9vpxhsk8253se0vv5jj6etdvxu3nv8z07zu",
      icon: "/tokens/aUST.png",
      decimals: 6,
    },
    terra1z3e2e4jpk4n0xzzwlkgcfvc95pc5ldq0xcny58: {
      protocol: "Wormhole wasAVAX",
      symbol: "wasAVAX",
      token: "terra1z3e2e4jpk4n0xzzwlkgcfvc95pc5ldq0xcny58",
      icon: "/tokens/wasAVAX.png",
      decimals: 8,
    },
    terra13zaagrrrxj47qjwczsczujlvnnntde7fdt0mau: {
      protocol: "Prism cLuna",
      symbol: "cLunaC",
      token: "terra13zaagrrrxj47qjwczsczujlvnnntde7fdt0mau",
      icon: "/tokens/cLUNA.svg",
      decimals: 6,
    },
    terra1tlgelulz9pdkhls6uglfn5lmxarx7f2gxtdzh2: {
      protocol: "Prism pLuna",
      symbol: "pLunaC",
      token: "terra1tlgelulz9pdkhls6uglfn5lmxarx7f2gxtdzh2",
      icon: "/tokens/pLUNA.svg",
      decimals: 6,
    },
    terra17wkadg0tah554r35x6wvff0y5s7ve8npcjfuhz: {
      protocol: "Prism yLuna",
      symbol: "yLunaC",
      token: "terra17wkadg0tah554r35x6wvff0y5s7ve8npcjfuhz",
      icon: "/tokens/yLUNA.svg",
      decimals: 6,
    },
    terra1mt2ytlrxhvd5c4d4fshxxs3zcus3fkdmuv4mk2: {
      protocol: "Bro",
      symbol: "BRO",
      token: "terra1mt2ytlrxhvd5c4d4fshxxs3zcus3fkdmuv4mk2",
      icon: "/tokens/bro.svg",
      decimals: 6,
    },
    "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B": {
      protocol: "Osmosis",
      symbol: "OSMO",
      token:
        "ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B",
      icon: "/tokens/osmo.png",
      decimals: 6,
    },
    "ibc/EB2CED20AB0466F18BE49285E56B31306D4C60438A022EA995BA65D5E3CF7E09": {
      protocol: "Secret",
      symbol: "SCRT",
      token:
        "ibc/EB2CED20AB0466F18BE49285E56B31306D4C60438A022EA995BA65D5E3CF7E09",
      icon: "/tokens/secret.png",
      decimals: 6,
    },
    "ibc/18ABA66B791918D51D33415DA173632735D830E2E77E63C91C11D3008CFD5262": {
      protocol: "Cosmos",
      symbol: "ATOM",
      token:
        "ibc/18ABA66B791918D51D33415DA173632735D830E2E77E63C91C11D3008CFD5262",
      icon: "/tokens/atom.png",
      decimals: 6,
    },
    terra1g53pyke8jtmt4lwvk4yl0xaqc4u0qlsl8dz3ex: {
      protocol: "Synthetic UST token",
      symbol: "kUSTC",
      token: "terra1g53pyke8jtmt4lwvk4yl0xaqc4u0qlsl8dz3ex",
      icon: "/tokens/kUST.svg",
      decimals: 6,
    },
    terra1yeyr6taynkwdl85ppaggr3zr8txhf66cny2ang: {
      protocol: "Kinetic Token",
      symbol: "KNTC",
      token: "terra1yeyr6taynkwdl85ppaggr3zr8txhf66cny2ang",
      icon: "/tokens/kinetic.svg",
      decimals: 6,
    },
    terra18zqcnl83z98tf6lly37gghm7238k7lh79u4z9a: {
      protocol: "Bonded ATOM",
      symbol: "bATOM",
      token: "terra18zqcnl83z98tf6lly37gghm7238k7lh79u4z9a",
      icon: "/tokens/bATOM.svg",
      decimals: 6,
    },
    terra1ustvnmngueq0p4jd7gfnutgvdc6ujpsjhsjd02: {
      protocol: "Wormhole:Stader",
      symbol: "whSD",
      token: "terra1ustvnmngueq0p4jd7gfnutgvdc6ujpsjhsjd02",
      icon: "/tokens/whSD.png",
      decimals: 8,
    },
    terra17n223dxpkypc5c48la7aqjvverczg82ga3cr93: {
      protocol: "Reactor Token",
      symbol: "RCT",
      token: "terra17n223dxpkypc5c48la7aqjvverczg82ga3cr93",
      icon: "/tokens/rct.png",
      decimals: 6,
    },
    terra1rl4zyexjphwgx6v3ytyljkkc4mrje2pyznaclv: {
      protocol: "Steak Token",
      symbol: "STEAK",
      token: "terra1rl4zyexjphwgx6v3ytyljkkc4mrje2pyznaclv",
      icon: "/tokens/steak.png",
      decimals: 6,
    },
    terra1cdc6nlsx0l6jmt3nnx7gxjggf902wge3n2z76k: {
      protocol: "FanFury",
      symbol: "FURY",
      token: "terra1cdc6nlsx0l6jmt3nnx7gxjggf902wge3n2z76k",
      icon: "/tokens/fanfury.svg",
      decimals: 6,
    },
    terra1mpq5zkkm39nmjrjg9raknpfrfmcfwv0nh0whvn: {
      protocol: "Nebula Token",
      symbol: "NEB",
      token: "terra1mpq5zkkm39nmjrjg9raknpfrfmcfwv0nh0whvn",
      icon: "/tokens/neb.png",
      decimals: 6,
    },
    terra1wvk6r3pmj0835udwns4r5e0twsclvcyuq9ucgm: {
      protocol: "Eris Amplified LUNC",
      symbol: "ampLUNC",
      token: "terra1wvk6r3pmj0835udwns4r5e0twsclvcyuq9ucgm",
      icon: "/tokens/ampLunc.svg",
      decimals: 6,
    },
  },
};

export default tokenCache;
