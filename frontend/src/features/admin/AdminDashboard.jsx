import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import AddCategory from './AddCategory';
import AddWord from './AddWord';

const AdminDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all categories on mount to pass to the AddWord component
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(false);
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  // This function allows the AddCategory component to update the list
  // in the AddWord component without a full page reload.
  const handleNewCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Manage game content here.</p>
      
      <AddCategory onCategoryAdded={handleNewCategory} />
      <AddWord categories={categories} />
      
      {/* We can add WordList.jsx here later */}
    </div>
  );
};

export default AdminDashboard;