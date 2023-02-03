import React from 'react';
import Button from '@mui/material/Button';

import './Signup.css';

function Signup() {
    return (
        <>
         <div className="form-box">
                    <h1>Sign up and join us</h1>
                    <form name="signup" action="/signup" method="POST">
                        <div className='double-form-line'>
                            <div className="single-form-line">
                                <label className="form-label" >Name: </label>
                                <input className="form-control" type="text" name="userName" required></input>
                            </div>
                            <div className="single-form-line">
                                <label className="form-label" >Surname: </label>
                                <input className="form-control" type="text" name="userSurname" required></input>
                            </div>
                        </div>
                        <div className="single-form-line">
                            <label className="form-label" >Email: </label>
                            <input className="form-control" type="email" required></input>
                        </div>
                        <div className="single-form-line">
                            <label className="form-label" >Password: </label>
                            <input className="form-control" type="password" required></input>
                        </div>
                        <Button sx={{mt: '20px', mb: '20px'}} variant="contained">SIGN UP</Button>
                    </form>
                </div>
        </>
    )
}

export default Signup;