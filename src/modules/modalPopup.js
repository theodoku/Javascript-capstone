import { postComments, getComments } from "../configurations/utilities.js";

const popup = document.getElementById('modal');
const popupContainer = document.querySelector('.modal-container');

const renderComments = (movie) => {
    popupContainer.innerHTML = '';
    popupContainer.innerHTML += `
        <div class="popup">
            <i class="fa fa-times fa-3x" aria-hidden="true"></i>
            <div class="movie-data">
                <div class="image-wrapper">
                    <img class="img" src="${movie.short.image}" alt="movie">
                </div>
                <div>
                    <h1>${movie.short.name}</h1>
                    <p>${movie.short.description}</p>
                </div>
            </div>
            
            <ul class="comments-list></ul>
            <div class=form-content>
                <h2>Add Comments</h2>
                <form id="form" action=''>
                    <div class="input">
                        <input type="text" placeholder="Name" id="name">
                    </div>
                    <div class="message">
                        <textarea name="comments" id="comment" cols="30" rows="10" placeholder="your comment here......"></textarea>
                    </div>
                    <div>
                        <button type="submit" class="btn Comment-btn">Comments</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    popup.style.display = 'block';
    const close = document.querySelector('.fa-times');
    close.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    const form = document.getElementById('form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name');
        const comment = document.getElementById('comment');
        if (name !== '' || comment !== '') {
            postComments({
                item_id: movie.imdbId, uesrname: name, comment,
            });
        }
        form.reset();
    });

    const commentList = document.querySelector('.comments-list');

    const displayComments = async () => {
        const comments = await getComments(movie.imdbId);
        commentList.innerHTML = '';
        comments.forEach(({ username, comment }) => {
            commentList.innerHTML += `
            <li>${username}: ${comment}</li>
            `;
        });
    };
    displayComments();
};

export default renderComments;