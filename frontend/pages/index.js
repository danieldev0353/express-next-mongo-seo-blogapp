import Layout from '../components/Layout'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Router from 'next/router'

const Index = () => {
  useEffect(() => {
    Router.push(`/blogs`)
  }, [])

  return (
    <Layout>
      {/* <h2>Blogs</h2>
      <Link href='/blogs'>
        <a>blogs</a>
      </Link> */}
    </Layout>
  )
}

export default Index
