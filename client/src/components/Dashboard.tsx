import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          borderRight: "0.3px solid",
          borderColor: "gray",
          bgcolor: "transparent",
          color: "white",
          width: 256,
          p: 2,
          mt: "calc(var(--template-frame-height, 0px) + 85px)",
        },
        className: "p-4",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <h2 className="text-2xl font-bold pl-10 ">My Sidebar</h2>
      </Box>
      <List className="flex justify-center items-center flex-col">
        <ListItemButton className="hover:bg-gray-700 rounded ">
          <ListItemText
            primary={
              <Link to="/dashboard" className="w-full ">
                Dashboard
              </Link>
            }
          />
        </ListItemButton>
        <ListItemButton className="hover:bg-gray-700 rounded">
          <ListItemText
            primary={
              <Link to="/signin" className="w-full">
                Images
              </Link>
            }
          />
        </ListItemButton>
        <ListItemButton className="hover:bg-gray-700 rounded">
          <ListItemText
            primary={
              <Link to="/video" className="w-full">
                Video
              </Link>
            }
          />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;
