import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['project_dashboard_widgets', 'project_dashboard_projects'];
const ProjectDashboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProjectDashboardWidgets: build.query({
				query: () => ({ url: `/mock-api/dashboards/project/widgets` }),
				providesTags: ['project_dashboard_widgets']
			}),
			getProjectDashboardProjects: build.query({
				query: () => ({ url: `/mock-api/dashboards/project/projects` }),
				providesTags: ['project_dashboard_projects']
			})
		}),
		overrideExisting: false
	});
export default ProjectDashboardApi;
export const { useGetProjectDashboardWidgetsQuery, useGetProjectDashboardProjectsQuery } = ProjectDashboardApi;
export const selectWidget = (id) => (state) => {
	const widgets = ProjectDashboardApi.endpoints.getProjectDashboardWidgets.select()(state)?.data;
	return widgets?.[id];
};
