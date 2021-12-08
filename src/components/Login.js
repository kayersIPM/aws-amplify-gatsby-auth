import React from "react"
import { Link } from 'gatsby'
import { navigate } from '@reach/router'
import { setUser, isLoggedIn } from '../utils/auth'
import Error from './Error'
import { Auth } from 'aws-amplify'
import config from '../aws-exports'
import { BirthdayPicker } from "react-birthday-picker";
import moment from 'moment';

Auth.configure(config)
class Login extends React.Component {
  state = {
    username: ``,
    password: ``,
    birthdate: ``,
    error: ``
  }
  // const [date, setDate] = useState("");
  // handleChange = (date) => {
  //   if (date) setDate(date);
  // };
  handleUpdate = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }
  handleUpdate2 = (date) => {
    this.setState({
      birthdate: date,
    })
  }

  login = async() => {
    const { username, password, birthdate } = this.state
    try {
      await Auth.signIn(username, password, {['birthdate'] : birthdate})
      const user = await Auth.currentAuthenticatedUser()
      const userInfo = {
        ...user.attributes,
        username: user.username,
        birthdate: user.birthdate
      }
      setUser(userInfo)
      navigate("/app/home")
    } catch (err) {
      this.setState({ error: err })
      console.log('error...: ', err)
    }
  }

  render() {
    if (isLoggedIn()) navigate('/app/profile')
    return (
      <div>
        <h1>Sign In</h1>
        {this.state.error && <Error errorMessage={this.state.error}/>}
        <div style={styles.formContainer}>
         <input
            onChange={this.handleUpdate}
            placeholder='Username'
            name='username'
            value={this.state.username}
            style={styles.input}
          />
          <input
            onChange={this.handleUpdate}
            placeholder='Password'
            name='password'
            value={this.state.password}
            type='password'
            style={styles.input}
          />
            <BirthdayPicker
            name='date'
        onChange={this.handleUpdate2}
        placeHolders={["doy", "month", "yor"]}
        style={{ width: "200px" }}
      />
      <h2>{moment(this.state.date, "MM/DD/YYYY").unix()}</h2>
          <div style={styles.button} onClick={this.login}>
            <span style={styles.buttonText}>Sign In</span>
          </div>
        </div>
        {/* <Link to="/app/signup">Sign Up</Link><br /> */}
      </div>
    )
  }
}

const styles = {
  input: {
    height: 40, margin: '10px 0px', padding: 7
  },
  formContainer: {
    display: 'flex', flexDirection: 'column'
  },
  button: {
    backgroundColor: 'rebeccapurple', padding: '15px 7px', cursor: 'pointer', textAlign: 'center', marginBottom: 10
  },
  buttonText: {
    color: 'white'
  }
}

export default Login