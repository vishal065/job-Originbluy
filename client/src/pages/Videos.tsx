import { Box, Container, Grid } from "@mui/material";
import VideoCard from "../components/videoCard";

function Videos() {
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
          flexDirection: "column",

          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Grid
          container
          spacing={3}
          justifyContent="end"
          alignSelf={""}
          alignContent={"end"}
          justifySelf={"end"}
          paddingX={"20px"}
        >
          {["1", "2", "3", "4", "5"].map((videoId) => (
            <Grid item key={videoId} xs={12} sm={6} md={4} lg={3}>
              <VideoCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Videos;
