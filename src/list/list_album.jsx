import { Image } from "@mui/icons-material";
import { styled, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { coverart } from "../util/axios";

export const List_Album = (props) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [ image, set_image ] = useState(null);
  const [ image_loaded, set_image_loaded ] = useState(false);

  useEffect(() => {
    get_image();
  }, [])

  const get_image = async () => {
    try {
      const image_response = await coverart.get(`release-group/${props.group_id}`);
      set_image(image_response.data.images[0].image)
    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <Album_Container>
      <Image_Container onClick={() => navigate(`/album/${props.title}/${props.group_id}/${props.release_id}`)}>
        { image === null || image === "" ?
          <Image fontSize="inherit"/>
          :
          <Album_Image src={image} onLoad={() => set_image_loaded(true)} sx={image_loaded ? {opacity: 1} : {opacity: 0}}/>
        }
      </Image_Container>
      <Album_Info>
        <Typography variant="h5">{props.title}</Typography>
        <Typography sx={{color: theme.palette.secondary.main}}>{props.artists}</Typography>
      </Album_Info>
    </Album_Container>
  )
}

const Album_Container = styled('div')(({ theme }) => 
  `
    background-color: ${theme.palette.background.default}95;
    padding: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    border-bottom: 2px solid black;
  `
);

const Image_Container = styled('div')(({ theme }) => 
  `
    height: 150px;
    width: 150px;
    font-size: 150px;
    border: 2px solid black;
    cursor: pointer;
  `
);

const Album_Image = styled('img')(({ theme }) => 
  `
    height: 100%;
    width: 100%;
    transition: 150ms;
  `
);

const Album_Info = styled('div')(({ theme }) => 
  `
    
  `
);