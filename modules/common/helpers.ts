import numeral from "numeral";
import { num } from "@arthuryeti/terra";
import { request } from "graphql-request";

import {
  findAsset,
  getTokenDenoms,
  getTokenDenom,
  PairResponse,
  Route,
} from "modules/common";

// const formatPair = (
//   routes: Routes,
//   pair: PairResponse,
//   from: AssetInfo,
//   to: AssetInfo,
// ) => {
//   const [tokenFrom, tokenTo] = getTokenDenoms([from, to]);

//   const prevPairs = routes[tokenFrom] || {};

//   return {
//     [tokenFrom]: {
//       ...prevPairs,
//       [tokenTo]: pair,
//     },
//   };
// };

// export const formatPairsToRoutes = (pairs: PairResponse[]): Routes => {
//   return pairs.reduce((routes, pair) => {
//     const [tokenFirst, tokenSecond] = pair.asset_infos;

//     return {
//       ...routes,
//       ...formatPair(routes, pair, tokenFirst, tokenSecond),
//       ...formatPair(routes, pair, tokenSecond, tokenFirst),
//     };
//   }, {});
// };

export const handleBigPercentage = (
  value: string | number,
  format: string = "0,0a.00",
  numberSuffix: string = "%"
) => {
  if (num(value).gte(100000)) {
    return `> 100K${numberSuffix}`;
  }

  return `${
    numeral(value).format(format).toUpperCase() || (0).toFixed(2)
  }${numberSuffix}`;
};

export const handleBigAndTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeDollarSign: boolean = false,
  includeZero: boolean = false,
  numberPrefix: string = ""
) => {
  if (includeZero && num(value).eq(0)) {
    return `< ${includeDollarSign ? "$" : ""}${numberPrefix}0.01`;
  }

  if (num(value).lt(0.01) && num(value).gt(0)) {
    return `< ${includeDollarSign ? "$" : ""}${numberPrefix}0.01`;
  }

  if (num(value).gt(1000000)) {
    return `${includeDollarSign ? "$ " : ""}${numberPrefix}${numeral(value)
      .format("0.00a", Math.floor)
      .toUpperCase()}`;
  }

  return `${includeDollarSign ? "$ " : ""}${numberPrefix}${numeral(
    value
  ).format(format)}`;
};

export const handleTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false,
  numberPrefix: string = ""
) => {
  const bigNumValue = num(value);

  if (includeZero && bigNumValue.eq(0)) {
    return `< ${numberPrefix}0.01`;
  }

  // not so necessary but also can check if it's positive number -bignumValue.gt()
  if (bigNumValue.lt(0.01)) {
    return `< ${numberPrefix}0.01`;
  }

  return `${numberPrefix}${numeral(value).format(format)}`;
};

export const handleDollarTinyAmount = (
  value: string | number,
  format: string = "0,0.00",
  includeZero: boolean = false
) => {
  return handleTinyAmount(value, format, includeZero, "$ ");
};

// Old Routing Function - Deprecated due to performance issues.
// Every added pair with uusd results in a non-linear increase
// in time it takes for this function to execute.
/*
  export const toRoutes = (
    allPairs: PairResponse[],
    r: PairResponse[],
    parentFrom: string | null,
    parentTo: string | null,
    parentContracts: string[],
    index?: number
  ): Route[] => {
    return r.map((v) => {
      const { contract_addr, asset_infos, pair_type } = v;
      const [token1, token2] = getTokenDenoms(asset_infos);

      const newParentContracts = [...parentContracts, contract_addr];

      const from: string = parentTo ? parentTo : index == 0 ? token1 : token2;
      const to: string = from === token1 ? token2 : token1;

      const children = allPairs
        .filter((pair) => {
          return findAsset(pair.asset_infos, to);
        })
        .filter((pair) => {
          return pair.asset_infos.find((asset) => {
            return (
              getTokenDenom(asset) !== parentFrom &&
              getTokenDenom(asset) !== parentTo
            );
          });
        })
        .filter((pair) => {
          return (
            pair.contract_addr !== contract_addr &&
            !newParentContracts.includes(pair.contract_addr)
          );
        });

      return {
        contract_addr,
        type: Object.keys(pair_type)[0],
        from,
        to,
        children: toRoutes(allPairs, children, from, to, newParentContracts),
      };
    });
  };
*/

