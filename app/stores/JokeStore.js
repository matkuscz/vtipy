import assign from 'underscore';
import alt from '../alt';
import JokeActions from '../actions/JokeActions';

class JokeStore {
  constructor() {
    this.bindActions(JokeActions);
    this.jokeId = 0;
    this.name = "";
    this.text = "";
    this.reports = 0;
  }

  onGetJokeSuccess(data) {
    console.log(data);
    this.jokeId = data.jokeId;
    this.name = data.name;
    this.text = data.text;
    this.reports = data.reports;
  }

  onGetJokeFail(errorMessage) {
    toastr.error(errorMessage);
  }
}

export default alt.createStore(JokeStore);
