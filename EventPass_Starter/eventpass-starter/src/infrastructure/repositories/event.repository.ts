import type { Event } from '@prisma/client';
import type {
  SessionWithCount
} from '../../shared/types.js';
import { prisma } from '../prisma/index.js';

export class EventRepository {
  async findById(id: number): Promise<Event | null> {
    return await prisma.event.findUnique({
      where: { id }
    });
  }

  async sessionsWithCounts(eventId: number): Promise<SessionWithCount[]> {
    return await prisma.session.findMany({
      where: {
        eventId,
        status: { not: 'CANCELLED' }
      },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });
  }
}