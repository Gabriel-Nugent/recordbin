import { Album } from "@mui/icons-material";
import { styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const User_List = (props) => {
  const navigate = useNavigate();

  return (
    <List_Container onClick={() => navigate(`/list/${props.username}/${props.title}/${props.list_id}`)}>
      <Image_Container>
        <Album fontSize="inherit"/>
      </Image_Container>
      <List_Info>
        <Typography variant="h5">{props.title}</Typography>
      </List_Info>
    </List_Container>
  )
}

const List_Container = styled('div')(({ theme }) => 
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

const List_Info = styled('div')(({ theme }) => 
  `
    
  `
);