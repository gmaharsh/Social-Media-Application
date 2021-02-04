import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import MenuBar from './Components/MenuBar/MenuBar';

import { AuthProvider } from './context/auth';
import AuthRoute from './utils/AuthRoute';


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="ui container">
          <MenuBar />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
