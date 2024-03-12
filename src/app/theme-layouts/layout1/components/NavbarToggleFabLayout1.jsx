import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store/store";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import { selectFuseCurrentLayoutConfig } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import {
  navbarToggle,
  navbarToggleMobile,
} from "app/theme-layouts/shared-components/navbar/store/navbarSlice";
import NavbarToggleFab from "app/theme-layouts/shared-components/navbar/NavbarToggleFab";

/**
 * The navbar toggle fab layout 1.
 */
function NavbarToggleFabLayout1(props) {
  const { className } = props;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const dispatch = useAppDispatch();
  return (
    <NavbarToggleFab
      className={className}
      onClick={() => {
        dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
      }}
      position={config.navbar.position}
    />
  );
}

export default NavbarToggleFabLayout1;
