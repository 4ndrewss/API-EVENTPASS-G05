import type { Session, Event, Registration, Attendee } from "@prisma/client";
import type {
  SessionFilters,
  SessionWithCount,
  RegistrationWithSession,
  CreateRegistration,
  UpdateRegistration,
} from "../../shared/types.js";
import { prisma } from "../prisma/index.js";
import { AppError } from "../../shared/errors/AppError.js";

export class RegistrationRepository {
  async findById(id: number): Promise<RegistrationWithSession | null> {
    // TODO: implementar operação de persistência.
    throw new AppError(
      501,
      "NOT_IMPLEMENTED",
      "Operação ainda não implementada.",
    );
  }

  async findAttendee(id: number): Promise<Attendee | null> {
    return prisma.attendee.findUnique({ where: { id } });
  }

  async findDuplicate(
    attendeeId: number,
    sessionId: number,
    excludeId?: number,
  ): Promise<Registration | null> {
    return prisma.registration.findFirst({
      where: {
        attendeeId,
        sessionId,
        ...(excludeId !== undefined && { id: { not: excludeId } }),
      },
    });
  }

  async countForSession(sessionId: number): Promise<number> {
    return prisma.registration.count({ where: { sessionId } });
  }

  async findConflict(
    attendeeId: number,
    startAt: Date,
    endAt: Date,
    excludeId?: number,
  ): Promise<Registration | null> {
    return prisma.registration.findFirst({
      where: {
        attendeeId,
        ...(excludeId !== undefined && { id: { not: excludeId } }),
        session: {
          status: { not: "CANCELLED" },
          startAt: { lt: endAt },
          endAt: { gt: startAt },
        },
      },
    });
  }

  async create(data: CreateRegistration): Promise<Registration> {
    return prisma.registration.create({
      data: { attendeeId: data.attendeeId, sessionId: data.sessionId },
    });
  }

  async update(id: number, data: UpdateRegistration): Promise<Registration> {
    throw new AppError(
      501,
      "NOT_IMPLEMENTED",
      "Operação ainda não implementada.",
    );
  }

  async delete(id: number): Promise<void> {
    // TODO: implementar operação de persistência.
    throw new AppError(
      501,
      "NOT_IMPLEMENTED",
      "Operação ainda não implementada.",
    );
  }
}
