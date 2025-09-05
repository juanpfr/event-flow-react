import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import Header from "./Header";
import "./Home.css";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { data, error } = await supabase
      .from("events")
      .select(
        "id, nome, data, local, descricao, capacidade, users(nome), feedbacks(comentario, users(nome))"
      ) // ✅ só pega 3 eventos

    if (error) {
      console.error(error);
    } else {
      setEvents(data);
    }
  }

  return (
    <div className="home">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Bem-vindo ao <span>EventFlow</span> 🎉
          </h1>
          <p>
            Gerencie seus eventos com facilidade. Participe, dê feedbacks e acompanhe
            tudo em um só lugar.
          </p>
          <a href="/signup" className="cta-button">
            Começar Agora
          </a>
        </div>
      </section>

      {/* Eventos */}
      <main className="events-section">
        <h2 className="section-title">Eventos Públicos</h2>
        <div className="events-grid">
          {events.map((ev) => (
            <div key={ev.id} className="event-card">
              <div className="event-header">
                <h3>{ev.nome}</h3>
                <p className="event-organizer">🎤 {ev.users?.nome}</p>
              </div>

              <div className="event-info">
                <p><b>📅</b> {ev.data}</p>
                <p><b>📍</b> {ev.local}</p>
                <p><b>👥</b> {ev.capacidade} pessoas</p>
              </div>

              <p className="descricao">{ev.descricao}</p>

              {/* Feedbacks */}
              {ev.feedbacks?.length > 0 && (
                <div className="feedbacks">
                  <h4>Feedbacks recentes:</h4>
                  <ul>
                    {ev.feedbacks.slice(0, 3).map((fb, i) => (
                      <li key={i}>
                        <span className="comentario">"{fb.comentario}"</span> —{" "}
                        <b>{fb.users?.nome || "Anônimo"}</b>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>
            © {new Date().getFullYear()} EventFlow. Todos os direitos reservados.
          </p>
          <nav>
            <a href="/">Início</a>
            <a href="/events">Eventos</a>
            <a href="/login">Login</a>
            <a href="/signup">Cadastro</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
