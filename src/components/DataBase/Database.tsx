import { useState } from "react";

import { useUsers } from "../../hooks/useUsers";
import { Spinner } from "../Spinner";

export const Database = () => {
  const { getUsersQuery } = useUsers();
  const { data, isError, error, refetch, isFetching, isLoading } = getUsersQuery;
  const message = error instanceof Error ? error.message : "Failed to load users";
  const users = data || [];
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(users.map((user) => user.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < users.length;

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
        <div>
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {message}
        </div>
        <button className="btn btn-danger btn-sm" onClick={() => refetch()} disabled={isFetching}>
          {isFetching ? "Retrying..." : "Try again"}
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col" style={{ width: "50px" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) {
                      input.indeterminate = isIndeterminate;
                    }
                  }}
                  onChange={(event) => handleSelectAll(event.target.checked)}
                />
              </th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={selectedIds.includes(user.id)}
                      onChange={(event) => handleSelectOne(user.id, event.target.checked)}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        user.status === "ACTIVE" ? "bg-success" : user.status === "BLOCKED" ? "bg-danger" : "bg-warning"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td>{new Date(user.registrationTime).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
