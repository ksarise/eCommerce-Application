import './style.scss';
import Controller from './controllers/controller';

class App {
  public appController: Controller;

  constructor() {
    this.appController = new Controller();
  }

  public start() {
    this.appController.initialize();
  }
}

const app = new App();
app.start();
