import { useEffect } from 'react'
import Router from 'next/router'
import { isAuth } from '../../actions/auth'

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      console.log('1')
      Router.push(`/signin`)
    } else if (isAuth()?.role !== 1) {
      console.log('2')
      Router.push(`/`)
    }
  }, [])

  return <>{children}</>
}

export default Admin
