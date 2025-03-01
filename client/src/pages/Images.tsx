/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Grid2 } from "@mui/material";
import ImageCard from "../components/ImageCard";
import React, { useEffect, useState } from "react";
import UploadFile from "../components/uploadComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getImages } from "../store/features/images/imagesAction";
import PaginationButtons from "../components/PaginationButtons";

const label = "Upload An Image";
const Images: React.FC = () => {
  const state = useSelector((state: RootState) => state.images);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState({ page: 1, limit: 5 });
  const [count, setCount] = useState(1);

  useEffect(() => {
    setCount(Math.ceil(state?.images?.totalDocuments / page?.limit));
  }, [page?.limit, state?.images?.totalDocuments]);


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch<AppDispatch>();
 

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage((prev) => ({ ...prev, page: value }));
  };

  useEffect(() => {
    async function test() {
      const data = await dispatch(getImages(page?.page)).unwrap();

      return data;
    }
    test();
  }, [dispatch, page?.page]);

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
          {state?.images?.totalDocuments > 0 &&
            state.images?.data?.map((item: any) => (
              <Grid2 key={item?.URL} sx={{ maxWidth: "100%" }}>
                <ImageCard item={item} />
              </Grid2>
            ))}
        </Grid2>
        <div className="flex justify-center w-full h-5 ">
          <PaginationButtons
            page={page?.page > 0 ? page?.page : 1}
            count={count > 0 ? count : 1}
            onChange={handleChange}
          />
        </div>
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
