import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const GuestOnlyRoute = ({ component: Component, ...rest }) => {
    const isLogin = useSelector(state => state.user.isLogin)
    return (
        <Route
            {...rest}
            render={props =>
                (!isLogin) ? (
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