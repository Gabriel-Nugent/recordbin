import { styled, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loading_Page } from "../shared_components/loading_page";
import { recordbin } from "../util/axios";
import { List_Album } from "./list_album";
import { Album } from "@mui/icons-material";

export const List = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {username, title, list_id} = useParams();
  const [loading, set_loading] = useState(true);
  const [list_albums, set_list_albums] = useState([])

  useEffect(() => {
    get_list_info();
  }, [location.key])

  const get_list_info = async () => {
    set_loading(true);

    try {
      const response = await recordbin.get(`list/getListAlbums?ListID=${list_id}`);
        set_list_albums(response.data.listAlbums.map((album, index) => 
          <List_Album 
            title={album.Title}
            artists={album.Artists}
            group_id={album.Mbid}
            release_id={album.ReleaseID}
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
      <Typography variant="h4">{title}</Typography>
      { loading ?
        <Loading_Page />
        :
        <List_Info_Container>
          <Info_Section>
            <Info_Image>
              <Album fontSize="inherit"/>
            </Info_Image>
            <Typography variant="h5" sx={{marginTop: '10px'}}>{title}</Typography>
            <Typography variant="subtitle2" onClick={() => navigate(`/user/${username}`)} sx={{cursor: 'pointer'}}>
              {username}
            </Typography>
          </Info_Section>
          <Album_Section>
            {list_albums}
          </Album_Section>
        </List_Info_Container> 
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

const List_Info_Container = styled('div')(({ theme }) => 
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