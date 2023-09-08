import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../contexts/index.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification}=useStateContext();

  useEffect(() => {
    getUsers();
  }, [])

  const onDelete = (user) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
      .then((response) => {
        //TODO: show notification
        setNotification("user was deleted successfully")
        getUsers();
      })
  }
  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({data}) => {
        setLoading(false);
        console.log(data);
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      <div style={{display: "flex", justifyContent: 'space-between', alignItems: "center"}}>
        <h1>Users page</h1>
        <Link to='/users/new' className="btn-add">Add new</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan='5' className="text-center">
                Loading ...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(user => (
              <tr>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.created_at}</td>
                <td>
                  <Link to={'/users/' + user.id} className='btn-edit'>Edit</Link>
                  {" "}
                  <button onClick={e => onDelete(user)} className='btn-delete'>Delete</button>
                </td>
              </tr>
            ))}
            </tbody>
          }


        </table>
      </div>
    </div>
  )
}