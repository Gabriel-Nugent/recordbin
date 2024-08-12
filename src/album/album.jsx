import { styled, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Loading_Page } from "../shared_components/loading_page";
import { coverart, musicbrainz } from "../util/axios";
import { Track_Section } from "./track_section";
import { HideImage } from "@mui/icons-material";
import { Actions } from "./actions";

export const Album = () => {
  const location = useLocation();
  const theme = useTheme();
  const [loading, set_loading] = useState(true);
  const { title, group_id, release_id } = useParams();
  const [ group_info, set_group_info ] = useState(null);
  const [ release_info, set_release_info ] = useState(null);
  const [ image, set_image ] = useState(null);
  const [ image_loaded, set_image_loaded ] = useState(false);

  useEffect(() => {
    get_album_info()
  }, [location.key])

  const get_album_info = async () => {
    set_loading(true)
    
    try {
      const group_response = await musicbrainz.get(`release-group/${group_id}?inc=genres`)
      set_group_info(group_response.data)
      const release_response = await musicbrainz.get(`release/${release_id}?inc=recordings+artists+tags`)
      set_release_info(release_response.data)
    }
    catch (error) {
      console.log(error)
    }

    try {
      const image_response = await coverart.get(`release-group/${group_id}`);
      set_image(image_response.data.images[0].image)
    }
    catch (error) {
      console.log(error)
    }

    set_loading(false)
  }

  const name_to_string = (arr) => {
    if (arr === undefined || arr.length === 0) {
      return undefined;
    }
    let str = arr[0].name;
    for (let i = 1; i < arr.length; i++) {
      str += ", " + arr[i].name;
    }
    return str;
  }

  return (
    <Background>
        <Typography variant="h4">{title}</Typography>
          { loading ?
            <Loading_Page />
            :
            <Album_Container>
              <Image_Section>
                <Image_Container>
                  { image === null || image === "" ?
                    <HideImage fontSize="inherit"/>
                    :
                    <Album_Image src={image} onLoad={() => set_image_loaded(true)} sx={image_loaded ? {opacity: 1} : {opacity: 0}}/>
                  }
                </Image_Container>
                { localStorage.getItem("token") !== null &&
                  <Actions mbid={group_id} release_id={release_id} title={title} artists={name_to_string(release_info["artist-credit"])}/>
                }
                <Typography sx={{marginTop: '10px'}} variant="h5">{group_info.title}</Typography>
                <Typography variant="h6">{name_to_string(release_info["artist-credit"])}</Typography>
                <Typography sx={{textAlign: 'center', color: theme.palette.secondary.light, marginTop: '10px'}} variant="body2">
                  {name_to_string(group_info.genres)}
                </Typography>
              </Image_Section>
              <Track_Section tracks={release_info.media[0].tracks} />
            </Album_Container>
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

const Album_Container = styled('div')(({ theme }) => 
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

const Image_Section = styled('section')(({ theme }) => 
  `
    background-color: ${theme.palette.primary.main}20;
    padding: 20px;
    border-radius: 4px;
    width: 340px;
    height: min-content;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);

const Album_Image = styled('img')(({ theme }) => 
  `
    height: 100%;
    width: 100%;
    transition-duration: 200ms;
  `
);

const Image_Container = styled('div')(({ theme }) => 
  `
    height: 300px;
    width: 300px;
    border: 3px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200px;
  `
);