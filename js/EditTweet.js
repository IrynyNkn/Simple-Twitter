import AbstractPage from './AbstractPage';

export default class extends AbstractPage {
  constructor() {
    super();
    this.setTitle('Edit Tweet');
  }

  getHtml() {
    return `
            <div class='content__edit'>
                <header>
                    <h1>Edit Tweet</h1>
                </header>
                <main>
                <textarea class='editTweetContent' rows='6' cols='30'></textarea>
                <div>
                    <a href='/' class='cancel' data-link>Cancel</a>
                    <a href='/' class='saveChanges' data-link>Save Changes</a>
                </div>
                </main>
            </div>
        `;
  }
}
