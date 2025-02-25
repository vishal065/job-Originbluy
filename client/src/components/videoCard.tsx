import React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const VideoCard: React.FC = () => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 280,
        boxShadow: 3,
        position: "relative",
        
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <video
        width="100%"
        height="200"
        controls
        poster="https://via.placeholder.com/280x200?text=Video+Thumbnail"
        style={{ objectFit: "cover" }}
      >
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <IconButton
        aria-label="delete"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255,255,255,0.8)",
          "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default VideoCard;
