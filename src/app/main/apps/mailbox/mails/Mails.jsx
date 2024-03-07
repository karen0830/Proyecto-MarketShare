import MailList from './MailList';
import MailsToolbar from './MailsToolbar';

/**
 * The mails component.
 */
function Mails(props) {
	const { onToggleLeftSidebar } = props;
	return (
		<div className="flex flex-col w-full min-h-full">
			<MailsToolbar onToggleLeftSidebar={onToggleLeftSidebar} />
			<MailList />
		</div>
	);
}

export default Mails;
