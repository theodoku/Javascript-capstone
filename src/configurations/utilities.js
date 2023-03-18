import { HARRYPORTERMOVIESURL, LIKESURL, MOVIEDETAILSURL, COMMENTSURL } from './constVariables.js';

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

const postComments = async (comments) => {
  const response = await fetch(COMMENTSURL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(comments),
  });
  const data = response.json();
  const { result } = data;
  return result;
};

const getComments = async (id) => {
  const response = await fetch(COMMENTSURL + `?item_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    }
  });
  const data = response.json();
  return data;
};

const selectMovieDetails = async (id) => {
  const data = await fetchMovieDetails(id);
  return (data);
}
export {
  fetchMovieData,
  fetchLikes,
  postLikes,
  postComments,
  getComments,
  selectMovieDetails,
};