import React from 'react'
import '../static/App.css'
import '.././node_modules/nprogress/nprogress.css'

import NProgress from 'nprogress'
import Router from 'next/router'

Router.onRouteChangeStart = (url) => NProgress.start()
Router.onRouteChangeComplete = (url) => NProgress.done()
Router.onRouteChangeError = (url) => NProgress.done()

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
