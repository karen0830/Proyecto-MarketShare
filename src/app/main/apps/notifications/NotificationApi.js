import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['notifications', 'notification'];
const NotificationApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAllNotifications: build.query({
				query: () => ({ url: `/mock-api/notifications` }),
				providesTags: ['notifications']
			}),
			createNotification: build.mutation({
				query: (notification) => ({
					url: `/mock-api/notifications`,
					method: 'POST',
					data: notification
				}),
				invalidatesTags: ['notifications']
			}),
			deleteAllNotifications: build.mutation({
				query: () => ({ url: `/mock-api/notifications`, method: 'DELETE' }),
				invalidatesTags: ['notifications']
			}),
			getNotification: build.query({
				query: (notificationId) => ({
					url: `/mock-api/notifications/${notificationId}`
				}),
				providesTags: ['notification']
			}),
			deleteNotification: build.mutation({
				query: (notificationId) => ({
					url: `/mock-api/notifications/${notificationId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['notifications']
			})
		}),
		overrideExisting: false
	});
export default NotificationApi;
export const {
	useGetAllNotificationsQuery,
	useCreateNotificationMutation,
	useDeleteAllNotificationsMutation,
	useGetNotificationQuery,
	useDeleteNotificationMutation
} = NotificationApi;
