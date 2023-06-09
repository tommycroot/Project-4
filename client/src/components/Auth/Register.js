import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Register = () => {

  const navigate = useNavigate()

  const [formFields, setFormFields] = useState({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    profile_image: '',
  })

  const [error, setError] = useState({})

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formFields)
      navigate('/login')

    } catch (error) {
      console.log('error', error.response.data.detail)
      setError(error.response.data.detail)
    }
  }
  // ! JSX
  return (
    <main className="form-page">
      <Container>
        <Row>
          <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
            <h1 id="register" className='display-6 text-center'>Register</h1>
            {/* Username */}
            <label htmlFor="username">Username</label>
            <input type="text" name="username" placeholder='Username' onChange={handleChange} value={formFields.username} />
            {/* Email */}
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />
            {/* Password */}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />
            {/* Password Confirmation */}
            <label htmlFor="password_confirmation">Password Confirmation</label>
            <input type="password" name="password_confirmation" placeholder='Password Confirmation' onChange={handleChange} value={formFields.password_confirmation} />

            {/* Submit */}
            <div className='btnCenter'>
              <button className='btn mb-4'>Register</button>
            </div>
            {/* Error */}
            {error && (
              <ul className="error">
                {Object.keys(error).map((key) =>
                  error[key].map((errorMessage) => (
                    <li key={`${key}-${errorMessage}`}>{`${key}: ${errorMessage}`}</li>
                  ))
                )}
              </ul>
            )}
          </Col>
        </Row>
      </Container>
    </main>
  )
}
export default Register