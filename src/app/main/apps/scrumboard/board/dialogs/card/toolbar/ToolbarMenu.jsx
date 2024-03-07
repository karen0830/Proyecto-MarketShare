import Popover from '@mui/material/Popover';

/**
 * The toolbar menu component.
 */
function ToolbarMenu(props) {
	const { state, onClose, children } = props;
	return (
		<Popover
			open={Boolean(state)}
			anchorEl={state}
			onClose={onClose}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'center'
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'center'
			}}
		>
			{children}
		</Popover>
	);
}

export default ToolbarMenu;
