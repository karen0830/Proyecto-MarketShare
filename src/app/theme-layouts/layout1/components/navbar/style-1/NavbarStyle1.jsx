import Hidden from "@mui/material/Hidden";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useSelector } from "react-redux";
import { selectFuseCurrentLayoutConfig } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import { useAppDispatch } from "app/store/store";
import {
  navbarCloseMobile,
  selectFuseNavbar,
} from "app/theme-layouts/shared-components/navbar/store/navbarSlice";
import NavbarStyle1Content from "./NavbarStyle1Content";

const navbarWidth = 280;
const StyledNavBar = styled("div")(({ theme, open, position }) => ({
  minWidth: navbarWidth,
  width: navbarWidth,
  maxWidth: navbarWidth,
  ...(!open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(position === "left" && {
      marginLeft: `-${navbarWidth}px`,
    }),
    ...(position === "right" && {
      marginRight: `-${navbarWidth}px`,
    }),
  }),
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const StyledNavBarMobile = styled(SwipeableDrawer)(() => ({
  "& .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
  },
}));

/**
 * The navbar style 1.
 */
function NavbarStyle1() {
  const dispatch = useAppDispatch();
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const navbar = useSelector(selectFuseNavbar);
  return (
    <>
      <Hidden lgDown>
        <StyledNavBar
          className="sticky top-0 z-20 h-screen flex-auto shrink-0 flex-col overflow-hidden shadow"
          open={navbar.open}
          position={config.navbar.position}
          style={{ borderRight: '1px solid rgba(47, 51, 54, 1)' }}
        >
          <NavbarStyle1Content />
        </StyledNavBar>
      </Hidden>

      <Hidden lgUp>
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full",
          }}
          anchor={config.navbar.position}
          variant="temporary"
          open={navbar.mobileOpen}
          onClose={() => dispatch(navbarCloseMobile())}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <NavbarStyle1Content />
        </StyledNavBarMobile>
      </Hidden>
    </>
  );
}

export default NavbarStyle1;
