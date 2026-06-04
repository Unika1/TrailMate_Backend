import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISavedRoute extends Document {
  user: Types.ObjectId;
  trek: Types.ObjectId;
}

const savedRouteSchema = new Schema<ISavedRoute>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true }
}, { timestamps: true });

savedRouteSchema.index({ user: 1, trek: 1 }, { unique: true });

export const SavedRouteModel = mongoose.model<ISavedRoute>('SavedRoute', savedRouteSchema);
