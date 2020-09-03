import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import { blogFromLS } from '../actions/createBlog'
import { getCookie } from '../actions/auth'
import axios from '../axios.config'
import { modules, formats } from '../actions/createBlog'

const CreateBlog = () => {
  const [values, setValues] = useState({
    body: '',
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
    hidePublishButton: false,
    checkedTag: [],
    checkedCategory: [],
    tags: [],
    categories: [],
    token: '',
  })

  const {
    body,
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
    checkedTag,
    checkedCategory,
    tags,
    categories,
    token,
  } = values

  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(),
      token: getCookie('token'),
      //body: blogFromLS(),
    })

    initCategories()
    initTags()
  }, [])

  const initCategories = () => {
    axios
      .get('/categories')
      .then(({ data }) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues((prev) => ({ ...prev, categories: data.data }))
        }
      })
      .catch((err) => console.error(err))
  }

  const initTags = () => {
    axios
      .get('/tags')
      .then(({ data }) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues((prev) => ({ ...prev, tags: data.data }))
        }
      })
      .catch((err) => console.error(err))
  }

  const publishBlog = (e) => {
    e.preventDefault()

    axios
      .post('/blog', formData)
      .then(({ data }) => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues((prev) => ({
            ...prev,
            title: '',
            formData: new FormData(),
            checkedCategory: [],
            checkedTag: [],
          }))

          setValues((prev) => ({
            ...prev,
            body: '',
            tags: [...tags],
            categories: [...categories],
          }))
        }
      })
      .catch((err) => console.error(err))
  }

  const handleChange = (name) => (e) => {
    const value = name === 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' })
  }

  const handleBody = (e) => {
    formData.set('body', e)
    setValues({ ...values, formData, body: e })
    if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e))
    }
  }

  const handleCategoryToggle = (c) => {
    const checked = [...checkedCategory]
    const clickedCategory = checked.indexOf(c)

    if (clickedCategory === -1) {
      checked.push(c)
    } else {
      checked.splice(clickedCategory, 1)
    }

    formData.set('categories', checked)
    setValues({ ...values, formData, checkedCategory: checked })
  }

  const handleTagsToggle = (t) => {
    const checked = [...checkedTag]
    const clickedTag = checked.indexOf(t)

    if (clickedTag === -1) {
      checked.push(t)
    } else {
      checked.splice(clickedTag, 1)
    }

    formData.set('tags', checked)
    setValues({ ...values, formData, checkedTag: checked })
  }

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
          <input
            onClick={() => {
              handleCategoryToggle(c._id)
            }}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{c.name}!!!</label>
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
            onChange={() => {
              handleTagsToggle(t._id)
            }}
            type='checkbox'
            className='mr-2'
          />
          <label className='form-check-label'>{t.name}</label>
        </li>
      ))
    )
  }

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className='form-group'>
          <label className='text-muted'>Title</label>
          <input
            onChange={handleChange('title')}
            type='text'
            className='form-control'
            value={title}
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
            Publish
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-8'>{createBlogForm()}</div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image</h5>
              <hr />

              <div>
                <small className='text-muted'>Max size: 1mb</small>
              </div>
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

export default CreateBlog
