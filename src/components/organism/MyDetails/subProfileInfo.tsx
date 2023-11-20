import { Grid } from "@chakra-ui/react";
import ButtonDetail from "../../molecules/MyDetails/Grid/ButtonDetail";
import LabelDetail from "../../molecules/MyDetails/Grid/LabelDetail";
import ValueDetail from "../../molecules/MyDetails/Grid/ValueDetail";

interface Props {
  label: string;
  value: string;
  copyIcon?: boolean;
}

export default function SubProfileInfo(props: Props) {
  return (
    <Grid templateColumns={"repeat(12, 1fr)"} gap={6} w={"100%"} my={"5px"}>
      <LabelDetail label={props.label} />
      <ValueDetail value={props.value} />
      <ButtonDetail
        copyIcon={props.copyIcon}
        value={props.value}
        label={props.label}
      />
    </Grid>
  );
}
