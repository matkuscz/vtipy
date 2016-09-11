import React from 'react';
import {Link} from 'react-router';
import JokeListStore from '../stores/JokeListStore';
import JokeListActions from '../actions/JokeListActions';

class JokeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = JokeListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    JokeListStore.listen(this.onChange);
    JokeListActions.getJokes(this.props.params);
  }

  componentWillUnmount() {
    JokeListStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let jokesList = this.state.jokes.map((joke, index) => {
      return (
        <div key={joke.jokeId} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
            <div className='pull-left thumb-lg'>
              <Link to={'/jokes/' + joke.jokeId}></Link>
            </div>
            <div className='media-body'>
              <small>Jmeno: <strong>{joke.name}</strong></small>
              <br />
              <small>Text: <strong>{joke.text}</strong></small>
              <br />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {jokesList}
        </div>
      </div>
    );
  }
}

export default JokeList;
