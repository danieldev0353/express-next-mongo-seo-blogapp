import Header from './Header'

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
