import { Route, Routes } from 'react-router-dom'
import GettingStartedPage from './pages/getting-started'
import "./index.css"

const App = () => {
  return (
    <main className="flex h-screen">
        
        <Routes>
            {/* public routes */}
            <Route path="/" element={<GettingStartedPage />}/>
        </Routes>

    </main>
  )
}

export default App