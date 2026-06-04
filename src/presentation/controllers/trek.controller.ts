import { Request, Response } from 'express';
import { TrekService } from '../../domain/services/trek.service';
import { AuthRequest } from '../../core/middleware/auth.middleware';

const trekService = new TrekService();

export class TrekController {
  async getTreks(req: Request, res: Response) {
    const { region, duration, difficulty } = req.query;
    const treks = await trekService.getTreks({
      region: region as string,
      duration: duration as string,
      difficulty: difficulty as string
    });
    res.json(treks);
  }

  async getTrekById(req: Request, res: Response) {
    const trek = await trekService.getTrekById(req.params.id);
    if (!trek) return res.status(404).json({ message: 'Trek not found' });
    res.json(trek);
  }

  async addComment(req: Request, res: Response) {
    try {
      const { userName, message, rating } = req.body;
      const comment = await trekService.addComment(req.params.id, userName, message, rating || 5);
      res.status(201).json({ message: 'Comment submitted successfully', comment });
    } catch {
      res.status(400).json({ message: 'Could not add comment' });
    }
  }

  async getComments(req: Request, res: Response) {
    const comments = await trekService.getComments(req.params.id);
    res.json(comments);
  }

  async saveRoute(req: AuthRequest, res: Response) {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    await trekService.saveRoute(req.userId, req.params.trekId);
    res.json({ message: 'Route saved successfully' });
  }

  async getSavedRoutes(req: AuthRequest, res: Response) {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    const saved = await trekService.getSavedRoutes(req.userId);
    res.json(saved);
  }

  async removeSavedRoute(req: AuthRequest, res: Response) {
    if (!req.userId) return res.status(401).json({ message: 'Unauthorized' });
    await trekService.removeSavedRoute(req.userId, req.params.trekId);
    res.json({ message: 'Route removed from saved routes' });
  }
}
