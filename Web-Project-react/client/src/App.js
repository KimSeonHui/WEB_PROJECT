import MainHome from "./routes/MainHome";
import Board from "./routes/Board";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Create from "./routes/Create";
import Read from "./routes/Read";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return  <Router>
    <Switch>
        <Route path="/read/:postId">
          <Read />
        </Route>
        <Route path="/board/:cid">
          <Board />
        </Route>
        <Route path="/user/login">
          <Login />
        </Route>
        <Route path="/signin">
          <Signup />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/">
          <MainHome />
        </Route>
    </Switch>
  </Router>;
}

export default App;
