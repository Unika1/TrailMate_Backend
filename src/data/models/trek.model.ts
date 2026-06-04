import mongoose, { Schema, Document } from 'mongoose';

const itinerarySchema = new Schema({
  day: Number,
  title: String,
  altitude: String,
  walkingHours: String,
  description: String
}, { _id: false });

const contactSchema = new Schema({
  type: { type: String, enum: ['jeep', 'hotel', 'emergency'] },
  name: String,
  location: String,
  phone: String,
  price: String,
  verifiedDate: String,
  amenities: [String]
}, { _id: false });

const costSchema = new Schema({
  permitFees: String,
  transportation: String,
  accommodation: String,
  food: String,
  guidePorter: String,
  totalEstimate: String
}, { _id: false });

const permitSchema = new Schema({
  name: String,
  fee: String,
  whereToGet: String
}, { _id: false });

export interface ITrek extends Document {
  name: string;
  region: string;
  duration: string;
  difficulty: string;
  distance: string;
  maxAltitude: string;
  bestSeason: string[];
  description: string;
  highlights: string[];
  imageUrl: string;
  lastUpdated: string;
  itinerary: unknown[];
  costs: unknown;
  permits: unknown[];
  contacts: unknown[];
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
  description: String,
  highlights: [String],
  imageUrl: String,
  lastUpdated: String,
  itinerary: [itinerarySchema],
  costs: costSchema,
  permits: [permitSchema],
  contacts: [contactSchema],
  nearbyTreks: [String]
}, { timestamps: true });

export const TrekModel = mongoose.model<ITrek>('Trek', trekSchema);
