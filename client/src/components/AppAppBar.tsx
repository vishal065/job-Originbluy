import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import type {} from "@mui/material/themeCssVarsAugmentation";
import ColorModeIconDropdown from "./ColorModeIconDropdown";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const state = useSelector((state: RootState) => state.auth);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,

        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
      className="z-50 flex "
    >
      <Container maxWidth="lg">
        <StyledToolbar
          variant="dense"
          disableGutters
          className="bg-white dark:bg-gray-800  "
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              gap: 1,
              alignItems: "center",
            }}
            className="space-x-2"
          >
            {state ? (
              <div>
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  className="hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Link to={`/signin`}>Sign in</Link>
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  className="hover:bg-blue-600"
                >
                  <Link to={`/signup`}>Sign up</Link>
                </Button>
              </div>
            ) : (
              <Button
                color="primary"
                variant="text"
                size="small"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={() => ""}
              >
                logout
              </Button>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box
            sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}
            className="flex items-center space-x-2"
          >
            <ColorModeIconDropdown size="medium" />
            <IconButton
              aria-label="Menu button"
              onClick={toggleDrawer(true)}
              className="text-gray-800 dark:text-gray-200"
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box
                sx={{ p: 2, backgroundColor: "background.default" }}
                className="bg-white dark:bg-gray-800"
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton
                    onClick={toggleDrawer(false)}
                    className="text-gray-800 dark:text-gray-200"
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 3 }} />
                <MenuItem>
                  <Button color="primary" variant="contained" fullWidth>
                    <Link to={`/signup`}>Sign up</Link>
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button color="primary" variant="outlined" fullWidth>
                    <Link to={`/signin`}>Sign in</Link>
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
