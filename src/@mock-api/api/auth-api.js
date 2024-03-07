/*
eslint-disable camelcase
 */
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Base64 from 'crypto-js/enc-base64';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Utf8 from 'crypto-js/enc-utf8';
import jwtDecode from 'jwt-decode';
import UserModel from 'src/app/auth/user/models/UserModel';
import axios from 'axios';
import mockApi from '../mock-api.json';

let usersApi = mockApi.components.examples.auth_users.value;
export const authApiMocks = (mock) => {
	mock.onPost('/auth/sign-in').reply((config) => {
		const data = JSON.parse(config.data);
		const { email, password } = data;
		const user = _.cloneDeep(usersApi.find((_user) => _user.data.email === email));
		const error = [];

		if (!user) {
			error.push({
				type: 'email',
				message: 'Check your email address'
			});
		}

		if (user && user.password !== password) {
			error.push({
				type: 'password',
				message: 'Check your password'
			});
		}

		if (error.length === 0) {
			delete user.password;
			const access_token = generateJWTToken({ id: user.uid });
			const response = {
				user,
				access_token
			};
			return [200, response];
		}

		return [400, error];
	});
	mock.onPost('/auth/refresh').reply((config) => {
		const newTokenResponse = generateAccessToken(config);

		if (newTokenResponse) {
			const { access_token } = newTokenResponse;
			return [200, null, { 'New-Access-Token': access_token }];
		}

		const error = 'Invalid access token detected or user not found';
		return [401, { data: error }];
	});
	mock.onGet('/auth/user').reply((config) => {
		const newTokenResponse = generateAccessToken(config);

		if (newTokenResponse) {
			const { access_token, user } = newTokenResponse;
			return [200, user, { 'New-Access-Token': access_token }];
		}

		const error = 'Invalid access token detected or user not found';
		return [401, { error }];
	});

	function generateAccessToken(config) {
		const authHeader = config.headers.Authorization;

		if (!authHeader) {
			return null;
		}

		const [scheme, access_token] = authHeader.split(' ');

		if (scheme !== 'Bearer' || !access_token) {
			return null;
		}

		if (verifyJWTToken(access_token)) {
			const { id } = jwtDecode(access_token);
			const user = _.cloneDeep(usersApi.find((_user) => _user.uid === id));

			if (user) {
				delete user.password;
				const access_token = generateJWTToken({ id: user.uid });
				return { access_token, user };
			}
		}

		return null;
	}

	mock.onPost('/auth/sign-up').reply((request) => {
		const data = JSON.parse(request.data);
		const { displayName, password, email } = data;
		const isEmailExists = usersApi.find((_user) => _user.data.email === email);
		const error = [];

		if (isEmailExists) {
			error.push({
				type: 'email',
				message: 'The email address is already in use'
			});
		}

		if (error.length === 0) {
			const newUser = UserModel({
				role: ['admin'],
				data: {
					displayName,
					photoURL: 'assets/images/avatars/Abbott.jpg',
					email,
					shortcuts: [],
					settings: {}
				}
			});
			newUser.uid = FuseUtils.generateGUID();
			newUser.password = password;
			usersApi = [...usersApi, newUser];
			const user = _.cloneDeep(newUser);
			delete user.password;
			const access_token = generateJWTToken({ id: user.uid });
			const response = {
				user,
				access_token
			};
			return [200, response];
		}

		return [200, { error }];
	});
	mock.onPut('/auth/user').reply((config) => {
		const access_token = config?.headers?.Authorization;
		const userData = jwtDecode(access_token);
		const uid = userData.id;
		const user = JSON.parse(config.data);
		let updatedUser;
		usersApi = usersApi.map((_user) => {
			if (uid === _user.uid) {
				updatedUser = _.assign({}, _user, user);
			}

			return _user;
		});
		delete updatedUser.password;
		return [200, updatedUser];
	});
	/**
	 * JWT Token Generator/Verifier Helpers
	 * !! Created for Demonstration Purposes, cannot be used for PRODUCTION
	 */
	const jwtSecret = 'some-secret-code-goes-here';
	/* eslint-disable */
    function base64url(source) {
        // Encode in classical base64
        let encodedSource = Base64.stringify(source);
        // Remove padding equal characters
        encodedSource = encodedSource.replace(/=+$/, '');
        // Replace characters according to base64url specifications
        encodedSource = encodedSource.replace(/\+/g, '-');
        encodedSource = encodedSource.replace(/\//g, '_');
        // Return the base64 encoded string
        return encodedSource;
    }
    function generateJWTToken(tokenPayload) {
        // Define token header
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };
        // Calculate the issued at and expiration dates
        const date = new Date();
        const iat = Math.floor(date.getTime() / 1000);
        const exp = Math.floor(date.setDate(date.getDate() + 7) / 1000);
        // Define token payload
        const payload = {
            iat,
            iss: 'Fuse',
            exp,
            ...tokenPayload
        };
        // Stringify and encode the header
        const stringifiedHeader = Utf8.parse(JSON.stringify(header));
        const encodedHeader = base64url(stringifiedHeader);
        // Stringify and encode the payload
        const stringifiedPayload = Utf8.parse(JSON.stringify(payload));
        const encodedPayload = base64url(stringifiedPayload);
        // Sign the encoded header and mock-api
        let signature = `${encodedHeader}.${encodedPayload}`;
        // @ts-ignore
        signature = HmacSHA256(signature, jwtSecret);
        // @ts-ignore
        signature = base64url(signature);
        // Build and return the token
        return `${encodedHeader}.${encodedPayload}.${signature}`;
    }
    function verifyJWTToken(token) {
        // Split the token into parts
        const parts = token.split('.');
        const header = parts[0];
        const payload = parts[1];
        const signature = parts[2];
        // Re-sign and encode the header and payload using the secret
        const signatureCheck = base64url(HmacSHA256(`${header}.${payload}`, jwtSecret));
        // Verify that the resulting signature is valid
        return signature === signatureCheck;
    }
    // Generate Authorization header on each successfull response
    axios.interceptors.response.use((response) => {
        // get access token from response headers
        const requestHeaders = response.config.headers;
        const authorization = requestHeaders.Authorization;
        const accessToken = authorization?.split(' ')[1];
        const responseUrl = response.config.url;
        if (responseUrl.startsWith('/mock-api') && authorization) {
            if (!accessToken || !verifyJWTToken(accessToken)) {
                const error = new Error("Invalid access token detected.");
                // @ts-ignore
                error.status = 401;
                return Promise.reject(error);
            }
            const newAccessToken = generateAccessToken(response.config);
            if (newAccessToken) {
                response.headers['New-Access-Token'] = newAccessToken.access_token;
            }
            return response;
        }
        return response;
    });
};
