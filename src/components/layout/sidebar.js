import React from 'react';
import Auth from '../pages/auth/auth';

const Sidebar = () => {
  return (
    <div>
      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">User</div>
        <div className="card-body">
          <div>
            <Auth />
          </div>
        </div>
      </div>

      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">Solutions</div>
        <div className="card-body">
          <h4 className="card-title">Front End</h4>
          <div>- Pagination</div>
          <div>- Filter by name with a search box</div>
          <div>- Filter by type using tags</div>
        </div>
      </div>
      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">Solutions</div>
        <div className="card-body">
          <h4 className="card-title">Full Stack</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="pokemon-body">
        <div className="pokemon">
          <div className="go" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
