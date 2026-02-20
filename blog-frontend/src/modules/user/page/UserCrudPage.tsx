import React, { useEffect, useState } from "react";
import api from "../../../core/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

interface User {
  id: number;
  name: string;
  email: string;
  role: number; 
}

const UserCrudPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(2); 

  // Carregar usuários
  const loadUsers = async () => {
    try {
      const response = await api.get("/User/GetAllUsers");
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  
  const handleCreate = async () => {
    try {
      await api.post("/User/CreateUser", {
        name,
        email,
        password,
        role,
      });
      alert("Usiário criado com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setRole(2);
      loadUsers();
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };


  const handleUpdate = async () => {
    if (!selectedUser) return;
    try {
      await api.put("/User/UpdateUser", {
        id: selectedUser.id,
        name,
        email,
        role,
      });
      alert("Usiário atualizado com sucesso!");
      setSelectedUser(null);
      setName("");
      setEmail("");
      setRole(2);
      loadUsers();
    } catch (error) {
      console.error("Erro ao atualizar usuário", error);
    }
  };

  
  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este usuário?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/User/DeleteUser/${id}`);
      loadUsers();
    } catch (error) {
      console.error("Erro ao excluir usuário", error);
    }
  };

  
  const handleEdit = async (id: number) => {
    try {
      const response = await api.get(`/User/GetUserById/${id}`);
      setSelectedUser(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setRole(response.data.role);
    } catch (error) {
      console.error("Erro ao buscar usuário", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Gerenciar Usuários</h2>

      <button
        className="btn btn-primary mb-3"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
        onClick={() => {
          setName("");
          setEmail("");
          setPassword("");
          setRole(2);
        }}
      >
        Inserir Usuário
      </button>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Perfil</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === 1 ? "Admin" : "User"}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => handleEdit(user.id)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user.id)}
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
              <h5 className="modal-title">Novo Usuário</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
                <label className="label">Nome</label>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="label">E-mail</label>
              <input
                type="email"
                className="form-control mb-2"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="label">Senha</label>
              <input
                type="password"
                className="form-control mb-2"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="label">Perfil</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select>
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

      <div className="modal fade" id="editModal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Usuário</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(Number(e.target.value))}
              >
                <option value={1}>Admin</option>
                <option value={2}>User</option>
              </select>
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

export default UserCrudPage;