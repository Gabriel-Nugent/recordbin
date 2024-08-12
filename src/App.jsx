import { styled, ThemeProvider } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { dark_theme, light_theme} from "./theme"
import { Navbar } from "./shared_components/navbar";
import { Home } from "./home/home";
import { Search_Results } from "./search_results/search_results";
import { Album } from "./album/album";
import { Login } from "./login/login";
import { Signup } from "./signup/signup";
import { List } from "./list/List";
import { User } from "./user/User";

function App() {

  return (
    <ThemeProvider theme={dark_theme}>
      <BrowserRouter>
        <PageLayout className="main-page">
          <Navbar/>
              <Routes>
                  <Route path="/" element={<Home />}/>
                  <Route path="/home" element={<Home />}/>
                  <Route path="/search-results/:search_value" element={<Search_Results/>}/>
                  <Route path="/album/:title/:group_id/:release_id" element={<Album />} />
                  <Route path="/list/:username/:title/:list_id" element={<List />} />
                  <Route path="/user/:username" element={<User />} />
                  <Route path="/login" element={<Login />}/>
                  <Route path="/signup" element={<Signup />}/>
              </Routes>
        </PageLayout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

const PageLayout = styled('div')(({ theme }) => 
  `
    min-height: 100%;
    min-width: 100%;
    background-color: ${theme.palette.background.default};
    display: grid;
    grid-template-rows: min-content auto;
  `
);

export default App
