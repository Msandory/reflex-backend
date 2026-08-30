import { useState } from 'react'
import { DeliveryRequest } from './RetailerView'

const MOCK_REQUESTS: DeliveryRequest[] = [
  { id: '1', request_number: 'REQ-001', customer_name: 'John Doe', address: 'Westlands', item_description: 'Blender', status: 'open' },
  { id: '2', request_number: 'REQ-002', customer_name: 'Jane Smith', address: 'Kilimani', item_description: 'Painkillers', status: 'assigned', assigned_rider: 'James' }
]

const AVAILABLE_RIDERS = ['James', 'Kip', 'Sarah']

export default function DispatcherView() {
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_REQUESTS)

  const handleAssign = (id: string, rider: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'assigned', assigned_rider: rider } : req))
  }

  return (
    <div className="animate-in">
      <h2>Dispatcher Control Center</h2>
      <p>Assign open delivery requests to available riders.</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        {requests.map(req => (
          <div key={req.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{req.request_number}</h3>
              <span className={`badge ${req.status}`}>{req.status.replace('_', ' ')}</span>
            </div>
            <p><strong>Item:</strong> {req.item_description}</p>
            <p><strong>Location:</strong> {req.address}</p>
            
            {req.status === 'open' ? (
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <select className="form-control" style={{ flex: 1 }} id={`rider-${req.id}`}>
                  <option value="">Select Rider...</option>
                  {AVAILABLE_RIDERS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button 
                  className="btn"
                  onClick={() => {
                    const select = document.getElementById(`rider-${req.id}`) as HTMLSelectElement
                    if (select.value) handleAssign(req.id, select.value)
                  }}
                >
                  Assign
                </button>
              </div>
            ) : (
              <p style={{ marginTop: '1.5rem', color: 'var(--accent-primary)', fontWeight: 'bold' }}>
                Assigned to {req.assigned_rider}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
