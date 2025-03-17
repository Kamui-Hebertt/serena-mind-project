import mongoose, { Document, Schema } from "mongoose";
import { Appointment } from "../../types/appointment";

interface AppointmentDocument extends Appointment, Document {}

const AppointmentSchema = new Schema<AppointmentDocument>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.models.Appointment ||
  mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);
