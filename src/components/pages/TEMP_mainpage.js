import React, { Component } from 'react';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
configure({ enforceActions: 'observed' });

class Store {
  result = '111';

  pokemonJson() {
    fetch(`http://pokeapi.co/api/v2/pokemon/25`).then(response => {
      if (response.ok === true) {
        console.log(response.json());
        this.result = 777;
      }
    });
  }

  fert() {
    this.result = 777;
  }
}

decorate(Store, {
  fert: observable,
  result: observable,
  pokemonJson: action
});

const store = new Store();

@observer
class Table extends Component {
  getFirstJson = () => {
    store.fert();
  };
  render() {
    return (
      <div>
        <button onClick={this.getFirstJson} className="button">
          123
        </button>
        <hr />
        {store.result}
      </div>
    );
  }
}

const Mainpage = () => {
  return (
    <div>
      <h1>Main Page</h1>
      <p>Main Page text goes here!</p>

      <Table />
    </div>
  );
};

export default Mainpage;
