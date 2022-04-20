import "./App.css";
import SecuredRoute from "./Components/SecuredRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "../src/Components/login/Login";
import { useState, useEffect } from "react";
import DashboardHome from "./Components/Index/DashboardHome";
import { useSelector } from "react-redux";

function App() {
  // let debug = false;
  // const dispatch = useDispatch();
  // const [x, settingx] = useState(true);
  let userPresent = useSelector((state) => state.userLog.UserPresent);
  console.log(userPresent);

  let existing_user = localStorage.getItem("userPresent");

  const [isLoggedIn, setIsLoggedIn] = useState(existing_user);

  // const isLogedHandler = (val) => {
  //   setIsLoggedIn(val)
  // };
  // if(debug) console.log(location.pathname)
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("userPresent"));
  }, [userPresent]);

  // const p = useSelector(state=>state.userLog.currentPath)
  // if(debug) console.log(p)

  return (
    <Router>
      <Switch>
        {/* try simplyfing this*/}
        {/* <Route exact path="/login" component={<Login />} /> */}
        <SecuredRoute
          path="/homeDashboard"
          component={DashboardHome}
          auth={isLoggedIn}
        />
        <Route to="/login">
          {!isLoggedIn ? (
            <Login />
          ) : (
            <Redirect to={"/homeDashboard/Dashboard"} />
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
