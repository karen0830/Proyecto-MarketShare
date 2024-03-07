import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import CardModel from 'src/app/main/apps/scrumboard/models/CardModel';
import mockApi from '../mock-api.json';
import ListModel from '../../app/main/apps/scrumboard/models/ListModel';

const boardsDB = mockApi.components.examples.scrumboard_boards.value;
const labelsDB = mockApi.components.examples.scrumboard_labels.value;
const cardsDB = mockApi.components.examples.scrumboard_cards.value;
const membersDB = mockApi.components.examples.scrumboard_members.value;
const listsDB = mockApi.components.examples.scrumboard_lists.value;
export const scrumboardApiMocks = (mock) => {
	/**
	 * GET BOARDS
	 * GET api/scrumboard/boards
	 */
	mock.onGet('/scrumboard/boards').reply(() => {
		return [200, boardsDB];
	});
	/**
	 * CREATE NEW BOARD
	 * POST api/scrumboard/boards
	 */
	mock.onPost('/scrumboard/boards').reply(({ data }) => {
		const newBoard = { id: FuseUtils.generateGUID(), ...JSON.parse(data) };
		boardsDB.push(newBoard);
		return [200, newBoard];
	});
	/**
	 * GET BOARD LABELS
	 * GET api/scrumboard/boards/:boardId/labels
	 */
	mock.onGet('/scrumboard/boards/:boardId/labels').reply((config) => {
		const { boardId } = config.params;
		const labels = labelsDB.filter((item) => item.boardId === boardId);
		return [200, labels];
	});
	/**
	 * CREATE CARD
	 * PUT api/scrumboard/boards/:boardId/lists/:listId/cards
	 */
	mock.onPost('/scrumboard/boards/:boardId/lists/:listId/cards').reply((config) => {
		const { boardId, listId } = config.params;
		const newCard = CardModel({
			...JSON.parse(config.data),
			id: FuseUtils.generateGUID(),
			boardId,
			listId
		});
		cardsDB.push(newCard);
		const board = _.find(boardsDB, { id: boardId });
		// Add card into board
		_.assign(board, {
			...board,
			lists: board.lists.map((list) =>
				list.id === listId
					? {
							...list,
							cards: [...list.cards, newCard.id]
						}
					: list
			)
		});
		return [200, newCard];
	});
	/**
	 * UPDATE CARD
	 * PUT api/scrumboard/boards/:boardId/cards/:cardId
	 */
	mock.onPut('/scrumboard/boards/:boardId/cards/:cardId').reply((config) => {
		const { cardId } = config.params;
		const card = _.find(cardsDB, { id: cardId });
		_.assign(card, JSON.parse(config.data));
		return [200, card];
	});
	/**
	 * DELETE CARD
	 * api/scrumboard/boards/:boardId/cards/:cardId
	 */
	mock.onDelete('/scrumboard/boards/:boardId/cards/:cardId').reply((config) => {
		const { boardId, cardId } = config.params;
		const board = _.find(boardsDB, { id: boardId });
		// Remove cards from board
		_.assign(board, {
			...board,
			lists: board.lists.map((list) => ({
				...list,
				cards: _.reject(list.cards, (id) => id === cardId)
			}))
		});
		// Remove card
		_.remove(cardsDB, { id: cardId });
		return [200, cardId];
	});
	/** GET LISTS BY BOARD ID
	 * GET /scrumboard/boards/:boardId/lists
	 */
	mock.onGet('/scrumboard/boards/:boardId/lists').reply((config) => {
		const { boardId } = config.params;
		const lists = listsDB.filter((item) => item.boardId === boardId);
		return [200, lists];
	});
	/**
	 * UPDATE LIST
	 * PUT api/scrumboard/boards/:boardId/lists/:listId
	 */
	mock.onPut('/scrumboard/boards/:boardId/lists/:listId').reply((config) => {
		const { listId } = config.params;
		const list = _.find(listsDB, { id: listId });
		_.assign(list, JSON.parse(config.data));
		return [200, list];
	});
	/**
	 * CREATE LIST
	 * POST api/scrumboard/boards/:boardId/lists
	 */
	mock.onPost('/scrumboard/boards/:boardId/lists').reply((config) => {
		const { boardId } = config.params;
		const newList = ListModel({
			...JSON.parse(config.data),
			id: FuseUtils.generateGUID(),
			boardId
		});
		listsDB.push(newList);
		const board = _.find(boardsDB, { id: boardId });
		// Add list into board
		_.assign(board, {
			...board,
			lists: [
				...board.lists,
				{
					id: newList.id,
					cards: []
				}
			]
		});
		return [200, newList];
	});
	/**
	 * DELETE LIST
	 * DELETE api/scrumboard/boards/:boardId/lists/:listId
	 */
	mock.onDelete('/scrumboard/boards/:boardId/lists/:listId').reply((config) => {
		const { boardId, listId } = config.params;
		const board = _.find(boardsDB, { id: boardId });
		// Remove cards of the list
		_.remove(cardsDB, { listId });
		// Remove list from board
		_.assign(board, {
			...board,
			lists: _.reject(board.lists, { id: listId })
		});
		// Remove list
		_.remove(listsDB, { id: listId });
		return [200, listId];
	});
	/**
	 * GET BOARD CARDS
	 * GET api/scrumboard/boards/:boardId/cards
	 */
	mock.onGet('/scrumboard/boards/:boardId/cards').reply((config) => {
		const { boardId } = config.params;
		const cards = cardsDB.filter((item) => item.boardId === boardId);
		return [200, cards];
	});
	/**
	 * GET BOARD
	 * GET api/scrumboard/boards/:boardId
	 */
	mock.onGet('/scrumboard/boards/:boardId').reply((config) => {
		const { boardId } = config.params;
		const board = _.find(boardsDB, { id: boardId });

		if (board) {
			return [200, board];
		}

		return [404, 'Requested board do not exist.'];
	});
	/**
	 * UPDATE BOARD
	 * PUT api/scrumboard/boards/:boardId
	 */
	mock.onPut('/scrumboard/boards/:boardId').reply((config) => {
		const { boardId } = config.params;
		const board = _.find(boardsDB, { id: boardId });
		_.assign(board, { ...board, ...JSON.parse(config.data) });
		return [200, board];
	});
	/**
	 * DELETE BOARD
	 * DELETE api/scrumboard/boards/:boardId
	 */
	mock.onDelete('/scrumboard/boards/:boardId').reply((config) => {
		const { boardId } = config.params;
		_.remove(boardsDB, { id: boardId });
		_.remove(cardsDB, { boardId });
		_.remove(listsDB, { boardId });
		return [200, boardId];
	});
	/**
	 * GET ALL MEMBERS
	 * GET api/scrumboard/members
	 */
	mock.onGet('/scrumboard/members').reply(() => {
		return [200, membersDB];
	});
};
