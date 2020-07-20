import Model from '../Model/Model.js';
import View from '../View/MainView.js';
import Presenter from '../Presenter/Presenter.js';


class App {
  constructor(parent, userConfig) {
    let model = new Model(userConfig);
    let view = new View(parent);
    let presenter = new Presenter(model, view);
  }
}

export default App;