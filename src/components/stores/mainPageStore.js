import {
  //autorun,
  observable,
  computed,
  configure,
  action,
  decorate
} from 'mobx';
import axios from 'axios';
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
  isFavorite = false;
}

class MainPageStore {
  pokemonArr = [];

  fetchPokemons() {
    let qwantyty = 72;
    let readyIndex = 0;
    for (let i = 0; i < qwantyty; i++) {
      readyIndex++;
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
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
      if (readyIndex === qwantyty && this.user.isLoggedIn) {
        this.favoriteFromDbToUser();
      }
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

  get favoritePokemonArr() {
    let favPokeArr = [];
    for (let i = 0; i < this.pokemonArr.length; i++) {
      if (this.pokemonArr[i].isFavorite) favPokeArr.push(this.pokemonArr[i]);
    }
    return favPokeArr;
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

      for (let i = 0; i < this.user.favorite.length; i++) {
        for (let p = 0; p < tagFilteredArr.length; p++) {
          if (this.user.favorite[i].id === tagFilteredArr[p].id)
            tagFilteredArr[p].isFavorite = true;
        }
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
  //-----------------------------------------------------------
  user = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: '',
    favorite: []
  };

  setUser(val) {
    this.user = val;
  }

  logout() {
    this.user = {
      isLoggedIn: false,
      userID: '',
      name: '',
      email: '',
      picture: ''
    };
  }

  responseFacebook = response => {
    //console.log('Comes from FB:');
    //console.log(response);
    this.user = {
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    };
    //console.log('this.user ' + this.user.isLoggedIn);
    this.userLogin(response);
  };

  userLogin(userFromFb) {
    const user = {
      userID: userFromFb.userID,
      name: userFromFb.name,
      email: userFromFb.email,
      picture: userFromFb.picture.data.url
    };

    axios
      .get('http://localhost:4000/user')
      .then(response => {
        //console.log(response.data);
        let usersArr = response.data;
        let isRegistered = false;
        let userFromDb = {};
        for (let i = 0; i < usersArr.length; i++) {
          if (usersArr[i].userID === userFromFb.userID) {
            isRegistered = true;
            userFromDb = usersArr[i];
          }
        }
        //console.log(isRegistered);
        if (isRegistered) {
          if (userFromDb.favorite) {
            this.user.favorite = userFromDb.favorite;
          }
        } else {
          axios
            .post('http://localhost:4000/user/add', user)
            .then(res => console.log(res.data));
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentClicked = () => console.log('login button pushed');

  pokemonToFavorite(value) {
    let isInFavorite = false;
    let index = 0;
    for (let i = 0; i < this.user.favorite.length; i++) {
      if (+this.user.favorite[i].id === +value) {
        isInFavorite = true;
        index = i;
      }
    }

    let valueForPokemonArr;
    if (isInFavorite) {
      this.user.favorite.splice(index, 1);
      valueForPokemonArr = false;
    } else {
      this.user.favorite.push({ id: value });
      valueForPokemonArr = true;
    }

    for (let i = 0; i < this.tagFilteredPokemonArr.length; i++) {
      if (+this.tagFilteredPokemonArr[i].id === +value)
        this.tagFilteredPokemonArr[i].isFavorite = valueForPokemonArr;
    }
    console.log(this.user.favorite);

    axios
      .post('http://localhost:4000/user/update/' + this.user.userID, this.user)
      .then(res => console.log(res.data));
  }

  favoriteFromDbToUser() {
    axios
      .get('http://localhost:4000/user')
      .then(response => {
        //console.log(response.data);
        let usersArr = response.data;
        let isRegistered = false;
        let userFromDb = {};
        for (let i = 0; i < usersArr.length; i++) {
          if (usersArr[i].userID === this.user.userID) {
            isRegistered = true;
            userFromDb = usersArr[i];
          }
        }
        //console.log(isRegistered);
        if (isRegistered) {
          if (userFromDb.favorite) {
            this.user.favorite = userFromDb.favorite;
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
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
  tagFilteredPokemonArr: computed,
  favoritePokemonArr: computed,
  user: observable,
  setUser: action,
  logout: action,
  responseFacebook: action.bound,
  componentClicked: action,
  userLogin: action.bound,
  pokemonToFavorite: action.bound,
  favoriteFromDbToUser: action
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
