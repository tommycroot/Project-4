import logo from '../images/logo.png'

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <p>Keep track of all the games you&apos;ve been to.</p>
        <img src={logo} id="logo" alt="hagl logo"></img>
      </div>
    </div>
  )
}

export default Home