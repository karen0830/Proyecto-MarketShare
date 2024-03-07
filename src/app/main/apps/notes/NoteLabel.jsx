import Chip from '@mui/material/Chip';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { darken } from '@mui/material/styles';
import _ from '@lodash';
import { useGetNotesLabelsQuery } from './NotesApi';

/**
 * The note label.
 */
function NoteLabel(props) {
	const { id, linkable, onDelete, className, classes } = props;
	const { data: labels } = useGetNotesLabelsQuery();

	if (!labels) {
		return null;
	}

	const label = _.find(labels, { id });

	if (!label) {
		return null;
	}

	const linkProps = linkable
		? {
				element: Link,
				onClick: (ev) => {
					ev.stopPropagation();
				},
				to: `/apps/notes/labels/${label.id}`
			}
		: {};
	return (
		<Chip
			{...linkProps}
			label={label.title}
			classes={{
				root: clsx('h-24 border-0', className),
				label: 'px-12 py-4 text-12 font-medium leading-none',
				deleteIcon: 'w-16',
				...classes
			}}
			sx={{
				color: 'text.secondary',
				backgroundColor: (theme) => darken(theme.palette.background.default, 0.03)
			}}
			variant="outlined"
			onDelete={onDelete}
		/>
	);
}

export default NoteLabel;
