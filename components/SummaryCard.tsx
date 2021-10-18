import React, { FC } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";

import Card from "components/Card";

type Props = {
  data: {
    label: string;
    value: string;
  }[];
};

const SummaryCard: FC<Props> = ({ data }) => {
  return (
    <Card>
      <Flex justify="space-between">
        {data.map((item) => {
          return (
            <Box
              key={item.label}
              _first={{ textAlign: "left" }}
              textAlign="center"
              _last={{ textAlign: "right" }}
            >
              <Text fontWeight="500" fontSize="xl">
                {item.value}
              </Text>
              <Text variant="light">{item.label}</Text>
            </Box>
          );
        })}
      </Flex>
    </Card>
  );
};

export default SummaryCard;