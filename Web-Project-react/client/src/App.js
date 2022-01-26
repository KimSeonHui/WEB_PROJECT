import MainHome from "./routes/MainHome";
import Board from "./routes/Board";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {
  return  <Router>
    <Switch>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/">
          <MainHome />
        </Route>
    </Switch>
  </Router>;
}

export default App;
