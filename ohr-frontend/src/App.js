import './App.css';
import ear from './accets/logo2.png';
import avatar from './accets/avatar.png';

function App() {
  return (
    <div className="App">
      {/* upper nav, will be moved (probably) in it's own component */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">bla</a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                 {/* avatar should be the wallet picture */}
                <img src={avatar} />
              </div>
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li><a>Settings</a></li>
              <li><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/*  here is the listen/record button*/}
      <div className="l">
        <h1>ohr</h1>
        <img className="listen" src={ear} />
      </div>

      {/* here is the log in button!!!!! */}
      <button className="btn btn-active">LOG IN</button>

      {/*bottom nav (will be moved (probably) in it's ovn component) */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">bla</a>
        </div>
        <div className="flex-none gap-2">
          <div className="flex-1">
            <a className="btn btn-ghost normal-case text-xl">bla</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
