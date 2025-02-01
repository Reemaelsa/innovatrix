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
    }
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
    }
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
    }
  }
};

// DOM elements
const destinationSelect = document.getElementById('destination');
const daysInput = document.getElementById('days');
const budgetSelect = document.getElementById('budget');
const weatherSelect = document.getElementById('weather');
const generateButton = document.getElementById('generate');
const itineraryContainer = document.getElementById('itinerary');
const weatherIcon = document.getElementById('weatherIcon');

// Update weather icon when weather selection changes
weatherSelect.addEventListener('change', (e) => {
  const isSunny = e.target.value === 'sunny';
  weatherIcon.innerHTML = isSunny 
    ? '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'
    : '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>';
});

// Validate days input
daysInput.addEventListener('change', (e) => {
  const value = parseInt(e.target.value);
  if (isNaN(value) || value < 1) {
    e.target.value = 1;
  } else if (value > 14) {
    e.target.value = 14;
  }
});

// Generate itinerary
generateButton.addEventListener('click', () => {
  const destination = destinationSelect.value;
  if (!destination) {
    alert('Please select a destination');
    return;
  }

  const days = parseInt(daysInput.value);
  const budget = budgetSelect.value;
  const weather = weatherSelect.value;

  const destinationData = destinations[destination];
  const activities = [...destinationData.activities[weather]];
  const itinerary = [];

  // Generate itinerary for each day
  for (let day = 0; day < days; day++) {
    const dayActivities = [];
    for (let i = 0; i < 3 && activities.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * activities.length);
      dayActivities.push(activities.splice(randomIndex, 1)[0]);
    }
    // Reset activities if we run out
    if (activities.length === 0) {
      activities.push(...destinationData.activities[weather]);
    }
    itinerary.push(dayActivities);
  }

  // Render itinerary
  let html = '';
  itinerary.forEach((dayActivities, dayIndex) => {
    html += `
      <div class="day">
        <h3 class="day-title">Day ${dayIndex + 1}</h3>
        <div class="activities">
          ${dayActivities.map(activity => `
            <div class="activity">
              <div class="activity-time">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                ${activity.time}
              </div>
              <h4 class="activity-title">${activity.activity}</h4>
              <p class="activity-description">${activity.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  });

  html += `
    <div class="budget-info">
      <h3>Estimated Daily Budget</h3>
      <p>₹${destinationData.costs[budget]} per day</p>
    </div>
  `;

  itineraryContainer.innerHTML = html;
});