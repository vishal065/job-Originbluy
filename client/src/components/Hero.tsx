import { Box, Container } from "@mui/material";

function Hero() {
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
        {" "}
        <div className=""></div>
      </Container>
    </Box>
  );
}

export default Hero;
