import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AppTheme from "./AppTheme";
import { CssBaseline } from "@mui/material";

export default function PaginationButtons(props: {
  disableCustomTheme?: boolean;
  page: number;
  count: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Stack spacing={2} className="absolute bottom-4">
        <Pagination
          onChange={props.onChange}
          page={props?.page}
          count={props?.count}
          //   showFirstButton
          //   showLastButton
        />
      </Stack>
    </AppTheme>
  );
}
