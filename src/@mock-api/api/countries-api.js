import mockApi from '../mock-api.json';

const countriesApi = mockApi.components.examples.countries.value;
export const countriesApiMocks = (mock) => {
	mock.onGet('/countries').reply(() => {
		return [200, countriesApi];
	});
};
