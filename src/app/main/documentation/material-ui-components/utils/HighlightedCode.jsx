import { forwardRef } from 'react';
import FuseHighlight from '@fuse/core/FuseHighlight';

const HighlightedCode = forwardRef((props, ref) => {
	const { code, language, ...other } = props;
	return (
		<FuseHighlight
			component="pre"
			className={`language-${language || 'jsx'}`}
			ref={ref}
			{...other}
		>
			{code}
		</FuseHighlight>
	);
});
export default HighlightedCode;
