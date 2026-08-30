import { useState } from 'react'
import RetailerView from './RetailerView'
import DispatcherView from './DispatcherView'
import RiderView from './RiderView'
import './index.css'

type Role = 'retailer' | 'dispatcher' | 'rider'

function App() {
  const [role, setRole] = useState<Role>('retailer')

  return (
    <div className="app-container">
      <header className="header">
        <h1>Reflex</h1>
        <div className="role-switcher">
          <button 
            className={`btn ${role === 'retailer' ? '' : 'secondary'}`}
            onClick={() => setRole('retailer')}
          >
            Retailer
          </button>
          <button 
            className={`btn ${role === 'dispatcher' ? '' : 'secondary'}`}
            onClick={() => setRole('dispatcher')}
          >
            Dispatcher
          </button>
          <button 
            className={`btn ${role === 'rider' ? '' : 'secondary'}`}
            onClick={() => setRole('rider')}
          >
            Rider
          </button>
        </div>
      </header>
      
      <main className="main-content">
        {role === 'retailer' && <RetailerView />}
        {role === 'dispatcher' && <DispatcherView />}
        {role === 'rider' && <RiderView />}
      </main>
    </div>
  )
}

export default App
