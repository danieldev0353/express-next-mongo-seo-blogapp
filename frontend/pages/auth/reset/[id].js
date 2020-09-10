import { useState } from 'react'
import Layout from '../../../components/Layout'
import { withRouter } from 'next/router'
import axios from './../../../axios.config'

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: '',
    newPassword: '',
    error: '',
    message: '',
    showForm: true,
  })

  const { showForm, name, newPassword, error, message } = values

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(`/reset-password`, {
        newPassword,
        resetPasswordToken: router.query.id,
      })
      .then(({ data }) => {
        setValues({
          ...values,
          message: data.message,
          showForm: false,
          newPassword: '',
          error: false,
        })
      })
      .catch((error) => {
        console.log(error.response?.data?.error)
        setValues({
          ...values,
          error: error.response?.data?.error,
          showForm: false,
          newPassword: '',
        })
      })
  }

  const passwordResetForm = () => (
    <form onSubmit={handleSubmit}>
      <div className='form-group pt-5'>
        <input
          type='password'
          onChange={(e) =>
            setValues({ ...values, newPassword: e.target.value })
          }
          className='form-control'
          value={newPassword}
          placeholder='Type new password'
          required
        />
      </div>
      <div>
        <button className='btn btn-primary'>Change password</button>
      </div>
    </form>
  )

  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : ''
  const showMessage = () =>
    message ? <div className='alert alert-success'>{message}</div> : ''

  return (
    <Layout>
      <div className='container'>
        <h2>Reset password</h2>
        {showForm && passwordResetForm()}
        <hr />
        {showError()}
        {showMessage()}
      </div>
    </Layout>
  )
}

export default withRouter(ResetPassword)
