import { apiService as api } from 'app/store/apiService';
import { appSelector } from 'app/store/store';

export const addTagTypes = ['analytics_dashboard_widgets'];
const AnalyticsDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAnalyticsDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/analytics/widgets` }),
				providesTags: ['analytics_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default AnalyticsDashboardApi;
export const { useGetAnalyticsDashboardWidgetsQuery } = AnalyticsDashboardApi;
export const selectWidget = (id) =>
	appSelector((state) => {
		const widgets = AnalyticsDashboardApi.endpoints.getAnalyticsDashboardWidgets.select()(state)?.data;
		return widgets?.[id];
	});
