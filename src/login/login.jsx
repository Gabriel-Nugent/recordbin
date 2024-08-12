import { AlternateEmail, Key, TaskAlt, VerifiedUser, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, InputAdornment, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { recordbin } from "../util/axios";

export const Login = () => {
  const navigate = useNavigate();
  const [password_visible, set_password_visible] = useState(false);
  const [username, set_username] = useState("")
  const [password, set_password] = useState("")
  const [password_error, set_password_error] = useState(false)
  const [username_error, set_username_error] = useState(false)
  const [loading, set_loading] = useState(false);

  const submit = async () => {
    if (username === "") {
      set_username_error(true);
    }
    if (password === "") {
      set_password_error(true);
    }
    if (username === "" || password === "") {
      return;
    }

    set_loading(true);

    try {
      const response = await recordbin.post("user/login",{"Username": username, "Password": password})
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("Username", username);
      navigate("/home")
    } catch (error) {
      console.log(error)
    }

    set_loading(false);
  }

  return (
    <Background>
      <Login_Container>
        <Typography sx={{textAlign: 'center'}} variant="h4">Welcome back to <Strong>RecordBin.</Strong></Typography>
        <Typography sx={{textAlign: 'center', margin: '10px 0px 20px'}} variant="subtitle2">Log in with your Username and Password </Typography>
        <Login_Form>
          <Field id="username-field" label="Username" variant="outlined" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUser />
                </InputAdornment>
              )
            }}
            placeholder="KeroKeroFan"
            value={username}
            onChange={(event) => {
              if (event.target.value === "") {
                set_username_error(true);
              }
              else {
                set_username_error(false);
              }
              set_username(event.target.value)
            }}
            error={username_error}
            helperText={username_error ? "Username cannot be empty" : ""}
          />
          <Field id="password-field" label="Password" variant="outlined" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Key />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={() => set_password_visible(!password_visible)} sx={{cursor: 'pointer'}}>
                  { password_visible ?
                    <VisibilityOff/>
                    :
                    <Visibility />
                  }
                </InputAdornment>
              )
            }}
            type={password_visible ? "text" : "password"}
            placeholder="FitterHappier!123"
            value={password}
            error={password_error}
            helperText={password_error ? "Password cannot be empty" : ""}
            onChange={(event) => {
              if (event.target.value === "") {
                set_password_error(true);
              }
              else {
                set_password_error(false);
              }
              set_password(event.target.value)
            }}

          />
          <Button variant="contained" type="button" onClick={() => submit()}>
            { loading ?
                <CircularProgress color="text" size={20}/>
              :
              <>
                Log in
              </>
            }
          </Button>
        </Login_Form>
        <Typography sx={{textAlign: 'center', marginTop: '20px;'}} >Dont have an account? 
          <Button type="button" onClick={() => navigate("/signup")} sx={{marginLeft: '5px'}}>Sign Up</Button>
        </Typography>
      </Login_Container>
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

const Login_Container = styled('div')(({ theme }) => 
  `
    padding: 40px;
    width: 500px;
    background-color: ${theme.palette.background.default};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  `
);

const Login_Form = styled('form')(({ theme }) => 
  `
    display: flex;
    flex-direction: column;
    gap: 30px;
  `
);

const Field = styled(TextField)(({ theme }) => 
  `
    background-color: ${theme.palette.primary.dark}10;
  `
);

const Strong = styled('strong')(({ theme }) => 
  `
    font-weight: 700;
    color: ${theme.palette.primary.main}
  `
);