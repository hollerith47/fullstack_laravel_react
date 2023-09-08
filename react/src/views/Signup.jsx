import {Link} from "react-router-dom";
import {useRef, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/index.jsx";

export default function Signup(){
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const [errors, setErrors] = useState(null);

  const { setUser, setToken} = useStateContext();

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
      console.table(payload);
    axiosClient.post('/signup',payload)
      .then(({data})=> {
        setToken(data.token);
        setUser(data.user);
      })
      .catch((err) => {
        // console.log(err.response.data)
        const response = err.response;
        if (response && response.status === 422){
          // console.log(response.data.errors);
          setErrors(response.data.errors);
        }
      })
  }
    return(
      <div className='login-signup-form animated fadeInDown'>
        <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">
              Signup for free
            </h1>
            {errors &&
              <div className='alert'>
                {Object.keys(errors).map(key => (
                  <p key={key}>{errors[key][0]}</p>
                ))}
              </div>
            }
            <input ref={nameRef} type="text" placeholder="Full Name" name="" id=""/>
            <input ref={emailRef} type="email" placeholder="Email Address" name="" id=""/>
            <input ref={passwordRef} type="password" placeholder="Password" name="" id=""/>
            <input ref={passwordConfirmationRef} type="password" placeholder="Password Confirmation" name="" id=""/>
            <button className='btn btn-block'>Signup</button>
            <p className="message">
              Already registered? <Link to='/login'>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    )
}
