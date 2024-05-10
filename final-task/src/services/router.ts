import Navigo from 'navigo';
import mainView from '../views/main';
import loginVeiw from '../views/login';
import registrationView from '../views/registration';

const router = new Navigo('/');

router.on('/', () => {
  document.getElementById('content')!.innerHTML = mainView;
  router.resolve();
});

router.on('/login', () => {
  document.getElementById('content')!.innerHTML = loginVeiw;
  router.resolve();
});

router.on('/registration', () => {
  document.getElementById('content')!.innerHTML = registrationView;
  router.resolve();
});

export default router;
