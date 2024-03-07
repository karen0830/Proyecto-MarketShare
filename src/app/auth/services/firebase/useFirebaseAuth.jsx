import { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { firebaseInitialized } from './initializeFirebase';

const useFirebaseAuth = (props) => {
	const { onSignedIn, onSignedUp, onUpdateUser, onSignedOut, onError, enabled = true } = props;
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	if (!firebaseInitialized || !enabled) {
		return null;
	}

	// Effect to handle the initial authentication state
	useEffect(() => {
		let isInitialCheck = true;
		const unsubscribe =
			firebase.apps.length &&
			firebase.auth().onAuthStateChanged(
				(user) => {
					if (user && !isAuthenticated) {
						setUser(user);
						setIsAuthenticated(true);
						onSignedIn?.(user);
					} else if (!isInitialCheck && isAuthenticated) {
						setUser(null);
						setIsAuthenticated(false);
						onSignedOut?.();
					}

					setIsLoading(false);
					isInitialCheck = false;
				},
				(error) => {
					onError?.(error);
					setIsLoading(false);
				}
			);
		return unsubscribe;
	}, [isAuthenticated]);
	const signIn = useCallback((email, password) => {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}, []);
	const signUp = useCallback((email, password, displayName) => {
		const signUpResponse = new Promise((resolve, reject) => {
			firebase
				.auth()
				.createUserWithEmailAndPassword(email, password)
				.then((userCredential) => {
					onSignedUp(userCredential, displayName);
					resolve(userCredential);
				})
				.catch((_error) => {
					const error = _error;
					onError?.(error);
					reject(error);
				});
		});
		return signUpResponse;
	}, []);
	const signOut = useCallback(() => {
		return firebase.auth().signOut();
	}, []);
	const updateUser = useCallback((_user) => {
		if (!_user) {
			return Promise.reject(new Error('No user is signed in'));
		}

		firebase.database().ref(`users/${_user.uid}`).set(_user);
		onUpdateUser?.(_user);
		return Promise.resolve(_user);
	}, []);
	return {
		user,
		isAuthenticated,
		isLoading,
		signIn,
		signUp,
		signOut,
		updateUser,
		enabled,
		setIsLoading
	};
};
export default useFirebaseAuth;
