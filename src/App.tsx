import React, { useState } from 'react';
import { Cloud, Sun, Umbrella, MapPin, Calendar, IndianRupee, Clock } from 'lucide-react';

// Kerala destinations with their typical activities and costs
const destinations = {
  'Munnar': {
    activities: {
      sunny: [
        {
          time: '07:00 - 09:00',
          activity: 'Tea plantation visit',
          description: 'Start your day early with a refreshing walk through lush tea gardens. Learn about tea cultivation and enjoy the misty morning views.'
        },
        {
          time: '09:30 - 12:30',
          activity: 'Trekking',
          description: 'Guided trek through the Western Ghats. Experience diverse flora and stunning valley views. Includes packed snacks and water.'
        },
        {
          time: '14:00 - 15:30',
          activity: 'Echo Point',
          description: 'Visit the famous Echo Point. Try out the natural echo phenomenon and enjoy panoramic views of the valley.'
        },
        {
          time: '16:00 - 18:00',
          activity: 'Photo Point',
          description: 'Capture the perfect sunset at Photo Point. Professional photography guidance available.'
        }
      ],
      rainy: [
        {
          time: '09:00 - 11:00',
          activity: 'Tea Museum',
          description: 'Explore the history of tea cultivation in Kerala. Includes tea tasting session and documentary screening.'
        },
        {
          time: '11:30 - 13:30',
          activity: 'Spice Garden Tour',
          description: 'Guided tour of an indoor spice garden. Learn about various spices and their medicinal properties.'
        },
        {
          time: '14:30 - 16:30',
          activity: 'Ayurvedic Spa',
          description: 'Traditional Kerala ayurvedic massage and wellness treatments. Advance booking recommended.'
        },
        {
          time: '17:00 - 18:30',
          activity: 'Local Tea Tasting',
          description: 'Indoor tea tasting session featuring various local tea varieties with expert commentary.'
        }
      ]
    },
    costs: {
      budget: 1500,
      moderate: 3000,
      luxury: 5000
    },
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=2069'
  },
  'Alleppey': {
    activities: {
      sunny: [
        {
          time: '08:00 - 12:00',
          activity: 'Houseboat cruise',
          description: 'Morning cruise through the backwaters. Includes traditional Kerala breakfast on board and village stops.'
        },
        {
          time: '13:00 - 15:00',
          activity: 'Beach visit',
          description: 'Relax at Alleppey Beach. Optional water sports and beachside activities available.'
        },
        {
          time: '15:30 - 17:30',
          activity: 'Village cycling tour',
          description: 'Guided bicycle tour through local villages. Experience rural life and meet local artisans.'
        },
        {
          time: '17:45 - 19:00',
          activity: 'Sunset cruise',
          description: 'Special evening cruise to watch the spectacular sunset over the backwaters.'
        }
      ],
      rainy: [
        {
          time: '09:30 - 12:30',
          activity: 'Kerala cuisine cooking class',
          description: 'Learn to prepare traditional Kerala dishes. Includes lunch and recipe booklet.'
        },
        {
          time: '13:30 - 15:30',
          activity: 'Museum visit',
          description: 'Explore the Alleppey Coir Museum and learn about traditional industries.'
        },
        {
          time: '16:00 - 18:00',
          activity: 'Ayurvedic treatment',
          description: 'Traditional wellness session with consultation and treatment.'
        },
        {
          time: '19:00 - 20:30',
          activity: 'Cultural shows',
          description: 'Indoor performance of traditional Kerala arts like Kathakali or Mohiniyattam.'
        }
      ]
    },
    costs: {
      budget: 2000,
      moderate: 4000,
      luxury: 8000
    },
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=2069'
  },
  'Wayanad': {
    activities: {
      sunny: [
        {
          time: '06:00 - 10:00',
          activity: 'Chembra Peak trek',
          description: 'Early morning trek to Chembra Peak. Includes breakfast, guide, and photography stops.'
        },
        {
          time: '11:00 - 13:00',
          activity: 'Banasura Dam',
          description: 'Visit Asia\'s second-largest earth dam. Includes boating and viewpoint visits.'
        },
        {
          time: '14:00 - 16:30',
          activity: 'Wildlife safari',
          description: 'Jeep safari through Wayanad Wildlife Sanctuary. Chance to spot elephants and deer.'
        },
        {
          time: '17:00 - 18:30',
          activity: 'Cave exploration',
          description: 'Guided tour of ancient Edakkal Caves with historical commentary.'
        }
      ],
      rainy: [
        {
          time: '09:00 - 11:00',
          activity: 'Wayanad Heritage Museum',
          description: 'Explore tribal heritage and artifacts. Includes guided tour and documentary.'
        },
        {
          time: '11:30 - 13:30',
          activity: 'Spice plantation tour',
          description: 'Indoor and covered tour of spice plantation with tasting session.'
        },
        {
          time: '14:30 - 16:30',
          activity: 'Local craft workshops',
          description: 'Learn traditional bamboo crafting and weaving from local artisans.'
        },
        {
          time: '17:00 - 18:30',
          activity: 'Tea factory visit',
          description: 'Tour of tea processing unit with detailed explanation of tea making.'
        }
      ]
    },
    costs: {
      budget: 1800,
      moderate: 3500,
      luxury: 6000
    },
    image: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&q=80&w=2069'
  }
};

