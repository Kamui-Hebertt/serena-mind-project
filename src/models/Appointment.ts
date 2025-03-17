import mongoose, { Document, Schema, Model } from "mongoose";

interface IAppointment extends Document {
  name: string;
  date: string;
  time: string;
}

const AppointmentSchema = new Schema<IAppointment>({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

const AppointmentModel: Model<IAppointment> =
  mongoose.models.Appointment || mongoose.model<IAppointment>("Appointment", AppointmentSchema);

export default AppointmentModel;
