import model from '../Model/Model.js';
import view from '../View/View.js';
import presenter from '../Presenter/Presenter.js';
import observer from '../Observer/Observer.js';


class App {
  constructor(slider, userConfig) {
    let Model = new model(slider, userConfig, observer);
    let View = new view(observer);
    let Presenter = new presenter(Model, View);
  }
}

export default App;