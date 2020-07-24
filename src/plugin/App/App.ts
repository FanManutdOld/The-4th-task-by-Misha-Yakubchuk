import Model from '../Model/Model';
import View from '../View/MainView';
import Presenter from '../Presenter/Presenter';

class App {
  constructor(parent: HTMLElement, userConfig: any) {
    const model = new Model(userConfig);
    const view = new View(parent);
    new Presenter(model, view);
  }
}

export default App;
