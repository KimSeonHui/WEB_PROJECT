import MainHome from "./routes/MainHome";
import Board from "./routes/Board";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Create from "./routes/Create";
import Read from "./routes/Read";
import Withdrawal from "./routes/Withdrawal";
import ChangePw from "./routes/ChangePw";
import FindPw from "./routes/FindPw";
import SettingManager from "./routes/SettingManager";
import SettingPost from "./routes/SettingPost";
import SettingUser from "./routes/SettingUser";
import SettingCategory from "./routes/SettingCategory";
import Update from "./routes/Update";

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
        <Route path="/board/:cid/:page">
          <Board />
        </Route>
        <Route path="/user/login">
          <Login />
        </Route>
        <Route path="/user/signup">
          <Signup />
        </Route>
        <Route path="/user/withdrawal">
          <Withdrawal />
        </Route>
        <Route path="/user/changepw">
          <ChangePw />
        </Route>
        <Route path="/user/findpw">
          <FindPw />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/update/:pid">
          <Update />
        </Route>
         <Route path="/setting/category">
          <SettingCategory />
        </Route>
        <Route path="/setting/post">
          <SettingPost />
        </Route>
        <Route path="/setting/user">
          <SettingUser />
        </Route>
        <Route path="/setting">
          <SettingManager />
        </Route>
        <Route path="/">
          <MainHome />
        </Route>
    </Switch>
  </Router>;
}

export default App;
