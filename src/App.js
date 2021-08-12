import './App.css';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route />
      </Switch>
    </div>
  );
}

export default App;
