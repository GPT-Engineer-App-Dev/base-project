import React from 'react';
import { useEvents } from './integrations/supabase/index.js';

function App() {
  const { data: events, error, isLoading } = useEvents();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Event Finder</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 border rounded-md"
            />
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-200">
                <i className="fas fa-bell"></i>
              </button>
              <button className="p-2 rounded-full hover:bg-gray-200">
                <i className="fas fa-user"></i>
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Events Near You</h2>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <div>
                <h3 className="text-xl font-bold">{event.name}</h3>
                <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
                <p className="text-gray-600">{event.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;