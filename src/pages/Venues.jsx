import React, { useState } from 'react';
import { useVenues, useAddVenue, useUpdateVenue, useDeleteVenue } from '../integrations/supabase/index.js';

const Venues = () => {
  const { data: venues, error, isLoading } = useVenues();
  const addVenue = useAddVenue();
  const updateVenue = useUpdateVenue();
  const deleteVenue = useDeleteVenue();

  const [newVenue, setNewVenue] = useState({ name: '', capacity: '', type: '' });
  const [editingVenue, setEditingVenue] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVenue((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingVenue((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddVenue = () => {
    addVenue.mutate(newVenue);
    setNewVenue({ name: '', capacity: '', type: '' });
  };

  const handleUpdateVenue = () => {
    updateVenue.mutate(editingVenue);
    setEditingVenue(null);
  };

  const handleDeleteVenue = (id) => {
    deleteVenue.mutate(id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Manage Venues</h2>
      <div className="mb-6">
        <input
          type="text"
          name="name"
          placeholder="Venue Name"
          value={newVenue.name}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md mr-2"
        />
        <input
          type="number"
          name="capacity"
          placeholder="Capacity"
          value={newVenue.capacity}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md mr-2"
        />
        <input
          type="text"
          name="type"
          placeholder="Type"
          value={newVenue.type}
          onChange={handleChange}
          className="px-4 py-2 border rounded-md mr-2"
        />
        <button onClick={handleAddVenue} className="px-4 py-2 bg-blue-500 text-white rounded-md">Add Venue</button>
      </div>
      <div className="space-y-6">
        {venues.map((venue) => (
          <div key={venue.id} className="venue-card flex items-center space-x-4 bg-card-bg-color p-4 rounded-lg shadow">
            {editingVenue && editingVenue.id === venue.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editingVenue.name}
                  onChange={handleEditChange}
                  className="px-4 py-2 border rounded-md mr-2"
                />
                <input
                  type="number"
                  name="capacity"
                  value={editingVenue.capacity}
                  onChange={handleEditChange}
                  className="px-4 py-2 border rounded-md mr-2"
                />
                <input
                  type="text"
                  name="type"
                  value={editingVenue.type}
                  onChange={handleEditChange}
                  className="px-4 py-2 border rounded-md mr-2"
                />
                <button onClick={handleUpdateVenue} className="px-4 py-2 bg-green-500 text-white rounded-md">Save</button>
                <button onClick={() => setEditingVenue(null)} className="px-4 py-2 bg-red-500 text-white rounded-md">Cancel</button>
              </>
            ) : (
              <>
                <div>
                  <h3 className="text-xl font-bold">{venue.name}</h3>
                  <p className="text-gray-600">Capacity: {venue.capacity}</p>
                  <p className="text-gray-600">Type: {venue.type}</p>
                </div>
                <button onClick={() => setEditingVenue(venue)} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Edit</button>
                <button onClick={() => handleDeleteVenue(venue.id)} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Venues;