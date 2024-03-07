import { useLocation, useNavigate, useParams } from 'react-router-dom';
/**
 * The withRouter function is a higher-order component that wraps a component with the useLocation, useParams, and useNavigate hooks from React Router.
 * It passes the location, params, and navigate objects as props to the wrapped component.
 * The component is memoized to prevent unnecessary re-renders.
 */
const withRouter = (Component) =>
	function WithRouterWrapper(props) {
		const location = useLocation();
		const params = useParams();
		const navigate = useNavigate();
		return (
			<Component
				{...props}
				location={location}
				params={params}
				navigate={navigate}
			/>
		);
	};
export default withRouter;
