import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class PokemonList extends Component {
  componentWillMount() {
    this.props.store.fetchPokemons();
  }

  render() {
    const { filter, pokemonArr } = this.props.store;

    let pokemons = [];
    let pokemonsData = pokemonArr;

    for (var i = 0; i < pokemonsData.length; i++) {
      pokemons.push(
        <div key={pokemonsData[i].id} className="pokemon-list-item">
          <div className="card border-success mb-3">
            <div className="card-header">
              <div class="row">
                <div class="col-lg-2">ID: {pokemonsData[i].id}</div>
                <div class="col-lg-7">
                  <span class={`badge badge-${pokemonsData[i].type}`}>
                    {pokemonsData[i].type}
                  </span>
                </div>
                <div class="col-lg-3">Actions</div>
              </div>
            </div>
            <div className="card-body">
              <p className="card-text">
                <div class="row">
                  <div class="col-lg-2 pokemon-list-item-img">
                    <img
                      src={pokemonsData[i].avatar}
                      alt={pokemonsData[i].name}
                      align="center"
                    />
                  </div>
                  <div class="col-lg-10">
                    <h4 className="card-title pokemon-list-item-title">
                      {pokemonsData[i].name}
                    </h4>
                    <div class="row">
                      <div class="col-lg-4">
                        <p>Type: {pokemonsData[i].type}</p>
                        <p>Weight: {pokemonsData[i].weight}</p>
                      </div>
                      <div class="col-lg-4">
                        <p>Hp: {pokemonsData[i].hp}</p>
                        <p>Speed: {pokemonsData[i].speed}</p>
                      </div>
                      <div class="col-lg-4">
                        <p>Attack: {pokemonsData[i].attack}</p>
                        <p>Defense: {pokemonsData[i].defense}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h3>LIST</h3>
        <div className="pokemon-list">{pokemons}</div>
      </div>
    );
  }
}

export default PokemonList;

//<button onClick={this.getPokemon}>downloadPokemons</button>;
