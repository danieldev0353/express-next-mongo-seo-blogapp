import axios from '../axios.config'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import moment from 'moment'

const BlogRead = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadBlogs()
  }, [])

  const loadBlogs = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`/blogs`)
      setBlogs(data)
    } catch (err) {
      console.error(err)
    }
  }

  const deleteBlog = async (slug) => {
    try {
      await axios.delete(`/blog/${slug}`)
      loadBlogs()
    } catch (err) {
      console.error(err)
    }
  }

  const deleteConfirm = (slug) => () => {
    let answer = window.confirm('Are you sure you want to delete your blog? ')
    if (answer) {
      deleteBlog(slug)
    }
  }

  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <div key={i} className='pb-5'>
          <h3>{blog.title}</h3>
          <p className='mark'>
            Written by {blog.postedBy.name} | Published on{' '}
            {moment(blog.updatedAt).fromNow()}
          </p>
          <button
            onClick={deleteConfirm(blog.slug)}
            className='btn btn-sm btn-danger'
          >
            Delete
          </button>
          &nbsp;
          <Link href={`/admin/blog/${blog.slug}`}>
            <a className='btn btn-sm btn-warning'>Update</a>
          </Link>
        </div>
      )
    })
  }

  return (
    <>
      <div className='row'>
        <div className='col-md-12'>
          {message && <div className='alert alert-warning'>{message}</div>}
          {showAllBlogs()}
        </div>
      </div>
    </>
  )
}

export default BlogRead
