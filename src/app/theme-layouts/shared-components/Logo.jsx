import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
	'& > .logo-icon': {
		transition: theme.transitions.create(['width', 'height'], {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	},
	'& > .badge': {
		transition: theme.transitions.create('opacity', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		})
	}
}));

/**
 * The logo component.
 */
function Logo() {
	return (
		<Root className="flex items-center">
			
			<div className="flex space-x-6 px-8 items-center">
			<img
				className="logo-icon h-32"
				src="assets/images/logo/logo.png"
				alt="logo"
			/>
			</div>
		</Root>
	);
}

export default Logo;
