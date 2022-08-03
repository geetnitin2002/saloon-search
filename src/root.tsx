import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./layout";

// const oAuth = () => {
//   return process.env.NODE_ENV === "development"
//     ? true
//     : !!storageGetItem(appConstants.USER_TOKEN);
// };

// const ProtectedRoutes = route => (
//   <Route
//     path={route.path}
//     exact={route.exact}
//     render={props =>
//       // pass the sub-routes down to keep nesting
//       oAuth() ? (
//         <route.component {...props} routes={route.routes} />
//       ) : (
//         <Redirect to="/login" />
//       )
//     }
//   />
// );
const PublicRoutes = (route: any) => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => <route.component {...props} routes={route.routes} />}
  />
);

class Root extends React.Component<any> {
  render() {
    return (
      <Switch>
        {publicRoutes &&
          publicRoutes.map((route: any, i) => (
            <PublicRoutes key={i} {...route} />
          ))}
      </Switch>
    );
  }
}

export default Root;
