import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTiles } from "../data/tiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Subtopic(): JSX.Element {
  const params = useParams();
  const postId = params.id || "";
  const subId = params.subId || "";
  
  const { data: tiles = [], isLoading } = useTiles();
  const queryClient = useQueryClient();
  
  const post = tiles.find((t) => t.id === postId);
  const sub = post?.subtopics?.find((s) => s.id === subId);
  const [expanded, setExpanded] = useState(false);
  
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const addComment = useMutation({
    mutationFn: async (newComment: { author: string; content: string }) => {
      const res = await fetch(`http://localhost:3001/api/local/subtopics/${subId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Blad podczas dodawania komentarza");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["localTiles"] });
      setAuthor("");
      setContent("");
    }
  });

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !content) return;
    addComment.mutate({ author, content });
  };

  if (isLoading) {
    return <section className="container"><h1>Ładowanie...</h1></section>;
  }

  if (!post || !sub) {
    return (
      <section className="container">
        <h1>Nie znaleziono tematu</h1>
        <Link className="backLink" to="/">Wroc</Link>
      </section>
    );
  }

  return (
    <article className="container" style={{ paddingBottom: 60 }}>
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

      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>Komentarze ({sub.comments?.length || 0})</h2>
        
        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, padding: 16, background: 'var(--card-bg)', borderRadius: 10 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>Dodaj komentarz</h3>
          <input 
            type="text" 
            placeholder="Twój podpis" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--card-bg)', outline: 'none', background: 'var(--bg)', color: 'var(--text)' }} 
            required 
          />
          <textarea 
            placeholder="Treść komentarza" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--card-bg)', minHeight: 80, outline: 'none', background: 'var(--bg)', color: 'var(--text)' }} 
            required 
          />
          <button type="submit" disabled={addComment.isPending} style={{ padding: '12px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>
            {addComment.isPending ? "Dodaję..." : "Zapisz komentarz"}
          </button>
        </form>

        {sub.comments && sub.comments.length > 0 && (
          <div>
            {sub.comments.map((c, i) => (
              <div key={i} style={{ marginTop: 12, padding: "12px 16px", background: "var(--card-bg, #f8fafc)", borderRadius: 8, boxShadow: "0 2px 8px rgba(2,6,23,0.03)" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: 'var(--text)' }}>{c.author}</p>
                <p style={{ margin: "4px 0 0", color: "var(--muted, #475569)" }}>{c.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 32 }}>
        <Link className="backLink" to={`/post/${post.id}`}>← Powrot do kategorii</Link>
      </div>
    </article>
  );
}
