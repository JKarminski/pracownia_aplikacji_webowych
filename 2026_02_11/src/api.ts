import { tiles } from "./data/tiles";
import type { Tile, Subtopic } from "./data/tiles";
import { homeTiles } from "./data/HomeTiles";
import type { HomeTile } from "./data/HomeTiles";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchHomeTiles = async (): Promise<HomeTile[]> => {
  await delay(400);
  return homeTiles;
};

export const fetchPosts = async (): Promise<Tile[]> => {
  await delay(400);
  return tiles;
};

export const fetchPostById = async (id: string): Promise<Tile> => {
  await delay(400);
  const post = tiles.find((t) => t.id === id);
  if (!post) throw new Error("Post not found");
  return post;
};

export const fetchSubtopics = async (): Promise<(Subtopic & { parentId: string, parentTitle: string })[]> => {
  await delay(400);
  return tiles.flatMap((t) =>
    (t.subtopics || []).map((s) => ({
      parentId: t.id,
      parentTitle: t.title,
      id: s.id,
      title: s.title,
      excerpt: s.excerpt,
      image: s.image,
      facts: s.facts,
      user_name: s.user_name,
      comments: s.comments
    }))
  );
};

export const fetchSubtopicById = async (postId: string, subId: string): Promise<(Subtopic & { post: Tile })> => {
  await delay(400);
  const post = tiles.find((t) => t.id === postId);
  if (!post) throw new Error("Post not found");
  const sub = post.subtopics?.find((s) => s.id === subId);
  if (!sub) throw new Error("Subtopic not found");
  return { ...sub, post };
};
