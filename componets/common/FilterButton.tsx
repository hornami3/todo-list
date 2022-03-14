import { Button } from "@chakra-ui/react";

interface Props {
  text: string;
  isActive: boolean;
  onClick?: () => void;
}

const FilterButton = ({ text, isActive, onClick }: Props) => {
  return (
    <Button
      variant="unstyled"
      transition="none"
      minWidth="auto"
      borderRadius={0}
      borderBottomWidth={3}
      borderColor="transparent"
      _focus={{
        boxShadow: "none",
      }}
      _active={{
        color: "blue.400",
        borderColor: "blue.400",
      }}
      _hover={{
        color: "blue.400",
        borderColor: "blue.400",
      }}
      isActive={isActive}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default FilterButton;
