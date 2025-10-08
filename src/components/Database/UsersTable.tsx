import type { SortColumn, SortDirection, User } from "../../types/types";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableRow } from "./UsersTableRow";

interface UsersTableProps {
  users: User[];
  selectedIds: number[];
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  isFetching: boolean;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: number, checked: boolean) => void;
  onSort: (column: SortColumn) => void;
}

export const UsersTable = ({
  users,
  selectedIds,
  sortColumn,
  sortDirection,
  isFetching,
  onSelectAll,
  onSelectOne,
  onSort,
}: UsersTableProps) => {
  const isAllSelected = users.length > 0 && selectedIds.length === users.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < users.length;

  return (
    <div className="table-responsive-md" style={{ position: "relative" }}>
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
        className="table table-striped table-hover table-sm table-bordered"
        style={{ transition: "opacity 0.2s", opacity: isFetching ? 0.5 : 1, minWidth: "100%" }}
      >
        <UsersTableHeader
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          onSelectAll={onSelectAll}
          onSort={onSort}
        />
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UsersTableRow
                key={user.id}
                user={user}
                isSelected={selectedIds.includes(user.id)}
                onSelect={onSelectOne}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
