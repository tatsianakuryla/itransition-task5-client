import type { User } from "../../types/types";

interface UsersTableRowProps {
  user: User;
  isSelected: boolean;
  onSelect: (id: number, checked: boolean) => void;
}

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
        <span
          className={`badge ${
            user.status === "ACTIVE" ? "bg-success" : user.status === "BLOCKED" ? "bg-danger" : "bg-warning"
          }`}
        >
          {user.status}
        </span>
      </td>
      <td className="text-nowrap">{user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : "Never"}</td>
      <td className="text-nowrap">{new Date(user.registrationTime).toLocaleString()}</td>
    </tr>
  );
};
