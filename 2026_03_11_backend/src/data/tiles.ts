import { useQuery } from '@tanstack/react-query';

export type Subtopic = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  facts: string[];
  user_name: string;
  comments?: { author: string; content: string }[];
};

export type Tile = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  alt: string;
  subtopics?: Subtopic[];
};

export function useTiles() {
  return useQuery<Tile[]>({
    queryKey: ['localTiles'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/api/local/tiles');
      if (!res.ok) throw new Error('Failed to fetch tiles');
      return res.json();
    }
  });
}

