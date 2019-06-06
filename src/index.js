import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './bootstrap.css';
import * as serviceWorker from './serviceWorker';
import DevTools from 'mobx-react-devtools';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';

import Header from './components/header';
import Navbar from './components/navbar';
import User from './components/user';

import { BrowserRouter, Route } from 'react-router-dom';

configure({ enforceActions: 'observed' });

class Store {
  devsList = [
    { name: 'Jack', sp: 12 },
    { name: 'Pica', sp: 10 },
    { name: 'Bulba', sp: 8 }
  ];

  filter = '';

  get totalSum() {
    return this.devsList.reduce((sum, { sp }) => (sum += sp), 0);
  }

  get topPerformer() {
    const maxSp = Math.max(...this.devsList.map(({ sp }) => sp));
    return this.devsList.find(({ sp, name }) => {
      if (maxSp === sp) {
        return name;
      }
    });
  }

  get filteredDevelopers() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.devsList.filter(
      ({ name }) => !this.filter || matchesFilter.test(name)
    );
  }

  updateFilter(value) {
    this.filter = value;
  }

  clearList() {
    this.devsList = [];
  }

  addDeveloper(dev) {
    this.devsList.push(dev);
  }
}

decorate(Store, {
  devsList: observable,
  filter: observable,
  totalSum: computed,
  topPerformer: computed,
  filteredDevelopers: computed,
  clearList: action,
  addDeveloper: action,
  updateFilter: action
});

const appStore = new Store();

const Row = ({ data: { name, sp } }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{sp}</td>
    </tr>
  );
};

@observer
class Table extends Component {
  render() {
    const { store } = this.props;

    return (
      <table>
        <thead>
          <tr>
            <td>Name:</td>
            <td>SP:</td>
          </tr>
        </thead>
        <tbody>
          {store.filteredDevelopers.map((dev, i) => (
            <Row key={i} data={dev} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Team SP:</td>
            <td>{store.totalSum}</td>
          </tr>
          <tr>
            <td>Top performer:</td>
            <td>{store.topPerformer ? store.topPerformer.name : ''}</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

@observer
class Controls extends Component {
  addDeveloper = () => {
    const name = prompt('The name:');
    const sp = parseInt(prompt('The story points:'), 10);
    this.props.store.addDeveloper({ name, sp });
  };

  clearList = () => {
    this.props.store.clearList();
  };

  filterDevelopers = ({ target: { value } }) => {
    this.props.store.updateFilter(value);
  };

  render() {
    return (
      <div className="controls">
        <button className="btn btn-primary" onClick={this.clearList}>
          Clear table
        </button>
        <button className="btn btn-primary" onClick={this.addDeveloper}>
          Add record
        </button>
        <input
          value={this.props.store.filter}
          onChange={this.filterDevelopers}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <DevTools />
          <Header />
          <Navbar />
          <div className="container">
            <div className="row">
              <div className="col-lg-3">Sidebar</div>
              <div className="col-lg-9">
                <h1>Sprint Board</h1>

                <Controls store={appStore} />
                <Table store={appStore} />

                <Route path="/user" component={User} />
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

{
  // Saved
  /*
const nickName = observable(
  {
    firstName: 'Yauhen',
    age: 30,

    get nickName() {
      console.log('Generate nickName!');
      return `${this.firstName}${this.age}`;
    },

    increment() {
      this.age++;
    },

    decrement() {
      this.age--;
    }
  },
  {
    increment: action('Plus one'),
    decrement: action('Minus one')
  },
  {
    name: 'nickNameObservableObject'
  }
);

@observer
class Counter extends Component {
  handleIncrement = () => {
    this.props.store.increment();
  };
  handleDecrement = () => {
    this.props.store.decrement();
  };

  render() {
    return (
      <div className="App">
        <DevTools />
        <h1>{this.props.store.nickName}</h1>
        <h1>{this.props.store.age}</h1>
        <button onClick={this.handleDecrement}>-1</button>
        <button onClick={this.handleIncrement}>+1</button>
      </div>
    );
  }
}
*/
}

ReactDOM.render(<App store={Store} />, document.getElementById('root'));

serviceWorker.unregister();
