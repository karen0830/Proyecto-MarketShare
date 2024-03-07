import Typography from '@mui/material/Typography';
import clsx from 'clsx';

/**
 * The value section small component.
 */
function ValueSectionSmall(props) {
	const { value = 0, title = '', unit = 'B', className = '' } = props;
	const unitValues = {
		B: 1000000000,
		M: 1000000
	};
	return (
		<div className={clsx(className, 'p-16')}>
			<Typography
				className="text-sm font-medium leading-none"
				color="text.secondary"
			>
				{title}
			</Typography>
			<Typography className="mt-8 font-mono text-xl leading-none">
				{(value / (unitValues[unit] || 1)).toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD'
				})}
				{unit}
			</Typography>
		</div>
	);
}

export default ValueSectionSmall;
