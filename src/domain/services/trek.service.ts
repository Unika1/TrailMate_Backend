import { TrekModel } from '../../data/models/trek.model';
import { CommentModel } from '../../data/models/comment.model';
import { SavedRouteModel } from '../../data/models/savedRoute.model';

export class TrekService {
  async getTreks(filters: { region?: string; duration?: string; difficulty?: string }) {
    const query: Record<string, string> = {};
    if (filters.region) query.region = filters.region;
    if (filters.duration) query.duration = filters.duration;
    if (filters.difficulty) query.difficulty = filters.difficulty;
    return TrekModel.find(query).sort({ createdAt: -1 });
  }

  async getTrekById(id: string) {
    return TrekModel.findById(id);
  }

  async addComment(trekId: string, userName: string, message: string, rating: number) {
    return CommentModel.create({ trek: trekId, userName, message, rating });
  }

  async getComments(trekId: string) {
    return CommentModel.find({ trek: trekId }).sort({ createdAt: -1 });
  }

  async saveRoute(userId: string, trekId: string) {
    return SavedRouteModel.findOneAndUpdate(
      { user: userId, trek: trekId },
      { user: userId, trek: trekId },
      { upsert: true, new: true }
    );
  }

  async getSavedRoutes(userId: string) {
    return SavedRouteModel.find({ user: userId }).populate('trek');
  }

  async removeSavedRoute(userId: string, trekId: string) {
    return SavedRouteModel.findOneAndDelete({ user: userId, trek: trekId });
  }
}
