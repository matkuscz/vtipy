import React from 'React';

class Navbar extends React.Component {
  render() {
      return(

          <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
              <div className="container">
                  <div className="navbar-header">
                      <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                          <span className="sr-only">Vtipy</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                      </button>
                      <a className="navbar-brand" href="#">Vtipy</a>
                  </div>
                  <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                          <li>
                              <a href="#">About</a>
                          </li>
                          <li>
                              <a href="#">Contact</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </nav>
        
      );
  }
}

export default Navbar;
