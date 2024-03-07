import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true, error, errorInfo: null };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		this.setState({ error, errorInfo });
		// eslint-disable-next-line
        console.error('Uncaught error:', error, errorInfo);
	}

	render() {
		const { children } = this.props;
		const { error, errorInfo, hasError } = this.state;

		if (hasError) {
			return (
				<div className="bg-white p-24">
					<h1 className="text-20 font-semibold">Something went wrong.</h1>
					<p className="text-14 whitespace-pre-wrap">
						{error && error.toString()}
						<br />
						{errorInfo && errorInfo.componentStack}
					</p>
				</div>
			);
		}

		return children;
	}
}
export default ErrorBoundary;
