import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'


import Auth from './pages/auth/Auth'
import Chat from './pages/chat/Chat'
import Alert from './components/usedComponents/Alert/Alert'
import Loader from './components/usedComponents/Loader/Loader'
import Rooms from "./components/chatComponents/Rooms/Rooms";

const App = ({loading}) => {
  return (
    loading
    ? 
      <Loader />
    :
    <>
      <Alert />
     	<Router>
        <Switch>
            <Route path={'/auth'} component={Auth}/>
            <Route exact path={'/'} component={Chat}/>
        </Switch>
      </Router>
    </>
  )
}

const mapStateToProps = (state) => ({
	loading: state.loading.loading	
})

export default connect(mapStateToProps, null)(App)