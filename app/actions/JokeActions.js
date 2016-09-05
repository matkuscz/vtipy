import alt from '../alt';

class JokeActions {
constructor() {
  this.generateActions(
    'getJokeSuccess',
    'getJokeFail'
  );
}

getJoke(jokeId) {
  $.ajax({ url: '/api/jokes/' + jokeId })
    .done((data) => {
      this.actions.getJokeSuccess(data);
    })
    .fail((jqXhr) => {
      this.actions.getJokeFail(jqXhr);
    });
}

}

export default alt.createActions(JokeActions);
