import type { Occupancy } from '../../shared/types.js';
import { EventRepository } from '../repositories/event.repository.js';
import { AppError } from '../../shared/errors/AppError.js';

export class EventService {
  private repo = new EventRepository();

  async occupancy(eventId: number): Promise<Occupancy> {
    const event = await this.repo.findById(eventId);

    if (!event) {
      throw new AppError(404, 'EVENT_NOT_FOUND', 'Evento não encontrado.');
    }

    const sessions = await this.repo.sessionsWithCounts(eventId);

    const formattedSessions = sessions.map((session) => {
      const registered = session._count.registrations;
      const available = session.capacity - registered;
      const rawPercentage = session.capacity > 0 ? (registered / session.capacity) * 100 : 0;
      const occupancyPercentage = Number(rawPercentage.toFixed(2));

      return {
        sessionId: session.id,
        title: session.title,
        capacity: session.capacity,
        registered,
        available,
        occupancyPercentage,
      };
    });

    formattedSessions.sort((a, b) => {
      if (b.occupancyPercentage !== a.occupancyPercentage) {
        return b.occupancyPercentage - a.occupancyPercentage;
      }
      return a.sessionId - b.sessionId;
    });

    const totalSessions = formattedSessions.length;
    const totalRegistrations = formattedSessions.reduce((acc, s) => acc + s.registered, 0);
    const totalCapacity = formattedSessions.reduce((acc, s) => acc + s.capacity, 0);

    const rawOverall = totalCapacity > 0 ? (totalRegistrations / totalCapacity) * 100 : 0;
    const overallOccupancyPercentage = Number(rawOverall.toFixed(2));

    return {
      eventId: event.id,
      eventName: event.name,
      totalSessions,
      totalRegistrations,
      totalCapacity,
      overallOccupancyPercentage,
      sessions: formattedSessions,
    };
  }
}