// New Routing Function - Stores childRoutes at depth == 0, and so
// the same to:token at depth == 0 will not need to compute over and over.
// Since we have many to:uusd pairs, it will save a lot of time.
export const toRoutes = (
  allPairs: PairResponse[],
  r: PairResponse[],
  parentFrom: string | null,
  parentTo: string | null,
  parentContracts: string[],
  index?: number,
  childRoutes?: { [key: string]: Route[] },
  depth?: number
): Route[] => {
  let routes = [];

  for (let i = 0; i < r.length; i++) {
    const { contract_addr, asset_infos, pair_type } = r[i];
    const [token1, token2] = getTokenDenoms(asset_infos);

    const newParentContracts = [...parentContracts, contract_addr];

    const from: string = parentTo ? parentTo : index == 0 ? token1 : token2;
    const to: string = from === token1 ? token2 : token1;

    const pairType = Object.keys(pair_type)[0];

    if (childRoutes[`${to}.${pairType}`] && depth === 0) {
      let response = {
        contract_addr,
        type: pairType,
        from,
        to,
        children: childRoutes[`${to}.${pairType}`],
      };

      routes.push(response);
      continue;
    }

    const children = allPairs
      .filter((pair) => {
        return findAsset(pair.asset_infos, to);
      })
      .filter((pair) => {
        return pair.asset_infos.find((asset) => {
          return (
            getTokenDenom(asset) !== parentFrom &&
            getTokenDenom(asset) !== parentTo
          );
        });
      })
      .filter((pair) => {
        return (
          pair.contract_addr !== contract_addr &&
          !newParentContracts.includes(pair.contract_addr)
        );
      });

    let response = {
      contract_addr,
      type: pairType,
      from,
      to,
      children: toRoutes(
        allPairs,
        children,
        from,
        to,
        newParentContracts,
        undefined,
        childRoutes,
        depth + 1
      ),
    };

    if (depth === 0) {
      childRoutes[`${to}.${pairType}`] = response.children;
    }

    routes.push(response);
  }

  return routes;
};

export const formatPairsToRoutes = (pairs: PairResponse[]): Route[] => {
  return [
    ...toRoutes(pairs, pairs, null, null, [], 0, {}, 0),
    ...toRoutes(pairs, pairs, null, null, [], 1, {}, 0),
  ];
};

export const isObject = (value: any) => {
  return typeof value === "object";
};

type GetSwapRouteOpts = {
  routes: Route[] | null;
  from: string | null;
  to: string | null;
};

export const getSwapRoute = ({
  routes,
  from,
  to,
}: GetSwapRouteOpts): Route[] | null => {
  let result: Route[] = [];
  let done = false;
  const path: {
    [key: string]: Route[];
  } = {};

  if (routes == null || from == null || to == null) {
    return null;
  }

  function traverse(route: Route, key: string): void {
    route.children.forEach((child) => {
      if (!done) {
        if (child.to === to) {
          //if we found our target push it to the path
          path[key].push(child);
          //set result to the completed path
          result = path[key];
          //set done to true to exit the search
          done = true;
        } else {
          path[key].push(child);

          return traverse(child, key);
        }
      }
    });
    //if we leave our for loop but we are not done that means we failed to find our target
    //in this branch, as a result we need to pop each node out of our path before we return
    if (!done) {
      path[key].pop();
    }
  }

  //set an array of the root nodes of our product tree. These are super-categories that are
  //not saved in the item schema, possibly representing types of items, i.e. different schemas.
  const filteredRoutes = routes.filter((route) => {
    return route.from === from;
  });

  filteredRoutes.forEach((child) => {
    path[child.to] = [child];

    if (child.to === to) {
      //set result to the completed path
      result = path[child.to];
      //set done to true to exit the search
      done = true;

      return;
    }

    traverse(child, child.to);
  });

  return result;
};

export const requestInChunks = async <Item = any, Response = any>(
  chunkSize: number,
  url: string,
  items: Item[],
  queryBuilder: (chunk: Item[]) => string
): Promise<Response> => {
  const totalChunks = Math.ceil(items.length / chunkSize);

  const chunks = await Promise.all(
    Array.from(Array(totalChunks).keys()).map((i) => {
      const chunk = items.slice(i * chunkSize, (i + 1) * chunkSize);

      return request<Response>(url, queryBuilder(chunk));
    })
  );

  return chunks.reduce((all, chunk) => ({ ...all, ...chunk }));
};
