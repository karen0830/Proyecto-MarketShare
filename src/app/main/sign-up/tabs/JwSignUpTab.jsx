import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Button from '@mui/material/Button';
import _ from '@lodash';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../../auth/AuthRouteProvider';
import { registerCompanyRequest } from '@mock-api/api/api/auth.company';

/**
 * Form Validation Schema
 */
const schema = z
	.object({
		displayName: z.string().nonempty('You must enter your name'),
		email: z.string().email('You must enter a valid email').nonempty('You must enter an email'),
		password: z
			.string()
			.nonempty('Please enter your password.')
			.min(8, 'Password is too short - should be 8 chars minimum.'),
		passwordConfirm: z.string().nonempty('Password confirmation is required'),
		acceptTermsConditions: z.boolean().refine((val) => val === true, 'The terms and conditions must be accepted.')
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: 'Passwords must match',
		path: ['passwordConfirm']
	});
const defaultValues = {
	displayName: '',
	email: '',
	password: '',
	passwordConfirm: '',
	acceptTermsConditions: false
};

function JwtSignUpTab() {
	const { jwtService } = useAuth();
	const { control, formState, handleSubmit, setError } = useForm({
		mode: 'onChange',
		defaultValues,
		resolver: zodResolver(schema)
	});
	const { isValid, dirtyFields, errors } = formState;

	const onSubmit = handleSubmit(async (values) => {
		console.log(values);
		jwtService
			.signUp({
				values
			})
			.then(() => {
				// No need to do anything, registered user data will be set at app/auth/AuthRouteProvider
			})
			.catch((_errors) => {
				_errors.forEach(({ message, type }) => {
					setError(type, { type: 'manual', message });
				});
			});
	});

	return (
		<form
			name="registerForm"
			noValidate
			className="mt-32 flex w-full flex-col justify-center"
			onSubmit={handleSubmit(onSubmit)}
		>

			<Controller
				name="userNameCompany"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Usuario de la empresa"
						type="text"
						// error={!!errors.password}
						// helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Correo electrónico:"
						type="email"
						error={!!errors.email}
						helperText={errors?.email?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>
			{/* {
				registerErrors.map((error, i) => (
					<div key={i} className="errors">
						{Array.isArray(error) ? (
							error.map((line, j) => (
								<p key={j}>{line}</p>
							))
						) : (
							<p key={i}>{error}</p>
						)}
					</div>
				))
			} */}

			<Controller
				name="typeCompany"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Tipo de empresa"
						type="text"
						// error={!!errors.password}
						// helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="phoneNumber"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Número de teléfono"
						type="number"
						// error={!!errors.password}
						// helperText={errors?.password?.message}
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
						label="Contraseña"
						type="password"
						error={!!errors.password}
						helperText={errors?.password?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="passwordConfirm"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mb-24"
						label="Confirmar contraseña"
						type="password"
						error={!!errors.passwordConfirm}
						helperText={errors?.passwordConfirm?.message}
						variant="outlined"
						required
						fullWidth
					/>
				)}
			/>

			<Controller
				name="acceptTermsConditions"
				control={control}
				render={({ field }) => (
					<FormControl
						className="items-center"
						error={!!errors.acceptTermsConditions}
					>
						<FormControlLabel
							label="I agree to the Terms of Service and Privacy Policy"
							control={
								<Checkbox
									size="small"
									{...field}
								/>
							}
						/>
						<FormHelperText>{errors?.acceptTermsConditions?.message}</FormHelperText>
					</FormControl>
				)}
			/>

			<Button
				variant="contained"
				color="secondary"
				className="mt-24 w-full"
				aria-label="Register"
				// disabled={_.isEmpty(dirtyFields) || !isValid}
				// type="submit"
				size="large"
				onClick={onSubmit}
			>
				Create your free account
			</Button>
		</form>
	);
}

export default JwtSignUpTab;
