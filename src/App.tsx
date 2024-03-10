import { Route, Routes } from 'react-router-dom'
import GettingStartedPage from './pages/getting-started'
import "./index.css"
import CalorieTrackerPage from './components/form'
import NotFoundPage from './pages/not-found'

const App = () => {
  return (
    <main>
        
        <Routes>
            {/* public routes */}
            <Route path="/" element={<GettingStartedPage />}/>
            <Route path="/track" element={<CalorieTrackerPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>

    </main>
  )
}

export default App