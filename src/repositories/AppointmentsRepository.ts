import Appointment from "../models/Appointment";
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository{
    private appoitments: Appointment[];

    constructor(){
        this.appoitments = [];
    }

    public all(){
        return this.appoitments;
    }

    public findBydate(date: Date): Appointment | null{
        const findAppointment = this.appoitments.find(appoitment=>isEqual(date,appoitment.date));

        return findAppointment || null;
    }

    public create({provider, date}: CreateAppointmentDTO): Appointment{
        const appoitment = new Appointment({provider,date});

        this.appoitments.push(appoitment);

        return appoitment;
    }
}

export default AppointmentsRepository;
