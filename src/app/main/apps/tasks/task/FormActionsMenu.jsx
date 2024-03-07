import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useState } from 'react';
import { useDeleteTasksItemMutation } from '../TasksApi';

/**
 * The form actions menu.
 */
function FormActionsMenu(props) {
	const { taskId } = props;
	const navigate = useNavigate();
	const [removeTask] = useDeleteTasksItemMutation();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	function handleRemoveTask() {
		removeTask(taskId)
			.unwrap()
			.then(() => {
				navigate('/apps/tasks');
			});
	}

	return (
		<div>
			<IconButton
				id="basic-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
			</IconButton>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button'
				}}
			>
				<MenuItem onClick={handleRemoveTask}>
					<ListItemIcon className="min-w-40">
						<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Delete" />
				</MenuItem>
			</Menu>
		</div>
	);
}

export default FormActionsMenu;
