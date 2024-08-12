import { styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Loading_Page } from "../shared_components/loading_page";
import { recordbin } from "../util/axios";
import { AccountCircle } from "@mui/icons-material";
import { User_List } from "./user_list";

export const User = () => {
  const location = useLocation();
  const { username } = useParams();
  const [loading, set_loading] = useState(true);
  const [user_lists, set_user_lists] = useState([])

  useEffect(() => {
    get_user_info();
  }, [location.key])

  const get_user_info = async () => {
    set_loading(true);

    try {
      const response = await recordbin.get(`user/getLists?Username=${username}`);
        set_user_lists(response.data.lists.map((list, index) => 
          <User_List
            title={list.Title}
            username={list.Username}
            list_id={list.ListID}
            key={index}
          />
        ))
    } catch (error) {
      console.log(error);
    }

    set_loading(false);
  } 

  return (
    <Background>
      <Typography variant="h4">{username}</Typography>
      { loading ?
        <Loading_Page />
        :
        <User_Info_Container>
          <Info_Section>
            <Info_Image>
              <AccountCircle fontSize="inherit"/>
            </Info_Image>
            <Typography sx={{marginTop: '10px'}} variant="subtitle2">{username}</Typography>
          </Info_Section>
          <Album_Section>
            {user_lists}
          </Album_Section>
        </User_Info_Container> 
      }
    </Background>
  )
}

const Background = styled('main')(({ theme }) => 
  ` 
    background-repeat: no-repeat;
    padding: 50px 200px;
    position: relative;
    display: flex;
    gap: 30px;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(${theme.palette.primary.main}20, ${theme.palette.primary.main}05);
  `
);

const User_Info_Container = styled('div')(({ theme }) => 
  `
    background-color: ${theme.palette.primary.dark}40;
    border-radius: 4px;
    padding: 20px;
    display: grid;
    grid-template-columns: min-content auto;
    width: 100%;
    gap: 50px;
  `
);

const Info_Section = styled('div')(({ theme }) => 
  `
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${theme.palette.primary.main}20;
    height: min-content;
    padding: 20px;
  `
);

const Info_Image = styled('div')(({ theme }) => 
  `
    border: 2px solid black;
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200px;
  `
);

const Album_Section = styled('div')(({ theme }) => 
  `
    background-color: ${theme.palette.primary.main}20;
    padding: 20px;
    height: min-content;
  `
);