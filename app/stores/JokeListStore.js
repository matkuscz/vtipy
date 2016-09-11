import alt from '../alt';
import JokeListActions from '../actions/JokeListActions';

class JokeListStore {
  constructor() {
    this.bindActions(JokeListActions);
    this.jokes = [];
  }

  onGetJokesSuccess(data) {
    this.jokes = data;
  }

  onGetJokesFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(JokeListStore);
