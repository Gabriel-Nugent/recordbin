import { Button, styled, Typography } from "@mui/material";
import { Searchbar } from "../shared_components/searchbar";
import albums_top from "../assets/albums-top.png"
import albums_bottom from "../assets/albums-bottom.png"
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate()

  return (
    <Home_Background>
      <Background_Albums src={albums_top} />
      <Home_Content>
        <Welcome_Text>
          <Typography variant="h3">Welcome to RecordBin.</Typography>
          { localStorage.getItem("token") === null &&
            <>
              <Typography variant="h5">
                Log in to save releases, or use the search bar below  to browse
              </Typography>
              <Button type="button" color="secondary" variant="contained" onClick={() => navigate("/signup")}>Create an Account</Button>
            </>
          }
        </Welcome_Text>
        <Searchbar 
          fontSize={24}
          padding={"10px"}
          width="30%"
          minWidth="600px"
        />
      </Home_Content>
      <Background_Albums src={albums_bottom}/>
    </Home_Background>
  )
}

const Home_Background = styled('main')(({ theme }) => 
  ` 
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-image: linear-gradient(${theme.palette.primary.main}20, ${theme.palette.primary.main}05);
    overflow-x: hidden;
  `
);

const Welcome_Text = styled('div')(() => 
  `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  `
);

const Home_Content = styled('div')(() => 
  `
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 50px;
  `
);

const Background_Albums = styled('img')(() => 
  ` 
    width: 100%;
    height: auto;
    opacity: 0.2;
  `
);