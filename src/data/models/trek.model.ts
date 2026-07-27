import mongoose, { Schema, Document } from 'mongoose';

const itinerarySchema = new Schema({
  day: Number,
  title: String,
  altitude: String,
  walkingHours: String,
  status: String,        // e.g. "Rest Day" (used instead of walkingHours on acclimatization days)
  description: String
}, { _id: false });

const contactSchema = new Schema({
  type: { type: String, enum: ['jeep', 'hotel', 'emergency'] },
  name: String,
  location: String,
  phone: String,
  price: String,         // jeep: fare e.g. "1500"; hotel: per-night e.g. "2000"
  verifiedDate: String,
  amenities: [String],
  imageUrl: String,      // hotel photo
  badge: String,         // "ECO-FRIENDLY" | "VERIFIED" | "HIMALAYAN AIR" | "PARK AUTHORITY"
  description: String     // emergency detailed cards
}, { _id: false });

const costSchema = new Schema({
  permitFees: String,
  transportation: String,
  accommodation: String,
  food: String,
  guidePorter: String,
  totalEstimate: String
}, { _id: false });

// Structured budget cards shown on the Cost tab (with FIXED / EST. / DAILY tag)
const budgetSchema = new Schema({
  label: String,         // "Permit Fees"
  amount: String,        // "6,000"
  note: String,          // "FIXED" | "EST." | "DAILY"
  icon: String           // semantic key: "permit" | "transport" | "hotel" | "food"
}, { _id: false });

const permitSchema = new Schema({
  name: String,
  fee: String,
  whereToGet: String,
  description: String
}, { _id: false });

const seasonSchema = new Schema({
  name: String,          // "Spring"
  months: String,        // "March – May"
  description: String
}, { _id: false });

const coordinatesSchema = new Schema({
  latitude: String,      // "27.9881° N"
  longitude: String,     // "86.9250° E"
  elevation: String      // "5,364m"
}, { _id: false });

export interface ITrek extends Document {
  name: string;
  region: string;
  duration: string;
  difficulty: string;
  distance: string;
  maxAltitude: string;
  bestSeason: string[];
  seasons: unknown[];
  description: string;
  highlights: string[];
  imageUrl: string;
  lastUpdated: string;
  contactsVerified: string;
  itinerary: unknown[];
  costs: unknown;
  budget: unknown[];
  costNotice: string;
  permits: unknown[];
  contacts: unknown[];
  coordinates: unknown;
  nearbyTreks: string[];
}

const trekSchema = new Schema<ITrek>({
  name: { type: String, required: true },
  region: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, required: true },
  distance: String,
  maxAltitude: String,
  bestSeason: [String],
  seasons: [seasonSchema],
  description: String,
  highlights: [String],
  imageUrl: String,
  lastUpdated: String,
  contactsVerified: String,
  itinerary: [itinerarySchema],
  costs: costSchema,
  budget: [budgetSchema],
  costNotice: String,
  permits: [permitSchema],
  contacts: [contactSchema],
  coordinates: coordinatesSchema,
  nearbyTreks: [String]
}, { timestamps: true });

export const TrekModel = mongoose.model<ITrek>('Trek', trekSchema);
