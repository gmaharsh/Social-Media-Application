import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MenuBar from './Components/MenuBar/MenuBar';

import {AuthProvider} from './context/auth'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
