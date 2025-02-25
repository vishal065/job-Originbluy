import { Box, Container } from "@mui/material";

function Home() {
  return (
    <Box
      id="hero"
      sx={() => ({
        width: "100%",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <div className="">
          <h1 className="text-2xl p-2">
            Login or Sign up to upload images or video
          </h1>
        </div>
      </Container>
    </Box>
  );
}

export default Home;
