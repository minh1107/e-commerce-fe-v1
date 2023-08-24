import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import paths from 'utils/paths'

const MemberLayout = () => {
    const { isLoggedIn, currentUser } = useSelector(state => state.userReducer)

    console.log(isLoggedIn, currentUser)
    if(!isLoggedIn || !currentUser) return <Navigate to={`/${paths.LOGIN}`} replace={true} />
    return (
    <div>
        {Outlet}
    </div>
  )
}

export default MemberLayout