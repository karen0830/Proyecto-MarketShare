import AppBar from "@mui/material/AppBar";
import { ThemeProvider } from "@mui/material/styles";
import { memo } from "react";
import { useSelector } from "react-redux";
import { selectFooterTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import clsx from "clsx";

/**
 * The footer layout 1.
 */
function FooterLayout1(props) {
  const { className } = props;
  const footerTheme = useSelector(selectFooterTheme);
  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar
        id="fuse-footer"
        className={clsx("relative z-20 shadow", className)}
        color="default"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? footerTheme.palette.background.paper
              : footerTheme.palette.background.default,
        }}
        elevation={0}
      ></AppBar>
    </ThemeProvider>
  );
}

export default memo(FooterLayout1);
