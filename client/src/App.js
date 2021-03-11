import { Route, Switch, Redirect } from 'react-router-dom'
import Register from './screens/Register'
import Activation from './screens/Activation'
import Login from './screens/Login'
import Home from './screens/Home'
import ForgotPassword from './screens/ForgotPassword'
import ResetPassword from './screens/ResetPassword'
import Private from './screens/Private'
import PrivateRoute from './Routes/PrivateRoute'
import Admin from './screens/Admin'
import AdminRoute from './Routes/AdminRoute'
import Navbar from './components/Navbar'
import About from './screens/About'
import Contact from './screens/Contact'

const App = () => {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path='/' exact render={props => <Home {...props} /> } />
        <Route path='/register' render={props => <Register {...props} /> } />
        <Route path='/login' render={props => <Login {...props} />} />
        <Route path='/users/activate/:token' exact render={props => <Activation {...props} />} />
        <Route path='/users/password/forget' exact render={props => <ForgotPassword {...props} />} />
        <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
        <Route path='/about' exact render={props => <About {...props} />} />
        <Route path='/contact' exact render={props => <Contact {...props} />} />
        <PrivateRoute path="/private" exact component={Private} />
        <AdminRoute path="/admin" exact component={Admin} />
        <Redirect to='/' />
      </Switch>
    </div>
  )
}

export default App;
