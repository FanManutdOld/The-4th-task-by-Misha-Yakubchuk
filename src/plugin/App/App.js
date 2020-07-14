import Model from '../Model/Model.js';
import View from '../View/MainView.js';
import Presenter from '../Presenter/Presenter.js';
import Observer from '../Observer/Observer.js';


class App {
  constructor(slider, userConfig) {
    let model = new Model(slider, userConfig, Observer);
    let view = new View(Observer);
    let presenter = new Presenter(model, view);
  }
}

export default App;