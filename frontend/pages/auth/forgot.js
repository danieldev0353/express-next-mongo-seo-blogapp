import { useState } from 'react'
import Layout from '../../components/Layout'
import { forgotPassword } from '../../actions/auth'
import axios from './../../axios.config'

const ForgotPassword = () => {
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const [values, setValues] = useState({
    email: '',
    showForm: true,
    disabled: false,
  })

  const { email, showForm, disabled } = values

  const handleChange = (name) => (e) => {
    setValues({ ...values, message: '', [name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, disabled: true })

    axios
      .post(`/forgot-password`, { email })
      .then(({ data }) => {
        setError('')
        setMessage(data.message)
      })
      .catch((error) => {
        setError(error.response?.data?.error)
        console.log(error.response?.data?.error)
      })
      .finally(() => {
        setValues({ ...values, message: '', error: '', disabled: false })
      })
  }

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : ''
  const showMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : ''

  const passwordForgotForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group pt-5'>
        <input
          type='email'
          onChange={handleChange('email')}
          className='form-control'
          value={email}
          placeholder='Type your email'
          required
        />
      </div>
      <div>
        <button disabled={disabled} className='btn btn-primary'>
          Send password reset link
        </button>
      </div>
    </form>
  )

  return (
    <Layout>
      <div className='container'>
        <h2>Forgot password</h2>
        {showForm && passwordForgotForm()}
        <hr />
        {showError()}
        {showMessage()}
      </div>
    </Layout>
  )
}

export default ForgotPassword
