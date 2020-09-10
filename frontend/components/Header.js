import { useEffect } from 'react'
import getConfig from 'next/config'
import Link from 'next/link'
import { useState } from 'react'
import Router from 'next/router'
import { signout, isAuth } from '../actions/auth'
import Search from './Search'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap'

const { publicRuntimeConfig } = getConfig()

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [auth, setAuth] = useState({})

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setAuth(isAuth())
  }, [])

  return (
    <div>
      <Navbar color='light' light expand='md'>
        <Link href='/'>
          <h4 style={{ position: 'relative', top: '5px' }}>
            <NavLink className='font-weight-bold'>
              {publicRuntimeConfig.APP_NAME}
            </NavLink>
          </h4>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='ml-auto' navbar>
            {/* {auth?.role == 0 && (
              <NavItem>
                <Link href='/user'>
                  <NavLink>{`${auth.name}'s Dashboard`}</NavLink>
                </Link>
              </NavItem>
            )} */}

            {auth?.role == 1 && (
              <NavItem>
                <Link href='/admin'>
                  <NavLink>{`${auth.name}'s AdminDashboard`}</NavLink>
                </Link>
              </NavItem>
            )}

            {!auth && (
              <>
                <NavItem>
                  <Link href='/signin'>
                    <NavLink>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href='/signup'>
                    <NavLink>Signup</NavLink>
                  </Link>
                </NavItem>
              </>
            )}

            {auth && (
              <NavItem>
                <NavLink
                  onClick={() => signout(() => Router.replace(`/signin`))}
                >
                  Signout
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <Search />
    </div>
  )
}

export default Header
