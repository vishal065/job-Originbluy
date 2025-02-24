import CssBaseline from "@mui/material/CssBaseline";
import AppTheme from "../components/AppTheme";
import AppAppBar from "../components/AppAppBar";

export default function Navbar(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
    </AppTheme>
  );
}
