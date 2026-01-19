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

      <h1 style={{ marginTop: 18 }}>{sub.title}</h1>
      <p style={{ color: "var(--muted)" }}>{sub.excerpt}</p>

      <div style={{ marginTop: 16 }}>
        {sub.facts.map((f, i) => (
          <div key={i} style={{ background: "var(--card-bg)", padding: 12, borderRadius: 8, marginBottom: 10, boxShadow: "0 6px 18px rgba(2,6,23,0.04)" }}>
            <p style={{ margin: 0 }}>{f}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20 }}>
        <Link className="backLink" to={`/post/${post.id}`}>← Powrot do kategorii</Link>
      </div>
    </article>
  );
}
