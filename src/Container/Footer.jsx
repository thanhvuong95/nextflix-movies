import React from 'react'
import Grid from '../components/Grid/Grid'
import './footer.css'
const Footer = () => {
    return (
        <div className = "footer">
            <div className="container">

                <h4>Question? Contact us.</h4>
                <Grid>
                    <ul>
                        <li>FAQ</li>
                        <li>Investor Relations</li>
                        <li>Privacy</li>
                        <li>Speed Test</li>
                    </ul>
                    <ul>
                        <li>Help Center</li>
                        <li>Jobs</li>
                        <li>Cookie Preferences</li>
                        <li>Legal Notices</li>
                    </ul>
                    <ul>
                        <li>Account</li>
                        <li>Ways to Watch</li>
                        <li>Corporate Information</li>
                        <li>Only on Netflix</li>
                    </ul>
                    <ul>
                        <li>Media Center</li>
                        <li>Terms of Use</li>
                        <li>Contact Us</li>
                    </ul>
                </Grid>
            </div>
        </div>
    )
}

export default Footer
