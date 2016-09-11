import alt from '../alt';

class JokeListActions {
  constructor() {
    this.generateActions(
      'getJokesSuccess',
      'getJokesFail'
    );
  }

  getJokes(payload) {
    let url = '/api/top';

    $.ajax({ url: url })
      .done((data) => {
        this.actions.getJokesSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getJokesFail(jqXhr);
      });
  }
}

export default alt.createActions(JokeListActions);
