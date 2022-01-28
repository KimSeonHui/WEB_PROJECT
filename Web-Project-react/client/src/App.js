import MainHome from "./routes/MainHome";
import Board from "./routes/Board";
import Login from "./routes/Login";
import Signup from "./routes/Signup";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return  <Router>
    <Switch>
        <Route path="/board/:cid">
          <Board />
        </Route>
        <Route path="/user/login">
          <Login />
        </Route>
        <Route path="/signin">
          <Signup />
        </Route>
        <Route path="/">
          <MainHome />
        </Route>
    </Switch>
  </Router>;
}

export default App;
