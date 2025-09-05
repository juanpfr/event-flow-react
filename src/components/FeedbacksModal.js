import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import "./Dashboard.css";

export default function FeedbacksModal({ event, onClose }) {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  async function fetchFeedbacks() {
    const { data, error } = await supabase
      .from("feedbacks")
      .select(`
        comentario,
        users ( nome )
      `)
      .eq("event_id", event.id)
      .order("id", { ascending: false });

    if (!error) {
      setFeedbacks(data);
    } else {
      console.error("Erro ao buscar feedbacks:", error);
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Feedbacks do evento: {event.nome}</h3>

        {feedbacks.length > 0 ? (
          <ul className="feedback-list">
            {feedbacks.map((fb, idx) => (
              <li key={idx} className="feedback-item">
                <strong>{fb.users?.nome}:</strong> {fb.comentario}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum feedback enviado ainda.</p>
        )}

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
