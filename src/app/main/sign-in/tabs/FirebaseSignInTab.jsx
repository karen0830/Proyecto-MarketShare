import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import _ from '@lodash';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/app/auth/AuthRouteProvider';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from 'app/store/store';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';
/**
 * Form Validation Schema
 */
const schema = z.object({
	email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
	password: z
		.string()
		.min(4, 'Password is too short - must be at least 4 chars.')
		.nonempty('Please enter your password.')
});
const defaultValues = {
	email: '',
	password: '',
	remember: true
};

function FirebaseSignInTab() {
	const { firebaseService } = useAuth();
	const dispatch = useAppDispatch();
	const { control, formState, handleSubmit, setValue, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;
	useEffect(() => {
		setValue('email', 'hi@withinpixels.com', { shouldDirty: true, shouldValidate: true });
		setValue('password', 'dummyPassword', { shouldDirty: true, shouldValidate: true });
	}, [setValue]);

	function onSubmit(formData) {
		const { email, password } = formData;
		firebaseService?.signIn(email, password).catch((_error) => {
			const error = _error;
			const errors = [];
			const emailErrorCodes = [
				'auth/email-already-in-use',
				'auth/invalid-email',
				'auth/operation-not-allowed',
				'auth/user-not-found',
				'auth/user-disabled'
			];
			const passwordErrorCodes = ['auth/weak-password', 'auth/wrong-password'];

			if (emailErrorCodes.includes(error.code)) {
				errors.push({
					type: 'email',
					message: error.message
				});
			}

			if (passwordErrorCodes.includes(error.code)) {
				errors.push({
					type: 'password',
					message: error.message
				});
			}

			if (!emailErrorCodes.includes(error.code)) {
				dispatch(showMessage({ message: error.message }));
			}

			errors.forEach((err) => {
				setError(err.type, {
					type: 'manual',
					message: err.message
				});
			});
		});
	}

	return (
		<div className="w-full">
			<form
				name="loginForm"
				noValidate
				className="mt-32 flex w-full flex-col justify-center"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="email"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-24"
							label="Email"
							autoFocus
							type="email"
							error={!!errors.email}
							helperText={errors?.email?.message}
							variant="outlined"
							required
							fullWidth
						/>
					)}
				/>

				<Controller
					name="password"
					control={control}
					render={({ field }) => (
						<TextField
							{...field}
							className="mb-24"
							label="Password"
							type="password"
							error={!!errors.password}
							helperText={errors?.password?.message}
							variant="outlined"
							required
							fullWidth
						/>
					)}
				/>

				<div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
					<Controller
						name="remember"
						control={control}
						render={({ field }) => (
							<FormControl>
								<FormControlLabel
									label="Remember me"
									control={
										<Checkbox
											size="small"
											{...field}
										/>
									}
								/>
							</FormControl>
						)}
					/>

					<Link
						className="text-md font-medium"
						to="/pages/auth/forgot-password"
					>
						Forgot password?
					</Link>
				</div>

				<Button
					variant="contained"
					color="secondary"
					className=" mt-16 w-full"
					aria-label="Sign in"
					disabled={_.isEmpty(dirtyFields) || !isValid}
					type="submit"
					size="large"
				>
					Sign in
				</Button>
			</form>
		</div>
	);
}

export default FirebaseSignInTab;
