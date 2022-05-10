/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {PrivateRoutes} from './PrivateRoutes'
import {Logout, AuthPage} from '../modules/auth'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {MasterInit} from '../../_metronic/layout/MasterInit'
import { Login } from '../modules/auth/components/Login'

const Routes: FC = () => {
  const ShowDocuments: FC = () => { 
    return (
      <MasterLayout>
        <PrivateRoutes />
      </MasterLayout>
    )
  }
  // const isAuthorized = useSelector<RootState>(({auth}) => auth.user, shallowEqual)
  const isAuthorized = true
  // const isAuthorized = undefined

  return (
    <>
      <Route path='/error' component={ErrorsPage} />
      <Route path='/logout' component={Logout} />
      
      <Switch>
        {!isAuthorized ? (
          /*Render auth page when user at `/auth` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from='/auth' to='/' />
        )}

        <Route path='/error' component={ErrorsPage} />
        <Route path='/logout' component={Logout} />

        {!isAuthorized ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to='/auth/login' />
        ) : (
            <Switch>
              <Route path='/login' component={Login} />
              <Route path='/kibardoc' component={ShowDocuments} />
              <Redirect exact from='/' to='/login' />
              <Redirect from='/login' to='/kibardoc' />
              {/* <ShowDocuments/>
              <Login/> */}
            </Switch>
          
        )}
      </Switch>
      <MasterInit />
    </>
  )
}

export {Routes}
