import { useAppDispatch } from 'app/store/store';
import useThemeMediaQuery from '@fuse/hooks/useThemeMediaQuery';
import NavbarToggleFab from 'app/theme-layouts/shared-components/navbar/NavbarToggleFab';
import { navbarToggle, navbarToggleMobile } from 'app/theme-layouts/shared-components/navbar/store/navbarSlice';

/**
 * The navbar toggle fab layout 2.
 */
function NavbarToggleFabLayout2(props) {
	const { className } = props;
	const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down('lg'));
	const dispatch = useAppDispatch();
	return (
		<NavbarToggleFab
			className={className}
			onClick={() => {
				dispatch(isMobile ? navbarToggleMobile() : navbarToggle());
			}}
		/>
	);
}

export default NavbarToggleFabLayout2;
