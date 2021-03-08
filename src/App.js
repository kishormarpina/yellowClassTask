import logo from './logo.svg';
import homepage from './components/homepage';
import picModel from './components/picModel';
import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
  } from "react-router-dom";

function App() {
  return (
    <main>
      <Router> 
        <Switch>
            <Route path="/" component={homepage} exact />
            <Route path="/picModel" component={picModel} exact />
        </Switch>
      </Router>
    </main>
  );
}

export default App;
