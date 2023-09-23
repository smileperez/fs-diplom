import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import LogoComponent from '../components/LogoComponent';

export default function AuthLayout() {

    const { currentUser, userToken } = useStateContext();

    if (userToken) {
        return <Navigate to='/admin/dashboard' />
    }

    return (
        <div className="mx-auto mt-[20%] w-[400px] bg-gray-300">
            <header className="p-2 flex flex-col items-center bg-[#63536C]">
                <LogoComponent />
            </header>
            <Outlet />
        </div>
    )
}