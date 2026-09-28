import { useNavigate } from "react-router-dom";
import permissions from "./permissions";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    atob(token.split(".")[1])
  );

  const userPermissions = permissions[user.role];

  const canCreate = userPermissions.includes("create");
  const canEdit = userPermissions.includes("edit");
  const canDelete = userPermissions.includes("delete");

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome, {user.username}</h2>

      <p>
        Role: <strong>{user.role}</strong>
      </p>

      <hr />

      <h3>Available Actions</h3>

      {canCreate && (
        <button onClick={() => alert("Create Post")}>
          Create Post
        </button>
      )}

      {canEdit && (
        <button onClick={() => alert("Edit Post")}>
          Edit Post
        </button>
      )}

      {canDelete && (
        <button onClick={() => alert("Delete Post")}>
          Delete Post
        </button>
      )}

      <button onClick={() => navigate("/profile")}>
        Profile
      </button>
    </div>
  );
}

export default Dashboard;