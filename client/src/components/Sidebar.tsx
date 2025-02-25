import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Theme } from "@mui/system";

const Sidebar: React.FC = () => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  ); // Check if screen is below 'md' breakpoint
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menu Button for Mobile */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
            zIndex: 1301,
          }}
        >
          <MenuIcon fontSize="large" />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            borderRight: "0.3px solid",
            borderColor: "gray",
            bgcolor: "transparent",
            color: "white",
            width: "15%",
            p: 2,
            mt: isMobile ? 0 : "calc(var(--template-frame-height, 0px) + 85px)",
          },
        }}
      >
        <Box sx={{ mb: 3 }}>
          <h2 className="text-2xl font-bold pl-10">My Sidebar</h2>
        </Box>
        <List className="flex justify-center items-center flex-col">
          <ListItemButton
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 rounded"
          >
            <ListItemText
              primary={
                <Link to="/" className="w-full">
                  Dashboard
                </Link>
              }
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 rounded"
          >
            <ListItemText
              primary={
                <Link to="/images" className="w-full">
                  Images
                </Link>
              }
            />
          </ListItemButton>
          <ListItemButton
            onClick={() => setOpen(false)}
            className="hover:bg-gray-700 rounded"
          >
            <ListItemText
              primary={
                <Link to="/videos" className="w-full">
                  Video
                </Link>
              }
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
