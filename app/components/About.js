import React from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="container">
        <h1>Databáze vtipů</h1>
        <p>Celkem máme X vtipů</p>
      </div>
    );
  }
}

export default About;
