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
      <button
        className="btn btn-warning d-flex align-items-center justify-content-center"
        onClick={onBlock}
        disabled={selectedCount === 0}
      >
        Block
      </button>
      <button
        className="btn btn-success d-flex align-items-center justify-content-center"
        onClick={onUnblock}
        disabled={selectedCount === 0}
      >
        <i className="bi bi-unlock-fill"></i>
      </button>
      <button
        className="btn btn-danger d-flex align-items-center justify-content-center"
        onClick={onDelete}
        disabled={selectedCount === 0}
      >
        <i className="bi bi-trash-fill"></i>
      </button>
      <button
        className="btn btn-secondary d-flex align-items-center justify-content-center"
        onClick={onDeleteUnverified}
      >
        <i className="bi bi-eraser"></i>
      </button>
    </div>
  );
};
