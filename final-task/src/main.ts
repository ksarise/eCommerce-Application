import './style.scss';
import AppController from './controllers/appController';

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
