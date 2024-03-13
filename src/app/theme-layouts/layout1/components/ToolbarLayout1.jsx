import { ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Hidden from "@mui/material/Hidden";
import Toolbar from "@mui/material/Toolbar";
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  selectFuseCurrentLayoutConfig,
  selectToolbarTheme,
} from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import NavbarToggleButton from "app/theme-layouts/shared-components/navbar/NavbarToggleButton";
import { selectFuseNavbar } from "app/theme-layouts/shared-components/navbar/store/navbarSlice";
import NavigationShortcuts from "../../shared-components/navigation/NavigationShortcuts";
import UserMenu from "../../shared-components/UserMenu";

/**
 * The toolbar layout 1.
 */
function ToolbarLayout1(props) {
  const { className } = props;
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  const toolbarTheme = useSelector(selectToolbarTheme);
  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id="fuse-toolbar"
        className={clsx("relative z-20 flex shadow", className)}
        color="default"
        position="static"
        elevation={0}
        style={{
          backgroundColor: "#1c1c1c ",
          borderBottom: "1px solid rgba(47, 51, 54, 1)",
        }}
      >
        <Toolbar className="min-h-48 p-0 md:min-h-64">
          <div className="flex flex-1 px-16">
            {config.navbar.display && config.navbar.position === "left" && (
              <>
                {
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0 hover:bg-[#287bff]" />
                }
              </>
            )}

            <Hidden lgDown>
              <NavigationShortcuts />
            </Hidden>
          </div>

          <div className="flex h-full items-center overflow-x-auto px-8">
            {/* <LanguageSwitcher /> */}
            {/* <AdjustFontSize /> */}
            {/* <FullScreenToggle /> */}
            {/* <NavigationSearch /> */}
            {/* <QuickPanelToggleButton /> */}
            {/* <NotificationPanelToggleButton /> */}
            <UserMenu />
          </div>

          {config.navbar.display && config.navbar.position === "right" && (
            <>
              <Hidden lgDown>
                {!navbar.open && (
                  <NavbarToggleButton className="mx-0 h-40 w-40 p-0" />
                )}
              </Hidden>

              <Hidden lgUp>
                <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8 " />
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout1);
