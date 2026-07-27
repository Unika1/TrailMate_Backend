import { TrekModel } from '../../data/models/trek.model';
import { CommentModel } from '../../data/models/comment.model';
import { SavedRouteModel } from '../../data/models/savedRoute.model';

// Returns true if a trek's duration (e.g. "14 Days") falls inside a filter
// range like "2-3 Days", "7-10 Days" or "12+ Days".
function matchesDuration(trekDuration: string, filter: string): boolean {
  const daysMatch = trekDuration.match(/\d+/);
  if (!daysMatch) return false;
  const days = parseInt(daysMatch[0], 10);

  const nums = (filter.match(/\d+/g) || []).map(Number);
  if (nums.length === 0) return true;
  if (filter.includes('+')) return days >= nums[0];          // "12+ Days"
  if (nums.length >= 2) return days >= nums[0] && days <= nums[1]; // "7-10 Days"
  return days === nums[0];                                    // single value
}

export class TrekService {
  async getTreks(filters: { region?: string; duration?: string; difficulty?: string }) {
    const query: Record<string, unknown> = {};
    // Region: case-insensitive "contains" so "Everest Region" also matches
    // values like "Everest Region, Nepal".
    if (filters.region) {
      query.region = { $regex: filters.region, $options: 'i' };
    }
    // Difficulty: exact but case-insensitive.
    if (filters.difficulty) {
      query.difficulty = { $regex: `^${filters.difficulty}$`, $options: 'i' };
    }

    let treks = await TrekModel.find(query).sort({ createdAt: -1 });

    // Duration is a free-text string like "14 Days", but the filter is a range
    // such as "2-3 Days", "7-10 Days" or "12+ Days". Match it numerically.
    if (filters.duration) {
      treks = treks.filter((t) => matchesDuration(String(t.duration), filters.duration!));
    }
    return treks;
  }

  async getTrekById(id: string) {
    return TrekModel.findById(id);
  }

  // ── Admin CRUD ──────────────────────────────────────────────────────────────

  async createTrek(data: Record<string, unknown>) {
    return TrekModel.create(data);
  }

  async updateTrek(id: string, data: Record<string, unknown>) {
    return TrekModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async deleteTrek(id: string) {
    return TrekModel.findByIdAndDelete(id);
  }

  async addComment(
    trekId: string,
    userName: string,
    message: string,
    rating: number,
    imageUrl = ''
  ) {
    return CommentModel.create({ trek: trekId, userName, message, rating, imageUrl });
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
