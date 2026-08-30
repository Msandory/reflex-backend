import { useState, useEffect } from 'react'

export interface DeliveryRequest {
  id: string
  request_number: string
  customer_name: string
  address: string
  item_description: string
  status: 'open' | 'assigned' | 'picked_up' | 'delivered'
  assigned_rider?: string
}

// Temporary mock data to use if backend is unreachable
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
    <div className="animate-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
      <div className="glass-card">
        <h2>New Request</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>
            <input className="form-control" value={formData.customer_name} onChange={e => setFormData({...formData, customer_name: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input className="form-control" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input className="form-control" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
          </div>
          <div className="form-group">
            <label>Item Description</label>
            <input className="form-control" value={formData.item_description} onChange={e => setFormData({...formData, item_description: e.target.value})} required />
          </div>
          <button type="submit" className="btn" style={{ width: '100%' }}>Submit Request</button>
        </form>
      </div>

      <div>
        <h2>Active Requests</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {requests.map(req => (
            <div key={req.id} className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 0.5rem 0' }}>{req.request_number} - {req.item_description}</h3>
                <p style={{ margin: 0 }}>To: {req.customer_name}, {req.address}</p>
                {req.assigned_rider && <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem' }}>Rider: {req.assigned_rider}</p>}
              </div>
              <span className={`badge ${req.status}`}>{req.status.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
