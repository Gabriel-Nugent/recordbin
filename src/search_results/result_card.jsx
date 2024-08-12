import { Image, ImageNotSupported } from "@mui/icons-material";
import { styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { coverart, musicbrainz } from "../util/axios";
import { useEffect, useState } from "react";
import { Loading_Page } from "../shared_components/loading_page";

export const Result_Card = (props) => {
  const navigate = useNavigate();
  const [image_url, set_image_url] = useState(props.image ? props.image : null);
  const [image_loaded, set_image_loaded] = useState(false);
  const [image_loading, set_image_loading] = useState(props.need_image ? true : false);

  useEffect(() => {
    if (props.need_image) {
      get_image()
    }
  },[])

  const get_image = async () => {
    set_image_loading(true)
    try {
      const response = await coverart.get(`release-group/${props.primary_id}`);
      set_image_url(response.data.images[0].image)
    }
    catch (error) {

    }
    set_image_loading(false)
  }

  return (
    <Result_Card_Container>
      <Image_Container 
        onClick={() => navigate(props.img_link)}
      > 
        { image_loading === false ?
          <>
            { image_url !== null && image_url !== '' ?
              <Result_Image src={image_url} onLoad={() => set_image_loaded(true)} sx={ image_loaded ? {opacity: 1} : {opacity: 0}}/>
              :
              <No_Image>
                <Image fontSize="inherit"/>
              </No_Image>
            }
          </>
          :
          <>
            <Loading_Page />
          </>
        }
        <Image_Overlay className={props.img_link === null ? "nolink" : "link"}/>
      </Image_Container>
      <Typography sx={{marginTop: "15px"}} variant="h5">{props.title}</Typography>
      <Typography variant="h6">{props.subtitle}</Typography>
      <Typography variant="h6">{props.date}</Typography>
      <Typography variant="h6">{props.tags}</Typography>
    </Result_Card_Container>
  )
}

const Result_Card_Container = styled('div')(({ theme }) => 
  `
    padding: 20px;
    background-color: ${theme.palette.primary.main}20;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  `
);

const Image_Container = styled('div')(({ theme }) => 
  `
    height: 300px;
    width: 300px;
    position: relative;
    transition: 1000ms;
    border: 3px solid black;
  `
);

const Image_Overlay = styled('div')(({ theme }) => 
  `
    height: 100%;
    width: 100%;
    background-color: transparent;
    position: absolute;
    top: 0;
    &.link {
      transition: 200ms;
      cursor: pointer;
      :hover {
        border: 15px solid ${theme.palette.secondary.main};
      };
    };
  `
);

const Result_Image = styled('img')(({ theme }) => 
  ` 
    height: 100%;
    width: 100%;
    transition: 200ms;
  `
);

const No_Image = styled('div')(({ theme }) => 
  `
    height: 100%;
    width: 100%;
    transition: 150ms;
    font-size: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  `
);