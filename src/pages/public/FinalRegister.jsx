import React from 'react'
import { Navigate, useParams } from 'react-router-dom'
import paths from '../../utils/paths'

const FinalRegister = () => {
    const {status} = useParams()
    return (
    <Navigate to={`/${paths.LOGIN}`} state={status}/>
  )
}

export default FinalRegister