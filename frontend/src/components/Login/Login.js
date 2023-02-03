import React from "react";
import './Login.css';
import Button from '@mui/material/Button';

class Login extends React.Component {
    render() {
        return (
            <>
                <div className="login-form-box">
                    <h1>Log in</h1>
                    <form name="login" action="/login" method="POST">
                        <div className="single-form-line">
                            <label className="form-label" >Email: </label>
                            <input className="form-control" type="email" required></input>
                        </div>
                        <div className="single-form-line">
                            <label className="form-label" >Password: </label>
                            <input className="form-control" type="password" required></input>
                        </div>
                        <Button sx={{mt: '20px', mb: '20px'}} variant="contained">LOG IN</Button>
                    </form>
                </div>
            </>
        )
    }
}

export default Login;