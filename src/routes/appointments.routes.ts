import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppoitmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    // console.log(request.user);
    const appointmentRepository = getCustomRepository(AppoitmentsRepository);
    const appointment = await appointmentRepository.find();

    return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
