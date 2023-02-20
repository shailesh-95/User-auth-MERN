import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Button } from '@mui/material';


const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
           alert("name is required!")
        } else if (email === "") {
            alert("email is required!")
        } else if (!email.includes("@")) {
            alert("includes @ in your email!")
        } else if (password === "") {
            alert("password is required!")
        } else if (password.length < 6) {
            alert("password must be 6 char!")
        } else if (cpassword === "") {
            alert("cpassword is required!")
        }
        else if (cpassword.length < 6) {
            alert("confirm password must be 6 char!")
        } else if (password !== cpassword) {
            alert("pass and Cpass are not matching!")
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res.status);

            if (res.status === 201) {
                alert("Registration Successfully done 😃!")
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Register</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>
                            <div className="two">
                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                {!passShow ? <VisibilityOffIcon/> :<VisibilityIcon/> }                                </div>
                            </div>
                        </div>

                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>
                            <div className="two">
                                <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
                                <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
                                {!passShow ? <VisibilityOffIcon/> :<VisibilityIcon/> }                                </div>
                            </div>
                        </div>

                        <Button variant='contained' style={{width: '100%'}}  onClick={addUserdata}>Register</Button>
                        <p>Already have an account? <NavLink to="/"vstyle={{ textDecoration : 'none' }}>Log In</NavLink></p>
                    </form>
                   
                </div>
            </section>
        </>
    )
}

export default Register