import { useState } from "react";
import toast from "react-hot-toast";

import { useDatabase } from "../../hooks/useDatabase";
import type { SortColumn, SortDirection } from "../../types/types";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { Spinner } from "../Spinner/Spinner";
import { Toolbar } from "../Toolbar/Toolbar";
import { ErrorAlert } from "./ErrorAlert";
import { UsersTable } from "./UsersTable";

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

  const handleBlock = () => {
    updateUsersStatusMutation.mutate(
      { ids: selectedIds, status: "BLOCKED" },
      {
        onSuccess: (data) => {
          toast.success(`Successfully blocked ${data.count} user(s)`);
          setSelectedIds([]);
        },
      },
    );
  };

  const handleUnblock = () => {
    updateUsersStatusMutation.mutate(
      { ids: selectedIds, status: "ACTIVE" },
      {
        onSuccess: (data) => {
          toast.success(`Successfully unblocked ${data.count} user(s)`);
          setSelectedIds([]);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteUsersMutation.mutate(
      { ids: selectedIds },
      {
        onSuccess: (data) => {
          toast.success(`Successfully deleted ${data.count} user(s)`);
          setSelectedIds([]);
        },
      },
    );
  };

  const handleDeleteUnverified = () => {
    deleteUnverifiedMutation.mutate(undefined, {
      onSuccess: (data) => {
        toast.success(`Successfully deleted ${data.count} unverified user(s)`);
        setSelectedIds([]);
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <ErrorAlert message={message} isFetching={isFetching} onRetry={() => refetch()} />;
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
      <UsersTable
        users={users}
        selectedIds={selectedIds}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        isFetching={isFetching}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onSort={handleSort}
      />
    </div>
  );
};
