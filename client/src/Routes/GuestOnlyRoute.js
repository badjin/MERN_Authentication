import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuestOnlyRoute = ({ component: Component, condition, ...rest }) => {
    const isLogin = useSelector(state => state.user.isLogin)
    return (
        <Route
            {...rest}
            render={props =>
                (!condition || !isLogin) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        ></Route>
    )
}

export default GuestOnlyRoute