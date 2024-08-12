import { styled, Typography } from "@mui/material";
import { Track } from "./track";

export const Track_Section = (props) => {

  return (
    <Section>
      <Typography variant="h5">Tracks</Typography>
      <Track_Container>
        <Track number="Title" duration_heading="Duration"/>
        {props.tracks.map((track, index) => 
          <Track 
            key={index}
            number={track.position}
            title={track.title}
            duration={track.length}
          />
        )}
      </Track_Container>
    </Section>
  )
}

const Section = styled('section')(({ theme }) => 
  `
    background-color: ${theme.palette.primary.main}20;
    padding: 20px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: min-content;
    width: auto;
  `
);

const Track_Container = styled('div')(({ theme }) => 
  `
    background-color: ${theme.palette.background.default}95;
    display: flex; 
    flex-direction: column;
  `
);