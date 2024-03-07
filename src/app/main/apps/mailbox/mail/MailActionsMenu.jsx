import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemo, useState } from 'react';
import _ from '@lodash';
import { useGetMailboxMailQuery, useApplyMailboxMailActionMutation, useGetMailboxFoldersQuery } from '../MailboxApi';

/**
 * The mail actions menu.
 */
function MailActionsMenu(props) {
	const { className } = props;
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [setActionToMails] = useApplyMailboxMailActionMutation();
	const { mailId } = useParams();
	const { data: mail } = useGetMailboxMailQuery(mailId);
	const { data: folders } = useGetMailboxFoldersQuery();
	const spamFolderId = useMemo(() => _.find(folders, { slug: 'spam' })?.id, [folders]);
	const trashFolderId = useMemo(() => _.find(folders, { slug: 'trash' })?.id, [folders]);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	if (!mail) {
		return null;
	}

	return (
		<div className={className}>
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
				<MenuItem
					onClick={() => {
						setActionToMails({ type: 'unread', value: true, ids: [mail.id] });
						handleClose();
					}}
				>
					<ListItemIcon className="min-w-40">
						<FuseSvgIcon>heroicons-outline:mail</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Mark as unread" />
				</MenuItem>

				<MenuItem
					onClick={() => {
						setActionToMails({ type: 'folder', value: spamFolderId, ids: [mail.id] });
						handleClose();
					}}
				>
					<ListItemIcon className="min-w-40">
						<FuseSvgIcon>heroicons-outline:exclamation</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Spam" />
				</MenuItem>

				<MenuItem
					onClick={() => {
						setActionToMails({ type: 'folder', value: Boolean(trashFolderId), ids: [mail.id] });
						navigate(-1);
						handleClose();
					}}
				>
					<ListItemIcon className="min-w-40">
						<FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
					</ListItemIcon>
					<ListItemText primary="Delete" />
				</MenuItem>
			</Menu>
		</div>
	);
}

export default MailActionsMenu;
