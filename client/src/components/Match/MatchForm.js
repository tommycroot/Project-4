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
    console.log(e)
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
          <h1 id='formH1' className='display-6 text-center'>{title}</h1>
          {/* Season */}
          <div>
            <label htmlFor="season">Season<span id="required">*Required</span></label>
          </div>
          <select className="selectForm" name="season" value={formFields.season} onChange={handleChange}>
            <option value="">Select a Season</option> 
            <option value="2020/2021">2020/2021</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2021/2022">2021/2022</option>
            <option value="2022/2023">2022/2023</option>
            <option value="2023/2024">2023/2024</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2025/2026">2025/2026</option>
          </select>
          {/* Date */}
          <label htmlFor="date">Date<span id="required">*Required</span></label>
          <input type="date" name="date" placeholder='Date' value={formFields.date} onChange={handleChange} />
          <label htmlFor="home_team">Home Team<span id="required">*Required</span></label>
          <select className="selectForm" name="home_team" value={formFields.home_team} onChange={handleChange}>
            <option value="">Select a Club</option>
            {clubOptions.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
          </select>
          {/* Away Team */}
          <label htmlFor="away_team">Away Team<span id="required">*Required</span></label>
          <select className="selectForm" name="away_team" value={formFields.away_team} onChange={handleChange}>
            <option value="">Select a Club</option>
            {clubOptions.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
          </select>
          {/* Result */}
          <label htmlFor="result">Score<span id="required">*Required</span></label>
          <input type="text" name="result" placeholder='Result' value={formFields.result} onChange={handleChange} />
          {/* Competiton */}
          <label htmlFor="competition">Competiton<span id="required">*Required</span></label>
          <select className="selectForm" name="competition" value={formFields.competition} onChange={handleChange}>
            <option value="">Select a Competition</option>
            <option value="Premier League">Premier League</option>
            <option value="Championship">EFL Championship</option>
            <option value="League One">EFL League One</option>
            <option value="League Two">EFL League Two</option>
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
                  <h5 className="modal-title" id="exampleModalLabel">Add Friend</h5>
                </div>
                <div className="modal-body">
                  <input type="text" name="new-field" placeholder='Friend Name' value={newFriendName} onChange={e => setNewFriendName(e.target.value)} />
                </div>
                <div className="modal-footer">
                  <button type="button" onClick={handleNewFriendSubmit} className="btn btn-primary">Save New Friend</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  
                </div>
              </div>
            </div>
          </div>
          {/* Notes */}
          <label htmlFor="notes" className="notes">Notes</label>
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