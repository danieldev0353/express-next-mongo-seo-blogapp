import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import Layout from '../../components/Layout'
import axios from '../../axios.config'
import moment from 'moment'
import renderHTML from 'react-render-html'
import { withRouter } from 'next/router'

import getConfig from 'next/config'
const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const Blogs = ({
  blogs,
  categories,
  tags,
  totalBlogs,
  blogsLimit,
  blogSkip,
  router,
}) => {
  const [loadedBlogs, setLoadedBlogs] = useState([])
  const [limit, setLimit] = useState(blogsLimit)
  const [skip, setSkip] = useState(0)
  const [size, setSize] = useState(totalBlogs)

  const loadMore = async () => {
    let toSkip = skip + limit

    try {
      const {
        data: { data },
      } = await axios.get(
        `/blogs-categories-tags?limit=${limit}&skip=${toSkip}`
      )

      setLoadedBlogs([...loadedBlogs, ...data.blogs])
      setSize(data.blogs.length)
      setSkip(toSkip)
    } catch (err) {
      console.error(err)
    }
  }

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button
          onClick={loadMore}
          style={{ width: '300px' }}
          className='btn btn-outline-primary btn-lg'
        >
          Load more
        </button>
      )
    )
  }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <div className='lead pb-4'>
            <header>
              <Link href={`/blogs/${blog.slug}`}>
                <a>
                  <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
                </a>
              </Link>
            </header>
            <section>
              <p className='mark ml-1 pt-2 pb-2'>
                Written by{' '}
                <Link href={`/profile/${blog.postedBy.username}`}>
                  <a>{blog.postedBy.name}</a>
                </Link>
                | Published {moment(blog.updatedAt).fromNow()}
              </p>
            </section>
            <section>
              {showBlogCategories(blog)}
              {/* {showBlogTags(blog)} */}
              <br />
              <br />
            </section>

            <div className='row'>
              <div className='col-md-4'>
                <img
                  className='img img-fluid'
                  style={{ maxHeight: '150px', width: 'auto' }}
                  src={`${API}/blog/photo/${blog.slug}`}
                  alt={blog.title}
                />
              </div>
              <div className='col-md-8'>
                <section>
                  <div className='pb-3'>{renderHTML(blog.excerpt)}</div>
                  <Link href={`/blogs/${blog.slug}`}>
                    <a className='btn btn-primary pt-2'>Read more</a>
                  </Link>
                </section>
              </div>
            </div>
          </div>
          <hr />
        </article>
      )
    })
  }

  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <div className='lead pb-4'>
          <header>
            <Link href={`/blogs/${blog.slug}`}>
              <a>
                <h2 className='pt-3 pb-3 font-weight-bold'>{blog.title}</h2>
              </a>
            </Link>
          </header>
          <section>
            <p className='mark ml-1 pt-2 pb-2'>
              Written by{' '}
              <Link href={`/profile/${blog.postedBy.username}`}>
                <a>{blog.postedBy.name}</a>
              </Link>
              | Published {moment(blog.updatedAt).fromNow()}
            </p>
          </section>
          <section>
            {showBlogCategories(blog)}
            {showBlogTags(blog)}
            <br />
            <br />
          </section>

          <div className='row'>
            <div className='col-md-4'>
              <img
                className='img img-fluid'
                style={{ maxHeight: '150px', width: 'auto' }}
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
              />
            </div>
            <div className='col-md-8'>
              <section>
                <div className='pb-3'>{renderHTML(blog.excerpt)}</div>
                <Link href={`/blogs/${blog.slug}`}>
                  <a className='btn btn-primary pt-2'>Read more</a>
                </Link>
              </section>
            </div>
          </div>
        </div>
        <hr />
      </article>
    ))
  }

  const head = () => (
    <Head>
      <title>Programming blogs | {APP_NAME}</title>
      <meta
        name='description'
        content='Programming blogs and tutorials on react node next'
      />
      <link rel='canonical' href={`${DOMAIN}${router.pathname}`} />
      <meta
        property='og:title'
        content={`Latest web developoment tutorials | ${APP_NAME}`}
      />
      <meta
        property='og:description'
        content='Programming blogs and tutorials on react node next'
      />
      <meta property='og:type' content='webiste' />
      <meta property='og:url' content={`${DOMAIN}${router.pathname}`} />
      <meta property='og:site_name' content={`${APP_NAME}`} />

      <meta
        property='og:image'
        content={`${DOMAIN}/static/images/seoblog.jpg`}
      />
      <meta
        property='og:image:secure_url'
        ccontent={`${DOMAIN}/static/images/seoblog.jpg`}
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

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className='btn btn-primary mr-1 ml-1 mt-3'>{c.name}</a>
      </Link>
    ))
  }

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/tags/${t.slug}`} key={i}>
        <a className='btn btn-outline-primary mr-1 ml-1 mt-3'>{t.name}</a>
      </Link>
    ))
  }

  return (
    <>
      {head()}
      <Layout>
        <main>
          <div className='container-fluid'>
            <header>
              <div className='col-md-12 pt-3'>
                <h1 className='display-5 font-weight-bold text-center'>
                  Programming blogs and tutorials
                </h1>
              </div>
              <section>
                <div className='pb-5 text-center'>
                  <hr />
                  {showAllCategories()}
                  <br />
                  {/* {showAllTags()}
                  <hr /> */}
                </div>
              </section>
            </header>
          </div>
          <div className='container-fluid'>{showAllBlogs()}</div>
          <div className='container-fluid'>{showLoadedBlogs()}</div>
          <div className='text-center pt-5 pb-5'>{loadMoreButton()}</div>
        </main>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  let skip = 0
  let limit = 2

try {
  let {
    data: { data },
  } = await axios.get(`/blogs-categories-tags?limit=${limit}&skip=${skip}`)

  return {
    props: {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      totalBlogs: data.blogs.length,
      blogsLimit: limit,
      blogSkip: skip,
    },
  }
 } catch (err) {
	  return {
		props: {
		  blogs: [],
		  categories: [],
		  tags: [],
		  totalBlogs: 0,
		  blogsLimit: limit,
		  blogSkip: skip,
		},
    }
 }
		
 
}

export default withRouter(Blogs)
