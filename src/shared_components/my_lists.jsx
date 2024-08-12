import { Drawer, Fab, InputAdornment, LinearProgress, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { recordbin } from "../util/axios";
import { List_Item } from "./list_item";
import { Add, Remove } from "@mui/icons-material";

export const My_Lists = (props) => {
  const [lists, set_lists] = useState()
  const [loading, set_loading] = useState(true);
  const [creator_open, set_creator_open] = useState(false);
  const [list_title, set_list_title] = useState("");

  useEffect(() => {
    get_lists();
  },[]);

  const get_lists = async () => {
    set_loading(true);

    try {
      const response = await recordbin.get("/user/getLists", {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}});
      const list_data = response.data.lists;

      set_lists(list_data.map((list, index) => 
        <List_Item 
          title={list.Title}
          username={list.Username}
          ID={list.ListID}
          key={index}
          type={props.type}
          album_data={props.album_data}
        />
      ))

    } catch (error) {
      console.log(error);
    }

    set_loading(false);
  }

  const create_list = async () => {
    if (list_title === "") {
      return;
    }

    try {
      await recordbin.post("list/createList", {Title: list_title}, {headers: {authorization: `Bearer ${localStorage.getItem("token")}`}});
    }
    catch (error) {
      console.log(error)
    }

    set_creator_open(false);
    set_list_title("")
    get_lists();
  }

  return (
    <List_Drawer
      anchor="right"
      open={props.open}
      onClose={props.onClose}
    >
      <List_Container>
        <Typography variant="h5" 
          sx={{
            textAlign: 'center',
            width: '100%',
            borderBottom: '2px solid black',
            paddingBottom: '10px'
          }}
        >
          {props.type === "add" ? "Add to List" : "My Lists"}
        </Typography>
          { loading ?
            <LinearProgress />
            :
            <List_Item_Wrapper>
              {lists}
              { creator_open ?
                <>
                  <Item_Container>
                    <List_Button disableRipple>
                      <List_Item_Text>
                          <TextField
                            label="New List Title"
                            fullWidth
                            value={list_title}
                            onChange={(event) => set_list_title(event.target.value)}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end" onClick={() => create_list()}
                                  sx={{cursor: 'pointer'}}
                                >
                                  <Add />
                                </InputAdornment>
                              )
                            }}
                          />
                      </List_Item_Text>
                    </List_Button>
                  </Item_Container>
                </>
                :
                <>
                </>
              }
            </List_Item_Wrapper>
          }
      </List_Container>
      <Add_Button color="primary" onClick={() => set_creator_open(!creator_open)}>
      { creator_open ?
        <Remove />
        :
        <Add />
      }
      </Add_Button>
    </List_Drawer>
  )
}

const List_Drawer = styled(Drawer)(({ theme }) => 
  `
    
  `
);

const List_Container = styled('div')(({ theme }) => 
  `
    width: 300px;
    height: 100%;
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  `
);
const List_Item_Wrapper = styled(List)(({ theme }) => 
  `
    display: flex;
    flex-direction: column;
    padding: 0px;
  `
);

const Add_Button = styled(Fab)(({ theme }) => 
  `
    position: fixed;
    right: 20px;
    bottom: 20px;
  `
);

const Item_Container = styled(ListItem)(({ theme }) => 
  `
    border-bottom: 2px solid black;
    padding: 0px;
    width: 100%;
    transition: 100ms;
  `
);

const List_Button = styled(ListItemButton)(({ theme }) => 
  `
    display: flex;
    gap: 10px;
  `
);

const List_Item_Text = styled(ListItemText)(({ theme }) => 
  `
    
  `
);

