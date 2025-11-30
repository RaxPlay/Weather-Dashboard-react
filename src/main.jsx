import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import { WeatherDashboard } from './WeatherDashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherDashboard />
  </StrictMode>,
)
