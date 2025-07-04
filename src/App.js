import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn/SignIn'
import SignUp from './pages/SignUp/SignUp'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/signin' element={<SignIn />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
		</Router>
	)
}

export default App
