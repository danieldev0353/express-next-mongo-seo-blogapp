import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import axios from '../axios.config'

const Category = () => {
  const [values, setValues] = useState({
    name: '',
    error: false,
    success: false,
    categories: [],
    removed: false,
    reload: false,
  })

  const { name, error, success, categories, removed, reload } = values

  useEffect(() => {
    loadCategories()
  }, [reload])

  const loadCategories = () => {
    axios
      .get('/tags')
      .then(({ data }) => {
        setValues({ ...values, categories: data?.data })
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const showCategories = () => {
    return categories.map((c, i) => {
      return (
        <button
          onClick={() => deleteCategory(c.slug)}
          title='Click to delete'
          key={i}
          className='btn btn-outline-primary mr-1 ml-1 mt-3'
        >
          {c.name}
        </button>
      )
    })
  }

  const deleteCategory = (slug) => {
    let answer = window.confirm('Are you sure you want to delete this tag?')

    if (!answer) {
      return
    }

    axios
      .delete(`/tag/${slug}`)
      .then(({ data }) => {
        setValues({
          ...values,
          error: false,
          success: false,
          name: '',
          removed: !removed,
          reload: !reload,
        })
      })
      .catch((e) => {
        setValues({ ...values, error: e.response?.data?.error, success: false })
        console.error(e)
      })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/tag', { name })
      .then(({ data }) => {
        setValues({
          ...values,
          error: false,
          success: true,
          name: '',
          reload: !reload,
        })
      })
      .catch((e) => {
        setValues({ ...values, error: e.response?.data?.error, success: false })
      })
  }

  const handleChange = (e) => {
    setValues({
      ...values,
      name: e.target.value,
      error: false,
      success: false,
      removed: '',
    })
  }

  const mouseMoveHandler = (e) => {
    setValues({ ...values, error: false, success: false, removed: '' })
  }

  const showSuccess = () => {
    return <p className='text-success'>Tag is created</p>
  }

  const showError = () => {
    return <p className='text-danger'>Tag exists</p>
  }

  const showRemoved = () => {
    return <p className='text-danger'>Tag is removed</p>
  }

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <div className='form-group'>
        <label className='text-muted'>Tags</label>
        <input
          type='text'
          className='form-control'
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div>
        <button type='submit' className='btn btn-primary'>
          Create
        </button>
      </div>
    </form>
  )

  return (
    <>
      {success && showSuccess()}
      {error && showError()}
      {removed && showRemoved()}
      <div onMouseMove={mouseMoveHandler}>
        {newCategoryFom()}
        {showCategories()}
      </div>
    </>
  )
}

export default Category
