import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<{ name: string; email: string; password: string }>({ name: '', email: '', password: '' });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateUser(editingId, form);
        setUsers(users.map(u => u._id === editingId ? updated : u));
        setEditingId(null);
      } else {
        const newUser = await createUser(form);
        setUsers([...users, newUser]);
      }
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      alert('Error: ' + err);
    }
  };

  const handleEdit = (user: User) => {
    setForm({ name: user.name, email: user.email, password: user.password });
    setEditingId(user._id);
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div>
      <h2>User List</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">{editingId ? 'Update' : 'Add'} User</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
