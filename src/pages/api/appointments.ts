import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../app/lib/mongodb";
import Appointment from "../../models/Appointment";
import { Appointment as AppointmentType } from "../../types/appointment";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  try {
    await connectToDatabase();

    const { name, date, time } = req.body;

    // Converter strings para objetos de data
    const appointmentDate = new Date(date);
    const appointmentTime = parseInt(time.split(":")[0], 10); // Pega apenas a hora

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove horas para comparar só a data

    // 🔴 Regra 1: Não pode agendar para o dia atual ou passado
    if (appointmentDate <= today) {
      return res.status(400).json({ message: "Não é possível agendar para hoje ou para datas passadas!" });
    }

    // 🔴 Regra 2: Se o dia for no futuro, só pode agendar entre 9h e 19h
    if (appointmentTime < 9 || appointmentTime >= 19) {
      return res.status(400).json({ message: "Horário inválido! Agendamentos apenas entre 09:00 e 19:00." });
    }

    // 🔴 Regra 3: Impedir horários duplicados
    const existingAppointment = await Appointment.findOne({ date, time });

    if (existingAppointment) {
      return res.status(400).json({ message: "Este horário já está agendado!" });
    }

    // Criar novo agendamento
    const newAppointment = new Appointment({ name, date, time });
    await newAppointment.save();

    res.status(201).json({ message: "Consulta agendada com sucesso!", appointment: newAppointment });

  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
}
