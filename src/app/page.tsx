"use client";

import { useEffect, useState } from "react";

interface Media {
  id: number;
  name: string;
  author: string;
  year: number;
  length: string;
}

export default function Home() {
  const [media, setMedia] = useState<Media[]>([]);
  const [selected, setSelected] = useState<Media | null>(null);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/data.json");
        const data: Media[] = await res.json();
        setMedia(data);
      } catch (err) {
        console.error("Error loading media data:", err);
      }
    };

    loadData();
  }, []);

  const handleMediaClick = (id: number) => {
    const selected = media.find((item) => item.id === id);
    setSelected(selected || null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Interesting Media List</h1>
      <ul className="list-group">
        {media.map((media) => (
          <li key={media.id} className="list-group-item list-group-item-action" onClick={() => handleMediaClick(media.id)} style={{ cursor: "pointer" }}>
            {media.name}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="card mt-4">
          <div className="card-body">
            <h5 className="card-title">{selected.name}</h5>
            <p className="card-text">Author: {selected.author}</p>
            <p className="card-text">Year: {selected.year}</p>
            <p className="card-text">Length: {selected.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
