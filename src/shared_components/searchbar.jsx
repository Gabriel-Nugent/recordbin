import { styled, useTheme } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Searchbar = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [search_value, set_search_value] = useState("")

  const submitSearch = () => {
    if (search_value !== "") {
      navigate(`/search-results/${encodeURIComponent(search_value)}`);   
    }
  }

  return (
    <Container sx={{width: `${props.width}`, minWidth: `${props.minWidth}`}}>
      <Searchbar_Wrapper sx={{padding: `${props.padding}`}}>
        <Searchbar_Input
          value={search_value}
          placeholder={`Search here`}
          onKeyDown={(event) => {if (event.key === 'Enter') submitSearch()}}
          onChange={(event) => set_search_value(event.target.value)}
          sx={{fontSize: `${props.fontSize}px`}}
        />
        <Search
          onClick={() => submitSearch()}
          sx={{
            fontSize: `${props.fontSize * 1.3}px`,
            ":hover" : {
              color: `${theme.palette.primary.main}`,
              cursor: 'pointer',
              backgroundColor: `${theme.palette.primary.main}30`,
              borderRadius: '5px'
            }
          }}
        />
      </Searchbar_Wrapper>
    </Container>
  )
}


const Container = styled('div')(() => 
  `
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  `
);


const Searchbar_Wrapper = styled('div')(({ theme }) => 
  `
    display: grid;
    grid-template-columns: auto min-content;
    width: 100%;
    background-color: ${theme.palette.primary.dark}10;
    border: 2px solid ${theme.palette.primary.light}30;
    border-radius: 15px;
    color: ${theme.palette.primary.light}30;
    gap: 5px;
    transition-duration: 200ms;
    :hover {
      background-color: ${theme.palette.primary.dark}20;
      border: 2px solid ${theme.palette.primary.light}50;
      color: ${theme.palette.primary.light}50;
    };
    :focus-within {
      background-color: ${theme.palette.primary.dark}20;
      border: 2px solid ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
    }
  `
);

const Searchbar_Input = styled('input')(({ theme }) => 
  `
    background-color: transparent;
    color: ${theme.palette.background.paper};
    border: none;
    width: auto;
    :focus-visible {
      border: none;
      outline: none;
      color: ${theme.palette.text.primary};
    }
  `
);