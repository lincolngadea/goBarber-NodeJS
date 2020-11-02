import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppoitmensRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentRepository = new AppoitmensRepository();

appointmentRouter.get('/',(request, response)=>{
    const appointment = appointmentRepository.all();

    return response.json(appointment);
});

appointmentRouter.post('/',(request, response)=>{
    try{
        const {provider, date} = request.body;

        const parsedDate = parseISO(date);

        const createAppointment = new CreateAppointmentService(appointmentRepository);

        const appointment = createAppointment.execute({provider,date:parsedDate});

        return response.json(appointment);
        }catch(err){
            return response.status(400).json({error: err.message});
        }
});

export default appointmentRouter;
