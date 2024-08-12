import { CircularProgress, styled } from "@mui/material";

export const Loading_Page = () => {
  return (
    <Loader>
      <CircularProgress size={100}/>
    </Loader>
  )
}

const Loader = styled('div')(() => 
  `
    position: absolute;
    left: 50%;
    top: 50%;
    display: flex;
    transform: translate(-50%, -50%);
  `
);