import React, { Component } from 'react';
import { observer } from 'mobx-react';
import store from '../../stores/mainPageStore';

import PokemonList from './pokemonList';
import PokemonFilters from './pokemonFilters';
@observer
class Mainpage extends Component {
  render() {
    return (
      <div>
        <PokemonFilters store={store} />
        <PokemonList store={store} />
      </div>
    );
  }
}

export default Mainpage;
