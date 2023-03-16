import {
  fetchMovieData, fetchLikes, postLikes, fetchMovieDetails,
} from '../configurations/utilities.js';
import like from '../assets/likeIcon.png';
import counter from './itemsCounter.js';

const list = document.getElementById('list');

const updateLikes = async () => {
  try {
    const data = await fetchLikes();
    data.forEach((item) => {
      const likeCount = document.getElementById(`count-${item.item_id}`);
      if (likeCount !== null && likeCount !== undefined) {
        likeCount.innerHTML = `${item.likes}`;
      }
    });
  } catch (error) {
    throw new Error(`Error updating likes: ${error}`);
  }
};

const display = async () => {
  const data = await fetchMovieData();
  counter(data);
  data.forEach(({ '#TITLE': title, '#IMG_POSTER': poster, '#IMDB_ID': id }) => {
    list.innerHTML += `
      <li id=${id} class="list">
        <div class="image-wrapper">
          <img src=${poster} alt="movie" class="poster-img">
        </div>
        <div class="info">
          <p>${title}</p> 
          <div class="like">
            <div class="likeBtn" id=like-${id}>
              <img src=${like} alt="like">
            </div>
            <p id=count-${id}></p>
            <p>likes</p>
          </div>   
        </div>
        <div>
          <button type="submit" class="Btn" id=${id}> Comment </button>
        </div>
      </li>
    `;
  });

  const btn = document.querySelectorAll('.likeBtn');
  btn.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      const id = data[index]['#IMDB_ID'];
      await postLikes(id);
      updateLikes();
    });
  });

  updateLikes();

  const movieDetails = await fetchMovieDetails(data[0]['#IMDB_ID']);
  return (movieDetails);
};

export default display;
