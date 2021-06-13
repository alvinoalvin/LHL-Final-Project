import React from "react";
import {
  ThemeProvider,
  makeStyles,
  createMuiTheme
} from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import { purple } from "@material-ui/core/colors";


const theme = createMuiTheme({
  palette: {
    primary: purple
  }
});

export default function CustomizedInputs() {

  return (
    <form noValidate>
      <ThemeProvider theme={theme}>
        <TextField
          variant="outlined"
        />
      </ThemeProvider>
    </form>
  );
}
