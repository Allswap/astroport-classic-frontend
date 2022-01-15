import React, { FC } from "react";
import numeral from "numeral";
import {
  useDisclosure,
  Text,
  Popover,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
  Flex,
} from "@chakra-ui/react";
import { Apy } from "modules/pool";

type Props = {
  apy: Apy;
  rewardToken: string;
};

const ApyPopover: FC<Props> = ({ apy, rewardToken, children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const rows = [
    { label: "Pool APY", value: numeral(apy.pool * 100).format("0.00") },
    {
      label: "Astro Generator APY",
      value: numeral(apy.astro * 100).format("0.00"),
    },
    rewardToken && {
      label: `${rewardToken} Reward  APY`,
      value: numeral(apy.protocol * 100).format("0.00"),
    },
    { label: "Total APY", value: numeral(apy.total * 100).format("0.00") },
  ].filter(Boolean);

  return (
    <Popover
      placement="bottom-start"
      isOpen={isOpen && apy.total > 0}
      onOpen={onOpen}
      onClose={onClose}
      trigger="hover"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        paddingX="12px"
        paddingY="12px !important"
        bg="#0c516d"
        borderColor="rgba(255, 255, 255, 0.1)"
        border="2px"
        borderRadius="4px"
        boxShadow="4px 4px 10px rgba(0, 13, 55, 0.5)"
      >
        <PopoverBody border={2}>
          {rows.map((row) => (
            <Flex key={row.label}>
              <Text flex={1} fontSize="xs" color="#fff">
                {row.label}
              </Text>
              <Text
                pl="2"
                w="16"
                align="right"
                fontSize="xs"
                color="rgba(255, 255, 255, 0.6)"
              >
                {row.value}%
              </Text>
            </Flex>
          ))}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ApyPopover;