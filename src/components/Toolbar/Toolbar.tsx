interface ToolbarProps {
  selectedCount: number;
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
  onDeleteUnverified: () => void;
}

export const Toolbar = ({ selectedCount, onBlock, onUnblock, onDelete, onDeleteUnverified }: ToolbarProps) => {
  const base =
    "btn bg-secondary-subtle text-secondary rounded-2 px-3 py-2 " +
    "border border-1 border-secondary focus-ring focus-ring-secondary";

  const disabled = selectedCount === 0;

  return (
    <div className="d-flex gap-2 align-items-center mb-3">
      <button className={base} onClick={onBlock} disabled={disabled} title="Block selected users">
        <i className="bi bi-person-slash" />
      </button>

      <button className={base} onClick={onUnblock} disabled={disabled} title="Unblock selected users">
        <i className="bi bi-unlock-fill" />
      </button>

      <button className={base} onClick={onDelete} disabled={disabled} title="Delete selected users">
        <i className="bi bi-trash-fill" />
      </button>

      <button className={base} onClick={onDeleteUnverified} title="Delete all unverified users">
        <i className="bi bi-eraser" />
      </button>
    </div>
  );
};
