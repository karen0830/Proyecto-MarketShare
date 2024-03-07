export default function compose(f, g) {
	// eslint-disable-next-line func-names
	return function (x) {
		return f(g(x));
	};
}
