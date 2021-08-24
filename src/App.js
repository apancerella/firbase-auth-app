import React from "react";
// import { Router } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ProfilePage from "./components/ProfilePage";
import PasswordReset from "./components/PasswordReset";
import UserProvider from "./providers/UserProvider";
function App() {
  const user = null;
  return (
    <UserProvider>
      {
        user ?
        <ProfilePage />
      :
        <Router>
          <Route exact path='/' component={SignIn} />
          <Route path='/signUp' component={SignUp} />
          <Route path='/passwordReset' component={PasswordReset} />
        </Router>
        // <BrowserRouter>
        //   <SignUp path="signUp" />
        //   <SignIn path="/" />
        //   <PasswordReset path = "passwordReset" />
        // </BrowserRouter>
      }
    </UserProvider>
  );
}
export default App;