import { TabPanel } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface LazyLoadTab {
  index: number;
  currentIndex: number;
}

export default function LazyLoadTab(props: PropsWithChildren<LazyLoadTab>) {
  return (
    props.index === props.currentIndex && (
      <TabPanel h={"full"} overflow={"auto"}>{props.children}</TabPanel>
    )
  );
}
