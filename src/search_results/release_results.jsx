import { useEffect, useState } from "react"
import {  musicbrainz } from "../util/axios"
import { Loading_Page } from "../shared_components/loading_page";
import { useLocation } from "react-router-dom";
import { styled, Typography } from "@mui/material";
import { Result_Card } from "./result_card";
import { Custom_Pagination } from "../shared_components/pagination";

export const Release_Results = (props) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [release_components, set_release_components] = useState(undefined);
  const [page_number, set_page_number] = useState(1);
  const [total_pages, set_total_pages] = useState(1);

  useEffect(() => {
    get_release();
    set_page_number(1);
  }, [location.key])

  useEffect(() => {
    get_release();
  }, [page_number])

  const get_release = async () => {
    setLoading(true);

    try {
      const response = await musicbrainz.get(`release-group/?query=release:${props.search_value}&limit=12&primarytype=Album&offset=${(page_number - 1) * 12}`)
      const release_data = response.data["release-groups"];
      if (response.data.count !== 0) {
        set_total_pages(Math.min(Math.ceil(response.data.count / 12), 10))
        set_release_components(
          release_data.map((release, index) => 
            <Result_Card
              key={index}
              primary_id={release.id}
              secondary_id={release.releases[0].id}
              title={release.title}
              subtitle={name_to_string(release["artist-credit"])}
              date={release["first-release-date"]}
              tags={name_to_string(release.tags)}
              img_link={`/album/${release.title}/${release.id}/${release.releases[0].id}`}
              need_image
            />
          )
        )
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => setLoading(false), 1000);
  }

  const name_to_string = (arr) => {
    if (arr === undefined || arr.length === 0) {
      return undefined;
    }
    let str = arr[0].name;
    for (let i = 1; i < arr.length; i++) {
      str += ", " + arr[i].name;
    }
    return str;
  }

  return (
    <>
      { props.value === props.index &&
        <>
          { loading ?
            <Loading_Page />
            :
            <>
              { release_components === undefined ?
                <No_Results>
                  <Typography variant="h6">
                    {`No results for releases "${props.search_value}"`}
                  </Typography>
                </No_Results>
                :
                <>
                  <Custom_Pagination 
                    current_page={page_number}
                    total_pages={total_pages}
                    handleChange={(event,value) => set_page_number(value)}
                  />
                  <Results>
                    {release_components}
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