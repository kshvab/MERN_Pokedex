import React, { Component } from 'react';
import { observable, computed, configure, action, decorate } from 'mobx';
import { observer } from 'mobx-react';
import FacebookLogin from 'react-facebook-login';
configure({ enforceActions: 'observed' });

@observer
class Auth extends Component {
  state = {
    isLoggedIn: false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  };
  responseFacebook = response => {
    console.log('Comes from FB:');
    console.log(response);
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    });
  };

  componentClicked = () => console.log('Clicked');

  render() {
    let fbContent;
    if (this.state.isLoggedIn) {
      fbContent = (
        <div
          style={{
            width: '400px',
            margin: 'auto',
            padding: '15px'
          }}
        >
          <img src={this.state.picture} alt={this.state.name} />
          <h4>{this.state.name}</h4>
          <p>Email: {this.state.email}</p>
          <p>
            <button type="button" class="btn btn-outline-primary btn-sm">
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
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    return <div>{fbContent}</div>;
  }
}

export default Auth;
