import { useState } from 'react'
import { DeliveryRequest } from './RetailerView'

const MOCK_REQUESTS: DeliveryRequest[] = [
  { id: '2', request_number: 'REQ-002', customer_name: 'Jane Smith', address: 'Kilimani', item_description: 'Painkillers', status: 'assigned', assigned_rider: 'James' }
]

export default function RiderView() {
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_REQUESTS)
  const [podRecipient, setPodRecipient] = useState('')

  const handleUpdateStatus = (id: string, newStatus: DeliveryRequest['status']) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req))
  }

  const handleProofOfDelivery = (id: string, e: React.FormEvent) => {
    e.preventDefault()
    if (!podRecipient) return
    handleUpdateStatus(id, 'delivered')
    setPodRecipient('')
  }

  return (
    <div className="animate-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>My Deliveries</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>
        {requests.map(req => (
          <div key={req.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>{req.request_number}</h3>
              <span className={`badge ${req.status}`}>{req.status.replace('_', ' ')}</span>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>To:</strong> {req.customer_name}</p>
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Address:</strong> {req.address}</p>
              <p style={{ margin: 0 }}><strong>Item:</strong> {req.item_description}</p>
            </div>

            {req.status === 'assigned' && (
              <button className="btn" style={{ width: '100%' }} onClick={() => handleUpdateStatus(req.id, 'picked_up')}>
                Mark as Picked Up
              </button>
            )}

            {req.status === 'picked_up' && (
              <form onSubmit={(e) => handleProofOfDelivery(req.id, e)}>
                <div className="form-group">
                  <label>Proof of Delivery: Recipient Name</label>
                  <input 
                    className="form-control" 
                    value={podRecipient} 
                    onChange={e => setPodRecipient(e.target.value)} 
                    required 
                    placeholder="Who received the package?"
                  />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', background: 'var(--status-delivered)' }}>
                  Confirm Delivery
                </button>
              </form>
            )}

            {req.status === 'delivered' && (
              <div style={{ textAlign: 'center', color: 'var(--status-delivered)', fontWeight: 'bold' }}>
                Delivery Complete!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
