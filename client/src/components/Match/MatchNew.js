import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Custom functions
import { authenticated, isAuthenticated } from '../helpers/auth'

// Custom Components
import MatchForm from './MatchForm'

const MatchNew = () => {

  // ! Location variables
  const navigate = useNavigate()
  
  // ! State
  const [ formFields, setFormFields ] = useState({
    season: '',
    date: '',
    home_team: {},
    away_team: {},
    result: '',
    competition: '',
    goalscorers: '',
    assists: '',
    yellow_cards: '',
    red_cards: '',
    notes: '',
    friends: [],
  })

  const [ error, setError ] = useState('')

  // ! On Mount
  useEffect(() => {
    !isAuthenticated() && navigate('/login')
  }, [navigate])

  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(formFields)
      const { data } = await authenticated.post('/api/match/', formFields)
      navigate(`/match/${data.id}`)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }

  // ! JSX
  return (
    <main className="form-page">
      <MatchForm 
        title="Add Match"
        formFields={formFields}
        setFormFields={setFormFields}
        error={error}
        setError={setError}
        handleSubmit={handleSubmit} />
    </main>
  )
}

export default MatchNew