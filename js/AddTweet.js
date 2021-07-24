import AbstractPage from './AbstractPage';

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle('Add Tweet');
  }

  getHtml() {
    return `
            <div class='content__add'>
            <header>
              <div class='wrapper'>
                <h1>Add tweet</h1>
              </div>
            </header>
            <main>
              <div class='wrapper'>
                <textarea class='newTweetContent' rows='6' cols='30'></textarea>
                <div class='content__add__links'>
                  <a href='/' class='cancel' data-link>Cancel</a>
                  <a href='/' class='saveChanges' data-link>Save</a>
                </div>
              </div>
            </main>
            </div>
        `;
  }
}
