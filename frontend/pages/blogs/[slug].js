import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import moment from 'moment'
import getConfig from 'next/config'
import renderHTML from 'react-render-html'
import { withRouter } from 'next/router'

import Layout from '../../components/Layout'
import axios from '../../axios.config'
const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const SingleBlog = ({ blog, router }) => {
  const head = () => (
    <Head>
      <title>
        {blog.title} | {APP_NAME}
      </title>
      <meta name='description' content={blog.mdesc} />
      <link rel='canonical' href={`${DOMAIN}/blogs/${router.query.slug}`} />
      <meta property='og:title' content={`${blog.title}| ${APP_NAME}`} />
      <meta property='og:description' content={blog.mdesc} />
      <meta property='og:type' content='webiste' />
      <meta
        property='og:url'
        content={`${DOMAIN}/blogs/${router.query.slug}`}
      />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta property='og:image' content={`${API}/blog/photo/${blog.slug}`} />
      <meta
        property='og:image:secure_url'
        ccontent={`${API}/blog/photo/${blog.slug}`}
      />
      <meta property='og:image:type' content='image/jpg' />
    </Head>
  )

  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
      </Link>
    ))

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</a>
      </Link>
    ))

  return (
    <>
      {head()}
      <Layout>
        <main>
          <article>
            <div className='container-fluid'>
              <section>
                <div className='row'>
                  <img
                    src={`${API}/blog/photo/${blog.slug}`}
                    alt={blog.title}
                    className='img img-fluid featured-image'
                  />
                </div>
              </section>
              <section>
                <div className='container'>
                  <h1 className='display-2 pb-3 pt-3 text-center font-weight-bold'>
                    {blog.title}
                  </h1>
                  <p className='lead mt-3 mark'>
                    Written by {blog.postedBy.name} | Published{' '}
                    {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className='pb-3'>
                    {showBlogCategories(blog)}
                    {showBlogTags(blog)}
                    <br />
                    <br />
                  </div>
                </div>
              </section>
            </div>
            <div className='container'>
              <section>
                <div className='col-md-12 lead'>{renderHTML(blog.body)}</div>
              </section>
            </div>

            <div className='container'>
              <h4 className='text-center pt-5 pb-5 h2'>Related blogs</h4>
              <hr />
              <p>show related blogs</p>
            </div>

            <div className='container pb-5'>
              <p>show comments</p>
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
