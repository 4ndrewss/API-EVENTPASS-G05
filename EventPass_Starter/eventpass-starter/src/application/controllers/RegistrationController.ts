import type { Request, Response } from "express";
import {
  registrationIdParamSchema,
  updateRegistrationSchema,
} from "../validators/registration.schemas.js";
import { RegistrationService } from "../../infrastructure/services/registration.service.js";

export class RegistrationController {
  private service = new RegistrationService();

  create = async (req: Request, res: Response): Promise<void> => {
    const { z } = await import("zod");

    const schema = z
      .object({
        attendeeId: z.number().int().positive(),
        sessionId: z.number().int().positive(),
      })
      .strict();

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        error: "VALIDATION_ERROR",
        message: "Body inválido.",
        details: parsed.error.issues,
      });
      return;
    }

    const registration = await this.service.create(parsed.data);
    res.status(201).json(registration);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const { id } = registrationIdParamSchema.parse(req.params);
    const data = updateRegistrationSchema.parse(req.body);

    const registration = await this.service.update(id, data);
    res.status(200).json(registration);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    res.status(501).json({
      error: "NOT_IMPLEMENTED",
      message: "Endpoint ainda não implementado.",
    });
  };
}