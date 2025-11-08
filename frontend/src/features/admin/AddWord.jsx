import React, { useState } from 'react';
import api from '../../api/api';

const AddWord = ({ categories }) => {
  const [text, setText] = useState('');
  const [definition, setDefinition] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!categoryId) {
      setError('Please select a category');
      return;
    }
    try {
      const response = await api.post('/words', {
        text,
        definition,
        categoryId,
        difficulty,
      });
      setSuccess(`Word "${response.data.text}" added!`);
      // Reset form
      setText('');
      setDefinition('');
      setCategoryId('');
      setDifficulty('easy');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add word');
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
      <h4>Add New Word</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Word (Text): </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Definition (Hint): </label>
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          />
        </div>
        <div>
          <label>Category: </label>
          <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Difficulty: </label>
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Add Word</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
      </form>
    </div>
  );
};

export default AddWord;