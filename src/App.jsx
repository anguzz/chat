import MessagePage from './components/messagePage'
import LandingPage from './components/landingPage'
import LoginPage from './components/loginPage'
import RegisterPage from './components/registerPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<MessagePage />} />
        <Route exact path="/messagePage" element={<MessagePage />} />
        <Route exact path="/landingPage" element={<LandingPage />} />
        <Route exact path="/registerPage" element={<RegisterPage />} />
        <Route exact path="/loginPage" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
