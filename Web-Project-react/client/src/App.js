import MainHome from "./routes/MainHome";
import Board from "./routes/Board";
import Login from "./routes/Login";

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
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <MainHome />
        </Route>
    </Switch>
  </Router>;
}

export default App;
