import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import WatchlistItem from './widgets/WatchlistItem';
import BuySellForm from './widgets/BuySellForm';
import { selectWidget } from './CryptoDashboardApi';

/**
 * The crypto dashboard app sidebar.
 */
function CryptoDashboardAppSidebar() {
	const watchlist = useSelector(selectWidget('watchlist'));

	if (!watchlist) {
		return null;
	}

	return (
		<>
			<Paper
				elevation={0}
				square
			>
				{watchlist?.map((item) => (
					<WatchlistItem
						key={item.iso}
						item={item}
					/>
				))}
			</Paper>
			<BuySellForm />
		</>
	);
}

export default CryptoDashboardAppSidebar;
