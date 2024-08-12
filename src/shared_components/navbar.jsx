import { Button, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, styled, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Searchbar } from "./searchbar";
import { useEffect, useState } from "react";
import { AccountCircle, List, Logout, Settings } from "@mui/icons-material";
import { My_Lists } from "./my_lists";

export const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [auth, setAuth] = useState(localStorage.getItem("token"));
  const [anchorEl, set_anchorEl] = useState();
  const [menu_open, set_menu_open] = useState(false);
  const [drawer_open, set_drawer_open] = useState(false);

  const logout = () => {
    localStorage.clear();
    set_menu_open(false);
    setAuth(null);
    navigate("/home")
  }

  useEffect(() => {
    setAuth(localStorage.getItem("token"))
  }, [localStorage.getItem("token")])

  const handleClick = (event) => {
    set_anchorEl(event.currentTarget);
    set_menu_open(true);
  };

  const handleClose = () => {
    set_menu_open(false);
  };

  return (
    <Container>
      <Left_Links>
        <Typography 
          sx={{
            fontWeight: '700',
            transitionDuration: '200ms',
            ":hover": {
              cursor: "pointer",
              color: `${theme.palette.primary.main}`
            }
          }}
          variant="h5"
          onClick={() => navigate("/")}
        >
          RecordBin.
        </Typography>
        <Nav_Links>
        </Nav_Links>
      </Left_Links>
      <Searchbar_Container>
        <Searchbar fontSize={18} padding="5px"/>
      </Searchbar_Container>
      <Right_Links>
        { auth === null ?
          <>
            <Button variant="outlined" onClick={() => navigate("/login")}>Log in</Button>
            <Button variant="contained" onClick={() => navigate("/signup")}>Sign Up</Button>
          </>
          :
          <>
            <AccountCircle 
              color="primary" 
              onClick={handleClick} 
              sx={{fontSize: '40px', ':hover': {cursor: 'pointer', color: 'white'}}}
            />
            <Menu 
              open={menu_open}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              transformOrigin={{ vertical: 'top', horizontal: 'center' }}
              onClose={handleClose}
              anchorEl={anchorEl}
            >
              <MenuList>
                <MenuItem onClick={() => navigate(`/user/${localStorage.getItem("Username")}`)}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText>
                    {localStorage.getItem("Username")}
                  </ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                  set_drawer_open(true)
                  handleClose();
                }}>
                  <ListItemIcon>
                    <List fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText>
                    My Lists
                  </ListItemText>
                </MenuItem>
                {/* <MenuItem>
                  <ListItemIcon>
                    <Settings fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText>
                    Settings
                  </ListItemText>
                </MenuItem> */}
                <MenuItem onClick={() => logout()}>
                  <ListItemIcon>
                    <Logout fontSize="small"/>
                  </ListItemIcon>
                  <ListItemText>
                    Log out
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Menu>
            <My_Lists open={drawer_open} onClose={() => set_drawer_open(false)}/>
          </>
        }
      </Right_Links>
    </Container>
  )
}

const Container = styled('header')(({ theme }) => 
  `
    font-size: 30px;
    display: flex;
    padding: 15px 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    border-bottom: 1px solid ${theme.palette.primary.light}50
  `
);

const Left_Links = styled('section')(({ theme }) => 
  `
    display: flex;
    gap: 50px;
    flex: 1;
  `
);

const Right_Links = styled('section')(({ theme }) => 
  `
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
    flex: 1;
  `
);

const Searchbar_Container = styled('div')(({ theme }) => 
  `
    flex: 1;
  `
);

const Nav_Links = styled('nav')(({ theme }) => 
  `
    display: flex;
    gap: 20px;
  `
);