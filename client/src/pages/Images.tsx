/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Grid2 } from "@mui/material";
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
  const state = useSelector((state: RootState) => state.images);
  const dispatch = useDispatch<AppDispatch>();
  console.log(state.images);

  useEffect(() => {
    async function test() {
      const data = await dispatch(getImages()).unwrap();

      return data;
    }
    test();
  }, [dispatch]);

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
            className="bg-blue-600 w-[10%] p-2 font-semibold rounded-md"
          >
            Upload
          </button>
        </div>
        <Grid2
          container
          spacing={3}
          justifyContent="center"
          sx={{ flexWrap: "wrap" }}
        >
          {state.images &&
            state.images?.map((item: any) => (
              <Grid2 key={item?.URL} sx={{ maxWidth: "100%" }}>
                <ImageCard item={item} />
              </Grid2>
            ))}
        </Grid2>
      </Container>
      {open && (
        <UploadFile
          open={open}
          handleClose={handleClose}
          label={label}
          fileType="image"
        />
      )}
    </Box>
  );
};

export default Images;