function App() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [budget, setBudget] = useState('moderate');
  const [weather, setWeather] = useState('sunny');
  const [itinerary, setItinerary] = useState<Array<Array<{time: string, activity: string, description: string}>>>([]);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 14) {
      setDays(value);
    }
  };

  const generateItinerary = () => {
    if (!destination) return;

    const destinationData = destinations[destination as keyof typeof destinations];
    const activities = [...destinationData.activities[weather as keyof typeof destinationData.activities]];
    const newItinerary = [];

    for (let day = 0; day < days; day++) {
      const dayActivities = [];
      for (let i = 0; i < 3 && activities.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * activities.length);
        dayActivities.push(activities.splice(randomIndex, 1)[0]);
      }
      // If we run out of activities, reset the array
      if (activities.length === 0) {
        activities.push(...destinationData.activities[weather as keyof typeof destinationData.activities]);
      }
      newItinerary.push(dayActivities);
    }

    setItinerary(newItinerary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">Kerala Travel Planner</h1>
          <p className="text-emerald-600">Plan your perfect Kerala getaway</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Plan Your Trip</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Destination
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="">Select destination</option>
                  {Object.keys(destinations).map((dest) => (
                    <option key={dest} value={dest}>{dest}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Number of Days
                </label>
                <input
                  type="number"
                  min="1"
                  max="14"
                  value={days}
                  onChange={handleDaysChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4" /> Budget Range
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="budget">Budget</option>
                  <option value="moderate">Moderate</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  {weather === 'sunny' ? <Sun className="w-4 h-4" /> : <Cloud className="w-4 h-4" />} Weather
                </label>
                <select
                  value={weather}
                  onChange={(e) => setWeather(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="sunny">Sunny</option>
                  <option value="rainy">Rainy</option>
                </select>
              </div>

              <button
                onClick={generateItinerary}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Generate Itinerary
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 overflow-auto max-h-[800px]">
            <h2 className="text-2xl font-semibold text-emerald-700 mb-6">Your Itinerary</h2>
            
            {destination && itinerary.length > 0 ? (
              <div className="space-y-8">
                {itinerary.map((dayActivities, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                    <h3 className="text-xl font-semibold text-emerald-600 mb-4">Day {index + 1}</h3>
                    <div className="space-y-6">
                      {dayActivities.map((activity, actIndex) => (
                        <div key={actIndex} className="bg-emerald-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-emerald-700 font-semibold mb-2">
                            <Clock className="w-4 h-4" />
                            {activity.time}
                          </div>
                          <h4 className="text-lg font-medium text-emerald-800 mb-2">{activity.activity}</h4>
                          <p className="text-emerald-600 text-sm">{activity.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">Estimated Daily Budget</h3>
                  <p className="text-emerald-600">
                    ₹{destinations[destination as keyof typeof destinations].costs[budget as keyof typeof destinations['Munnar']['costs']]} per day
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Umbrella className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
                <p>Fill in your preferences and generate an itinerary to start planning your Kerala adventure!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;