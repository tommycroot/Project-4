import { useState, useEffect } from 'react'
import Select from 'react-select'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


import { authenticated, getPayload } from '../helpers/auth'


const MatchForm = ({ title, formFields, setFormFields, error, setError, handleSubmit }) => {
  const [clubOptions, setClubOptions] = useState([])
  const [friends, setFriends] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newFriendName, setNewFriendName] = useState('')

  

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
  
  const handleNewFriendSubmit = async () => {
    try {
      const response = await authenticated.post('/api/friend/', { name: newFriendName })
      console.log('response', response.data)
      setFriends([...friends, response.data])
      setNewFriendName('')
      setShowModal(false)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleChange = (e) => {
    setFormFields({ formFields: '2023/2024' })
    console.log(formFields)
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
          <label name="friends" htmlFor="friends">Friends</label>
          {friends && (
            <Select
              name='friends'
              isMulti
              options={friends.map(friend => ({ value: friend, label: friend.name, name: 'friends' }))}
              onChange= {handleChange}            
            />
          )}
          {/* Notes */}
          <label htmlFor="notes">Notes</label>
          <textarea name="notes" placeholder='Notes' value={formFields.notes} onChange={handleChange}></textarea>

          {/* Modal */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New Friend
          </button>
          <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document" style={{ position: 'absolute', top: '600px', left: '50%', transform: 'translateX(-50%)' }}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">New Friends</h5>
                </div>
                <div className="modal-body">
                  <input type="text" name="new-field" value={newFriendName} onChange={e => setNewFriendName(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="button" onClick={handleNewFriendSubmit} className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

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