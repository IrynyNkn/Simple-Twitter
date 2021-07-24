import AbstractPage from './AbstractPage';

export default class extends AbstractPage {
  constructor(likedTweets) {
    super();
    this.setTitle('Simple Twitter');
    this.likedTweets = likedTweets;
  }

  getAllTweets() {
    let allTweets = '';
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      if (key.startsWith('liked')) {
        allTweets += `
        <div class='tweet'>
        <div class='tweet__edit'>
          <a class='tweet__edit__text' id='${key}' href='/edit:${key}' data-link>${localStorage.getItem(
          key
        )}</a>
        <div class='heart'></div>
        </div>
        <div>
            <button class='tweet__remove'>remove</button>
            <button class='tweet__unLike'>Unlike</button>
        </div>
      </div>
        `;
      } else {
        allTweets += `
            <div class='tweet'>
              <div class='tweet__edit'>
                <a class='tweet__edit__text' id='${key}' href='/edit:${key}' data-link>${localStorage.getItem(
          key
        )}</a>
              </div>
              <div>
                  <button class='tweet__remove'>remove</button>
                  <button class='tweet__like'>Like</button>
              </div>
            </div>
        `;
      }
    }
    return allTweets;
  }

  getHtml() {
    return `
          <div class='content'>
            <header>
              <div class='wrapper'>
                <h1>Simple Twitter</h1>
              </div> 
            </header>
            <nav class='main__nav'>
              <a href='/add' id='addTweet' class='main__add__link' data-link>Add tweet</a>
              <a href='/liked' id='likedTweets' class='main__liked__link' data-link>Go to liked</a>
            </nav>
            <main>
            ${this.getAllTweets()}
            </main>
          </div>
        `;
  }
}
