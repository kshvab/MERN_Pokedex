import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class PokemonFilters extends Component {
  changeFilter = ({ target: { value } }) => {
    this.props.store.updateFilter(value);
  };

  render() {
    const { filter } = this.props.store;

    return (
      <div>
        <div className="row">
          <div className="col-lg-3">
            <div>
              <ul className="pagination pagination-sm">
                <li className="page-item disabled">
                  <a className="page-link" href="/#">
                    &laquo;
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="/#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/#">
                    4
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/#">
                    5
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="/#">
                    &raquo;
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="form-group">
              <select className="custom-select-sm">
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">50</option>
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
              <select className="custom-select-sm">
                <option selected="">Tags filter</option>
                <option value="1">10</option>
                <option value="2">20</option>
                <option value="3">50</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PokemonFilters;

//<button onClick={this.getPokemon}>downloadPokemons</button>;
//<input className="filter" placeholder="Name Filter" value={filter} onChange={this.changeFilter} />
