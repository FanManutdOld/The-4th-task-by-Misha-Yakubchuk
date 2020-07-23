import Model from '../Model/Model.js';
import View from '../View/MainView.js';
import Presenter from '../Presenter/Presenter.js';

class App {
  constructor(parent: HTMLElement, userConfig: any) {
    const model = new Model(userConfig);
    const view = new View(parent);
    new Presenter(model, view);
  }
}

export default App;
