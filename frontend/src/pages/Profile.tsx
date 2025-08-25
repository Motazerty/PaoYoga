import React, { useContext, useState } from 'react';
import { PurchasedPacksContext } from '../providers/PurchasedPacksProvider';
import { FaUserCircle, FaEnvelope, FaEdit, FaHistory } from 'react-icons/fa';
import '../styles.css';

export default function Profile() {
  const context = useContext(PurchasedPacksContext);
  const user = context?.user;
  const purchasedPacks = context?.purchasedPacks ?? [];
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (context?.setUser) {
      context.setUser({ ...user, ...form });
    }
    setEditMode(false);
  };

  return (
    <div className="card" style={{ maxWidth: 680, margin: '2em auto' }}>
      <div className="flex" style={{ alignItems: 'center', marginBottom: '2em' }}>
        <div style={{ marginRight: '1.5em' }}>
          <FaUserCircle size={70} color="#72ce83" />
        </div>
        <div style={{ flex: 1 }}>
          <h2 className="main-title" style={{ marginBottom: 0 }}>{user?.name || 'Utilisateur anonyme'}</h2>
          <div className="main-text" style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
            <FaEnvelope style={{ marginRight: 8 }} />
            {user?.email || 'Non connecté'}
          </div>
          {user?.phone && (
            <div className="main-text" style={{ color: 'var(--text-secondary)' }}>
              📞 {user.phone}
            </div>
          )}
          {user?.address && (
            <div className="main-text" style={{ color: 'var(--text-secondary)' }}>
              🏠 {user.address}
            </div>
          )}
        </div>
        <button className="button" title="Modifier le profil" style={{ marginLeft: '1em' }} onClick={() => setEditMode(true)}>
          <FaEdit style={{ marginRight: 8 }} /> Modifier
        </button>
      </div>

      {editMode && (
        <div className="card" style={{ background: 'var(--background-color)', marginBottom: '2em' }}>
          <h3 className="subtitle">Modifier le profil</h3>
          <form className="flex" style={{ flexDirection: 'column', gap: '1em' }} onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Nom" />
            <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
            <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Téléphone" />
            <input className="input" name="address" value={form.address} onChange={handleChange} placeholder="Adresse" />
            <div className="flex" style={{ gap: '1em' }}>
              <button className="button" type="submit">Enregistrer</button>
              <button className="button" type="button" style={{ background: 'var(--secondary-color)', color: '#fff' }} onClick={() => setEditMode(false)}>Annuler</button>
            </div>
          </form>
        </div>
      )}

      <h3 className="subtitle" style={{ display: 'flex', alignItems: 'center', marginBottom: '1em' }}>
        <FaHistory style={{ marginRight: 8 }} /> Historique d'achats
      </h3>
      <div>
        {purchasedPacks.length > 0 ? (
          purchasedPacks.map((p) => (
            <div key={p.id} className="card flex" style={{ alignItems: 'center', marginBottom: '1em', padding: '1em' }}>
              <span style={{ flex: 2 }}>{p.name}</span>
              <span style={{ flex: 1, color: 'var(--text-secondary)' }}>{p.date}</span>
              <span style={{ flex: 1, fontWeight: 700 }}>{p.price}€</span>
            </div>
          ))
        ) : (
          <div className="main-text" style={{ color: 'var(--text-secondary)' }}>Aucun achat trouvé.</div>
        )}
      </div>
    </div>
  );
}
