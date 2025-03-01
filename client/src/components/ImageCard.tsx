import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteImage } from "../store/features/images/imagesAction";
import { AppDispatch } from "../store/store";
import { toast } from "react-toastify";

interface ImageCardProps {
  item: {
    _id: string;
    URL: string;
  };
}

const ImageCard: React.FC<ImageCardProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 280, // Ensures it doesn't stretch
        boxShadow: 3,

        position: "relative",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={
          item?.URL ??
          "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
        }
        alt="Display"
        sx={{
          objectFit: "cover",
        }}
      />
      <IconButton
        aria-label="delete"
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "rgba(255,255,255,0.8)",
          "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
        }}
        onClick={async () => {
          try {
            const data = await dispatch(deleteImage(item?._id)).unwrap();
            if (data?.statusCode === 200) {
              toast.success("Image deleted successfully");
            } else {
              toast.error("Failed to delete image");
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            toast.error("Error deleting image");
          }
        }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Card>
  );
};

export default ImageCard;
