import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import getConfig from 'next/config'
import { withRouter } from 'next/router'

import moment from 'moment'
import Layout from '../../components/Layout'
import axios from '../../axios.config'
const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const UserProfile = ({ user, blogs }) => {
  useEffect(() => {}, [])

  const showUserBlogs = () => {
    return blogs?.map((blog, i) => {
      return (
        <div className='mt-4 mb-4' key={i}>
          <Link href={`/blogs/${blog.slug}`}>
            <a className='lead'>{blog.title}</a>
          </Link>
        </div>
      )
    })
  }

  return (
    <>
      <Layout>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
              <div className='card'>
                <div className='card-body'>
                  <h5>{user.name}</h5>
                  <Link href={`${user.profile}`}>
                    <a>View Profile</a>
                  </Link>
                  <p className='text-muted'>
                    Joined {moment(user.createdAt).fromNow()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <br />

        <div className='container pb-5'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-white'>
                    Recent blogs by {user.name}
                  </h5>

                  {showUserBlogs()}
                </div>
              </div>
            </div>

            <div className='col-md-6'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title bg-primary pt-4 pb-4 pl-4 pr-4 text-light'>
                    Message {user.name}
                  </h5>
                  <br />
                  <p>contact form</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  try {
    let username = query.username
    let result = await axios.get(`/user/${username}`)
    let user = result.data
    let blogs = result.blogs
    return { props: { user } }
  } catch (error) {
    console.log(error)
    return { props: {} }
  }
}

export default withRouter(UserProfile)
