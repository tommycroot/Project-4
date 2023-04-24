import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React from 'react'
// Bootstrap
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const Login = () => {

  // ! Location variables
  const navigate = useNavigate()

  // ! State
  const [ formFields, setFormFields ] = useState({
    email: '',
    password: '',
  })
  const [ error, setError ] = useState('')

  // ! Executions
  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formFields)
      localStorage.setItem('FOOTY-TOKEN', data.token)
      console.log('DATA TOKEN', data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      navigate('/profile')
    } catch (error) {
      console.log('check',error.response.data.detail)
      setError(error.response.data.detail)
      console.log('error', error)
    }
  }

  return (
    <main className="form-page">
      <Container>
        <Row>
          <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
            <h1 id="login" className='display-6 text-center'>Login</h1>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder='Email' onChange={handleChange} value={formFields.email} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Password' onChange={handleChange} value={formFields.password} />
            
            <div className='btnCenter'>
              <button className='btn mb-4'>Login</button>
            </div>

            {error && <p className='error'>{error}</p>}
            
          </Col>
        </Row>
      </Container>
    </main>
  )
}

export default Login