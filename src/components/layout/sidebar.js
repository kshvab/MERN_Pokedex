import React from 'react';
//import Auth from '../pages/user/auth';
//import store from '../stores/mainPageStore';
import GoogleLogin from '../pages/user/googleAuth';
const Sidebar = () => {
  return (
    <div>
      <div className="card border-primary mb-3 k8-card-sidebar">
        <div className="card-header">User</div>
        <div className="card-body">
          <div className="card-body-auth">
            <GoogleLogin />
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
            Problems: Bad reactivity of elements (favorite button)
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
//<Auth store={store} />
