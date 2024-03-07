import mockApi from '../../mock-api.json';

const widgets = mockApi.components.examples.crypto_dashboard_widgets.value;
export const cryptoDashboardApiMocks = (mock) => {
	mock.onGet('/dashboards/crypto/widgets').reply(() => {
		return [200, widgets];
	});
};
