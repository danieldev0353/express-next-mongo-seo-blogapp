import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import Layout from '../../components/Layout'
import axios from '../../axios.config'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { withRouter } from 'next/router'

import getConfig from 'next/config'

const SingleBlog = ({ blog, router }) => {
  return (
    <>
      <Layout>
        <main>
          <article>
            <div className='container-fluid'>
              <section>{JSON.stringify(blog)}</section>
            </div>
          </article>
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let blog = {}
  try {
    blog = await axios.get(`/blog/${query.slug}`)
  } catch (error) {
    console.error(error.message)
  }

  return {
    props: { blog: blog.data.data },
  }
}

export default withRouter(SingleBlog)
