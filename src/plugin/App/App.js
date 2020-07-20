import Model from '../Model/Model.js';
import View from '../View/MainView.js';
import Presenter from '../Presenter/Presenter.js';


class App {
  constructor(slider, userConfig) {
    let model = new Model(userConfig);
    let view = new View(slider);
    let presenter = new Presenter(model, view);
  }
}

export default App;