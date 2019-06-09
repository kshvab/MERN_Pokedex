import React from 'react';

const Sidebar = () => {
  return (
    <div>
      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">Header</div>
        <div className="card-body">
          <h4 className="card-title">Primary card title</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">Header</div>
        <div className="card-body">
          <h4 className="card-title">Primary card title</h4>
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
