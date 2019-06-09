import {
  autorun,
  observable,
  computed,
  configure,
  action,
  decorate
} from 'mobx';

configure({ enforceActions: 'observed' });

class Pokemon {
  id;
  name;
  avatar;
  type;
  weight;
  speed;
  defense;
  attack;
  hp;
}

class MainPageStore {
  pokemonArr = [];

  fetchPokemons() {
    for (let i = 0; i < 51; i++) {
      fetch(`http://pokeapi.co/api/v2/pokemon/${i}`)
        .then(response => {
          if (response.ok === true) {
            //console.log(response);
            return response.json();
          }
        })
        .then(response => {
          let pokemon = new Pokemon();
          pokemon.id = response.id;
          pokemon.name = response.name;
          pokemon.avatar = response.sprites.front_default;
          pokemon.type = response.types[0].type.name;
          pokemon.weight = response.weight;
          pokemon.speed = response.stats[0].base_stat;
          pokemon.defense = response.stats[3].base_stat;
          pokemon.attack = response.stats[4].base_stat;
          pokemon.hp = response.stats[5].base_stat;
          this.addPokemonToPokemonArr(pokemon);
        })
        .catch(error => {
          return;
        });
    }
  }

  addPokemonToPokemonArr(value) {
    this.pokemonArr.push(value);
  }

  isTagShownObj = {
    normal: true,
    fighting: true,
    flying: true,
    poison: true,
    ground: true,
    rock: true,
    bug: true,
    ghost: true,
    steel: true,
    fire: true,
    water: true,
    grass: true,
    electric: true,
    psychic: true,
    ice: true,
    dragon: true,
    dark: true,
    fairy: true,
    unknown: true,
    shadow: true
  };

  filter = '';

  updateFilter(value) {
    this.filter = value;
  }
  /*
  get filteredPokemonArr() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.pokemonArr.filter(
      ({ name }) => !this.filter || matchesFilter.test(name)
    );
  }
*/
}

decorate(MainPageStore, {
  pokemonArr: observable,
  fetchPokemons: action.bound,
  addPokemonToPokemonArr: action.bound,
  filter: observable,
  updateFilter: action
});

let store = (window.store = new MainPageStore());

let pokemon = new Pokemon();

export default store;

autorun(() => {
  console.log('myPokemon: ' + store.myPokemon);
  console.log('pokemon.name: ' + pokemon.name);
  console.log('store.filter: ' + store.filter);
  //console.log('store.pokemonArr[0]: ' + store.pokemonArr);
});
