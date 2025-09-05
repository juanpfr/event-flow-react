import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";
import EventForm from "./EventForm";
import EditEventForm from "./EditEventForm";
import RegistrationsTable from "./RegistrationsTable";
import FeedbacksModal from "./FeedbacksModal"; 
import "./Dashboard.css";

export default function Dashboard() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showFeedbacksEvent, setShowFeedbacksEvent] = useState(null);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  async function fetchMyEvents() {
    const user = (await supabase.auth.getUser()).data.user;
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("organizer_id", user.id);
    if (!error) setEvents(data);
  }

  async function handleDeleteEvent(eventId) {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este evento?");
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("events")
      .delete()
      .eq("id", eventId);

    if (!error) {
      setEvents(events.filter((ev) => ev.id !== eventId)); // remove da tela sem precisar recarregar
    } else {
      alert("Erro ao excluir evento");
    }
  }

  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Meu Dashboard</h2>
        <EventForm onSaved={fetchMyEvents} />

        <h3 className="dashboard-subtitle">Meus Eventos</h3>
        <div className="events-grid">
          {events.map((ev) => (
            <div key={ev.id} className="event-card">
              <h3 className="event-card-title">{ev.nome}</h3>
              <p className="event-card-desc">{ev.descricao}</p>
              <p><b>Data:</b> {ev.data}</p>
              <p><b>Local:</b> {ev.local}</p>
              <p><b>Capacidade:</b> {ev.capacidade}</p>

              <div className="event-actions">
                <button onClick={() => setEditingEvent(ev)} className="event-btn">
                  Editar evento
                </button>
                <button onClick={() => setSelectedEvent(ev)} className="event-btn">
                  Ver inscritos
                </button>
                <button onClick={() => setShowFeedbacksEvent(ev)} className="event-btn">
                  Ver feedbacks
                </button>
                <button 
                  onClick={() => handleDeleteEvent(ev.id)} 
                  className="event-btn delete-btn"
                >
                  Excluir evento
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Formulário de edição */}
        {editingEvent && (
          <EditEventForm
            event={editingEvent}
            onClose={() => setEditingEvent(null)}
            onUpdated={fetchMyEvents}
          />
        )}

        {/* Tabela de inscritos */}
        {selectedEvent && (
          <RegistrationsTable
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}

        {/* Feedbacks */}
        {showFeedbacksEvent && (
          <FeedbacksModal
            event={showFeedbacksEvent}
            onClose={() => setShowFeedbacksEvent(null)}
          />
        )}
      </div>
    </div>
  );
}
