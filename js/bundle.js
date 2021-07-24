import '../scss/main.scss';
import Main from './Main.js';
import AddTweet from './AddTweet';
import LikedTweets from './LikedTweets';
import EditTweet from './EditTweet';

const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = () => {
  const routes = [
    { path: '/', view: () => new Main() },
    { path: '/add', view: () => new AddTweet() },
    { path: '/liked', view: () => new LikedTweets() }
  ];

  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname.endsWith(route.path)
    };
  });

  let match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

  if (!match) {
    if (location.pathname.startsWith('/edit')) {
      match = {
        route: {
          path: location.pathname,
          view: () => new EditTweet()
        }
      };
    }
  }

  const view = match.route.view();

  document.getElementById('root').innerHTML = view.getHtml();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      if (e.target.className === 'saveChanges') {
        let textArea = document.querySelector('textarea');
        if (textArea.value === '') {
          showMessage(`Error! You can't tweet about that`);
          return;
        }
        textArea.className === 'newTweetContent'
          ? saveChanges(textArea.value)
          : saveUpdatedTweet(textArea.value);
      }
      if (enableNavigation) {
        navigateTo(e.target.href);
      }
    }
    if (e.target.className === 'tweet__remove') {
      removeTweet(e.target);
    }
    if (e.target.className === 'tweet__like') {
      likeTweet(e.target);
    }
    if (e.target.className === 'tweet__unLike') {
      unlikeTweet(e.target);
    }
    if (e.target.className === 'removeLiked') {
      removeFromLiked(e.target);
    }
  });

  let enableNavigation = true;

  function saveChanges(textArea) {
    let storageIndex;
    localStorage.length !== 0
      ? storageIndex = localStorage.length + 1
      : storageIndex = 1;

    if (storageIndex === 1) {
      localStorage.setItem(`tweet${storageIndex}`, textArea);
      return;
    }
    let keys = Object.keys(localStorage);
    for (let key of keys) {
      if (localStorage.getItem(key) === textArea) {
        showMessage(`Error! You can't tweet about that`);
        return;
      }
    }
    localStorage.setItem(`tweet${storageIndex}`, textArea);
  }

  function showMessage(message) {
    let messageBox = document.createElement('div');
    messageBox.className = 'messageBox';
    messageBox.textContent = message;
    document.getElementById('root').prepend(messageBox);
    enableNavigation = false;
    setTimeout(hideMesage, 2000);
  }

  function hideMesage() {
    enableNavigation = true;
    document.querySelector('.messageBox').style.display = 'none';
  }

  function saveUpdatedTweet(textArea) {
    let path = location.pathname;
    let targetKey = path.slice(path.indexOf(':') + 1);
    localStorage.setItem(targetKey, textArea);
  }

  function likeTweet(target) {
    let messageId;
    let targetTweet = target.parentElement.parentElement;
    let targetTweetText =
      targetTweet.querySelector('.tweet__edit__text').textContent;
    let keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (localStorage[key] === targetTweetText) {
        let index = key.charAt(key.length - 1);
        messageId = index;
        localStorage.removeItem(key);
        localStorage.setItem(`liked${index}`, targetTweetText);
      }
    });
    router();
    showMessage(`Hooray! You liked tweet with id ${messageId}!`);
  }

  function unlikeTweet(target) {
    let messageId;
    let targetTweet = target.parentElement.parentElement;
    let targetTweetText =
      targetTweet.querySelector('.tweet__edit__text').textContent;
    let keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (localStorage[key] === targetTweetText) {
        let index = key.charAt(key.length - 1);
        messageId = index;
        localStorage.removeItem(key);
        localStorage.setItem(`tweet${index}`, targetTweetText);
      }
    });
    router();
    showMessage(`Sorry you no longer like tweet with id ${messageId}`);
  }

  function removeFromLiked(target) {
    let targetTweet = target.parentElement.parentElement;
    let targetTweetText = targetTweet.querySelector(
      '.liked__tweet__text'
    ).textContent;

    let keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (localStorage[key] === targetTweetText) {
        let index = key.charAt(key.length - 1);
        localStorage.removeItem(key);
        localStorage.setItem(`tweet${index}`, targetTweetText);
      }
    });
    router();
  }

  function removeTweet(target) {
    let targetText =
      target.parentElement.parentElement.querySelector(
        '.tweet__edit__text'
      ).textContent;

    let keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (localStorage[key] === targetText) {
        localStorage.removeItem(key);
      }
    });
    router();
  }

  router();
});
