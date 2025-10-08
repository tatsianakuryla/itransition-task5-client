interface ToolbarProps {
  selectedCount: number;
  onBlock: () => void;
  onUnblock: () => void;
  onDelete: () => void;
  onDeleteUnverified: () => void;
}

export const Toolbar = ({ selectedCount, onBlock, onUnblock, onDelete, onDeleteUnverified }: ToolbarProps) => {
  return (
    <div className="d-flex gap-2 align-items-center mb-3">
      <button className="btn btn-warning" onClick={onBlock} disabled={selectedCount === 0} title="Block selected users">
        Block
      </button>
      <button
        className="btn btn-success"
        onClick={onUnblock}
        disabled={selectedCount === 0}
        title="Unblock selected users"
      >
        <i className="bi bi-unlock-fill"></i>
      </button>
      <button
        className="btn btn-danger"
        onClick={onDelete}
        disabled={selectedCount === 0}
        title="Delete selected users"
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <button className="btn btn-secondary" onClick={onDeleteUnverified} title="Delete all unverified users">
        <i className="bi bi-eraser"></i>
      </button>
    </div>
  );
};
