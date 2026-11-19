import type { Session } from '@prisma/client';
import type { SessionFilters } from '../../shared/types.js';
import { SessionRepository } from '../repositories/session.repository.js';
import { AppError } from '../../shared/errors/AppError.js';

export class SessionService {
  private repo = new SessionRepository();

  async list(filters: SessionFilters): Promise<Session[]> {
    const { SessionCategory, SessionStatus } = await import('@prisma/client');
    const { eventId, category, status, title } = filters as unknown as Record<string, unknown>;
    const validated: SessionFilters = {};

    if (eventId !== undefined) {
      if (typeof eventId !== 'string' || !/^\d+$/.test(eventId) || Number(eventId) <= 0) {
        throw new AppError(400, 'VALIDATION_ERROR', 'eventId inválido.');
      }
      validated.eventId = Number(eventId);
    }

    if (category !== undefined) {
      if (typeof category !== 'string' || !(Object.values(SessionCategory) as string[]).includes(category)) {
        throw new AppError(400, 'VALIDATION_ERROR', 'category inválida.');
      }
      validated.category = category as SessionFilters['category'];
    }

    if (status !== undefined) {
      if (typeof status !== 'string' || !(Object.values(SessionStatus) as string[]).includes(status)) {
        throw new AppError(400, 'VALIDATION_ERROR', 'status inválido.');
      }
      validated.status = status as SessionFilters['status'];
    }

    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim() === '') {
        throw new AppError(400, 'VALIDATION_ERROR', 'title inválido.');
      }
      validated.title = title.trim();
    }

    return this.repo.list(validated);
  }
}