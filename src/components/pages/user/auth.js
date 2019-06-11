import React, { Component } from 'react';
import { configure } from 'mobx';
import { observer } from 'mobx-react';
import FacebookLogin from 'react-facebook-login';
configure({ enforceActions: 'observed' });

@observer
class Auth extends Component {
  logout = () => {
    this.props.store.logout();
  };

  render() {
    //console.log(this.props.store.user.isLoggedIn);

    let fbContent;
    if (this.props.store.user.isLoggedIn) {
      fbContent = (
        <div
          style={{
            margin: 'auto',
            padding: '15px'
          }}
        >
          <img
            src={this.props.store.user.picture}
            alt={this.props.store.user.name}
          />
          <h4>{this.props.store.user.name}</h4>
          <p>Email: {this.props.store.user.email}</p>
          <p>
            <button
              onClick={this.logout}
              type="button"
              className="btn btn-outline-primary btn-sm"
            >
              Logout
            </button>
          </p>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId="2454063384638044" //k8
          autoLoad={true}
          fields="name,email,picture"
          onClick={this.props.store.componentClicked}
          callback={this.props.store.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}

export default Auth;
