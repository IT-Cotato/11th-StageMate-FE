import {privateAxios, publicAxios} from './axios';
import {ENDPOINT} from './urls';

export const getMagazines = async (page: number = 1, size: number = 6) => {
  const response = await publicAxios.get(ENDPOINT.MAGAZINE, {
    params: {page, size},
  });
  return response.data.data;
};

export const getMagazineDetail = async (magazineId: number) => {
  const response = await privateAxios.get(ENDPOINT.MAGAZINE_DETAIL(magazineId));
  return response.data.data;
};

export const getRecommendMagazines = async () => {
  const response = await publicAxios.get(ENDPOINT.MAGAZINE_RECOMMEND);
  return response.data.data;
};

export const getLatestMagazines = async (size: number = 4) => {
  const response = await publicAxios.get(ENDPOINT.MAGAZINE_LATEST, {
    params: {size},
  });
  return response.data.data;
};

export const postLikeMagazines = async (magazineId: number) => {
  const response = await privateAxios.post(ENDPOINT.MAGAZINE_LIKE(magazineId));
  return response.data;
};

export const postScrapMagazines = async (magazineId: number) => {
  const response = await privateAxios.post(ENDPOINT.MAGAZINE_SCRAP(magazineId));
  return response.data;
};
