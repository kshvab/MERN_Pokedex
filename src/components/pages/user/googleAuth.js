import React, { Component } from 'react';
import store from '../../stores/mainPageStore';
//Assets

import config from './config';
import { observer } from 'mobx-react';

@observer
class GoogleLogin extends Component {
  componentWillMount() {
    if (localStorage['currentUserId'])
      store.updateCurrentUser(
        localStorage['currentUserName'],
        localStorage['currentUserId']
      );
  }

  componentDidMount() {
    (function() {
      var e = document.createElement('script');
      e.type = 'text/javascript';
      e.async = true;
      e.src = 'https://apis.google.com/js/client:platform.js?onload=gPOnLoad';
      var t = document.getElementsByTagName('script')[0];
      t.parentNode.insertBefore(e, t);
    })();
  }

  //Triggering login for google
  googleLogin = () => {
    let response = null;
    window.gapi.auth.signIn({
      callback: function(authResponse) {
        this.googleSignInCallback(authResponse);
      }.bind(this),
      clientid: config.google, //Google client Id
      cookiepolicy: 'single_host_origin',
      requestvisibleactions: 'http://schema.org/AddAction',
      scope: 'https://www.googleapis.com/auth/plus.login email'
    });
  };

  googleSignInCallback = e => {
    //console.log(e);
    if (e['status']['signed_in']) {
      window.gapi.client.load(
        'plus',
        'v1',
        function() {
          if (e['access_token']) {
            this.getUserGoogleProfile(e['access_token']);
          } else if (e['error']) {
            console.log('Import error', 'Error occured while importing data');
          }
        }.bind(this)
      );
    } else {
      console.log('Oops... Error occured while importing data');
    }
  };

  getUserGoogleProfile = accesstoken => {
    var e = window.gapi.client.plus.people.get({
      userId: 'me'
    });
    e.execute(
      function(e) {
        if (e.error) {
          console.log(e.message);
          console.log('Import error - Error occured while importing data');
          return;
        } else if (e.id) {
          //Profile data
          //alert('Successfull login from google : ' + e.displayName);
          //console.log(e);
          store.updateCurrentUser(e.displayName, e.id);
          //console.log(e.displayName);
          //console.log(e.id);
          //console.log(store.currentUser);
          return;
        }
      }.bind(this)
    );
  };

  render() {
    let userblock;

    if (store.currentUser.id) {
      userblock = (
        <div>
          <div>Привет, {store.currentUser.name}</div>{' '}
          <div>
            <br />
            <button
              type="button"
              className={'btn btn-outline-info btn-sm'}
              onClick={() => store.updateCurrentUser('', '')}
            >
              <span className="fas fa-heart fa-heart-item" /> Logout
            </button>
          </div>
        </div>
      );
    } else {
      userblock = (
        <button
          type="button"
          className={'btn btn-outline-info btn-sm'}
          onClick={() => this.googleLogin()}
        >
          <span className="fas fa-heart fa-heart-item" /> Google Auth
        </button>
      );
    }
    return <div>{userblock}</div>;
  }
}

export default GoogleLogin;
