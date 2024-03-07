import apiService from 'app/store/apiService';
import { showMessage } from '@fuse/core/FuseMessage/store/fuseMessageSlice';

export const addTagTypes = ['academy_courses', 'academy_course', 'academy_categories'];
const AcademyApi = apiService
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAcademyCourses: build.query({
				query: () => ({ url: `/mock-api/academy/courses` }),
				providesTags: ['academy_courses']
			}),
			getAcademyCourse: build.query({
				query: (queryArg) => ({ url: `/mock-api/academy/courses/${queryArg.courseId}` }),
				providesTags: ['academy_course']
			}),
			updateAcademyCourse: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'PUT',
					data: queryArg.data
				}),
				async onQueryStarted(id, { dispatch, queryFulfilled }) {
					try {
						await queryFulfilled;
						dispatch(showMessage({ message: 'Course Saved' }));
					} catch (err) {
						dispatch(showMessage({ message: 'Error Saving the course!' }));
					}
				},
				invalidatesTags: ['academy_courses', 'academy_course']
			}),
			deleteAcademyCourse: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/academy/courses/${queryArg.courseId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['academy_courses']
			}),
			getAcademyCategories: build.query({
				query: () => ({ url: `/mock-api/academy/categories` }),
				providesTags: ['academy_categories']
			})
		}),
		overrideExisting: false
	});
export default AcademyApi;
export const {
	useGetAcademyCoursesQuery,
	useGetAcademyCourseQuery,
	useUpdateAcademyCourseMutation,
	useDeleteAcademyCourseMutation,
	useGetAcademyCategoriesQuery
} = AcademyApi;
