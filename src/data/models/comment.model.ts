import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
  trek: Types.ObjectId;
  userName: string;
  message: string;
  rating: number;
  imageUrl: string;
}

const commentSchema = new Schema<IComment>({
  trek: { type: Schema.Types.ObjectId, ref: 'Trek', required: true },
  userName: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, default: 5 },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

export const CommentModel = mongoose.model<IComment>('Comment', commentSchema);
