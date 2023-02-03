import React from "react";

function Contact() {
    return (
        <>
             <div className="login-form-box">
                    <h1>Log in</h1>
                    <form name="contact" action="/contact" method="POST">
                        <div className="single-form-line">
                            <label className="form-label" >Your email: </label>
                            <input className="form-control" type="email" required></input>
                        </div>
                        <div className="single-form-line">
                            <label className="form-label" >Your message: </label>
                            <textarea className="contact-form-textarea"></textarea>
                        </div>
                        <button className="btn" type="submit">Log in</button>
                    </form>
                </div>
        </>
    )
}

export default Contact;