import { createContext, useCallback, useContext, useMemo } from "react";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import { useAppDispatch } from "app/store/store";
import FuseSplashScreen from "@fuse/core/FuseSplashScreen/FuseSplashScreen";
import {
  resetUser,
  selectUser,
  selectUserRole,
  setUser,
  updateUser,
  userSlice,
} from "src/app/auth/user/store/userSlice";
import BrowserRouter from "@fuse/core/BrowserRouter";
import firebase from "firebase/compat/app";
import _ from "@lodash";
import { useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import useJwtAuth from "./services/jwt/useJwtAuth";
import useFirebaseAuth from "./services/firebase/useFirebaseAuth";
import UserModel from "./user/models/UserModel";

const AuthContext = createContext({
  isAuthenticated: false,
});

function AuthRoute(props) {
  const { children } = props;
  const dispatch = useAppDispatch();
  const user = useSelector(selectUser);
  /**
   * Get user role from store
   */
  const userRole = useSelector(selectUserRole);
  /**
   * Jwt auth service
   */
  const jwtService = useJwtAuth({
    config: {
      tokenStorageKey: "jwt_access_token",
      signInUrl: "mock-api/auth/sign-in",
      signUpUrl: "mock-api/auth/sign-up",
      tokenRefreshUrl: "mock-api/auth/refresh",
      getUserUrl: "mock-api/auth/user",
      updateUserUrl: "mock-api/auth/user",
      updateTokenFromHeader: true,
    },
    onSignedIn: (user) => {
      console.log("user: ", user);
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedUp: (user) => {
      dispatch(setUser(user));
      setAuthService("jwt");
    },
    onSignedOut: () => {
      dispatch(resetUser());
      resetAuthService();
    },
    onUpdateUser: (user) => {
      dispatch(updateUser(user));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    },
  });
  /**
   * Firebase auth service
   */
  const firebaseService = useFirebaseAuth({
    onSignedIn: (_user) => {
      firebase
        .database()
        .ref(`users/${_user.uid}`)
        .once("value")
        .then((snapshot) => {
          const user = snapshot.val();
          dispatch(setUser(user));
          setAuthService("firebase");
        });
    },
    onSignedUp: (userCredential, displayName) => {
      const _user = userCredential.user;
      const user = UserModel({
        uid: _user.uid,
        role: ["admin"],
        data: {
          displayName,
          email: _user.email,
        },
      });
      firebaseService.updateUser(user);
      setAuthService("firebase");
    },
    onSignedOut: () => {
      dispatch(resetUser());
      resetAuthService();
    },
    onUpdateUser: (user) => {
      dispatch(updateUser(user));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    },
  });
  /**
   * Check if services is in loading state
   */
  const isLoading = useMemo(
    () => jwtService?.isLoading || firebaseService?.isLoading,
    [jwtService?.isLoading, firebaseService?.isLoading]
  );
  /**
   * Check if user is authenticated
   */
  const isAuthenticated = useMemo(
    () => jwtService?.isAuthenticated || firebaseService?.isAuthenticated,
    [jwtService?.isAuthenticated, firebaseService?.isAuthenticated]
  );
  /**
   * Combine auth services
   */
  const combinedAuth = useMemo(
    () => ({
      jwtService,
      firebaseService,
      signOut: () => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.signOut();
        }

        if (authService === "firebase") {
          return firebaseService?.signOut();
        }

        return null;
      },
      updateUser: (userData) => {
        const authService = getAuthService();

        if (authService === "jwt") {
          return jwtService?.updateUser(userData);
        }

        if (authService === "firebase") {
          return firebaseService?.updateUser(_.merge({}, user, userData));
        }

        return null;
      },
      isAuthenticated,
    }),
    [isAuthenticated, user]
  );
  /**
   * Get auth service
   */
  const getAuthService = useCallback(() => {
    return localStorage.getItem("authService");
  }, []);
  /**
   * Set auth service
   */
  const setAuthService = useCallback((authService) => {
    if (authService) {
      localStorage.setItem("authService", authService);
    }
  }, []);
  /**
   * Reset auth service
   */
  const resetAuthService = useCallback(() => {
    localStorage.removeItem("authService");
  }, []);

  /**
   * Render loading screen while loading user data
   */
  if (isLoading) {
    return <FuseSplashScreen />;
  }

  return (
    <AuthContext.Provider value={combinedAuth}>
      <BrowserRouter>
        <FuseAuthorization userRole={userRole}>{children}</FuseAuthorization>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within a AuthRouteProvider");
  }

  return context;
}

const AuthRouteProvider = withReducer("user", userSlice.reducer)(AuthRoute);
export { useAuth, AuthRouteProvider };
