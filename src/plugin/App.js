import model from './Model.js';
import view from './View.js';
import presenter from './Presenter.js';
import observer from './Observer.js';


class App {
  constructor(slider, data) {
    let Model = new model(slider, data, observer);
    let View = new view(observer);
    let Presenter = new presenter(Model, View);
  }
}

export default App;