import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLogin = useSelector(state => state.user.isLogin)
    return (
        <Route
            {...rest}
            render={props =>
                (isLogin) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        ></Route>
    )
}

export default PrivateRoute