import { apiService as api } from 'app/store/apiService';
import _ from '@lodash';
import BoardModel from './models/BoardModel';
import CardModel from './models/CardModel';
import reorder, { reorderQuoteMap } from './store/reorder';

export const addTagTypes = [
	'scrumboard_members',
	'scrumboard_board_lists',
	'scrumboard_member',
	'scrumboard_board_list',
	'scrumboard_board_labels',
	'scrumboard_board_label',
	'scrumboard_board_cards',
	'scrumboard_board_card',
	'scrumboard_boards',
	'scrumboard_board'
];
const ScrumboardApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getScrumboardMembers: build.query({
				query: () => ({ url: `/mock-api/scrumboard/members` }),
				providesTags: ['scrumboard_members']
			}),
			createScrumboardMember: build.mutation({
				query: (member) => ({
					url: `/mock-api/scrumboard/members`,
					method: 'POST',
					data: member
				}),
				invalidatesTags: ['scrumboard_members']
			}),
			getScrumboardMember: build.query({
				query: (memberId) => ({
					url: `/mock-api/scrumboard/members/${memberId}`
				}),
				providesTags: ['scrumboard_member']
			}),
			updateScrumboardMember: build.mutation({
				query: (member) => ({
					url: `/mock-api/scrumboard/members/${member.id}`,
					method: 'PUT',
					data: member
				}),
				invalidatesTags: ['scrumboard_member']
			}),
			deleteScrumboardMember: build.mutation({
				query: (memberId) => ({
					url: `/mock-api/scrumboard/members/${memberId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_members']
			}),
			getScrumboardBoardLists: build.query({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/lists`
				}),
				providesTags: ['scrumboard_board_lists']
			}),
			createScrumboardBoardList: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists`,
					method: 'POST',
					data: queryArg.list
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board']
			}),
			getScrumboardBoardList: build.query({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}`
				}),
				providesTags: ['scrumboard_board_lists', 'scrumboard_board_list']
			}),
			updateScrumboardBoardList: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.list.id}`,
					method: 'PUT',
					data: queryArg.list
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board_list']
			}),
			deleteScrumboardBoardList: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_lists', 'scrumboard_board']
			}),
			getScrumboardBoardLabels: build.query({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/labels`
				}),
				providesTags: ['scrumboard_board_labels']
			}),
			createScrumboardBoardLabel: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels`,
					method: 'POST',
					data: queryArg.label
				}),
				invalidatesTags: ['scrumboard_board_labels']
			}),
			getScrumboardBoardLabel: build.query({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.labelId}`
				}),
				providesTags: ['scrumboard_board_label']
			}),
			updateScrumboardBoardLabel: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.label.id}`,
					method: 'PUT',
					data: queryArg.label
				}),
				invalidatesTags: ['scrumboard_board_label']
			}),
			deleteScrumboardBoardLabel: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/labels/${queryArg.labelId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_labels']
			}),
			getScrumboardBoardCards: build.query({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}/cards`
				}),
				providesTags: ['scrumboard_board_cards']
			}),
			createScrumboardBoardCard: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/lists/${queryArg.listId}/cards`,
					method: 'POST',
					data: CardModel(queryArg.card)
				}),
				invalidatesTags: ['scrumboard_board_cards', 'scrumboard_board']
			}),
			updateScrumboardBoardCard: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/cards/${queryArg.card.id}`,
					method: 'PUT',
					data: queryArg.card
				}),
				invalidatesTags: ['scrumboard_board_cards']
			}),
			deleteScrumboardBoardCard: build.mutation({
				query: (queryArg) => ({
					url: `/mock-api/scrumboard/boards/${queryArg.boardId}/cards/${queryArg.cardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_board_cards']
			}),
			getScrumboardBoards: build.query({
				query: () => ({ url: `/mock-api/scrumboard/boards` }),
				providesTags: ['scrumboard_boards']
			}),
			createScrumboardBoard: build.mutation({
				query: (board) => ({
					url: `/mock-api/scrumboard/boards`,
					method: 'POST',
					data: BoardModel(board)
				}),
				invalidatesTags: ['scrumboard_boards', 'scrumboard_board']
			}),
			getScrumboardBoard: build.query({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}`
				}),
				providesTags: ['scrumboard_board']
			}),
			updateScrumboardBoard: build.mutation({
				query: (board) => ({
					url: `/mock-api/scrumboard/boards/${board.id}`,
					method: 'PUT',
					data: board
				}),
				invalidatesTags: ['scrumboard_board', 'scrumboard_boards']
			}),
			deleteScrumboardBoard: build.mutation({
				query: (boardId) => ({
					url: `/mock-api/scrumboard/boards/${boardId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['scrumboard_boards']
			}),
			updateScrumboardBoardListOrder: build.mutation({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;
					const ordered = reorder(
						_.merge([], board.lists),
						orderResult.source.index,
						orderResult.destination.index
					);
					return {
						url: `/mock-api/scrumboard/boards/${board.id}`,
						method: 'PUT',
						data: { lists: ordered }
					};
				},
				invalidatesTags: ['scrumboard_boards', 'scrumboard_board']
			}),
			updateScrumboardBoardCardOrder: build.mutation({
				query: (queryArg) => {
					const { orderResult, board } = queryArg;
					const ordered = reorderQuoteMap(
						_.merge([], board.lists),
						orderResult.source,
						orderResult.destination
					);
					return {
						url: `/mock-api/scrumboard/boards/${board.id}`,
						method: 'PUT',
						data: { lists: ordered }
					};
				},
				invalidatesTags: ['scrumboard_board_list', 'scrumboard_board']
			})
		}),
		overrideExisting: false
	});
export default ScrumboardApi;
export const {
	useGetScrumboardMembersQuery,
	useCreateScrumboardMemberMutation,
	useGetScrumboardBoardListsQuery,
	useCreateScrumboardBoardListMutation,
	useGetScrumboardMemberQuery,
	useUpdateScrumboardMemberMutation,
	useDeleteScrumboardMemberMutation,
	useGetScrumboardBoardListQuery,
	useUpdateScrumboardBoardListMutation,
	useDeleteScrumboardBoardListMutation,
	useGetScrumboardBoardLabelsQuery,
	useCreateScrumboardBoardLabelMutation,
	useGetScrumboardBoardLabelQuery,
	useUpdateScrumboardBoardLabelMutation,
	useDeleteScrumboardBoardLabelMutation,
	useGetScrumboardBoardCardsQuery,
	useCreateScrumboardBoardCardMutation,
	useUpdateScrumboardBoardCardMutation,
	useDeleteScrumboardBoardCardMutation,
	useGetScrumboardBoardsQuery,
	useCreateScrumboardBoardMutation,
	useGetScrumboardBoardQuery,
	useUpdateScrumboardBoardMutation,
	useDeleteScrumboardBoardMutation,
	useUpdateScrumboardBoardListOrderMutation,
	useUpdateScrumboardBoardCardOrderMutation
} = ScrumboardApi;
export const selectListById = (boardId, listId) => (state) => {
	const lists = ScrumboardApi.endpoints.getScrumboardBoardLists.select(boardId)(state)?.data ?? [];
	return _.find(lists, { id: listId });
};
export const selectMemberById = (id) => (state) => {
	const members = ScrumboardApi.endpoints.getScrumboardMembers.select()(state)?.data ?? [];
	return _.find(members, { id });
};
export const selectLabelById = (boardId, id) => (state) => {
	const labels = ScrumboardApi.endpoints.getScrumboardBoardLabels.select(boardId)(state)?.data ?? [];
	return _.find(labels, { id });
};
