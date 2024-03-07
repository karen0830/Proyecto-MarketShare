import clsx from 'clsx';

/**
 * The FusePageCardedHeader component is a header for the FusePageCarded component.
 */
function FusePageCardedHeader(props) {
	const { header = null } = props;
	return <div className={clsx('FusePageCarded-header', 'container')}>{header}</div>;
}

export default FusePageCardedHeader;
