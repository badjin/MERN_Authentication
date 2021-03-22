import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AdminRoute = ({ component: Component, condition, ...rest }) => {
    const user = useSelector(state => state.user)
    // if (!condition || !user.isLogin){
    //     toast.error("Please Sign In first.")
    // } else if (user.userData.role !== 'admin'){
    //     toast.error("You don't have administrator authentication.")
    // }
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