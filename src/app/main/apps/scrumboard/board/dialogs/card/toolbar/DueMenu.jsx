import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import format from 'date-fns/format';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import { useState } from 'react';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import ToolbarMenu from './ToolbarMenu';

/**
 * The due menu component.
 */
function DueMenu(props) {
	const { dueDate, onDueChange, onRemoveDue } = props;
	const [anchorEl, setAnchorEl] = useState(null);
	const formatteddueDate = dueDate ? format(fromUnixTime(dueDate), 'Pp') : format(new Date(), 'Pp');

	function handleMenuOpen(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleMenuClose() {
		setAnchorEl(null);
	}

	return (
		<div>
			<IconButton
				onClick={handleMenuOpen}
				size="large"
			>
				<FuseSvgIcon>heroicons-outline:calendar</FuseSvgIcon>
			</IconButton>
			<ToolbarMenu
				state={anchorEl}
				onClose={handleMenuClose}
			>
				<div className="p-16 max-w-192">
					{dueDate ? (
						<MenuItem
							onClick={() => {
								onRemoveDue();
								handleMenuClose();
							}}
						>
							Remove Due Date
						</MenuItem>
					) : (
						<DateTimePicker
							value={new Date(formatteddueDate)}
							format="Pp"
							onChange={(val) => {
								onDueChange(getUnixTime(val));
								handleMenuClose();
							}}
							slotProps={{
								textField: {
									label: 'Due date',
									placeholder: 'Choose a due date',
									InputLabelProps: {
										shrink: true
									},
									fullWidth: true,
									variant: 'outlined'
								}
							}}
						/>
					)}
				</div>
			</ToolbarMenu>
		</div>
	);
}

export default DueMenu;
