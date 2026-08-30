import { useState } from 'react'
import { CheckCircle, MapPin, Package, Award } from 'lucide-react'
import type { DeliveryRequest } from './RetailerView'

const MOCK_REQUESTS: DeliveryRequest[] = [
  { id: '2', request_number: 'REQ-002', customer_name: 'Jane Smith', address: 'Kilimani', item_description: 'Painkillers', status: 'assigned', assigned_rider: 'James' },
  { id: '3', request_number: 'REQ-003', customer_name: 'Tech Store', address: 'Nairobi CBD', item_description: 'Laptop Charger', status: 'picked_up', assigned_rider: 'James' }
]

export default function RiderView() {
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_REQUESTS)
  const [podRecipient, setPodRecipient] = useState('')
  const [points, setPoints] = useState(1250) // Mock existing points

  const handleUpdateStatus = (id: string, newStatus: DeliveryRequest['status']) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req))
  }

  const handleProofOfDelivery = (id: string, e: React.FormEvent) => {
    e.preventDefault()
    if (!podRecipient) return
    handleUpdateStatus(id, 'delivered')
    setPodRecipient('')
    setPoints(prev => prev + 50) // Reward points!
  }

  return (
    <div className="animate-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Rewards Card */}
      <div className="reward-card">
        <Award size={48} color="var(--accent-secondary)" style={{ marginBottom: '1rem' }} />
        <h2 style={{ margin: 0 }}>Rider Rewards</h2>
        <div className="reward-points">{points}</div>
        <p style={{ margin: 0, fontWeight: 600, color: 'var(--accent-secondary)' }}>pts earned! Deliver to earn more.</p>
      </div>

      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Active Deliveries</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {requests.filter(r => r.status !== 'delivered').map(req => (
          <div key={req.id} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{req.request_number}</h3>
              <span className={`badge ${req.status}`}>{req.status.replace('_', ' ')}</span>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
              <p style={{ margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color="var(--text-secondary)" /> <strong>To:</strong> {req.customer_name}
              </p>
              <p style={{ margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} color="var(--text-secondary)" /> <strong>Location:</strong> {req.address}
              </p>
              <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Package size={18} color="var(--text-secondary)" /> <strong>Item:</strong> {req.item_description}
              </p>
            </div>

            {req.status === 'assigned' && (
              <button className="btn" style={{ width: '100%', padding: '1rem' }} onClick={() => handleUpdateStatus(req.id, 'picked_up')}>
                Mark as Picked Up
              </button>
            )}

            {req.status === 'picked_up' && (
              <form onSubmit={(e) => handleProofOfDelivery(req.id, e)}>
                <div className="form-group">
                  <label>Recipient Name</label>
                  <input 
                    className="form-control" 
                    value={podRecipient} 
                    onChange={e => setPodRecipient(e.target.value)} 
                    required 
                    placeholder="Signature / Name"
                  />
                </div>
                <button type="submit" className="btn" style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, var(--status-delivered), #059669)' }}>
                  Confirm Delivery (+50 pts)
                </button>
              </form>
            )}
          </div>
        ))}
        {requests.filter(r => r.status !== 'delivered').length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.5 }}>You have no active deliveries.</p>
        )}
      </div>
    </div>
  )
}
