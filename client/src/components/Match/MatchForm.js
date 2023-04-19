// Bootstrap
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MatchForm = ({ title, formFields, setFormFields, error, setError, handleSubmit }) => {
  const [clubOptions, setClubOptions] = useState([])

  useEffect(() => {
    fetch('/api/club/')
      .then(response => response.json())
      .then(data => setClubOptions(data))
  }, [])

  const handleChange = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
    setError('')
  }

  return (
    <Container>
      <Row>
        <Col as="form" xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }} md={{ span: 6, offset: 3 }} onSubmit={handleSubmit}>
          <h1 className='display-6 text-center'>{title}</h1>
          {/* Season */}
          <label htmlFor="season">Season</label>
          <input type="text" name="season" placeholder='Season' value={formFields.season} onChange={handleChange} />
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
          <input name="competition" placeholder='Competition' value={formFields.competition} onChange={handleChange} />
          {/* Home Lineup */}
          <label htmlFor="home_lineup">Home Lineup</label>
          <textarea name="home_lineup" placeholder='Home Lineup' value={formFields.home_lineup} onChange={handleChange}></textarea>
          {/* Away Lineup */}
          <label htmlFor="away_lineup">Away Lineup</label>
          <textarea name="away_lineup" placeholder='Away Lineup' value={formFields.away_lineup} onChange={handleChange}></textarea>
          {/* Goalscorers */}
          <label htmlFor="goalscorers">Goal Scorers</label>
          <textarea name="goalscorers" placeholder='Goal Scorers' value={formFields.goalscorers} onChange={handleChange}></textarea>
          {/* Assists */}
          <label htmlFor="assists">Assists</label>
          <textarea name="assists" placeholder='Assists' value={formFields.assists} onChange={handleChange}></textarea>
          {/* Yellow Cards */}
          <label htmlFor="yellow_cards">Yellow Cards</label>
          <textarea name="yellow_cards" placeholder='yellow_cards' value={formFields.yellow_cards} onChange={handleChange}></textarea>
          {/* Red Cards */}
          <label htmlFor="red_cards">Red Cards</label>
          <textarea name="red_cards" placeholder='red_cards' value={formFields.red_cards} onChange={handleChange}></textarea>
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