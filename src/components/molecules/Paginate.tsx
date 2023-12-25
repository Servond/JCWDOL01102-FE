import { Box } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";

interface IPaginateProps {
  pageCount: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  forcePage?: number;
}
export default function Paginate(props: IPaginateProps) {
  return (
    <Box mt={"0.5rem"}>
      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={props.pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={props.onPageChange}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={props.forcePage}
      />
    </Box>
  );
}
