import counter from '../modules/itemsCounter.js'

describe('counter', () => {
  test('should update the movie element with the length of the provided data', () => {
    const data = [1, 2, 3];
    document.body.innerHTML = '<div id="movie"></div>';
    counter(data);
    expect(document.getElementById('movie').innerHTML).toBe(`(${data.length})`);
  });
});
