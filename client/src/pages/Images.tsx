import { Box, Container, Grid } from "@mui/material";
import ImageCard from "../components/ImageCard";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/uploadComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getImages } from "../store/features/images/imagesAction";

const label = "Upload An Image";
const Images: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useSelector((state: RootState) => state.images);
  const dispatch = useDispatch<AppDispatch>();

  // const jsonString = JSON.parse(localStorage.getItem("persist:root"));

  // const authData = JSON.parse(jsonString.auth).auth;
  // console.log(authData);

  useEffect(() => {
    dispatch(getImages());
    console.log();
  }, []);

  return (
    <Box
      id="hero"
      sx={{
        marginLeft: "17%",
        padding: "1%",
        maxWidth: "80%",
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <div className="flex w-full justify-end  mx-2 -mt-12 mb-12 ">
          <button
            onClick={handleClickOpen}
            className="bg-blue-600 w-[10%] p-2 font-semibold rounded-md "
          >
            Upload
          </button>
        </div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ flexWrap: "wrap" }} // Ensures no overflow
        >
          {["1", "2", "3", "4", "5"].map((imageUrl) => (
            <Grid
              item
              key={imageUrl}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2.5}
              sx={{ maxWidth: "100%" }}
            >
              <ImageCard />
            </Grid>
          ))}
        </Grid>
      </Container>
      {open && (
        <UploadFile open={open} handleClose={handleClose} label={label} />
      )}
    </Box>
  );
};

export default Images;
