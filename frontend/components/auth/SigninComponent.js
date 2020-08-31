import { useState } from 'react'
import axios from './../../axios.config'
import Router from 'next/router'
import { signin } from '../../actions/auth'

const SignupComponent = () => {
  const [values, setValues] = useState({
    email: 'tom@mail.com',
    password: '123456789',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { email, password, error, loading, message, showForm } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true, error: false })
    const user = { email, password }

    axios
      .post('/signin', user)
      .then(({ data }) => {
        signin(data, () => {
          Router.push(`/`)
        })
      })
      .catch((e) => {
        console.error(e)
        setValues({ ...values, error: e.response?.data?.error, loading: false })
      })
  }

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const showLoading = () => <div className='alert alert-info'>Loading...</div>
  const showError = () => <div className='alert alert-danger'>{error}</div>
  const showMessage = () => <div className='alert alert-info'>{message}</div>

  const signupForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          value={email}
          onChange={handleChange('email')}
          type='email'
          className='form-control'
          placeholder='Type your email'
        />
      </div>

      <div className='form-group'>
        <input
          value={password}
          onChange={handleChange('password')}
          type='password'
          className='form-control'
          placeholder='Type your password'
        />
      </div>

      <div>
        <button disabled={loading} className='btn btn-primary'>
          Signin
        </button>
      </div>
    </form>
  )

  return (
    <>
      {loading && showLoading()}
      {message && showMessage()}
      {error && showError()}
      {showForm && signupForm()}
    </>
  )
}

export default SignupComponent
