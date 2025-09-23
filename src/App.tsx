import { Routes, Route } from 'react-router-dom'
import { AppLayout } from './components/Layout/AppLayout'
import Home from './pages/Home'
import WatchList from './pages/WatchList'
import './styles/app.scss'
import { AppProviders } from './contexts/AppProvider'

function App() {
  return (
    <AppProviders>
      <AppLayout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/WatchList' element={<WatchList />} />
        </Routes>
      </AppLayout>
    </AppProviders>
  )
}

export default App
