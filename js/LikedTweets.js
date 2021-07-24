import AbstractPage from './AbstractPage';

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle('Liked Tweets');
  }

  getLikedTweets() {
    let keys = Object.keys(localStorage);
    let likedKeys = keys.filter((key) => key.startsWith('liked'));
    let likedStr = '';
    if (likedKeys.length === 0) {
      return `<div class='liked__empty'>You didn't like any tweets</div>`;
    }
    for (let key of likedKeys) {
      likedStr += `
        <div class='liked'>
          <div class='liked__tweet'>
            <a class='liked__tweet__text' id='${key}' href='/edit:${key}' data-link>${localStorage.getItem(
        key
      )}</a>
      <div class='heart'></div>
        </div>
        <div>
            <button class='removeLiked'>Remove</button>
        </div>
      </div>
        `;
    }
    return likedStr;
  }

  getHtml() {
    return `
            <div class='content__liked'>
              <header>
                <h1>Liked tweets</h1>
              </header>
              <main class='main'>
                <a href='/' id='back' class='back' data-link>Back</a>
                ${this.getLikedTweets()}
              </main>
            </div>
        `;
  }
}
