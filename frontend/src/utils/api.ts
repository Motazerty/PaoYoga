// ...existing code...

export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
}
const API_URL = 'http://localhost:5000/api';

// User API functions
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
}

export async function createUser(user: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to create user');
  return res.json();
}

export async function updateUser(id: string, user: { name: string; email: string; password: string }) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return res.json();
}

export async function deleteUser(id: string) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete user');
  return res.json();
}

export async function getVideos() {
  const res = await fetch(`${API_URL}/videos`);
  return res.json();
}

export async function addVideo(video: { title: string; url: string }) {
  const res = await fetch(`${API_URL}/videos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(video),
  });
  return res.json();
}

export async function updateVideo(id: number, video: { title: string; url: string }) {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(video),
  });
  return res.json();
}

export async function deleteVideo(id: number) {
  const res = await fetch(`${API_URL}/videos/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}