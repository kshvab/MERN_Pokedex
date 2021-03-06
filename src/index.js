import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import './stylesheets/bootstrap.css';
import './stylesheets/custom.css';

import * as serviceWorker from './serviceWorker';
//import DevTools from 'mobx-react-devtools';

/*************** LAYOUT *************/
//import Header from './components/layout/header';
import Navbar from './components/layout/navbar';
import Sidebar from './components/layout/sidebar';
import Promo from './components/layout/promo';

/*************** PAGEs *************/
import About from './components/pages/about';

import Mainpage from './components/pages/mainpage/mainpage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<DevTools />*/}
          <Navbar />
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <Sidebar />
              </div>
              <div className="col-lg-8">
                <Promo />
                <Route exact path="/" component={Mainpage} />
                <Route path="/about" component={About} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
//
