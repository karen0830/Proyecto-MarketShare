import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['crypto_dashboard_widgets'];
const CryptoDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCryptoDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/crypto/widgets` }),
				providesTags: ['crypto_dashboard_widgets']
			})
		}),
		overrideExisting: false
	});
export default CryptoDashboardApi;
export const { useGetCryptoDashboardWidgetsQuery } = CryptoDashboardApi;
export const selectWidget = (id) => (state) => {
	const widgets = CryptoDashboardApi.endpoints.getCryptoDashboardWidgets.select()(state)?.data;
	return widgets?.[id];
};
