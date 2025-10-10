import type { User } from "../../types/types";

interface UsersTableRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
}

const statusClass = (status: User["status"]) => {
  switch (status) {
    case "ACTIVE":
      return "bg-success-subtle text-success-emphasis border border-success-subtle";
    case "BLOCKED":
      return "bg-danger-subtle text-danger-emphasis border border-danger-subtle";
    default:
      return "bg-warning-subtle text-warning-emphasis border border-warning-subtle";
  }
};

export const UsersTableRow = ({ user, isSelected, onSelect }: UsersTableRowProps) => {
  return (
    <tr>
      <td className="text-center">
        <input
          type="checkbox"
          className="form-check-input"
          checked={isSelected}
          onChange={(event) => onSelect(user.id, event.target.checked)}
        />
      </td>

      <td style={{ maxWidth: "200px" }} title={user.name}>
        <div className="text-truncate">{user.name}</div>
      </td>

      <td style={{ maxWidth: "250px" }} title={user.email}>
        <div className="text-truncate">{user.email}</div>
      </td>

      <td className="text-center">
        <span className={`badge rounded-2 px-2 py-1 ${statusClass(user.status)}`}>{user.status}</span>
      </td>

      <td className="text-nowrap">{user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : "Never"}</td>

      <td className="text-nowrap">{new Date(user.registrationTime).toLocaleString()}</td>
    </tr>
  );
};
