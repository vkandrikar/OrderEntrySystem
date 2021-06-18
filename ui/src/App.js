import { Container, Row } from 'react-bootstrap'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

import 'react-bootstrap/dist/react-bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import Header from './elements/header'
import Home from './pages/home/index'
import PlaceOrder from './pages/placeOrder/index'
import Stats from './pages/stats/index'

function App() {
  return (
    <Provider store = {store}>
      <Container fluid className="pb-2">
        <Router>
          <Header />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route path="/home" component={Home} />
            <Route path="/order" component={PlaceOrder} />
            <Route path="/stats" component={Stats} />
          </Switch>
        </Router>
      </Container>
    </Provider>
  );
}

export default App;
