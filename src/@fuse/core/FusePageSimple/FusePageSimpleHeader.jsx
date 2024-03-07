import clsx from 'clsx';

/**
 * The FusePageSimpleHeader component is a sub-component of the FusePageSimple layout component.
 * It provides a header area for the layout.
 */
function FusePageSimpleHeader(props) {
	const { header = null, className } = props;
	return (
		<div className={clsx('FusePageSimple-header', className)}>
			<div className="container">{header}</div>
		</div>
	);
}

export default FusePageSimpleHeader;
