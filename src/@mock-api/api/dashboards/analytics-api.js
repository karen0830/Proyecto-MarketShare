import mockApi from '../../mock-api.json';

const widgets = mockApi.components.examples.analytics_dashboard_widgets.value;
export const analyticsDashboardApiMocks = (mock) => {
	mock.onGet('/dashboards/analytics/widgets').reply(() => {
		return [200, widgets];
	});
};
