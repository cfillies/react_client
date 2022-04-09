import React, {Suspense} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../_metronic/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'

export function PrivateRoutes() {
        
  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/kibardoc' component={DashboardWrapper} />
        <Redirect exact from='/' to='/kibardoc' />
      </Switch>
    </Suspense>
  )
}
