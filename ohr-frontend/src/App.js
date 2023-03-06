import './App.css';
import ear from './accets/logo2.png';
import avatar from './accets/avatar.png';
import UpperNav from './components/UpperNav.jsx';
import BottomNav from './components/BottomNav.jsx';
import Landing from './components/Landing';
import Recording from './components/Recording';

function App() {
	return (
		<div className="App">
			{/* logged in ? avarar = user profile pic/wallet avatar : basic avatar*/}
			<UpperNav avatar={avatar} />

			{/* when not logged in: */}
			{/* <Landing ear={ear} /> */}

			{/* when logged in */}
			<Recording ear={ear} />

			<BottomNav />
		</div>
	);
}

export default App;
