import './App.css';
import AddUser from './adduser/addUser';
import User from './getuser/User';
import Update from './updateuser/Update';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


function App() {
  const route = createBrowserRouter([{
    path:"/",
    element: <User/>,
  },
  {
    path: "/add",
    element: <AddUser />,
  },
  {
    path: "/update/:id",
    element: <Update />,
  },

  ])
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
