import React, { ReactNode, useMemo } from "react";
import { Box, BoxProps, Button, Flex } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { Point } from "chart.js";
import { ISelect, IButton } from "types/common";

import { getGraphConfig } from "libs/graphConfig";
import GraphSelector from "./GraphSelector";

type Props = {
  points: Point[];
  leftButtonsGroup?: IButton[];
  rightButtonsGroup?: IButton[];
  select?: ISelect;
  title?: ReactNode;
} & BoxProps;

const Chart: React.FC<Props> = (props) => {
  const { points, leftButtonsGroup, rightButtonsGroup, select, title } = props;
  const [chartData, chartOptions] = useMemo(
    () => getGraphConfig(points),
    [points]
  );

  return (
    <Flex direction="column" w="100%">
      <Flex justify="space-between" align="center" mb="6">
        <Box>{select && <GraphSelector {...select} />}</Box>

        <Box>{title}</Box>
      </Flex>

      <Flex justify="flex-end" align="center" mb="6" px="2">
        <Flex w="100%" justify="space-between">
          {leftButtonsGroup && (
            <Flex gridGap="1">
              {leftButtonsGroup.map((button) => (
                <Button
                  key={button.type}
                  variant="filter"
                  onClick={button.onClick}
                  isActive={button.isActive}
                >
                  {button.title}
                </Button>
              ))}
            </Flex>
          )}

          {rightButtonsGroup && (
            <Flex gridGap="1">
              {rightButtonsGroup.map((button) => (
                <Button
                  key={button.type}
                  variant="filter"
                  onClick={button.onClick}
                  isActive={button.isActive}
                >
                  {button.title}
                </Button>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>

      <Box w="100%" {...props}>
        {/* @ts-expect-error */}
        <Line data={chartData} options={chartOptions} />
      </Box>
    </Flex>
  );
};

export default Chart;
