import { useEffect, useState } from 'react'

const Filters = ({ matches, setFilteredMatches }) => {

  const [ filters, setFilters ] = useState({
    season: 'All',
    search: '',
    homeTeam: 'All',
    awayTeam: 'All',
  })

  const handleChange = (e) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value }
    setFilters(newFilters)
  }

  useEffect(() => {
    const regex = new RegExp(filters.search, 'i')
    const newFilteredMatches = matches.filter(match => {
      return regex.test(match.date) &&
        (match.season === filters.season || filters.season === 'All') &&
        (match.home_team.name === filters.homeTeam || filters.homeTeam === 'All') &&
        (match.away_team.name === filters.awayTeam || filters.awayTeam === 'All')
    }).sort((a, b) => a.date > b.date ? 1 : -1)
    setFilteredMatches(newFilteredMatches)
  }, [filters, matches])

  // Generate a list of unique home team names
  const homeTeamNames = [...new Set(matches.map(match => match.home_team.name))].sort()
  // Add an "All" option to the beginning of the list
  homeTeamNames.unshift('All')

  // Generate a list of unique away team names
  const awayTeamNames = [...new Set(matches.map(match => match.away_team.name))].sort()
  // Add an "All" option to the beginning of the list
  awayTeamNames.unshift('All')

  return (
    <section className="filters">
      {/* Season dropdown */}
      <select name="season" value={filters.season} onChange={handleChange}>
        <option value="All">All</option>
        { matches && 
          [...new Set(matches.map(match => match.season))].sort().map(season => {
            return <option key={season} value={season}>{season}</option>
          })}
      </select>

      {/* Home team dropdown */}
      <select name="homeTeam" value={filters.homeTeam} onChange={handleChange}>
        {homeTeamNames.map((teamName) => (
          <option key={teamName} value={teamName}>{teamName}</option>
        ))}
      </select>

      {/* Away team dropdown */}
      <select name="awayTeam" value={filters.awayTeam} onChange={handleChange}>
        {awayTeamNames.map((teamName) => (
          <option key={teamName} value={teamName}>{teamName}</option>
        ))}
      </select>

      {/* Search input */}
      <input type="text" name="search" placeholder='Search...' onChange={handleChange} value={filters.search} />
    </section>
  )
  
}

export default Filters
