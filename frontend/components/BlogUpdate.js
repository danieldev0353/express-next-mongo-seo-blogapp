import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { blogFromLS } from '../actions/createBlog'
import { getCookie } from '../actions/auth'
import axios from '../axios.config'
import { modules, formats } from '../actions/createBlog'
import { withRouter } from 'next/router'
import Router from 'next/router'
import getConfig from 'next/config'

const {
  publicRuntimeConfig: { API, APP_NAME, DOMAIN },
} = getConfig()

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState('')

  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [checked, setChecked] = useState([])
  const [checkedTag, setCheckedTag] = useState([])

  const [values, setValues] = useState({
    title: '',
    error: '',
    success: '',
    formData: '',
    title: '',
  })

  const { error, success, formData, title } = values

  useEffect(() => {
    setValues({ ...values, formData: new FormData() })
    initBlog()
    initCategories()
    initTags()
  }, [router])

  const initCategories = () => {
    axios
      .get('/categories')
      .then(({ data }) => {
        setCategories(data.data)
      })
      .catch((err) => console.error(err))
  }

  const initTags = () => {
    axios
      .get('/tags')
      .then(({ data }) => {
        setTags(data.data)
      })
      .catch((err) => console.error(err))
  }

  const findOutCategory = (c) => {
    const result = checked.indexOf(c)
    if (result !== -1) {
      return true
    } else {
      return false
    }
  }

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t)
    if (result !== -1) {
      return true
    } else {
      return false
    }
  }

  const initBlog = () => {
    if (router?.query?.slug) {
      axios
        .get(`/blog/${router.query.slug}`)
        .then(({ data }) => {
          setBody(data.data.body)
          setValues({ ...values, title: data.data.title })
          setCategoriesArray(data.data.categories)
          setTagsArray(data.data.tags)
        })
        .catch((err) => console.error(err))
    }
  }

  const setCategoriesArray = (blogCategories) => {
    let ca = []
    blogCategories.map((c, i) => {
      ca.push(c._id)
    })
    setChecked(ca)
  }

  const setTagsArray = (blogTags) => {
    let ta = []
    blogTags.map((t, i) => {
      ta.push(t._id)
    })
    setCheckedTag(ta)
  }

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' })
  }

  const handleBody = (e) => {
    formData.set('body', e)
    setValues({ ...values, formData, body: e })
  }

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  )

  const showSuccess = () => (
    <div
      className='alert alert-success'
      style={{ display: success ? '' : 'none' }}
    >
      {success}
    </div>
  )

  const editBlog = (e) => {
    e.preventDefault()

    axios
      .put(`/blog/${router.query.slug}`, formData)
      .then(({ data }) => {
        setValues({
          ...values,
          title: '',
          success: `Blog titled is successfully updated`,
        })

        router.push(`/blogs/${router.query.slug}`)
      })
      .catch((err) => {
        console.log(err)
        setValues({
          ...values,
          error: err.response?.data?.error,
        })
      })
  }

  const handleToggle = (c) => () => {
    setValues({ ...values, error: '' })
    // return the first index or -1
    const clickedCategory = checked.indexOf(c)
    const all = [...checked]

    if (clickedCategory === -1) {
      all.push(c)
    } else {
      all.splice(clickedCategory, 1)
    }
    setChecked(all)
    formData.set('categories', all)
  }

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: '' })
    const clickedTag = checkedTag.indexOf(t)
    const all = [...checkedTag]

    if (clickedTag === -1) {
      all.push(t)
    } else {
      all.splice(clickedTag, 1)
    }
    console.log(all)
    setCheckedTag(all)
    formData.set('tags', all)
  }

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{c.name}</label>
        </li>
      ))
    )
  }

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    )
  }

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            type='text'
            className='form-control'
            value={title}
            onChange={handleChange('title')}
          />
        </div>

        <div className='form-group'>
          <ReactQuill
            modules={modules}
            formats={formats}
            value={body}
            placeholder='Write something amazing...'
            onChange={handleBody}
          />
        </div>

        <div>
          <button type='submit' className='btn btn-primary'>
            Update
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='container-fluid pb-5'>
      <div className='row'>
        <div className='col-md-8'>
          {updateBlogForm()}
          <div className='pt-3'>
            {showSuccess()}
            {showError()}
          </div>
          {body && (
            <img
              src={`${API}/blog/photo/${router.query.slug}`}
              alt={title}
              style={{ width: '100%' }}
            />
          )}
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image</h5>
              <hr />
              <small className='text-muted'>Max size: 1mb</small>
              <br />
              <label className='btn btn-outline-info'>
                Upload featured image
                <input
                  onChange={handleChange('photo')}
                  type='file'
                  accept='image/*'
                  hidden
                />
              </label>
            </div>
          </div>

          <div>
            <h5>Categories</h5>
            <hr />

            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(BlogUpdate)
