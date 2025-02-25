import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const Dashboard: React.FC = () => {
  // Dummy data for demonstration
  const totalImages = 120;
  const totalVideos = 45;
  const totalUsers = 300;
  const totalPosts = 160;

  return (
    <Box
      id="dashboard"
      sx={{
        width: "85%",
        display: "flex",
        position: "absolute",
        right: 0,
        marginTop: "-4%",
        justifyContent: "center",
        overflowX: "hidden",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Images
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalImages}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Videos
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalVideos}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Users
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalUsers}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ boxShadow: 3, p: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Total Posts
                </Typography>
                <Typography variant="h4" color="primary">
                  {totalPosts}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
