import React, { FC, useState } from "react";
import {
  chakra,
  Box,
  Link,
  Flex,
  VStack,
  Text,
  Button,
  Checkbox,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Card from "components/Card";

type Props = {
  onConfirmClick: () => void;
};

const MotionBox = motion(Box);

const AstroportDisclaimer: FC<Props> = ({ onConfirmClick }) => {
  const [checkedItems, setCheckedItems] = useState<[boolean, boolean]>([
    false,
    false,
  ]);
  const allChecked = checkedItems.every(Boolean);

  return (
    <MotionBox
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      maxW="470px"
      m="0 auto"
      px="4"
      my={[8, 10]}
    >
      <Card>
        <Flex justify="space-between" align="center" mt={[2, 0]} mb={[4, 6]}>
          <Text fontSize={["md", "lg"]} color="red.500">
            Disclaimer
          </Text>
        </Flex>

        <Text fontSize={["xs", "sm"]} mt={[4, 6]}>
          <chakra.span opacity={0.6}>
            Please check the boxes below to confirm your agreement to the{" "}
          </chakra.span>
          <Link
            href="https://astroport.fi/terms-and-conditions"
            color="brand.lightPurple"
            isExternal
          >
            Astroport Terms and Conditions
          </Link>
        </Text>

        <VStack mt={[6, 8]} pl={[2, 4]} spacing={[4, 6]}>
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt={[0, 2]}
            isChecked={checkedItems[0]}
            onChange={(e) =>
              setCheckedItems([e.target.checked, checkedItems[1]])
            }
          >
            <Text fontSize={["xs", "sm"]} ml={[3, 4]} fontWeight="medium">
              I have read and understood, and do hereby agree to be legally
              bound as a ‘User’ under, the Terms, including all future
              amendments thereto. Such agreement is irrevocable and will apply
              to all of my uses of the Site without me providing confirmation in
              each specific instance.
            </Text>
          </Checkbox>
          <Checkbox
            colorScheme="green"
            alignItems="flex-start"
            pt={[0, 2]}
            isChecked={checkedItems[1]}
            onChange={(e) =>
              setCheckedItems([checkedItems[0], e.target.checked])
            }
          >
            <Text fontSize={["xs", "sm"]} ml={[3, 4]} fontWeight="medium">
              I acknowledge and agree that the Site solely provides information
              about data on the Terra blockchain. I accept that the Site
              operators have no custody over my funds, ability or duty to
              transact on my behalf or power to reverse my transactions. The
              Site operators do not endorse or provide any warranty with respect
              to any tokens.
            </Text>
          </Checkbox>
        </VStack>

        <Flex flexDir="column" align="center" mt={[6, 8]} mb="4">
          <Button
            variant="primary"
            minW="64"
            size="sm"
            type="submit"
            isDisabled={!allChecked}
            onClick={onConfirmClick}
          >
            Confirm
          </Button>
        </Flex>
      </Card>
    </MotionBox>
  );
};

export default AstroportDisclaimer;
