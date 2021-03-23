import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = ({ component: Component, condition, ...rest }) => {
    const user = useSelector(state => state.user)    
    
    return (
        <Route
            {...rest}
            render={props => 
                (condition && user.isLogin && user.userData.role === 'admin') ? (
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

export default AdminRoute