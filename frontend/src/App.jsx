import React from 'react';
import Navbar from './components/Navbar';
import AppRoutes from './routes'; // We will create this file next

function App() {
  return (
    <div className="App">
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <AppRoutes /> {/* <-- This will render all our pages */}
      </main>
    </div>
  )
}

export default App