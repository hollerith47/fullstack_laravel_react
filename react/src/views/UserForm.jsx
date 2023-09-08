import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../contexts/index.jsx";

export default function UserForm() {
  const {id} = useParams();
  const navigate= useNavigate()
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const {notification,setNotification }= useStateContext();
  const [user, setUser] = useState({
    id: null,
    name: '',
    password: '',
    password_confirmation: '',
  })

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false);
          setUser(data)
        })
        .catch(() => {
          setLoading(false);
        })

    }, [])
  }
  const onSubmit = (e) => {
    e.preventDefault();
    if (user.id){
      axiosClient.put(`/users/${user.id}`, user)
        .then(()=>{
          //TODO: show notification
          setNotification("User was successfully updated");
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422){
            setErrors(response.data.errors);
          }
        })
    }else{
      axiosClient.post(`/users`, user)
        .then(()=>{
          //TODO: show notification
          setNotification("User was successfully created");
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422){
            setErrors(response.data.errors);
          }
        })
    }
  }
  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New user</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading ...</div>
        )}
        {errors &&
          <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading &&
          <form onSubmit={onSubmit}>
            <input
              type="text"
              value={user.name}
              placeholder="Name"
              onChange={e=>setUser({...user, name: e.target.value})}
            />
            <input
              type="email"
              value={user.email}
              placeholder="Email"
              onChange={e=>setUser({...user, email: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={e=>setUser({...user, password: e.target.value})}
            />
            <input
              type="password"
              placeholder="Password Confirmation"
              onChange={e=>setUser({...user, password_confirmation: e.target.value})}
            />
            <button className='btn'>Save</button>
          </form>
        }
      </div>
    </>
  )
}
