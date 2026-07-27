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

  // ── Admin CRUD ──────────────────────────────────────────────────────────────

  // Receives a single image file and returns a RELATIVE url (e.g. /uploads/xyz.jpg).
  // Each client (app / admin) prefixes it with its own server host, so the same
  // value works from the Android emulator (10.0.2.2) and the browser (localhost).
  async uploadImage(req: Request, res: Response) {
    const file = (req as Request & { file?: Express.Multer.File }).file;
    if (!file) return res.status(400).json({ message: 'No image uploaded' });
    res.status(201).json({ url: `/uploads/${file.filename}` });
  }

  async createTrek(req: Request, res: Response) {
    try {
      const trek = await trekService.createTrek(req.body);
      res.status(201).json(trek);
    } catch (err) {
      res.status(400).json({
        message: 'Could not create trek',
        error: (err as Error).message
      });
    }
  }

  async updateTrek(req: Request, res: Response) {
    try {
      const trek = await trekService.updateTrek(req.params.id, req.body);
      if (!trek) return res.status(404).json({ message: 'Trek not found' });
      res.json(trek);
    } catch (err) {
      res.status(400).json({
        message: 'Could not update trek',
        error: (err as Error).message
      });
    }
  }

  async deleteTrek(req: Request, res: Response) {
    const trek = await trekService.deleteTrek(req.params.id);
    if (!trek) return res.status(404).json({ message: 'Trek not found' });
    res.json({ message: 'Trek deleted successfully' });
  }

  async addComment(req: Request, res: Response) {
    try {
      const { userName, message, rating } = req.body;
      // If an image was uploaded via multer, build its public URL.
      const file = (req as Request & { file?: Express.Multer.File }).file;
      const imageUrl = file
        ? `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
        : '';
      const comment = await trekService.addComment(
        req.params.id,
        userName,
        message,
        rating || 5,
        imageUrl
      );
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
