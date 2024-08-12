import { AlternateEmail, Key, TaskAlt, VerifiedUser, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, CircularProgress, InputAdornment, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { recordbin } from "../util/axios";

export const Signup = () => {
  const navigate = useNavigate();
  const [loading, set_loading] = useState(false);
  const [email, set_email] = useState("")
  const [email_error, set_email_error] = useState("")
  const [username, set_username] = useState("")
  const [username_error, set_username_error] = useState("")
  const [password, set_password] = useState("")
  const [password_error, set_password_error] = useState("")
  const [verify_password, set_verify_password] = useState("")
  const [password_match_error, set_password_match_error] = useState(undefined)
  const [password_visible, set_password_visible] = useState(false);
  const [verify_password_visible, set_verify_password_visible] = useState(false);

  useEffect(() => {
    if (verify_password !== password) {
      set_password_match_error(true);
    } else {
      set_password_match_error(false);
    }
  }, [verify_password, password])

  const validate_email = (new_value) => {
    if (!new_value.includes('@')) {
      set_email_error("Email must include an @");
    }
    else {
      set_email_error("")
    }
    set_email(new_value)
  }

  const submit = async () => {
if (email === "") {
      set_email_error("Email cannot be empty")
    }
    if (password === "") {
      set_password_error("Password cannot be empty")
    }
    if (username === "") {
      set_username_error("Username cannot be empty")
    }
    if (email_error !== "" || password_error !== "" || username_error !== "" || password_match_error !== false ||
      email === "" || password === "" || username === ""
    ) {
      return;
    }

    set_loading(true);

    try {
      await recordbin.post("user/newUser",{"Email": email, "Username": username, "Password": password});
      set_loading(false);
      navigate("/home")
    } catch (error) {
      console.log(error)
      if (error.response.data.includes("Email")) {
        set_email_error("User with this email already exists")
      } else if (error.response.data.includes("Username")) {
        set_username_error("User with this username already exists")
      }
    }
    
    set_loading(false);
  }

  return (
    <Background>
      <Signup_Container>
        <Typography sx={{textAlign: 'center'}} variant="h4">Welcome to <Strong>RecordBin.</Strong></Typography>
        <Typography sx={{textAlign: 'center', margin: '10px 0px 20px'}} variant="subtitle2">Create your new account </Typography>
        <Signup_Form>
          <Field id="email-field" label="Email" variant="outlined" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail />
                </InputAdornment>
              )
            }}
            placeholder="joannanewsom@email.com"
            onChange={(event) => validate_email(event.target.value)}
            value={email}
            error={email_error !== ""}
            helperText={email_error}
          />
          <Field id="username-field" label="Username" variant="outlined" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VerifiedUser />
                </InputAdornment>
              )
            }}
            placeholder="KeroKeroFan"
            onChange={(event) => {
              if (event.target.value === "") {
                set_username_error("Username cannot be empty")
              }
              else {
                set_username_error("")
              }
              set_username(event.target.value)
            }}
            value={username}
            error={username_error !== ""}
            helperText={username_error}
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
            onChange={(event) => {
              if (event.target.value === "") {
                set_password_error("Password cannot be empty")
              }
              else {
                set_password_error("")
              }
              set_password(event.target.value)
            }}
            value={password}
            error={password_error !== ""}
            helperText={password_error}
          />
          <Field id="re-type-passw" label="Re-Type Password" variant="outlined" 
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TaskAlt />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end" onClick={() => set_verify_password_visible(!verify_password_visible)} sx={{cursor: 'pointer'}}>
                  { verify_password_visible ?
                    <VisibilityOff/>
                    :
                    <Visibility />
                  }
                </InputAdornment>
              )
            }}
            type={verify_password_visible ? "text" : "password"}
            placeholder="FitterHappier!123"
            error={password_match_error}
            helperText={password_match_error ? "Passwords must match" : ""}
            onChange={(event) => set_verify_password(event.target.value)}
            value={verify_password}
          />
          <Button variant="contained" type="button" onClick={() => submit()}>
            { loading ?
                <CircularProgress color="text" size={20}/>
              :
              <>
                Create Account
              </>
            }
          </Button>
        </Signup_Form>
        <Typography sx={{textAlign: 'center', marginTop: '20px;'}} >Already have an account? 
          <Button type="button" onClick={() => navigate("/login")} sx={{marginLeft: '5px'}}>Log in</Button>
        </Typography>
      </Signup_Container>
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

const Signup_Container = styled('div')(({ theme }) => 
  `
    padding: 40px;
    width: 500px;
    background-color: ${theme.palette.background.default};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
  `
);

const Signup_Form = styled('form')(({ theme }) => 
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