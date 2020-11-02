//Cria os appointments
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {startOfHour} from 'date-fns';


interface Request{
    provider: string;
    date: Date;
}



//Todo Service possui apenas um método
class CreateAppointmentService{
    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository) {
        this.appointmentsRepository = appointmentsRepository;
    }


    public execute({provider,date}: Request): Appointment{
        const appointmentDate = startOfHour(date);

        const findAppointmentInSameDate =this.appointmentsRepository.findBydate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error("This appointment is already booked");
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }

}

export default CreateAppointmentService;
