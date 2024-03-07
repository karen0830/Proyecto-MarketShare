import List from '@mui/material/List';
import NoteFormAddListItem from './NoteFormAddListItem';
import NoteFormListItem from './NoteFormListItem';

/**
 * The note form list.
 */
function NoteFormList(props) {
	const { tasks, onCheckListChange, className } = props;

	function handleListItemChange(item) {
		onCheckListChange(tasks.map((_item) => (_item.id === item.id ? item : _item)));
	}

	function handleListItemRemove(id) {
		onCheckListChange(tasks.filter((_item) => _item.id !== id));
	}

	function handleListItemAdd(item) {
		onCheckListChange([...tasks, item]);
	}

	if (!tasks) {
		return null;
	}

	return (
		<div className={className}>
			<List dense>
				{tasks.map((item) => (
					<NoteFormListItem
						item={item}
						key={item.id}
						onListItemChange={handleListItemChange}
						onListItemRemove={handleListItemRemove}
					/>
				))}
				<NoteFormAddListItem onListItemAdd={handleListItemAdd} />
			</List>
		</div>
	);
}

export default NoteFormList;
