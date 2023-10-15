import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = '?api_key=7f6cfc769c2057b00f9c41481e14f95f';

interface DataObj {
  data: {
    page: number;
    results: [];
    total_pages: number;
    total_results: number;
  };
  status: string;
}

export const getAllMovies = async (): Promise<DataObj | undefined> => {
  const endPoint = `/discover/movie${API_KEY}&include_adult=true&include_video=false&language=en-US&page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2023-10-01&sort_by=popularity.desc`;
  try {
    return await axios.get(endPoint);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
