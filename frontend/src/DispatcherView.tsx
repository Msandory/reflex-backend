import { useState } from 'react'
import { Users, CheckCircle, Package } from 'lucide-react'
import type { DeliveryRequest } from './RetailerView'

const MOCK_REQUESTS: DeliveryRequest[] = [
  { id: '1', request_number: 'REQ-001', customer_name: 'John Doe', address: 'Westlands', item_description: 'Blender', status: 'open' },
  { id: '2', request_number: 'REQ-002', customer_name: 'Jane Smith', address: 'Kilimani', item_description: 'Painkillers', status: 'assigned', assigned_rider: 'James' },
  { id: '3', request_number: 'REQ-003', customer_name: 'Tech Store', address: 'CBD', item_description: 'Charger', status: 'picked_up', assigned_rider: 'James' },
  { id: '4', request_number: 'REQ-004', customer_name: 'Hardware Co.', address: 'Industrial Area', item_description: 'Pipes', status: 'delivered', assigned_rider: 'Sarah' }
]

const AVAILABLE_RIDERS = ['James', 'Kip', 'Sarah']

export default function DispatcherView() {
  const [requests, setRequests] = useState<DeliveryRequest[]>(MOCK_REQUESTS)

  const handleAssign = (id: string, rider: string) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: 'assigned', assigned_rider: rider } : req))
  }

  const Column = ({ title, status, icon: Icon }: { title: string, status: DeliveryRequest['status'], icon: any }) => (
    <div className="kanban-column">
      <h3>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Icon size={18} /> {title}
        </span>
        <span className="count">{requests.filter(r => r.status === status).length}</span>
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {requests.filter(r => r.status === status).map(req => (
          <div key={req.id} className="glass-card" style={{ padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <strong>{req.request_number}</strong>
            </div>
            <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem' }}>{req.address}</p>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', opacity: 0.7 }}>{req.item_description}</p>
            
            {status === 'open' ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select className="form-control" style={{ padding: '0.5rem' }} id={`rider-${req.id}`}>
                  <option value="">Rider...</option>
                  {AVAILABLE_RIDERS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button 
                  className="btn" style={{ padding: '0.5rem 1rem' }}
                  onClick={() => {
                    const select = document.getElementById(`rider-${req.id}`) as HTMLSelectElement
                    if (select.value) handleAssign(req.id, select.value)
                  }}
                >
                  Go
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>
                <Users size={14} /> {req.assigned_rider}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="animate-in">
      
      <div className="stats-grid">
        <div className="stat-card">
          <Users size={24} />
          <span className="label">Active Riders</span>
          <span className="value">3</span>
        </div>
        <div className="stat-card">
          <Package size={24} />
          <span className="label">Open Requests</span>
          <span className="value">{requests.filter(r => r.status === 'open').length}</span>
        </div>
        <div className="stat-card">
          <CheckCircle size={24} />
          <span className="label">Delivered Today</span>
          <span className="value">{requests.filter(r => r.status === 'delivered').length}</span>
        </div>
      </div>

      <div className="kanban-board">
        <Column title="Open" status="open" icon={Package} />
        <Column title="Assigned" status="assigned" icon={Users} />
        <Column title="Picked Up" status="picked_up" icon={Package} />
        <Column title="Delivered" status="delivered" icon={CheckCircle} />
      </div>

    </div>
  )
}
