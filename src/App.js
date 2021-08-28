import './styling/css/main.css';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Chat from './components/Chat';
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </div>
  );
}

export default App;
