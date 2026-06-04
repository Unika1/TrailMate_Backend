import { connectDatabase } from './core/config/database';
import { TrekModel } from './data/models/trek.model';

async function seed() {
  await connectDatabase();
  await TrekModel.deleteMany({});

  await TrekModel.insertMany([
    {
      name: 'Everest Base Camp Trek',
      region: 'Everest Region',
      duration: '12+ Days',
      difficulty: 'Moderate',
      distance: '130 km',
      maxAltitude: '5,364m',
      bestSeason: ['Spring (Mar-May)', 'Autumn (Sep-Nov)'],
      description: 'A classic Nepal trek through Lukla, Namche Bazaar, Tengboche, Dingboche, Lobuche and Gorakshep to Everest Base Camp.',
      highlights: ['Namche Bazaar', 'Tengboche Monastery', 'Kala Patthar viewpoint', 'Sherpa culture'],
      imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa',
      lastUpdated: '12 Sept 2025',
      itinerary: [
        { day: 1, title: 'Lukla to Phakding', altitude: '2,610m', walkingHours: '3 hrs', description: 'Easy first walking day after the Lukla flight.' },
        { day: 2, title: 'Phakding to Namche Bazaar', altitude: '3,440m', walkingHours: '6 hrs', description: 'Walk through pine forests and suspension bridges.' },
        { day: 3, title: 'Acclimatization in Namche', altitude: '3,440m', walkingHours: '2-3 hrs', description: 'Short hike and rest for altitude adjustment.' },
        { day: 4, title: 'Namche to Tengboche', altitude: '3,860m', walkingHours: '5 hrs', description: 'Visit Tengboche Monastery with mountain views.' },
        { day: 5, title: 'Tengboche to Dingboche', altitude: '4,410m', walkingHours: '6 hrs', description: 'Enter higher altitude landscape.' },
        { day: 6, title: 'Acclimatization in Dingboche', altitude: '4,410m', walkingHours: '2-3 hrs', description: 'Rest and short acclimatization hike.' },
        { day: 7, title: 'Dingboche to Lobuche', altitude: '4,940m', walkingHours: '5 hrs', description: 'Walk towards the Khumbu glacier area.' },
        { day: 8, title: 'Lobuche to Gorakshep', altitude: '5,164m', walkingHours: '4 hrs', description: 'Reach Gorakshep, the final settlement before base camp.' },
        { day: 9, title: 'Everest Base Camp and return', altitude: '5,364m', walkingHours: '7 hrs', description: 'Visit Everest Base Camp and return to Gorakshep.' }
      ],
      costs: {
        permitFees: 'NPR 6,000',
        transportation: 'NPR 15,000 - 25,000',
        accommodation: 'NPR 1,000 - 2,500/night',
        food: 'NPR 2,000 - 3,500/day',
        guidePorter: 'NPR 3,000 - 5,000/day',
        totalEstimate: 'NPR 85,000 - 130,000'
      },
      permits: [
        { name: 'Sagarmatha National Park Permit', fee: 'NPR 3,000', whereToGet: 'Tourism Board or park entry point' },
        { name: 'Khumbu Pasang Lhamu Permit', fee: 'NPR 3,000', whereToGet: 'Lukla / Monjo counter' }
      ],
      contacts: [
        { type: 'jeep', name: 'Lukla Jeep Service', location: 'Kathmandu to Ramechhap', phone: '+977-9800000001', price: 'NPR 2,500/person', verifiedDate: '10 Sept 2025' },
        { type: 'hotel', name: 'Namche Tea House', location: 'Namche Bazaar', phone: '+977-9800000002', price: 'NPR 1,500/night', amenities: ['WiFi', 'Hot Water', 'Charging'], verifiedDate: '11 Sept 2025' },
        { type: 'hotel', name: 'Gorakshep Lodge', location: 'Gorakshep', phone: '+977-9800000003', price: 'NPR 2,000/night', amenities: ['Charging', 'Hot Water'], verifiedDate: '09 Sept 2025' },
        { type: 'emergency', name: 'Tourist Police', location: 'Nepal', phone: '1144', price: 'Free', verifiedDate: '10 Sept 2025' },
        { type: 'emergency', name: 'Helicopter Rescue Desk', location: 'Everest Region', phone: '+977-9800000004', price: 'Insurance Required', verifiedDate: '10 Sept 2025' }
      ],
      nearbyTreks: ['Gokyo Lakes Trek', 'Three Passes Trek']
    },
    {
      name: 'Annapurna Base Camp Trek',
      region: 'Annapurna Region',
      duration: '7-10 Days',
      difficulty: 'Moderate',
      distance: '70 km',
      maxAltitude: '4,130m',
      bestSeason: ['Spring (Mar-May)', 'Autumn (Sep-Nov)'],
      description: 'A scenic trek to Annapurna Base Camp through villages and forests.',
      highlights: ['Machhapuchhre views', 'Ghandruk village', 'Hot springs'],
      imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7',
      lastUpdated: '08 Sept 2025',
      itinerary: [],
      costs: { permitFees: 'NPR 5,000', transportation: 'NPR 4,000 - 7,000', accommodation: 'NPR 800 - 1,800/night', food: 'NPR 1,500 - 2,500/day', totalEstimate: 'NPR 35,000 - 60,000' },
      permits: [{ name: 'ACAP Permit', fee: 'NPR 3,000', whereToGet: 'Nepal Tourism Board' }],
      contacts: [],
      nearbyTreks: ['Mardi Himal Trek']
    },
    {
      name: 'Langtang Valley Trek',
      region: 'Langtang Region',
      duration: '7-10 Days',
      difficulty: 'Easy',
      distance: '65 km',
      maxAltitude: '3,870m',
      bestSeason: ['Spring (Mar-May)', 'Autumn (Sep-Nov)'],
      description: 'Beginner-friendly trek close to Kathmandu with Tamang culture and mountain views.',
      highlights: ['Kyanjin Gompa', 'Tamang culture', 'Langtang village'],
      imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
      lastUpdated: '07 Sept 2025',
      itinerary: [],
      costs: { permitFees: 'NPR 3,000', transportation: 'NPR 2,000 - 5,000', accommodation: 'NPR 800 - 1,500/night', food: 'NPR 1,300 - 2,200/day', totalEstimate: 'NPR 25,000 - 45,000' },
      permits: [{ name: 'Langtang National Park Permit', fee: 'NPR 3,000', whereToGet: 'Nepal Tourism Board or park entry' }],
      contacts: [],
      nearbyTreks: ['Gosaikunda Trek']
    }
  ]);

  console.log('Sample treks inserted successfully');
  process.exit(0);
}

seed();
