import {createBrowserRouter, Navigate} from "react-router-dom";
import {Dashboard, Login, NotFound, Signup, UserForm, Users} from "./views";
import {DefaultLayout, GuestLayout} from "./components";

const router= createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to={'/users'} />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/new',
        element: <UserForm key='userCreate'/>
      },
      {
        path: '/users/:id',
        element: <UserForm key='userUpdate' />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  },
])

export default router;
