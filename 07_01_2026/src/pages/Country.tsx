import React from "react";
import { tiles } from "../data/tiles";

export default function Country(props: { id: string }): JSX.Element {
  const country = tiles.find((t) => t.id === props.id);
  const [expanded, setExpanded] = React.useState(false);

  if (!country) {
    return (
      <section className="container">
        <h1>Nie znaleziono kraju</h1>
        <a href="/" onClick={(e) => { e.preventDefault(); history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}>Wroc</a>
      </section>
    );
  }

  const openSub = (subId: string) => {
    history.pushState({}, "", `/country/${country.id}/${subId}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  return (
    <article className="container">
      <div style={{ marginTop: 12, borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 30px rgba(2,6,23,0.06)" }}>
        <img
          src={country.image}
          alt={country.alt}
          style={{
            width: "100%",
            height: expanded ? 640 : 420,
            objectFit: "cover",
            display: "block",
            cursor: "pointer",
            transition: "height 260ms ease"
          }}
          onClick={() => setExpanded((s) => !s)}
        />
      </div>

      <h1 style={{ marginTop: 18 }}>{country.title}</h1>
      <p style={{ color: "var(--muted)" }}>{country.excerpt}</p>

      <div style={{ marginTop: 18 }}>
        <h2>Tematy</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {(country.subtopics || []).map((s) => (
            <div
              key={s.id}
              style={{
                background: "var(--card-bg)",
                padding: 12,
                borderRadius: 10,
                boxShadow: "0 8px 20px rgba(2,6,23,0.04)",
                cursor: "pointer"
              }}
              onClick={() => openSub(s.id)}
            >
              <h3 style={{ margin: 0 }}>{s.title}</h3>
              <p style={{ margin: "8px 0 0", color: "var(--muted)" }}>{s.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <a href="/" onClick={(e) => { e.preventDefault(); history.pushState({}, "", "/"); window.dispatchEvent(new PopStateEvent("popstate")); }}>← Powrot</a>
      </div>
    </article>
  );
}
