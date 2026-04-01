import { useQuery } from "@tanstack/react-query";
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

  const { data: post, isLoading: postLoading } = useQuery<PostData>({
    queryKey: ["post", id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
      if (!res.ok) throw new Error("Post not found");
      return res.json();
    },
    enabled: !!id
  });

  const { data: user, isLoading: userLoading } = useQuery<UserData>({
    queryKey: ["user", post?.userId],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${post?.userId}`);
      if (!res.ok) throw new Error("User not found");
      return res.json();
    },
    enabled: !!post?.userId
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery<CommentData[]>({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
      if (!res.ok) throw new Error("Comments not found");
      return res.json();
    },
    enabled: !!id
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
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          {comments.map((comment) => (
            <div key={comment.id} style={{ background: "var(--card-bg)", padding: 16, borderRadius: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <div style={{ fontWeight: "bold", marginBottom: 8, color: "var(--text)" }}>{comment.name} <span style={{ fontWeight: "normal", color: "var(--muted)", fontSize: 13 }}>({comment.email})</span></div>
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
