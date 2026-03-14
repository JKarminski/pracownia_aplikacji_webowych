import React from "react";
import { useParams, Link } from "react-router-dom";
import { tiles } from "../data/tiles";

export default function Subtopic(): JSX.Element {
  const params = useParams();
  const postId = params.id || "";
  const subId = params.subId || "";
  const post = tiles.find((t) => t.id === postId);
  const sub = post?.subtopics?.find((s) => s.id === subId);
  const [expanded, setExpanded] = React.useState(false);

  if (!post || !sub) {
    return (
      <section className="container">
        <h1>Nie znaleziono tematu</h1>
        <Link className="backLink" to="/">Wroc</Link>
      </section>
    );
  }

  return (
    <article className="container">
      <div style={{ marginTop: 12, borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 30px rgba(2,6,23,0.06)" }}>
        {sub.image && (
          <img
            src={sub.image}
            alt={sub.title}
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
        )}
      </div>

      <p style={{ marginTop: 8, fontSize: "14px", color: "var(--muted, gray)" }}>
        Dodane przez: {sub.user_name}
      </p>

      <h1 style={{ marginTop: 18 }}>{sub.title}</h1>
      <p style={{ color: "var(--muted)" }}>{sub.excerpt}</p>

      <div style={{ marginTop: 16 }}>
        {sub.facts.map((f, i) => (
          <div key={i} style={{ background: "var(--card-bg)", padding: 12, borderRadius: 8, marginBottom: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
            <p style={{ margin: 0 }}>{f}</p>
          </div>
        ))}
      </div>

      {sub.comments && sub.comments.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Komentarze</h2>
          {sub.comments.map((c, i) => (
            <div key={i} style={{ marginTop: 12, padding: "12px 16px", background: "var(--card-bg, #f8fafc)", borderRadius: 8, boxShadow: "0 2px 8px rgba(2,6,23,0.03)" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "14px" }}>{c.author}</p>
              <p style={{ margin: "4px 0 0", color: "var(--muted, #475569)" }}>{c.content}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 32 }}>
        <Link className="backLink" to={`/post/${post.id}`}>← Powrot do kategorii</Link>
      </div>
    </article>
  );
}
