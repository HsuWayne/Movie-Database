import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/Layout/AppLayout'
import Home from './pages/Home'
import './styles/app.scss'

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </AppLayout>
  )
}

export default App
