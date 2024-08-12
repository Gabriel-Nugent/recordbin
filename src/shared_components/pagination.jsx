import { Pagination, styled } from "@mui/material";

export const Custom_Pagination = (props) => {
  return (
    <Pagination_Container>
      <Pagination 
        count={props.total_pages}
        page={props.current_page}
        onChange={props.handleChange}
        showFirstButton
        showLastButton
        shape="rounded"
        size="large"
      />
    </Pagination_Container>
  )
}

const Pagination_Container = styled('div')(({ theme }) => 
  ` 
    background-color: ${theme.palette.background.default}80;
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    display: flex;
    justify-content: center;
  `
);