import FuseScrollbars from '@fuse/core/FuseScrollbars';

/**
 * The FusePageSimpleSidebarContent component is a content container for the FusePageSimpleSidebar component.
 */
function FusePageSimpleSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<FuseScrollbars enable={innerScroll}>
			<div className="FusePageSimple-sidebarContent">{children}</div>
		</FuseScrollbars>
	);
}

export default FusePageSimpleSidebarContent;
