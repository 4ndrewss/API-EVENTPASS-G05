import type { Registration, Session } from "@prisma/client";
import type {
  CreateRegistration,
  UpdateRegistration,
} from "../../shared/types.js";
import { RegistrationRepository } from "../repositories/registration.repository.js";
import { SessionRepository } from "../repositories/session.repository.js";
import { AppError } from "../../shared/errors/AppError.js";

export class RegistrationService {
  private repo = new RegistrationRepository();

  async create(data: CreateRegistration): Promise<Registration> {
    const attendee = await this.repo.findAttendee(data.attendeeId);
    if (!attendee) {
      throw new AppError(
        404,
        "ATTENDEE_NOT_FOUND",
        "Participante não encontrado.",
      );
    }

    const sessionRepo = new SessionRepository();
    const session = await sessionRepo.findById(data.sessionId);
    if (!session) {
      throw new AppError(404, "SESSION_NOT_FOUND", "Sessão não encontrada.");
    }

    if (session.status !== "SCHEDULED" || session.startAt <= new Date()) {
      throw new AppError(
        409,
        "SESSION_NOT_AVAILABLE",
        "A sessão não está agendada ou já começou.",
      );
    }

    const duplicate = await this.repo.findDuplicate(
      data.attendeeId,
      data.sessionId,
    );
    if (duplicate) {
      throw new AppError(
        409,
        "ALREADY_REGISTERED",
        "Participante já está inscrito nesta sessão.",
      );
    }

    const registered = await this.repo.countForSession(data.sessionId);
    if (registered >= session.capacity) {
      throw new AppError(
        409,
        "SESSION_FULL",
        "A sessão atingiu sua capacidade.",
      );
    }

    const conflict = await this.repo.findConflict(
      data.attendeeId,
      session.startAt,
      session.endAt,
    );
    if (conflict) {
      throw new AppError(
        409,
        "SCHEDULE_CONFLICT",
        "Participante possui inscrição em sessão com horário conflitante.",
      );
    }

    return this.repo.create(data);
  }

  async update(id: number, data: UpdateRegistration): Promise<Registration> {
    // TODO: implementar a funcionalidade e as regras de negócio aplicáveis.
    throw new AppError(
      501,
      "NOT_IMPLEMENTED",
      "Funcionalidade ainda não implementada.",
    );
  }

  async delete(id: number): Promise<void> {
    // TODO: implementar a funcionalidade e as regras de negócio aplicáveis.
    throw new AppError(
      501,
      "NOT_IMPLEMENTED",
      "Funcionalidade ainda não implementada.",
    );
  }
}
