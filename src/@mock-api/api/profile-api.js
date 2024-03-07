import mockApi from '../mock-api.json';

const timelineApi = mockApi.components.examples.profile_timeline.value;
const photosVideosApi = mockApi.components.examples.profile_photos_videos.value;
const aboutApi = mockApi.components.examples.profile_about.value;
export const profileApiMocks = (mock) => {
	mock.onGet('/profile/timeline').reply(() => {
		return [200, timelineApi];
	});
	mock.onGet('/profile/photos-videos').reply(() => {
		return [200, photosVideosApi];
	});
	mock.onGet('/profile/about').reply(() => {
		return [200, aboutApi];
	});
};
