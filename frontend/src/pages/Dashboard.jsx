import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load categories');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  const handleStartGame = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      setError('Please select a category');
      return;
    }
    // Navigate to the game page, passing parameters in the URL
    navigate(`/game/solo?category=${selectedCategory}&difficulty=${selectedDifficulty}`);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Start a New Game</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleStartGame}>
        <div>
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">-- Select Category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Difficulty:</label>
          <select 
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <button type="submit" disabled={loading}>Start Game</button>
      </form>
    </div>
  );
};

export default Dashboard;