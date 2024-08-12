import { Add, Album, Check } from "@mui/icons-material";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, styled, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recordbin } from "../util/axios";

export const List_Item = (props) => {
  const navigate = useNavigate();
  const [added, set_added] = useState(false);

  const handleClick = async () => {
    if (props.type === "add") {
      try {
        let body = {...props.album_data};
        body["ListID"] = props.ID;
        await recordbin.post("/list/addAlbum",body,{headers: {authorization: `Bearer ${localStorage.getItem("token")}`}})
        set_added(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate(`/list/${props.username}/${props.title}/${props.ID}`)
    }
  }

  return (
    <Item_Container className={added ? "added" : ""}>
      <List_Button onClick={() => handleClick()}>
        <Picture sx={props.type === "add" && {border: '0px'}}>
        { props.type === "add" ?
          <>
            { added ?
              <Check sx={{color: 'white'}} fontSize={"50px"}/>
              :
              <Add fontSize={"50px"}/>
            }
          </>
          :
          <Album fontSize={"50px"}/>
        }
        </Picture>
        <List_Item_Text>
            {props.title}
        </List_Item_Text>
      </List_Button>
    </Item_Container>
  )
}

const Item_Container = styled(ListItem)(({ theme }) => 
  `
    border-bottom: 2px solid black;
    padding: 0px;
    width: 100%;
    transition: 100ms;
    :hover {
      background-color: ${theme.palette.primary.main}30;
    };
    &.added {
      background-color: ${theme.palette.success.main}30;
    };
    &.added:hover {
      background-color: ${theme.palette.success.main}30;
    };
  `
);

const List_Button = styled(ListItemButton)(({ theme }) => 
  `
    display: flex;
    gap: 10px;
  `
);

const Picture = styled(ListItemIcon)(({ theme }) => 
  `
    height: 50px;
    min-width: 50px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: ${theme.palette.primary.main};
  `
);

const List_Item_Text = styled(ListItemText)(({ theme }) => 
  `
    
  `
);
