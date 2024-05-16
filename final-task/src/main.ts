import './style.scss';
import './styles/normalize.scss';
import AppController from './controllers/controller';

class App {
  public appController: AppController;

  constructor() {
    this.appController = new AppController();
  }

  public start() {
    this.appController.initialize();
  }
}

const app = new App();
app.start();
