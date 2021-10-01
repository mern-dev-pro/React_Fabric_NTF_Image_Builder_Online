import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-color-palette/lib/css/styles.css";
import Main from './views/main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/">
            <Main/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
