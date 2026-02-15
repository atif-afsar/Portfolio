import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { injectStructuredData, personSchema, organizationSchema } from './utils/structuredData'

// Inject structured data on app load
injectStructuredData(personSchema)
injectStructuredData(organizationSchema)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
