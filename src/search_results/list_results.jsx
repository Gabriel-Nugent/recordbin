import { useEffect, useState } from "react"
import { recordbin } from "../util/axios"
import { Loading_Page } from "../shared_components/loading_page";
import { useLocation } from "react-router-dom";
import { styled, Typography } from "@mui/material";
import { Result_Card } from "./result_card";

export const List_Results = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [list_components, set_list_components] = useState(undefined);

  useEffect(() => {
    get_list();
  }, [location.key])

  const get_list = async () => {
    setLoading(true);

    try {
      const response = await recordbin.get(`list/getListsByTitle?Title=${props.search_value}`);
      console.log(response);

      if (response.data.lists.length !== 0) {
        set_list_components(response.data.lists.map((list, index) => 
          <Result_Card
            key={index}
            title={list.Title}
            subtitle={list.Username}
            img_link={`/list/${list.Username}/${list.Title}/${list.ListID}`}
          />
        ))
      }
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
              { list_components === undefined || list_components.length === 0 ?
                <No_Results>
                  <Typography variant="h6">
                    {`No results for lists "${props.search_value}"`}
                  </Typography>
                </No_Results>
                :
                <>
                  <Results>
                    {list_components}
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