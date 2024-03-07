import mockApi from '../../mock-api.json';

const widgets = mockApi.components.examples.finance_dashboard_widgets.value;
export const financeDashboardApiMocks = (mock) => {
	mock.onGet('/dashboards/finance/widgets').reply(() => {
		return [200, widgets];
	});
};
