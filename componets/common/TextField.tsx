import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Props {
  label: string;
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

const TextField = ({ label, id, value, onChange, isRequired }: Props) => {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input id={id} type="text" value={value} onChange={onChange} />
    </FormControl>
  );
};

export default TextField;
