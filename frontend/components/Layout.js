import Header from './Header'
import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = (url) => NProgress.done()
Router.onRouteChangeError = (url) => NProgress.done()

const Layout = ({ children }) => {
  return (
    <div className='container'>
      <Header />
      {children}
      <p>footer</p>
    </div>
  )
}

export default Layout
