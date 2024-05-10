import './style.scss';
import appView from './views/appView';
import router from './services/router';

document.querySelector<HTMLDivElement>('.body')!.innerHTML = appView;

function initializeListeners() {
  const navLinks = document.querySelectorAll('.navigation__link');
  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const path = link.getAttribute('href');
      console.log(path);
      if (path) {
        router.navigate(path);
      }
    });
  });
}

function handleLocation() {
  const path = window.location.pathname;
  router.navigate(path!);
}

initializeListeners();

handleLocation();
