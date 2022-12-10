import './App.css';
import Signin from './Components/Signin';
import Signout from './Components/Signout';
import UserPage from './Components/UserPanel/userpage'
import AdminPage from './Components/AdminPanel/adminpage';
import UsersData from './Components/AdminPanel/usersdata';
import LeaveReport from './Components/AdminPanel/leavereport'
import UpdateAttendance from './Components/AdminPanel/updateattendance';
import UserReport from './Components/AdminPanel/userreport';
import Register from './Components/Register'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/userpage' element={<UserPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/adminpage' element={<AdminPage />}>
            <Route path=':/usersdata' element={<UsersData />} />
            <Route path=':/leavereport' element={<LeaveReport />} />
            <Route path=':/updateattendance' element={<UpdateAttendance />} />
            <Route path=':/generatereport' element={<UserReport />} />
          </Route>
          <Route path='/signout' element={<Signout />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
