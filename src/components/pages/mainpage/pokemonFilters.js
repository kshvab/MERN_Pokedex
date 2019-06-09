import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class PokemonFilters extends Component {
  changeFilter = ({ target: { value } }) => {
    this.props.store.updateFilter(value);
  };
  updateItemsPerPage = event => {
    this.props.store.updateItemsPerPage(event.target.value);
    this.props.store.updatePage(1);
  };
  updatePage = event => {
    this.props.store.updatePage(event.target.value);
  };
  updateTagFilter = event => {
    this.props.store.updateTagFilter(event.target.value);
  };

  paginationButtons = [];
  beforePagination = '';
  afterPagination = '';
  beforePaginationClass = '';
  afterPaginationClass = '';
  badges = [];
  render() {
    const {
      filter,
      itemsPerPage,
      pages,
      page,
      rWide,
      lWide,
      isTagShownArr
    } = this.props.store;

    this.badges = [];

    for (let i = 0; i < isTagShownArr.length; i++) {
      if (isTagShownArr[i].status)
        this.badges.push(
          <button
            onClick={this.updateTagFilter}
            key={isTagShownArr[i].name}
            value={isTagShownArr[i].name}
            className={
              'badge badge-' + isTagShownArr[i].name + ' badge-tag-item'
            }
          >
            {isTagShownArr[i].name} &#10007;
          </button>
        );
    }

    this.paginationButtons = [];

    for (let i = 1; i <= pages; i++) {
      if (i > +page - lWide && i < +page + rWide) {
        let liClassName = 'page-item';
        if (+page === +i) liClassName = 'page-item active';
        this.paginationButtons.push(
          <li key={i} className={liClassName}>
            <button
              className="page-link"
              href=""
              value={i}
              onClick={this.updatePage}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    this.beforePaginationClass = 'page-item';
    if (+page === 1) this.beforePaginationClass = 'page-item disabled';
    this.beforePagination = (
      <li className={this.beforePaginationClass}>
        <button
          className="page-link"
          href=""
          value="1"
          onClick={this.updatePage}
        >
          &laquo;
        </button>
      </li>
    );

    this.afterPaginationClass = 'page-item';
    if (+page === +pages) this.afterPaginationClass = 'page-item disabled';
    this.afterPagination = (
      <li className={this.afterPaginationClass}>
        <button
          className="page-link"
          href=""
          value={pages}
          onClick={this.updatePage}
        >
          &raquo;
        </button>
      </li>
    );
    return (
      <div>
        <hr />
        <div className="row">
          <div className="col-lg-3">
            <div>
              <ul className="pagination pagination-sm">
                {this.beforePagination}
                {this.paginationButtons}
                {this.afterPagination}
              </ul>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="form-group">
              <select
                className="custom-select-sm"
                onChange={this.updateItemsPerPage}
                value={itemsPerPage}
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
          <div className="col-lg-4">
            <input
              className="form-control form-control-sm"
              type="text"
              placeholder="Name Filter"
              id="nameFilter"
              value={filter}
              onChange={this.changeFilter}
            />
          </div>
          <div className="col-lg-4">
            <div className="form-group">
              <select
                className="custom-select-sm"
                onChange={this.updateTagFilter}
                value="Take a tag"
              >
                <option value="10">Take a tag</option>
                <option value="fighting">fighting</option>
                <option value="flying">flying</option>
                <option value="ground">ground</option>
                <option value="poison">poison</option>
                <option value="bug">bug</option>
                <option value="fire">fire</option>
                <option value="water">water</option>
                <option value="grass">grass</option>
                <option value="electric">electric</option>
                <option value="psychic">psychic</option>
                <option value="fairy">fairy</option>
                <option value="normal">normal</option>
              </select>
            </div>
          </div>
        </div>
        <div className="badges-raw">{this.badges}</div>
      </div>
    );
  }
}

export default PokemonFilters;

//<button onClick={this.getPokemon}>downloadPokemons</button>;
//<input className="filter" placeholder="Name Filter" value={filter} onChange={this.changeFilter} />
