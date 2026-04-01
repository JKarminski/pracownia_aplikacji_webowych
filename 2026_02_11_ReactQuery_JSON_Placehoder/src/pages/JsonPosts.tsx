import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export default function JsonPosts() {
  const { data: posts = [], isLoading: loading } = useQuery<PostData[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!res.ok) throw new Error("Network error");
      return res.json();
    }
  });

  return (
    <section className="container" style={{ paddingBottom: 60 }}>
      <h1>Posty API</h1>
      <p>Lista postów z JSONPlaceholder. Kliknij, aby przejsc do tematu.</p>

      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {posts.map((post) => (
            <Link key={post.id} to={`/json-post/${post.id}`} style={{ textDecoration: "none", display: "flex" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                  background: "var(--card-bg)",
                  padding: 20,
                  borderRadius: 12,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  transition: "transform 220ms ease, box-shadow 220ms ease"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "none";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 8 }}>{post.title}</div>
                  <div style={{ color: "var(--muted)", fontSize: 14, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.5 }}>{post.body}</div>
                </div>
                <div style={{ color: "var(--accent)", fontSize: 13, marginTop: "auto", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  User ID: {post.userId}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
