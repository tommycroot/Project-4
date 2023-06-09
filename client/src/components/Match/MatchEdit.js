import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../Spinner.js'


// Custom functions
import { authenticated, isAuthenticated, userIsOwner } from '../helpers/auth.js'

// Custom Components
import MatchForm from './MatchForm'

const MatchEdit = () => {

  // ! Location variables
  const navigate = useNavigate()
  const { id } = useParams()
  const [match, setMatch] = useState(null)

  // ! State
  const [formFields, setFormFields] = useState({
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

  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getMatchInfo = async () => {
      setIsLoading(true)
      const { data } = await authenticated.get(`/api/match/${id}/`)
      setMatch(data)
      setIsLoading(false)
    }
    getMatchInfo()
  }, [id])


  // ! On Mount

  useEffect(() => {
    const getMatch = async () => {
      setIsLoading(true)
      try {
        const { data } = await authenticated.get(`/api/match/${id}/`)
        if (!isAuthenticated() || !userIsOwner(data)) navigate(`/match/${id}/`)
        console.log('Not Authenticated', !isAuthenticated())
        console.log('Not Owner', !userIsOwner(data))
        const newMatch = { ...data, home_team: data.home_team.id, away_team: data.away_team.id, friends: data.friends.map(f => ({ value: f.id, label: f.name })) }
        console.log('New Match Data', newMatch)
        setFormFields(newMatch)

      } catch (err) {
        console.log(err)
      }
      setIsLoading(false)
    }
    getMatch()
  }, [id])


  // ! Execution
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formFieldsRefact = {
        ...formFields,
        friends: formFields.friends.map((friend) => friend.value),
      }
      console.log('formFieldsRefact', formFieldsRefact)
      console.log('id', id)
      await authenticated.put(`/api/match/${id}/`, formFieldsRefact)
      navigate(`/match/${id}/`)
    } catch (err) {
      console.log(err)
      setError(err.response.data.detail)
    }
  }

  return (
    <main className='form-page'>
      {isLoading ? <Spinner /> : (
        <MatchForm
          formFields={formFields}
          setFormFields={setFormFields}
          error={error}
          setError={setError}
          handleSubmit={handleSubmit}
        />
      )}
    </main>
  )
}

export default MatchEdit







