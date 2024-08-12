import { Album, Favorite, FavoriteBorder, PlaylistAdd, RadioButtonUnchecked } from "@mui/icons-material";
import { Checkbox, IconButton, Rating, styled, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { recordbin } from "../util/axios";
import { My_Lists } from "../shared_components/my_lists";

export const Actions = (props) => {
  const [rating, set_rating] = useState(0);
  const [liked, set_liked] = useState(false);
  const [listened, set_listened] = useState(false);
  const [drawer_open, set_drawer_open] = useState(false);

  useEffect(() => {
    get_album_user_info();
  }, [])

  const get_album_user_info = async () => {
    try {
      const response = await recordbin.get(`album/userinfo?mbid=${props.mbid}`,{headers: {authorization: `Bearer ${localStorage.getItem("token")}`}});
      console.log(response)
      set_rating(response.data.Rating === null ? 0 : response.data.Rating / 2);
      set_liked(response.data.Liked === null ? false : response.data.Liked);
      set_listened(response.data.Listened === null ? false : response.data.Listened);
    }
    catch (error) {
      console.log(error)
    }
  }

  const submit_info = async (value, field) => {
    const data = {
      Rating: rating * 2,
      Liked: liked,
      Listened: listened
    }

    switch (field) {
      case "rating":
        data.Rating = value * 2;
        set_rating(value);
        break;
      case "liked":
        data.Liked = value;
        set_liked(value)
        break;
      case "listened":
        data.Listened = value;
        set_listened(value)
        break;
    }

    try {
      await recordbin.post(`album/userinfo?mbid=${props.mbid}`, data, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Actions_Container>
      <Tooltip title="Rating" placement="top" arrow>
        <Album_Rating 
          value={rating} 
          precision={0.5} 
          size="large"
          onChange={(event,newValue) => submit_info(newValue, "rating")}
        />
      </Tooltip>
      <Tooltip title="Liked" placement="top" arrow>
        <Like_Box 
          icon={<FavoriteBorder/>}
          checkedIcon={<Favorite/>}
          size="medium"
          checked={liked}
          onChange={(event) => submit_info(event.target.checked, "liked")}
        />
      </Tooltip>
      <Tooltip title="Listened" placement="top" arrow>
        <Listen_Box 
          icon={<RadioButtonUnchecked/>}
          checkedIcon={<Album/>}
          size="medium"
          checked={listened}
          onChange={(event) => submit_info(event.target.checked, "listened")}
        />
      </Tooltip>
      <Tooltip title="Add to List" placement="top" arrow>
        <IconButton onClick={() => set_drawer_open(true)}>
          <PlaylistAdd />
        </IconButton>
      </Tooltip>
      <My_Lists 
        open={drawer_open} 
        onClose={() => set_drawer_open(false)} 
        type={"add"}
        album_data={{
          Title: props.title,
          Artists: props.artists,
          Mbid: props.mbid,
          ReleaseID: props.release_id
        }}
      />
    </Actions_Container>
  )
}

const Actions_Container = styled('div')(({ theme }) => 
  `
    margin-top: 15px;
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
  `
);

const Album_Rating = styled(Rating)(({ theme }) => 
  `
    &.MuiRating-root {
      color: ${theme.palette.secondary.main};
    }
  `
);

const Like_Box = styled(Checkbox)(({ theme }) => 
  ` 
    &.MuiCheckbox-root {
      color: ${theme.palette.error.light}
    }
  `
);

const Listen_Box = styled(Checkbox)(({ theme }) => 
  `
    &.MuiCheckbox-root {
      color: ${theme.palette.primary.main}
    }
  `
);