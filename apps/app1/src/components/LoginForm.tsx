import { Link } from "react-router-dom"

const LoginForm = () => {
  return (
    <form action="" className="loginform">
      <h3>Login</h3>
      <label htmlFor="u_email">User Email</label>
      <input type="email" id="email" placeholder='Enter your Email'/>
      <label htmlFor="u_password">Password</label>
      <input type="password" id="password" placeholder='Enter your Password'/>
      <button type="submit">Log In</button>
      <div className="social">
        <div className="google"><i className="fab fa-google"></i>Google</div>
        <div className="facebook"><i className="fab fa-facebook"></i>FaceBook</div>
      </div>
      <div className="meta">      
        <Link id="git-link" className="meta-link" to='https://github.com/leejanox'
          target="_blank" reloadDocument rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i>
          <span className="roboto-mono">GitHub</span>
        </Link>
        <Link id="home-link" className="meta-link" to='/' 
          target="_self" reloadDocument rel="noopener noreferrer" replace={false}
        >
          <i className="fas fa-home"></i>
          <span className="roboto-mono">Home</span>
        </Link>
      </div>
    </form>
  )
}

export default LoginForm