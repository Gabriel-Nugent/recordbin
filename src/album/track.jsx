import { styled, Typography } from "@mui/material";

export const Track = (props) => {
  
  function millisToMinutesAndSeconds(millis) {
    if (millis === undefined) {
      return ""
    }
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return (seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
  }
  
  return (
    <Track_Wrapper>
      <Left>
        <Track_Alt sx={{width: '20px'}}>{props.number}</Track_Alt>
        <Track_Text>{props.title}</Track_Text>
      </Left>
      <Right>
        <Track_Alt>{millisToMinutesAndSeconds(props.duration)}</Track_Alt>
        <Track_Alt>{props.duration_heading}</Track_Alt>
      </Right>
    </Track_Wrapper>
  )
}

const Track_Wrapper = styled('div')(({ theme }) => 
  `
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 100px;
    border-bottom: solid 2px ${theme.palette.background.default};
    padding: 10px 20px;
    color: grey;
    :hover {
      color: ${theme.palette.primary.main};
      border-bottom: solid 2px ${theme.palette.primary.main};
    }
  `
);

const Left = styled('div')(({ theme }) => 
  `
    color: inherit;
    display: flex;
    gap: 10px;
  `
);

const Right = styled('div')(({ theme }) => 
  `
    color: inherit;
  `
);

const Track_Alt = styled(Typography)(() => 
  `
    text-wrap: nowrap;
    color: inherit;
  `
);

const Track_Text = styled(Typography)(() => 
  `
    text-wrap: nowrap;
  `
);