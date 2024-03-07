import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { useGetCalendarLabelsQuery } from './CalendarApi';
/**
 * The event label select.
 */
const EventLabelSelect = forwardRef((props, ref) => {
	const { value, onChange, className } = props;
	const { data: labels } = useGetCalendarLabelsQuery();
	const handleChange = (event) => {
		onChange(event.target.value);
	};
	return (
		<FormControl
			fullWidth
			className={className}
		>
			<InputLabel id="select-label">Label</InputLabel>
			<Select
				labelId="select-label"
				id="label-select"
				value={value}
				label="Label"
				onChange={handleChange}
				ref={ref}
				classes={{ select: 'flex items-center space-x-12' }}
			>
				{labels?.map((label) => (
					<MenuItem
						value={label.id}
						key={label.id}
						className="space-x-12"
					>
						<Box
							className="w-12 h-12 shrink-0 rounded-full"
							sx={{ backgroundColor: label.color }}
						/>
						<span>{label.title}</span>
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
});
export default EventLabelSelect;
