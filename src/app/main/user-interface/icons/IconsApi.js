import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['icons_list'];
const IconsApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getIconsList: build.query({
				query: (url) => ({ url }),
				providesTags: ['icons_list']
			})
		}),
		overrideExisting: false
	});
export default IconsApi;
export const { useGetIconsListQuery } = IconsApi;
