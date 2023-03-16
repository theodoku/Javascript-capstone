import { HARRYPORTERMOVIESURL, LIKESURL, MOVIEDETAILSURL } from './constVariables.js';

const fetchMovieData = async () => {
  const response = await fetch(HARRYPORTERMOVIESURL);
  const data = await response.json();
  const info = data.description;
  return info;
};

const fetchMovieDetails = async (id) => {
  const response = await fetch(`${MOVIEDETAILSURL}?tt=${id}`);
  const data = await response.json();
  return data;
};

const fetchLikes = async () => {
  const response = await fetch(LIKESURL);
  const data = await response.json();
  return data;
};

const postLikes = async (id) => {
  const response = await fetch(LIKESURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ item_id: id }),
  });
  const data = response.text();
  const { result } = data;
  return result;
};
export {
  fetchMovieData, fetchLikes, postLikes, fetchMovieDetails,
};