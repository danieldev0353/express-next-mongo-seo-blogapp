import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

import Layout from '../../components/Layout'
import axios from '../../axios.config'
import moment from 'moment'
import renderHTML from 'react-render-html'

const Blogs = ({ blogs, categories, tags, size }) => {
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
                Written by {blog.postedBy.name} | Published{' '}
                {moment(blog.updatedAt).fromNow()}
              </p>
            </section>
            <section>
              <p>blog categories and tags</p>
            </section>

            <div className='row'>
              <div className='col-md-4'>image</div>
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

  return (
    <Layout>
      <main>
        <div className='container-fluid'>
          <header>
            <div className='col-md-12 pt-3'>
              <h1 className='display-4 font-weight-bold text-center'>
                Programming blogs and tutorials
              </h1>
            </div>
            <section>
              <p>show categories and tags</p>
            </section>
          </header>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const {
    data: { data },
  } = await axios.get('/blogs-categories-tags')

  return {
    props: {
      blogs: data.blogs,
      categories: data.categories,
      tags: data.tags,
      size: data.blogs.length,
    },
  }
}

export default Blogs
