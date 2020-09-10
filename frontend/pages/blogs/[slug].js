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

const SingleBlog = ({ blog, router }) => {
  const [related, setRelated] = useState([])

  useEffect(() => {
    axios
      .post('/blogs/related', blog)
      .then(({ data }) => {
        setRelated(data.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

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

  const showRelatedBlog = () => {
    return related.map((blog, i) => (
      <div className='col-md-4' key={i}>
        <article>
          <BlogRelated blog={blog} />
        </article>
      </div>
    ))
  }

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
                    Written by{' '}
                    <Link
                      as={`/profile/${blog.postedBy.username}`}
                      href={`/profile/${blog.postedBy.username}`}
                    >
                      <a>{blog.postedBy.name}</a>
                    </Link>{' '}
                    {moment(blog.updatedAt).fromNow()}
                  </p>

                  <div className='pb-3'>
                    {showBlogCategories(blog)}
                    {/* {showBlogTags(blog)} */}
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
              <div className='row'>{showRelatedBlog()}</div>
            </div>

            <div className='container pb-5'></div>
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
