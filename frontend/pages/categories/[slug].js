import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import moment from 'moment'
import getConfig from 'next/config'
import renderHTML from 'react-render-html'
import { withRouter } from 'next/router'

import BlogRelated from '../../components/BlogRelated'
import Layout from '../../components/Layout'
import axios from '../../axios.config'
const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const Category = ({ data }) => {
  return (
    <>
      <Layout>
        <main>
          <div className='container-fluid text-center'>
            <header>
              <div className='col-md-12 pt-3'>
                <h2 className='display-5 font-weight-bold mb-3 pb-4'>
                  Blogs with category: {data.category.name}
                </h2>
                <hr />
                {data?.blogs?.map((b, i) => (
                  <div>
                    <div>
                      <Link href={`/blogs/${b.slug}`} key={i}>
                        <a>{b.title}</a>
                      </Link>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let category = {}

  try {
    category = await axios.get(`/category/${query.slug}`)
  } catch (error) {
    console.error(error.message)
  }

  return {
    props: { data: category?.data?.data },
  }
}

export default withRouter(Category)
