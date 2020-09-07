import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { blogFromLS } from '../actions/createBlog'
import { getCookie } from '../actions/auth'
import axios from '../axios.config'
import { modules, formats } from '../actions/createBlog'
import { withRouter } from 'next/router'

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState('')
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
  }, [router])

  const initBlog = () => {
    if (router?.query?.slug) {
      axios
        .get(`/blog/${router.query.slug}`)
        .then(({ data }) => {
          setBody(data.data.body)
          setValues({ ...values, title: data.data.title })
        })
        .catch((err) => console.error(err))
    }
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

  const editBlog = () => {
    console.log('update blog')
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
            <p>show success and error msg 2</p>
          </div>
        </div>

        <div className='col-md-4'>
          <div>
            <div className='form-group pb-2'>
              <h5>Featured image 3</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(BlogUpdate)
