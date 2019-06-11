import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { observable, action, decorate } from 'mobx';
import { observer } from 'mobx-react';

class Store {
  narrowMenuFlagClass = 'collapse';

  changeNarrowMenuFlagClass() {
    if (this.narrowMenuFlagClass === 'collapse') this.narrowMenuFlagClass = '';
    else this.narrowMenuFlagClass = 'collapse';
  }
}
decorate(Store, {
  narrowMenuFlagClass: observable,
  changeNarrowMenuFlagClass: action
});

const store = new Store();

@observer
class Navbar extends Component {
  changeMenuClass = () => {
    store.changeNarrowMenuFlagClass();
  };
  render() {
    return (
      <nav className="navbar sticky-top  navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Pokedex
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="/#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.changeMenuClass}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={store.narrowMenuFlagClass + ' navbar-collapse'}
            id="navbarColor01"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="">
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="text"
                placeholder="Search"
              />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
