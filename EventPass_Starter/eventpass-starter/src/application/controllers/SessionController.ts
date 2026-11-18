import type { Request, Response } from 'express';
import { SessionService } from '../../infrastructure/services/session.service.js';

export class SessionController {
  private service = new SessionService();

  list = async (req: Request, res: Response): Promise<void> => {
    const { AppError } = await import('../../shared/errors/AppError.js');

    try {
      const sessions = await this.service.list(
        req.query as unknown as Parameters<SessionService['list']>[0]
      );
      res.status(200).json(sessions);
    } catch (err) {
      if (err instanceof AppError) {
        res.status(err.status).json({ error: err.code, message: err.message });
        return;
      }
      res.status(500).json({ error: 'INTERNAL_ERROR', message: 'Erro interno.' });
    }
  };
}