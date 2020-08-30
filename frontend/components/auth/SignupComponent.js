import { useState } from 'react'
import axios from './../../axios.config'

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: 'Tom ',
    email: 'tom@mail.com',
    password: '123456789',
    error: '',
    loading: false,
    message: '',
    showForm: true,
  })

  const { name, email, password, error, loading, message, showForm } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true, error: false })
    const user = { name, email, password }

    axios
      .post('/signup', user)
      .then(({ data }) => {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
        })
      })
      .catch((e) => {
        console.log(e)
        setValues({ ...values, error: e.response?.data?.error, loading: false })
      })
  }

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          value={name}
          onChange={handleChange('name')}
          type='text'
          className='form-control'
          placeholder='Type your name'
        />
      </div>

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
        <button className='btn btn-primary'>Signup</button>
      </div>
    </form>
  )
}

export default SignupComponent
