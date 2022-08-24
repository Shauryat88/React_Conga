import React from 'react';
import { Page, withModel } from '@adobe/aem-react-editable-components';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalContext } from "@azure/msal-react";
import { loginRequest } from "./authConfig";



const AppComp = () => {
  const { instance, accounts } = useMsal();

  React.useEffect(() => {
    getToken(true);
    const interval = setInterval(() => {
      getToken();
    }, (50 * 60 * 1000));

    return () => {
      clearInterval(interval);
    }
  }, []);

  const getToken = (reload) => {
    instance.loginPopup(loginRequest).then((data) => {
      localStorage.setItem('token', data.accessToken);
      if (reload) {
        window.location.reload();
      }
    }).catch(e => {
      console.log(e);
    });
  }


  const handleLogin = (loginType) => {
    if (loginType === "popup") {
      instance.loginPopup(loginRequest).catch(e => {
        console.log(e);
      });
    } else if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch(e => {
        console.log(e);
      });
    }
  }

  return (
    <div>
    
    </div>
  );
}

// This component is the application entry point
class App extends Page {
  static contextType = MsalContext;
  componentDidMount() {
    const isAuthenticated = this.context.accounts.length > 0;
    if (isAuthenticated) {
      setInterval(() => {
        this.getToken();
      }, (50 * 60 * 1000));
    }
  }
  getToken = (reload) => {
    this.context.instance.loginPopup(loginRequest).then((data) => {
      localStorage.setItem('token', data.accessToken);
      if (reload) {
        window.location.reload();
      }
    }).catch(e => {
      console.log(e);
    });
  }
  render() {

    return (
      <div>
        <AuthenticatedTemplate>
          {this.childComponents}
          {this.childPages}
        </AuthenticatedTemplate>

        <UnauthenticatedTemplate>
          <AppComp></AppComp>
        </UnauthenticatedTemplate>
      </div>
    );
  }
}

export default withModel(App);
