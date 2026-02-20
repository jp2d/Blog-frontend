import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import api from "../../../core/axiosConfig";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string;
}

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/Post/GetAllPosts");
        setPosts(response.data);
      } catch (error) {
        console.error("Erro ao buscar posts", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
           
      <div className="container mt-4">
        <h2 className="mb-4">Postagens</h2>
        {posts.length === 0 ? (
          <div className="alert alert-info">Nenhum post encontrado.</div>
        ) : (
          <div>
            {posts.map((post) => (
              <div key={post.id} className="mb-3">
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.content}</p>
                  </div>
                  <div className="card-footer text-muted">
                    Publicado em: {format(new Date(post.createdAt), "dd/MM/yyyy")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostListPage;