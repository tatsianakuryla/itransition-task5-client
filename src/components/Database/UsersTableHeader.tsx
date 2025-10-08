import type { SortColumn, SortDirection } from "../../types/types";

interface UsersTableHeaderProps {
  isAllSelected: boolean;
  isIndeterminate: boolean;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  onSelectAll: (checked: boolean) => void;
  onSort: (column: SortColumn) => void;
}

export const UsersTableHeader = ({
  isAllSelected,
  isIndeterminate,
  sortColumn,
  sortDirection,
  onSelectAll,
  onSort,
}: UsersTableHeaderProps) => {
  const getSortIcon = (column: SortColumn) => {
    if (sortColumn === column) {
      return sortDirection === "asc" ? (
        <i className="bi bi-arrow-up ms-1"></i>
      ) : (
        <i className="bi bi-arrow-down ms-1"></i>
      );
    }
    return <i className="bi bi-arrow-down-up ms-1 text-muted opacity-50"></i>;
  };

  return (
    <thead className="table-light">
      <tr>
        <th scope="col" className="text-center" style={{ width: "50px", minWidth: "50px" }}>
          <input
            type="checkbox"
            className="form-check-input"
            checked={isAllSelected}
            ref={(input) => {
              if (input) {
                input.indeterminate = isIndeterminate;
              }
            }}
            onChange={(event) => onSelectAll(event.target.checked)}
          />
        </th>
        <th
          scope="col"
          className="text-nowrap"
          style={{ cursor: "pointer", userSelect: "none", minWidth: "120px" }}
          onClick={() => onSort("name")}
        >
          Name {getSortIcon("name")}
        </th>
        <th
          scope="col"
          className="text-nowrap"
          style={{ cursor: "pointer", userSelect: "none", minWidth: "180px" }}
          onClick={() => onSort("email")}
        >
          Email {getSortIcon("email")}
        </th>
        <th
          scope="col"
          className="text-nowrap text-center"
          style={{ cursor: "pointer", userSelect: "none", minWidth: "100px" }}
          onClick={() => onSort("status")}
        >
          Status {getSortIcon("status")}
        </th>
        <th
          scope="col"
          className="text-nowrap"
          style={{ cursor: "pointer", userSelect: "none", minWidth: "150px" }}
          onClick={() => onSort("lastLoginTime")}
        >
          Last Login {getSortIcon("lastLoginTime")}
        </th>
        <th
          scope="col"
          className="text-nowrap"
          style={{ cursor: "pointer", userSelect: "none", minWidth: "150px" }}
          onClick={() => onSort("registrationTime")}
        >
          Registration Date {getSortIcon("registrationTime")}
        </th>
      </tr>
    </thead>
  );
};
