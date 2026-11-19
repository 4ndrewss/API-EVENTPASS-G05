import type { Session, Event, Registration, Attendee } from '@prisma/client';
import type {
  SessionFilters,
  SessionWithCount,
  RegistrationWithSession,
  CreateRegistration,
  UpdateRegistration
} from '../../shared/types.js';
import { prisma } from '../prisma/index.js';
import { AppError } from '../../shared/errors/AppError.js';

export class SessionRepository {
  async list(filters: SessionFilters): Promise<Session[]> {
    return prisma.session.findMany({
      where: {
        eventId: filters.eventId,
        category: filters.category,
        status: filters.status,
        title: filters.title
          ? { contains: filters.title, mode: 'insensitive' }
          : undefined
      },
      orderBy: [{ startAt: 'asc' }, { id: 'asc' }]
    });
  }

  async findById(id: number): Promise<Session | null> {
    return prisma.session.findUnique({ where: { id } });
  }
}