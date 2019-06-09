import {
  //autorun,
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
    for (let i = 0; i < 73; i++) {
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

  isTagShownArr = [
    { name: 'normal', status: false },
    { name: 'fighting', status: false },
    { name: 'poison', status: false },
    { name: 'ground', status: false },
    { name: 'rock', status: false },
    { name: 'bug', status: false },
    { name: 'ghost', status: false },
    { name: 'flying', status: false },
    { name: 'steel', status: false },
    { name: 'fire', status: false },
    { name: 'water', status: false },
    { name: 'grass', status: false },
    { name: 'electric', status: false },
    { name: 'psychic', status: false },
    { name: 'ice', status: false },
    { name: 'dragon', status: false },
    { name: 'dark', status: false },
    { name: 'fairy', status: false },
    { name: 'unknown', status: false },
    { name: 'shadow', status: false }
  ];

  filter = '';

  updateFilter(value) {
    this.filter = value;
  }

  updateTagFilter(value) {
    for (let i = 0; i < this.isTagShownArr.length; i++) {
      if (this.isTagShownArr[i].name === value)
        this.isTagShownArr[i].status = !this.isTagShownArr[i].status;
    }
  }

  get filteredPokemonArr() {
    const matchesFilter = new RegExp(this.filter, 'i');
    return this.pokemonArr.filter(
      ({ name }) => !this.filter || matchesFilter.test(name)
    );
  }

  get tagFilteredPokemonArr() {
    let existFilter = false;
    for (let i = 0; i < this.isTagShownArr.length; i++) {
      if (this.isTagShownArr[i].status === true) existFilter = true;
    }

    if (!existFilter) return this.filteredPokemonArr;
    else {
      let tagFilteredArr = [];
      for (let i = 0; i < this.isTagShownArr.length; i++) {
        if (this.isTagShownArr[i].status) {
          console.log(
            this.isTagShownArr[i].name + ' - ' + this.isTagShownArr[i].status
          );

          //if (this.isTagShownArr[i].status) {
          for (let k = 0; k < this.filteredPokemonArr.length; k++) {
            if (this.isTagShownArr[i].name === this.filteredPokemonArr[k].type)
              tagFilteredArr.push(this.filteredPokemonArr[k]);
          }
        }
        //}
      }

      return tagFilteredArr;
    }
  }

  itemsPerPage = 10;

  updateItemsPerPage(val) {
    this.itemsPerPage = val;
  }

  page = 1;
  updatePage(val) {
    this.page = val;
  }

  get len() {
    return this.tagFilteredPokemonArr.length;
  }

  get rest() {
    return this.len % this.itemsPerPage;
  }

  get fullPages() {
    return (this.len - this.rest) / this.itemsPerPage;
  }

  get pages() {
    return this.fullPages + 1;
  }

  get rWide() {
    if (+this.page === 1) return 5;
    else if (+this.page === 2) return 4;
    else return 3;
  }

  get lWide() {
    if (+this.page === +this.pages) return 5;
    if (+this.page === +this.pages - 1) return 4;
    else return 3;
  }
}

decorate(MainPageStore, {
  pokemonArr: observable,
  itemsPerPage: observable,
  fetchPokemons: action.bound,
  addPokemonToPokemonArr: action.bound,
  filter: observable,
  updateFilter: action,
  updateTagFilter: action,
  filteredPokemonArr: computed,
  updateItemsPerPage: action,
  page: observable,
  updatePage: action,
  len: computed,
  rest: computed,
  fullPages: computed,
  pages: computed,
  rWide: computed,
  lWide: computed,
  isTagShownArr: observable,
  tagFilteredPokemonArr: computed
});

let store = (window.store = new MainPageStore());

export default store;

/*
autorun(() => {
  console.log('myPokemon: ' + store.myPokemon);
  console.log('pokemon.name: ' + pokemon.name);
  console.log('store.filter: ' + store.filter);
  //console.log('store.pokemonArr[0]: ' + store.pokemonArr);
});
*/
