import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface UserData {
  name: string;
  email: string;
  website: string;
}

interface CommentData {
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function JsonPostDetails() {
  const params = useParams();
  const id = params.id || "";
  const queryClient = useQueryClient();

  const [commentName, setCommentName] = useState("");
  const [commentBody, setCommentBody] = useState("");

  const { data: post, isLoading: postLoading } = useQuery<PostData>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/json/posts/${id}`);
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!id
  });

  const { data: user, isLoading: userLoading } = useQuery<UserData>({
    queryKey: ["user", post?.userId],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/json/users/${post?.userId}`);
      if (!res.ok) throw new Error("User not found");
      return res.json();
    },
    enabled: !!post?.userId
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery<CommentData[]>({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await fetch(`http://localhost:3001/api/json/posts/${id}/comments`);
      if (!res.ok) throw new Error("Comments not found");
      return res.json();
    },
    enabled: !!id
  });

  const addComment = useMutation({
    mutationFn: async (newComment: { name: string; body: string }) => {
      const res = await fetch(`http://localhost:3001/api/json/posts/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newComment),
      });
      if (!res.ok) throw new Error("Blad zapisu komentarza");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setCommentName("");
      setCommentBody("");
    }
  });

  const loading = postLoading || userLoading || commentsLoading;

  if (loading) {
    return (
      <section className="container" style={{ paddingBottom: 60 }}>
        <h1>Ładowanie...</h1>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="container" style={{ paddingBottom: 60 }}>
        <h1>Wpis nie znaleziony</h1>
        <Link className="backLink" to="/json-posts">Wroc</Link>
      </section>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName || !commentBody) return;
    addComment.mutate({ name: commentName, body: commentBody });
  };

  return (
    <article className="container" style={{ paddingBottom: 60 }}>
      <h1 style={{ marginTop: 18 }}>{post.title}</h1>

      {user && (
        <div style={{ marginBottom: 24, padding: "12px 16px", background: "var(--card-bg)", borderRadius: 8, display: "inline-block" }}>
          <div style={{ fontWeight: "bold", color: "var(--text)" }}>Autor: {user.name}</div>
          <div style={{ color: "var(--accent)", fontSize: 13 }}>{user.email} | {user.website}</div>
        </div>
      )}

      <div style={{ fontSize: 16, lineHeight: 1.6, marginBottom: 32, color: "var(--muted)" }}>
        {post.body}
      </div>

      <hr style={{ borderColor: "var(--card-bg)", opacity: 0.5, marginBottom: 32 }} />

      <div style={{ marginTop: 18 }}>
        <h2>Komentarze ({comments.length})</h2>

        <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24, padding: 16, background: 'var(--card-bg)', borderRadius: 10 }}>
          <h3 style={{ margin: 0, fontSize: 16 }}>Dodaj komentarz</h3>
          <input
            type="text"
            placeholder="Twój podpis"
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--card-bg)', outline: 'none', background: 'var(--bg)', color: 'var(--text)' }}
            required
          />
          <textarea
            placeholder="Treść komentarza"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            style={{ padding: '10px 14px', borderRadius: 6, border: '1px solid var(--card-bg)', minHeight: 80, outline: 'none', background: 'var(--bg)', color: 'var(--text)' }}
            required
          />
          <button type="submit" disabled={addComment.isPending} style={{ padding: '12px', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>
            {addComment.isPending ? "Dodaję..." : "Zapisz komentarz"}
          </button>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ background: "var(--card-bg)", padding: 16, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ fontWeight: "bold", marginBottom: 8, color: "var(--text)" }}>{comment.name} <span style={{ fontWeight: "normal", color: "var(--muted)", fontSize: 13 }}>({comment.email || 'brak emaila'})</span></div>
              <p style={{ margin: 0, color: "var(--text)", fontSize: 14 }}>{comment.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 32 }}>
        <Link className="backLink" to="/json-posts">← Powrot do listy postow API</Link>
      </div>
    </article>
  );
}
