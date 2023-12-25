/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

interface IProductCheckboxValue {
  isChecked: boolean;
  getCheckboxProps: (props?: Record<string, any> | undefined) => {
    [x: string]: any;
    onChange: (eventOrValue: any) => void;
  };
  productId: number;
}

export default function ProductCheckBox(props: IProductCheckboxValue) {
  const [checked, setChecked] = useState<boolean>(props.isChecked);

  return (
    <Checkbox
      {...props.getCheckboxProps({
        value: Number(props.productId),
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
          setChecked(e.target.checked);
        },
        isChecked: checked,
      })}
    />
  );
}
