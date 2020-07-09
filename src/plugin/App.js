import model from './Model.js';
import view from './View.js';
import presenter from './Presenter.js';


class App {
  constructor(slider, data) {
    let Model = new model(slider, data);
    let View = new view();
    let Presenter = new presenter(Model, View);
  }
}

export default App;