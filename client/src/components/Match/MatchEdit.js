import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


// Custom functions
import { authenticated, isAuthenticated, userIsOwner } from '../helpers/auth.js'

// Custom Components
import MatchForm from './MatchForm'

const MatchEdit = () => {

  // ! Location variables
  const navigate = useNavigate()
  const { id } = useParams()
  const [ match, setMatch ] = useState(null)

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

  useEffect(() => {
    const getMatchInfo = async () => {
      const { data } = await authenticated.get(`/api/match/${id}/`)
      setMatch(data)
    }
    getMatchInfo()
  }, [id])


  // ! On Mount

  useEffect(() => {
  
    const getMatch = async () => {
      try {
        const { data } = await authenticated.get(`/api/match/${id}/`)
        if (!isAuthenticated() || !userIsOwner(data)) navigate(`/match/${id}/`)
        console.log('Not Authenticated', !isAuthenticated())
        console.log('Not Owner', !userIsOwner(data))
        const newMatch = { ...data, home_team: data.home_team.name, away_team: data.away_team.name }
        console.log('New Match Data', newMatch)
        setFormFields(newMatch)
        
      } catch (err) {
        console.log(err)
      }
    }
    getMatch()
    

  }, [id])

  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formFieldsRefact = {
        ...formFields, 
        friends: formFields.friends.map(friend => friend.value),
      }
      console.log(formFieldsRefact)
      const { data } = await authenticated.post('/api/match/', formFieldsRefact)
      navigate(`/match/${data.id}`)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }

  return (
    <main className='form-page'>
      <MatchForm 
        formFields={formFields}
        setFormFields={setFormFields}
        error={error}
        setError={setError}
        handleSubmit={handleSubmit}
      />
    </main>
  )
}

export default MatchEdit