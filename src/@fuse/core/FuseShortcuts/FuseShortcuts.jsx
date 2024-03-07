import { amber } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import _ from '@lodash';
import FuseSvgIcon from '../FuseSvgIcon';

/**
 * The FuseShortcuts component is responsible for rendering a list of shortcuts based on the navigation and shortcuts props.
 * It uses various MUI components to render the list items and search input.
 * The component is memoized to prevent unnecessary re-renders.
 */
function FuseShortcuts(props) {
	const { navigation = [], shortcuts = [], onChange, variant = 'horizontal', className = '' } = props;
	const searchInputRef = useRef(null);
	const [addMenu, setAddMenu] = useState(null);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState([]);
	const [shortcutItems, setShortcutItems] = useState([]);
	useEffect(() => {
		const _shortcutItems = shortcuts ? shortcuts.map((id) => _.find(navigation, { id })) : [];
		setShortcutItems(_shortcutItems);
	}, [shortcuts]);

	function addMenuClick(event) {
		setAddMenu(event.currentTarget);
	}

	function addMenuClose() {
		setAddMenu(null);
	}

	function search(ev) {
		const newSearchText = ev.target.value;
		setSearchText(newSearchText);

		if (newSearchText.length !== 0 && navigation) {
			setSearchResults(
				navigation.filter((item) => item?.title?.toLowerCase()?.includes(newSearchText?.toLowerCase()))
			);
			return;
		}

		setSearchResults([]);
	}

	function toggleInShortcuts(id) {
		let newShortcuts = [...shortcuts];
		newShortcuts = _.xor(newShortcuts, [id]);
		onChange(newShortcuts);
	}

	return (
		<div className={clsx('flex flex-1', variant === 'vertical' && 'shrink grow-0 flex-col', className)}>
			{useMemo(() => {
				return (
					<div className={clsx('flex flex-1', variant === 'vertical' && 'flex-col')}>
						{shortcutItems.map(
							(_item) =>
								_item && (
									<Link
										to={_item.url}
										key={_item.id}
										role="button"
									>
										<Tooltip
											title={_item.title}
											placement={variant === 'horizontal' ? 'bottom' : 'left'}
										>
											<IconButton
												className="h-40 w-40 p-0"
												size="large"
											>
												{_item.icon ? (
													<FuseSvgIcon>{_item.icon}</FuseSvgIcon>
												) : (
													<span className="text-20 font-semibold uppercase">
														{_item.title[0]}
													</span>
												)}
											</IconButton>
										</Tooltip>
									</Link>
								)
						)}
					</div>
				);
			}, [addMenu, variant, shortcutItems])}

			<Menu
				id="add-menu"
				anchorEl={addMenu}
				open={Boolean(addMenu)}
				onClose={addMenuClose}
				classes={{
					paper: 'min-w-256'
				}}
				TransitionProps={{
					onEntered: () => {
						searchInputRef?.current?.focus();
					},
					onExited: () => {
						setSearchText('');
					}
				}}
			>
				<div className="p-16 pt-8">
					<Input
						inputRef={searchInputRef}
						value={searchText}
						onChange={search}
						placeholder="Search for an app or page"
						fullWidth
						inputProps={{
							'aria-label': 'Search'
						}}
						disableUnderline
					/>
				</div>

				<Divider />

				{useMemo(() => {
					if (searchText.length === 0 || !searchResults || searchResults.length === 0) {
						return null;
					}

					return searchResults.map((_item) => (
						<ShortcutMenuItem
							shortcuts={shortcuts}
							key={_item.id}
							item={_item}
							onToggle={() => toggleInShortcuts(_item.id)}
						/>
					));
				}, [searchResults, shortcuts, searchText])}

				{searchText.length !== 0 && searchResults.length === 0 && (
					<Typography
						color="text.secondary"
						className="p-16 pb-8"
					>
						No results..
					</Typography>
				)}

				{useMemo(() => {
					if (searchText.length !== 0) {
						return null;
					}

					return shortcutItems.map(
						(_item) =>
							_item && (
								<ShortcutMenuItem
									shortcuts={shortcuts}
									key={_item.id}
									item={_item}
									onToggle={() => toggleInShortcuts(_item.id)}
								/>
							)
					);
				}, [shortcutItems, shortcuts, searchText])}
			</Menu>
		</div>
	);
}

function ShortcutMenuItem(props) {
	const { item, onToggle, shortcuts = [] } = props;

	if (!item || !item.id) {
		return null;
	}

	return (
		<Link
			to={item.url || ''}
			role="button"
		>
			<MenuItem key={item.id}>
				<ListItemIcon className="min-w-40">
					{item.icon ? (
						<FuseSvgIcon>{item.icon}</FuseSvgIcon>
					) : (
						<span className="text-center text-20 font-semibold uppercase">{item.title[0]}</span>
					)}
				</ListItemIcon>
				<ListItemText primary={item.title} />
				<IconButton
					onClick={(ev) => {
						ev.preventDefault();
						ev.stopPropagation();
						onToggle(item.id);
					}}
					size="large"
				>
				</IconButton>
			</MenuItem>
		</Link>
	);
}

export default memo(FuseShortcuts);
