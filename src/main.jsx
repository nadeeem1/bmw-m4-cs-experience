import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/*
  Inter Variable is the site's only typeface — the ORYZO doc treats the
  family as the entire type system. wght.css gives the weight axis without
  pulling the italic or optical-size files we do not use.
*/
import '@fontsource-variable/inter/wght.css'

import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)