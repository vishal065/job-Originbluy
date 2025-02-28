import { Box, Container, Grid2 } from "@mui/material";
import VideoCard from "../components/videoCard";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import UploadFile from "../components/uploadComponent";
import { useEffect, useState } from "react";
import { getVideos, Video } from "../store/features/videos/videoAction";
import PaginationButtons from "../components/PaginationButtons";

const label = "Upload a video";

function Videos() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const state = useSelector((state: RootState) => state.videos);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    dispatch(getVideos());
  }, [dispatch]);

  return (
    <Box
      id="hero"
      sx={{
        width: "85%",
        display: "flex",
        position: "absolute",
        right: 5,
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <div className="flex w-full justify-end  mx-2 -mt-12 mb-12  ">
          <button
            onClick={handleClickOpen}
            className="bg-blue-600 w-[10%] p-2 font-semibold rounded-md"
          >
            Upload
          </button>
        </div>
        <Grid2 container spacing={3} paddingX={"20px"}>
          {state?.videos &&
            state.videos?.map((item: Video) => (
              <Grid2 key={item._id}>
                <VideoCard item={item} />
              </Grid2>
            ))}
        </Grid2>
        <div className="flex justify-center">
          <PaginationButtons
            page={page > 0 ? page : 1}
            onChange={handleChange}
          />
        </div>
      </Container>
      {open && (
        <UploadFile
          open={open}
          handleClose={handleClose}
          label={label}
          fileType="video"
        />
      )}
    </Box>
  );
}

export default Videos;
