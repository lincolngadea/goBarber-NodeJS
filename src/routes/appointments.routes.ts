import { Router } from 'express';
import { uuid } from 'uuidv4';
import {startOfHour, parseISO, isEqual} from 'date-fns';

const appointmentRouter = Router();

interface Appointment{
    id: string;
    provider: string;
    date: Date;
}

const appoitments: Appointment[] = [];

/** Exemplo do redirecionamento de roda criado no server ts apontando para o appointmentRouter */
appointmentRouter.post('/',(request, response)=>{
    const {provider, date} = request.body;

    const parseDate = startOfHour(parseISO(date));

    const findAppointmentInSameDate = appoitments.find(appoitment=>isEqual(parseDate,appoitment.date));

    if(findAppointmentInSameDate){
        return response
            .status(400)
            .json({message:"This appointment is already booked"});
    }

    const appoitment = {
        id:uuid(),
        provider,
        date: parseDate,
    }

    appoitments.push(appoitment);

    return response.json(appoitment);
})

export default appointmentRouter;
