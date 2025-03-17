import { useState } from "react";
import Footer from "../app/components/Footer";
import Header from "../app/components/Header";
import "../app/globals.css";

export default function Home() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, time }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Consulta agendada com sucesso!");
        setName("");
        setDate("");
        setTime("");
      } else {
        alert(`Erro: ${data.message}`);
      }
    } catch (error) {
      alert("Ocorreu um erro ao agendar a consulta.");
    }
  };

  return (
    <><Header /><div className="min-h-screen grid place-items-center bg-background text-foreground p-4 border border-solid border-black">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Agendar uma consulta</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-label="Seu nome"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            aria-label="Data"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            aria-label="Hora"
            className="w-full p-3 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-lg font-semibold cursor-pointer"
          >
            Agendar
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  
  );
}
