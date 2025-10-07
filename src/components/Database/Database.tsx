import { useState } from "react";

import { useDatabase } from "../../hooks/useDatabase";
import type { SortColumn, SortDirection } from "../../types/types";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { Spinner } from "../Spinner/Spinner";
import { Toolbar } from "../Toolbar/Toolbar";

export const Database = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortColumn, setSortColumn] = useState<SortColumn>("lastLoginTime");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const sortParams = { sortBy: sortColumn, order: sortDirection };
  const { getUsersQuery, updateUsersStatusMutation, deleteUsersMutation, deleteUnverifiedMutation } =
    useDatabase(sortParams);
  const { data, isError, error, refetch, isFetching, isLoading } = getUsersQuery;
  const message = error instanceof Error ? error.message : "Failed to load users";
  const users = data || [];

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

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

  const handleBlock = () => {
    updateUsersStatusMutation.mutate({ ids: selectedIds, status: "BLOCKED" });
  };

  const handleUnblock = () => {
    updateUsersStatusMutation.mutate({ ids: selectedIds, status: "ACTIVE" });
  };

  const handleDelete = () => {
    deleteUsersMutation.mutate({ ids: selectedIds });
  };

  const handleDeleteUnverified = () => {
    deleteUnverifiedMutation.mutate();
  };

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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <LogoutButton />
      </div>
      <Toolbar
        selectedCount={selectedIds.length}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        onDelete={handleDelete}
        onDeleteUnverified={handleDeleteUnverified}
      />
      <div className="table-responsive" style={{ position: "relative" }}>
        {isFetching && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10,
            }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <table
          className="table table-striped table-hover"
          style={{ transition: "opacity 0.2s", opacity: isFetching ? 0.5 : 1 }}
        >
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
              <th scope="col" style={{ cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("name")}>
                Name {sortColumn === "name" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th scope="col" style={{ cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("email")}>
                Email {sortColumn === "email" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th scope="col" style={{ cursor: "pointer", userSelect: "none" }} onClick={() => handleSort("status")}>
                Status {sortColumn === "status" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => handleSort("lastLoginTime")}
              >
                Last Login {sortColumn === "lastLoginTime" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
              <th
                scope="col"
                style={{ cursor: "pointer", userSelect: "none" }}
                onClick={() => handleSort("registrationTime")}
              >
                Registration Date {sortColumn === "registrationTime" && (sortDirection === "asc" ? "↑" : "↓")}
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-muted">
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
                  <td>{user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : "Never"}</td>
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
