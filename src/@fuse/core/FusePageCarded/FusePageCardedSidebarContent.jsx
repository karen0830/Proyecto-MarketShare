import FuseScrollbars from '@fuse/core/FuseScrollbars';

/**
 * The FusePageCardedSidebarContent component is a content container for the FusePageCardedSidebar component.
 */
function FusePageCardedSidebarContent(props) {
	const { innerScroll, children } = props;

	if (!children) {
		return null;
	}

	return (
		<FuseScrollbars enable={innerScroll}>
			<div className="FusePageCarded-sidebarContent">{children}</div>
		</FuseScrollbars>
	);
}

export default FusePageCardedSidebarContent;
