import { styled, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Release_Results } from "./release_results";
import { List_Results } from "./list_results";
import { User_Results } from "./user_results";

export const Search_Results = () => {
  const { search_value } = useParams();
  const [current_tab, set_current_tab] = useState(0) 

  const a11y_props = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <Results_Background>
      <Results_Heading>
        <Typography variant="h5">
          {`Results for "${decodeURI(search_value)}"`}
        </Typography>
        <Typography variant="subtitle1" sx={{margin: '50px 0px 10px'}}>
          SHOW RESULTS FOR 
        </Typography>
        <Tab_Container>
          <Tabs value={current_tab} onChange={(event,newValue) => set_current_tab(newValue)}>
            <Tab label="Albums" {...a11y_props(0)}></Tab>
            <Tab label="Lists" {...a11y_props(1)}></Tab>
            <Tab label="Users" {...a11y_props(2)}></Tab>
          </Tabs>
        </Tab_Container>
      </Results_Heading>
      <Results_Layout>
        <Release_Results value={current_tab} index={0} search_value={search_value}/>
        <List_Results value={current_tab} index={1} search_value={search_value}/>
        <User_Results value={current_tab} index={2} search_value={search_value}/>
      </Results_Layout>
    </Results_Background>
  )
}

const Results_Background = styled('div')(({ theme }) => 
  `
    background-repeat: no-repeat;
    padding: 50px 200px;
    position: relative;
    display: flex;
    gap: 30px;
    justify-content: start;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(${theme.palette.primary.main}20, ${theme.palette.primary.main}05);
  `
);

const Results_Heading = styled('div')(({ theme }) => 
  `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  `
);

const Results_Layout = styled('main')(({ theme }) => 
  `
    position: relative;
    background-color: ${theme.palette.primary.dark}40;
    padding: 20px;
    width: 100%;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  `
);

const Tab_Container = styled('div')(({ theme }) => 
  `
    background-color: ${theme.palette.primary.dark}40;
  `
);