import { useEffect, useState } from 'react';

function FuseAwaitRender(props) {
	const { delay = 0, children } = props;
	const [awaitRender, setAwaitRender] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setAwaitRender(false);
		}, delay);
	}, [delay]);
	return awaitRender ? null : children;
}

export default FuseAwaitRender;
