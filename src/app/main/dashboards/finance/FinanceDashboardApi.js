import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['finance_dashboard_widgets'];
const FinanceDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFinanceDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/finance/widgets` }),
				providesTags: ['finance_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default FinanceDashboardApi;
export const { useGetFinanceDashboardWidgetsQuery } = FinanceDashboardApi;
export const selectWidget = (id) => (state) => {
	const widgets = FinanceDashboardApi.endpoints.getFinanceDashboardWidgets.select()(state)?.data;
	return widgets?.[id];
};
