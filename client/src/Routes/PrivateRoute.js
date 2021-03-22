import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = ({ component: Component, condition, ...rest }) => {
    const user = useSelector(state => state.user)
    return (
        <Route
            {...rest}
            render={props =>
                (condition && user.isLogin) ? (
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