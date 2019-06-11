import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class PokemonList extends Component {
  componentWillMount() {
    this.props.store.fetchPokemons();
  }

  pokemonToFavorite = event => {
    this.props.store.pokemonToFavorite(event.target.value);
  };

  render() {
    const { page, len, itemsPerPage, tagFilteredPokemonArr } = this.props.store;
    const { user } = this.props.store;

    let pokemons = [];

    let pokemonsData = tagFilteredPokemonArr;

    for (var i = page * itemsPerPage - itemsPerPage; i < len; i++) {
      if (pokemonsData[i] && i < page * itemsPerPage) {
        pokemons.push(
          <div key={pokemonsData[i].id} className="pokemon-list-item">
            <div className="card border-success mb-3">
              <div className="card-header">
                <div className="row">
                  <div className="col-lg-2">ID: {pokemonsData[i].id}</div>
                  <div className="col-lg-7">
                    <span className={`badge badge-${pokemonsData[i].type}`}>
                      {pokemonsData[i].type}
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <button
                      value={pokemonsData[i].id}
                      type="button"
                      className={
                        (pokemonsData[i].isFavorite
                          ? 'btn btn-danger btn-sm'
                          : 'btn btn-outline-danger btn-sm') +
                        (user.isLoggedIn ? '' : ' hidden')
                      }
                      onClick={this.pokemonToFavorite}
                    >
                      <span className="fas fa-heart fa-heart-item" /> Favorite
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="card-text">
                  <div className="row">
                    <div className="col-lg-2 pokemon-list-item-img">
                      <img
                        src={pokemonsData[i].avatar}
                        alt={pokemonsData[i].name}
                        align="center"
                      />
                    </div>
                    <div className="col-lg-10">
                      <h4 className="card-title pokemon-list-item-title">
                        {pokemonsData[i].name}
                      </h4>
                      <div className="row">
                        <div className="col-lg-4">
                          <p>Type: {pokemonsData[i].type}</p>
                          <p>Weight: {pokemonsData[i].weight}</p>
                        </div>
                        <div className="col-lg-4">
                          <p>Hp: {pokemonsData[i].hp}</p>
                          <p>Speed: {pokemonsData[i].speed}</p>
                        </div>
                        <div className="col-lg-4">
                          <p>Attack: {pokemonsData[i].attack}</p>
                          <p>Defense: {pokemonsData[i].defense}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div>
        <h3>LIST</h3>

        <div className="pokemon-list">{pokemons}</div>
        <div className="hidden">{JSON.stringify(user)} </div>
      </div>
    );
  }
}

export default PokemonList;
//className="hidden"
//<button onClick={this.getPokemon}>downloadPokemons</button>;
//<div>{JSON.stringify(user)} </div>
