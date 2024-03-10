import IconButton from "@mui/material/IconButton";
import { useAppDispatch } from "app/store/store";
import {
  selectFuseCurrentSettings,
  setDefaultSettings,
} from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import _ from "@lodash";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { useSelector } from "react-redux";
import { navbarToggle, navbarToggleMobile } from "./store/navbarSlice";

/**
 * The navbar toggle button.
 */
function NavbarToggleButton(props) {
  const {
    className = "",
    children = (
      <FuseSvgIcon size={20} color="white">
        heroicons-outline:view-list
      </FuseSvgIcon>
    ),
  } = props;
  const dispatch = useAppDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const settings = useSelector(selectFuseCurrentSettings);
  const { config } = settings.layout;
  return (
    <IconButton
      className={className}
      color="inherit"
      size="small"
      onClick={() => {
        if (isMobile) {
          dispatch(navbarToggleMobile());
        } else if (config?.navbar?.style === "style-2") {
          dispatch(
            setDefaultSettings(
              _.set(
                {},
                "layout.config.navbar.folded",
                !settings?.layout?.config?.navbar?.folded
              )
            )
          );
        } else {
          dispatch(navbarToggle());
        }
      }}
    >
      {children}
    </IconButton>
  );
}

export default NavbarToggleButton;
