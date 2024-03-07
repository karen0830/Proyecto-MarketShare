import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import _ from '@lodash';

const defaultAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	signInUrl: 'api/auth/sign-in',
	signUpUrl: 'api/auth/sign-up',
	tokenRefreshUrl: 'api/auth/refresh',
	getUserUrl: 'api/auth/user',
	updateUserUrl: 'api/auth/user',
	updateTokenFromHeader: false
};
/**
 * useJwtAuth hook
 * Description: This hook handles the authentication flow using JWT
 * It uses axios to make the HTTP requests
 * It uses jwt-decode to decode the access token
 * It uses localStorage to store the access token
 * It uses Axios interceptors to update the access token from the response headers
 * It uses Axios interceptors to sign out the user if the refresh token is invalid or expired
 */
const useJwtAuth = (props) => {
	const { config, onSignedIn, onSignedOut, onSignedUp, onError, onUpdateUser } = props;
	// Merge default config with the one from the props
	const authConfig = _.defaults(config, defaultAuthConfig);
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	/**
	 * Set session
	 */
	const setSession = useCallback((accessToken) => {
		if (accessToken) {
			localStorage.setItem(authConfig.tokenStorageKey, accessToken);
			axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		}
	}, []);
	const resetSession = useCallback(() => {
		localStorage.removeItem(authConfig.tokenStorageKey);
		delete axios.defaults.headers.common.Authorization;
	}, []);
	/**
	 * Get access token from local storage
	 */
	const getAccessToken = useCallback(() => {
		return localStorage.getItem(authConfig.tokenStorageKey);
	}, []);
	/**
	 * Handle sign-in success
	 */
	const handleSignInSuccess = useCallback((userData, accessToken) => {
		setSession(accessToken);
		setIsAuthenticated(true);
		setUser(userData);
		onSignedIn(userData);
	}, []);
	/**
	 * Handle sign-up success
	 */
	const handleSignUpSuccess = useCallback((userData, accessToken) => {
		setSession(accessToken);
		setIsAuthenticated(true);
		setUser(userData);
		onSignedUp(userData);
	}, []);
	/**
	 * Handle sign-in failure
	 */
	const handleSignInFailure = useCallback((error) => {
		resetSession();
		setIsAuthenticated(false);
		setUser(null);
		handleError(error);
	}, []);
	/**
	 * Handle sign-up failure
	 */
	const handleSignUpFailure = useCallback((error) => {
		resetSession();
		setIsAuthenticated(false);
		setUser(null);
		handleError(error);
	}, []);
	/**
	 * Handle error
	 */
	const handleError = useCallback((error) => {
		onError(error);
	}, []);
	/**
	 * Check if the access token is valid
	 */
	const isTokenValid = useCallback((accessToken) => {
		if (accessToken) {
			try {
				const decoded = jwtDecode(accessToken);
				const currentTime = Date.now() / 1000;
				return decoded.exp > currentTime;
			} catch (error) {
				return false;
			}
		}

		return false;
	}, []);
	/**
	 * Check if the access token exist and is valid on mount
	 * If it is, set the user and isAuthenticated states
	 * If not, clear the session
	 */
	useEffect(() => {
		const attemptAutoLogin = async () => {
			const accessToken = getAccessToken();

			if (isTokenValid(accessToken)) {
				try {
					setIsLoading(true);
					const response = await axios.get(authConfig.getUserUrl, {
						headers: { Authorization: `Bearer ${accessToken}` }
					});
					const userData = response?.data;
					handleSignInSuccess(userData, accessToken);
					return true;
				} catch (error) {
					const axiosError = error;
					handleSignInFailure(axiosError);
					return false;
				}
			} else {
				resetSession();
				return false;
			}
		};

		if (!isAuthenticated) {
			attemptAutoLogin().then(() => {
				setIsLoading(false);
			});
		}
	}, [
		isTokenValid,
		setSession,
		handleSignInSuccess,
		handleSignInFailure,
		handleError,
		getAccessToken,
		isAuthenticated
	]);
	/**
	 * Sign in
	 */
	const signIn = async (credentials) => {
		const response = axios.post(authConfig.signInUrl, credentials);
		response.then(
			(res) => {
				const userData = res?.data?.user;
				const accessToken = res?.data?.access_token;
				handleSignInSuccess(userData, accessToken);
				return userData;
			},
			(error) => {
				const axiosError = error;
				handleSignInFailure(axiosError);
				return axiosError;
			}
		);
		return response;
	};
	/**
	 * Sign up
	 */
	const signUp = useCallback((data) => {
		const response = axios.post(authConfig.signUpUrl, data);
		response.then(
			(res) => {
				const userData = res?.data?.user;
				const accessToken = res?.data?.access_token;
				handleSignUpSuccess(userData, accessToken);
				return userData;
			},
			(error) => {
				const axiosError = error;
				handleSignUpFailure(axiosError);
				return axiosError;
			}
		);
		return response;
	}, []);
	/**
	 * Sign out
	 */
	const signOut = useCallback(() => {
		resetSession();
		setIsAuthenticated(false);
		setUser(null);
		onSignedOut();
	}, []);
	/**
	 * Update user
	 */
	const updateUser = useCallback(async (userData) => {
		try {
			const response = await axios.put(authConfig.updateUserUrl, userData);
			const updatedUserData = response?.data;
			onUpdateUser(updatedUserData);
			return null;
		} catch (error) {
			const axiosError = error;
			handleError(axiosError);
			return axiosError;
		}
	}, []);
	/**
	 * Refresh access token
	 */
	const refreshToken = async () => {
		setIsLoading(true);
		try {
			const response = await axios.post(authConfig.tokenRefreshUrl);
			const accessToken = response?.headers?.['New-Access-Token'];

			if (accessToken) {
				setSession(accessToken);
				return accessToken;
			}

			return null;
		} catch (error) {
			const axiosError = error;
			handleError(axiosError);
			return axiosError;
		}
	};
	/**
	 * if a successful response contains a new Authorization header,
	 * updates the access token from it.
	 *
	 */
	useEffect(() => {
		if (authConfig.updateTokenFromHeader && isAuthenticated) {
			axios.interceptors.response.use(
				(response) => {
					const newAccessToken = response?.headers?.['New-Access-Token'];

					if (newAccessToken) {
						setSession(newAccessToken);
					}

					return response;
				},
				(error) => {
					const axiosError = error;

					if (axiosError?.response?.status === 401) {
						signOut();
						// eslint-disable-next-line no-console
						console.warn('Unauthorized request. User was signed out.');
					}

					return Promise.reject(axiosError);
				}
			);
		}
	}, [isAuthenticated]);
	return { user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUser, refreshToken, setIsLoading };
};
export default useJwtAuth;
