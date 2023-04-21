import { useState, useEffect } from 'react'
import Select from 'react-select'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { authenticated, getPayload } from '../helpers/auth'


const MatchForm = ({ title, formFields, setFormFields, error, setError, handleSubmit }) => {
  const [clubOptions, setClubOptions] = useState([])
  const [friends, setFriends] = useState([])
  

  useEffect(() => {
    fetch('/api/club/')
      .then(response => response.json())
      .then(data => setClubOptions(data))
  }, [])



  useEffect(() => {
    const getFriends = async () => {
      try {
        console.log('PAYLOAD', getPayload())
        const { data } = await authenticated.get('/api/friend/')
        console.log('response', data)
        setFriends(data)
      } catch (err) {
        console.log(err.message)
      }
    }
    getFriends()
  }, [])
  


  const handleChange = (e) => {
    if (e.target.name === 'friends') {
      setFormFields({ ...formFields, [e.target.name]: Array.from(e.target.selectedOptions, option => option.value) })
    } else {
      setFormFields({ ...formFields, [e.target.name]: e.target.value })
    }
    setError('')
  }
  

  return (
    <Container>
      <Row>
        <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
          <h1 className='display-6 text-center'>{title}</h1>
          {/* Season */}
          <label htmlFor="season">Season</label>
          <select name="season" value={formFields.season} onChange={handleChange}>
            <option value="">Select a Season</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2023/2024">2023/2024</option>
          </select>
          {/* Date */}
          <label htmlFor="date">Date</label>
          <input type="date" name="date" placeholder='Date' value={formFields.date} onChange={handleChange} />
          {/* Home Team */}
          <label htmlFor="home_team">Home Team</label>
          <select name="home_team" value={formFields.home_team} onChange={handleChange}>
            <option value="">Select a Club</option>
            {clubOptions.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
          </select>
          {/* Away Team */}
          <label htmlFor="away_team">Away Team</label>
          <select name="away_team" value={formFields.away_team} onChange={handleChange}>
            <option value="">Select a Club</option>
            {clubOptions.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
          </select>
          {/* Result */}
          <label htmlFor="result">Result</label>
          <input type="text" name="result" placeholder='Result' value={formFields.result} onChange={handleChange} />
          {/* Competiton */}
          <label htmlFor="competition">Competiton</label>
          <select name="competition" value={formFields.competition} onChange={handleChange}>
            <option value="">Select a Competition</option>
            <option value="Premier League">Premier League</option>
          </select>
          {/* Goalscorers */}
          <label htmlFor="goalscorers">Goal Scorers</label>
          <input name="goalscorers" placeholder='Goal Scorers' value={formFields.goalscorers} onChange={handleChange} />
          {/* Assists */}
          <label htmlFor="assists">Assists</label>
          <input name="assists" placeholder='Assists' value={formFields.assists} onChange={handleChange} />
          {/* Yellow Cards */}
          <label htmlFor="yellow_cards">Yellow Cards</label>
          <input name="yellow_cards" placeholder='Yellow Cards' value={formFields.yellow_cards} onChange={handleChange} />
          {/* Red Cards */}
          <label htmlFor="red_cards">Red Cards</label>
          <input name="red_cards" placeholder='Red Cards' value={formFields.red_cards} onChange={handleChange} />
          {/* Friends*/}
          <label htmlFor="friends">Friends</label>
          {friends && (
            <Select
              name='friends'
              isMulti
              value={formFields.friends}
              options={friends.map(f => ({ value: f.id, label: f.name }))}
              onChange={selected => {
                console.log(selected)
                setFormFields({ ...formFields, friends: selected })

              }}
            />
          )}
          {/* Notes */}
          <label htmlFor="notes">Notes</label>
          <textarea name="notes" placeholder='Notes' value={formFields.notes} onChange={handleChange}></textarea>
          {/* Submit */}
          <div className='btnCenter'>
            <button className="btn mb-4">Submit</button>
          </div>
          {/* Error Display */}
          { error && <p className='text-danger text-center'>{error}</p>}
        </Col>
      </Row>
    </Container>
  )
}

export default MatchForm