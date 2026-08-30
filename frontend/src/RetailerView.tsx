import { useState } from 'react'
import { PlusCircle, Search } from 'lucide-react'

export interface DeliveryRequest {
  id: string
  request_number: string
  customer_name: string
  address: string
  item_description: string
  status: 'open' | 'assigned' | 'picked_up' | 'delivered'
  assigned_rider?: string
}

const MOCK_REQUESTS: DeliveryRequest[] = [
  { id: '1', request_number: 'REQ-001', customer_name: 'John Doe', address: 'Westlands', item_description: 'Blender', status: 'open' },
  { id: '2', request_number: 'REQ-002', customer_name: 'Jane Smith', address: 'Kilimani', item_description: 'Painkillers', status: 'assigned', assigned_rider: 'James' }
]

export default function RetailerView() {
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_REQUESTS)
  const [formData, setFormData] = useState({ customer_name: '', phone: '', address: '', item_description: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newReq: DeliveryRequest = {
      id: Date.now().toString(),
      request_number: `REQ-00${requests.length + 1}`,
      customer_name: formData.customer_name,
      address: formData.address,
      item_description: formData.item_description,
      status: 'open'
    }
    setRequests([newReq, ...requests])
    setFormData({ customer_name: '', phone: '', address: '', item_description: '' })
  }

  return (
    <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2.5rem' }}>
      
      {/* Creation Form */}
      <div className="glass-card delay-1">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PlusCircle color="var(--accent-primary)" /> New Request
        </h2>
        <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
          <div className="form-group">
            <label>Customer Name</label>
            <input className="form-control" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Delivery Address</label>
            <input className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Item Description</label>
            <input className="form-control" value={formData.item_description} onChange={e => setFormData({...formData, item_description: e.target.value})} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem', padding: '1rem' }}>Dispatch Delivery</button>
        </form>
      </div>

      {/* Requests List */}
      <div className="delay-2">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>My Active Deliveries</h2>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <Search size={16} color="var(--text-secondary)" style={{ marginRight: '0.5rem' }} />
            <input type="text" placeholder="Search..." style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', outline: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requests.map(req => (
            <div key={req.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{req.request_number} <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal', fontSize: '1rem' }}>| {req.item_description}</span></h3>
                <p style={{ margin: 0 }}>To: {req.customer_name}, {req.address}</p>
                {req.assigned_rider && <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Rider: {req.assigned_rider}</p>}
              </div>
              <span className={`badge ${req.status}`}>{req.status.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
