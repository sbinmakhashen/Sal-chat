import './App.css';
import Login from './components/Login';
import { Switch, Route } from 'react-router-dom';
import Chat from './components/Chat';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/chat' component={Chat} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
