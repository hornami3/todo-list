import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import Select, { SingleValue } from "react-select";
import { Priority } from "../enums/Priority.enum";
import CircleIcon from "./common/CircleIcon";

const options = [
  {
    label: "Low",
    value: Priority.Low,
  },
  {
    label: "Medium",
    value: Priority.Medium,
  },
  {
    label: "High",
    value: Priority.High,
  },
];

const PriorityColor = {
  [Priority.Low]: "green.500",
  [Priority.Medium]: "orange.300",
  [Priority.High]: "red.600",
};

const CustomOption = ({ innerProps, label, value }: any) => {
  return (
    <Box {...innerProps} _hover={{ bg: "blue.50" }} p={2} cursor="pointer">
      <CircleIcon color={PriorityColor[value as Priority]} /> {label}
    </Box>
  );
};

interface Props {
  label: string;
  value: Priority;
  onChange: (event: SingleValue<{ label: string; value: Priority }>) => void;
}

const PrioritySelect = ({ label, value, onChange }: Props) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Select
        value={options.filter((option) => option.value === value)}
        options={options}
        components={{ Option: CustomOption }}
        onChange={onChange}
      />
    </FormControl>
  );
};

export default PrioritySelect;
