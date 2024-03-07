import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['file_manager_folder'];
const FileManagerApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getFileManagerFolder: build.query({
				query: (folderId) => ({ url: `/mock-api/file-manager/${folderId}` }),
				providesTags: ['file_manager_folder']
			}),
			updateFileManagerFolder: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/file-manager/${queryArg.folderId}`,
					method: 'PUT',
					body: queryArg.fileManagerItem
				}),
				invalidatesTags: ['file_manager_folder']
			}),
			deleteFileManagerFolder: build.mutation({
				query: (folderId) => ({
					url: `/mock-api/file-manager/${folderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['file_manager_folder']
			})
		}),
		overrideExisting: false
	});
export default FileManagerApi;
export const { useGetFileManagerFolderQuery, useUpdateFileManagerFolderMutation, useDeleteFileManagerFolderMutation } =
	FileManagerApi;
