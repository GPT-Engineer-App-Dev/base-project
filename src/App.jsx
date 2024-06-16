import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEvents } from './integrations/supabase/index.js';
import Venues from './pages/Venues.jsx';

function App() {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center bg-primary-bg-color text-text-color">
        <header className="header w-full bg-primary-bg-color shadow">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Event Finder</h1>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border rounded-md"
              />
              <div className="flex items-center space-x-2">
                <button className="icon-btn p-2 rounded-full hover:bg-gray-200">
                  <i className="fas fa-bell"></i>
                </button>
                <button className="icon-btn p-2 rounded-full hover:bg-gray-200">
                  <i className="fas fa-user"></i>
                </button>
              </div>
            </div>
          </div>
        </header>
        <main className="main container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <>
                <h2 className="text-3xl font-bold mb-6">Events Near You</h2>
                <div className="space-y-6">
                  {events.map((event) => (
                    <div key={event.id} className="event-card flex items-center space-x-4 bg-card-bg-color p-4 rounded-lg shadow">
                      <div>
                        <h3 className="text-xl font-bold">{event.name}</h3>
                        <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
                        <p className="text-gray-600">{event.venue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            } />
            <Route path="/venues" element={<Venues />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;