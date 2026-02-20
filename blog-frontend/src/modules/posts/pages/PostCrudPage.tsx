import React, { useEffect, useState } from "react";
import api from "../../../core/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const storedProfile = localStorage.getItem("profile");
const profile = storedProfile ? JSON.parse(storedProfile) : null;

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
}

const PostCrudPage: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const loadPosts = async () => {
        try {
            const response = await api.get(`/Post/GetAllPostsByAuthorId/${profile?.id}`);
            setPosts(response.data);
        } catch (error) {
            console.error("Erro ao carregar posts", error);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const handleCreate = async () => {
        try {
            await api.post("/Post/CreatePost", {
                title: title,
                content: content,
                userId: profile?.id
            });
            alert("Post criado com sucesso!");
            setTitle("");
            setContent("");
            loadPosts();
        } catch (error) {
            console.error("Erro ao criar post", error);
        }
    };

    const handleUpdate = async () => {
        if (!selectedPost) return;
        try {
            await api.put(`/Post/UpdatePost`, {
                id: selectedPost.id,
                title: title,
                content: content,
                userId: profile?.id,
                createdAt: selectedPost.createdAt
            });
            alert("Post atualizado com sucesso!");
            setSelectedPost(null);
            setTitle("");
            setContent("");
            loadPosts();
        } catch (error) {
            console.error("Erro ao atualizar post", error);
        }
    };

    const handleDelete = async (id: number) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este post?");
        if (!confirmDelete) return;

        try {
            await api.delete(`/Post/DeletePost/${id}`);
            loadPosts();
        } catch (error) {
            console.error("Erro ao excluir post", error);
        }
    };

    const handleView = async (id: number) => {
        try {
            const response = await api.get(`/Post/GetPostById/${id}`);
            setSelectedPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar post", error);
        }
    };

    const handleEdit = async (id: number) => {
        try {
            const response = await api.get(`/Post/GetPostById/${id}`);
            setSelectedPost(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
        } catch (error) {
            console.error("Erro ao buscar post", error);
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gerenciar Posts</h2>

            <button
                className="btn btn-primary mb-3"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
                onClick={() => {
                    setTitle("");
                    setContent("");
                }}
            >
                Inserir Post
            </button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {posts
                        .sort(
                            (a, b) =>
                                new Date(b.createdAt).getTime() -
                                new Date(a.createdAt).getTime()
                        )
                        .map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{new Date(post.createdAt).toLocaleString()}</td>
                                <td>
                                    <button
                                        className="btn btn-info btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#viewModal"
                                        onClick={() => handleView(post.id)}
                                    >
                                        Visualizar
                                    </button>
                                    <button
                                        className="btn btn-warning btn-sm me-2"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                        onClick={() => handleEdit(post.id)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(post.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="modal fade" id="createModal" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Novo Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="form-control"
                                placeholder="Conteúdo"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                onClick={handleCreate}
                                data-bs-dismiss="modal"
                            >
                                Criar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="viewModal" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Visualizar Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <h6>{title}</h6>
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="editModal" tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Editar Post</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                className="form-control mb-2"
                                placeholder="Título"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <textarea
                                className="form-control"
                                placeholder="Conteúdo"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-warning"
                                onClick={handleUpdate}
                                data-bs-dismiss="modal"
                            >
                                Atualizar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCrudPage;