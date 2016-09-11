import React from 'react';
import JokeStore from '../stores/JokeStore';
import JokeActions from '../actions/JokeActions'

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = JokeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    JokeStore.listen(this.onChange);
    JokeActions.getJoke(this.props.params.id);
  }

  componentWillUnmount() {
    JokeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    console.log(this.state);
    return (
      <div className='container'>
        <div className='joke-info clearfix'>
          <h2><strong>{this.state.name}</strong></h2>
          <h4 className='lead'>{this.state.text}</h4>
        </div>
      </div>
    );
  }
}

export default Joke;
