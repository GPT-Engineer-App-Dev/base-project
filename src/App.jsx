import React from 'react';
import veganFoodFestival from '../public/images/vegan-food-festival.jpg';
import techConference from '../public/images/tech-conference.jpg';
import artExhibit from '../public/images/art-exhibit.jpg';
import musicFestival from '../public/images/music-festival.jpg';

function App() {
  const events = [
    {
      image: veganFoodFestival,
      title: 'Vegan Food Festival',
      date: 'Sun, Oct 3, 11:00 AM',
      location: 'Wilmington, DE',
    },
    {
      image: techConference,
      title: 'Tech Conference',
      date: 'Sat, Oct 16, 9:00 AM',
      location: 'Philadelphia, PA',
    },
    {
      image: artExhibit,
      title: 'Art Exhibit',
      date: 'Fri, Nov 5, 6:00 PM',
      location: 'New York, NY',
    },
    {
      image: musicFestival,
      title: 'Music Festival',
      date: 'Sat, Dec 18, 12:00 PM',
      location: 'Miami, FL',
    },
  ];

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
          {events.map((event, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <img
                src={event.image}
                alt={event.title}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;