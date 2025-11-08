import React, { useState } from 'react';
import api from '../../api/api';

const AddCategory = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await api.post('/categories', { name });
      setSuccess(`Category "${response.data.name}" added successfully!`);
      setName('');
      if (onCategoryAdded) {
        onCategoryAdded(response.data); // Notify parent component
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add category');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h4>Add New Category</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Category</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddCategory;