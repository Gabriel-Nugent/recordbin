import { useEffect, useState } from "react"
import { Loading_Page } from "../shared_components/loading_page";
import { useLocation } from "react-router-dom";
import { styled, Typography } from "@mui/material";
import { Result_Card } from "./result_card";
import { recordbin } from "../util/axios";

export const User_Results = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [user_components, set_user_components] = useState(undefined);

  useEffect(() => {
    get_users();
  }, [location.key])

  const get_users = async () => {
    setLoading(true);

    try {
      const response = await recordbin.get(`user/getUsersByName?Username=${props.search_value}`);
      console.log(response);
      set_user_components(response.data.users.map((user, index) =>
        <Result_Card 
          title={user.Username}
          img_link={`/user/${user.Username}`}
        />
      ))
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => setLoading(false), 1000);
  }

  return (
    <>
      { props.value === props.index &&
        <>
          { loading ?
            <Loading_Page />
            :
            <>
              { user_components === undefined || user_components.length === 0 ?
                <No_Results>
                  <Typography variant="h6">
                    {`No results for users "${props.search_value}"`}
                  </Typography>
                </No_Results>
                :
                <>
                  <Results>
                    {user_components}
                  </Results>
                </>
              }
            </>
          }
        </>
      }
    </>
  )
}

const No_Results = styled('div')(({ theme }) => 
  ` 
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `
);

const Results = styled('div')(({ theme }) => 
  `
    display: grid;
    width: 100%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  `
);