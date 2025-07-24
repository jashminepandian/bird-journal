import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [birds, setBirds] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    date: '',
    notes: '',
  });

  // Fetch existing bird entries
  useEffect(() => {
    axios.get('http://localhost:5000/api/birds')
      .then(res => setBirds(res.data))
      .catch(err => console.error('Error fetching birds:', err));
  }, []);

  // Handle input change
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/birds', formData);
      setBirds([...birds, res.data]);
      setFormData({ name: '', location: '', date: '', notes: '' }); // reset form
    } catch (err) {
      console.error('Error adding bird:', err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Bird Journal</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Bird Name" value={formData.name} onChange={handleChange} required /><br />
        <input name="location" placeholder="Location" value={formData.location} onChange={handleChange} /><br />
        <input name="date" type="date" value={formData.date} onChange={handleChange} /><br />
        <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} /><br />
        <button type="submit">Add Bird</button>
      </form>

      <h3>Bird Entries</h3>
      <ul>
        {birds.map((bird, idx) => (
          <li key={idx}>
            <strong>{bird.name}</strong> - {bird.location} - {bird.date?.substring(0, 10)}<br />
            <em>{bird.notes}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
