import React from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { deleteVideo } from "../store/features/videos/videoAction";
import { toast } from "react-toastify";

type VideoCardType = {
  item: {
    _id: string;
    URL: string;
    UserID: string;
    createdAt: Date;
    key: string;
  };
};

const VideoCard: React.FC<VideoCardType> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
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
        poster={
          item?.URL ??
          "https://via.placeholder.com/280x200?text=Video+Thumbnail"
        }
        style={{ objectFit: "cover" }}
      >
        <source
          src={
            item?.URL ??
            "https://via.placeholder.com/280x200?text=Video+Thumbnail"
          }
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
        onClick={() => {
          const data = dispatch(deleteVideo(item._id)).unwrap();

          data.then((item) =>
            item?.statusCode === 200
              ? toast.success("video deleted successfully")
              : toast.success("Failed to deleted video")
          );
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default VideoCard;
