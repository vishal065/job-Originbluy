import { Box, Container, Grid } from "@mui/material";
import ImageCard from "../components/ImageCard";

function Images() {
  return (
    <Box
      id="hero"
      sx={{
        marginLeft:"17%",
        padding:"1%",
        maxWidth: "80%", // Prevents overflow beyond its container
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden", // Ensures no horizontal scroll
      }}
    >
      <Container
        maxWidth="lg" // Keeps the grid contained
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ flexWrap: "wrap" }} // Ensures no overflow
        >
          {["1", "2", "3", "4", "5"].map((imageUrl) => (
            <Grid item key={imageUrl} xs={12} sm={6} md={4} lg={3} xl={2.5} sx={{ maxWidth: "100%" }}>
              <ImageCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Images;
