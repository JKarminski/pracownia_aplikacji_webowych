import React from "react";
import { Link } from "react-router-dom";
import { tiles } from "../data/tiles";

function flattenSubtopics() {
  return tiles.flatMap((t) =>
    (t.subtopics || []).map((s) => ({
      parentId: t.id,
      parentTitle: t.title,
      id: s.id,
      title: s.title,
      excerpt: s.excerpt,
      image: s.image
    }))
  );
}

export default function Categories(): JSX.Element {
  const subs = flattenSubtopics();

  return (
    <section className="container">
      <h1>Kategorie</h1>
      <p>Lista podkategorii. Kliknij, aby przejsc do tematu.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {subs.map((s) => (
          <Link key={s.id} to={`/post/${s.parentId}/${s.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                background: "var(--card-bg)",
                padding: 10,
                borderRadius: 10,
                boxShadow: "0 8px 20px rgba(2,6,23,0.04)",
                cursor: "pointer"
              }}
            >
              {s.image && (
                <div style={{ width: 72, height: 56, overflow: "hidden", borderRadius: 8, flexShrink: 0 }}>
                  <img src={s.image} alt={s.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{s.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{s.excerpt}</div>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>{s.parentTitle}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
