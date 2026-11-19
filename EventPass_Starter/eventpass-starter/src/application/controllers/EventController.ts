import { Request, Response } from 'express';
import { z } from 'zod';
import { EventService } from '../../infrastructure/services/event.service.js';

const occupancyParamsSchema = z.object({
  eventId: z.coerce.number().int().positive()
});

export class EventController {
  private eventService = new EventService();

  occupancy = async (req: Request, res: Response) => {
    const { eventId } = occupancyParamsSchema.parse(req.params);
    const occupancyData = await this.eventService.occupancy(eventId);
    return res.status(200).json(occupancyData);
  };
}