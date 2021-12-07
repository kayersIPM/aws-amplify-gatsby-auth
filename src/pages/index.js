import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure({Auth: config})

const IndexPage = () => (
  <Layout>
    <h1>Hello</h1>
    <p>Please login with your provided username and password! You may contact us for another or if you have problems.</p>
    
    <Link to="/app/login">Sign In</Link><br />
    <Link to="/app/home">Home</Link><br />
    <Link to="/app/profile">Your profile</Link>
  </Layout>
)

export default IndexPage
