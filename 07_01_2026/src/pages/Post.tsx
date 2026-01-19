import React from "react";
import { useParams, Link } from "react-router-dom";
import { tiles } from "../data/tiles";

export default function Post(): JSX.Element {
  const params = useParams();
  const id = params.id || "";
  const post = tiles.find((p) => p.id === id);
  const [expanded, setExpanded] = React.useState(false);

  if (!post) {
    return (
      <section className="container">
        <h1>Wpis nie znaleziony</h1>
        <Link className="backLink" to="/">Wroc</Link>
      </section>
    );
  }

  return (
    <article className="container">
      <div style={{ marginTop: 12, borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 30px rgba(2,6,23,0.06)" }}>
        <img
          src={post.image}
          alt={post.alt}
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

      <h1 style={{ marginTop: 18 }}>{post.title}</h1>
      <p style={{ color: "var(--muted)" }}>{post.excerpt}</p>

      <div style={{ marginTop: 18 }}>
        <h2>Kategorie</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {(post.subtopics || []).map((s) => (
            <Link key={s.id} to={`/post/${post.id}/${s.id}`} style={{ textDecoration: "none" }}>
              <div className="tile-card" role="button" tabIndex={0}>
                {s.image && (
                  <div className="tile-image">
                    <img src={s.image} alt={s.title} />
                  </div>
                )}
                <div className="tile-body">
                  <h3 style={{ margin: 0 }}>{s.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)" }}>{s.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Link className="backLink" to="/">← Powrot</Link>
      </div>
    </article>
  );
}
