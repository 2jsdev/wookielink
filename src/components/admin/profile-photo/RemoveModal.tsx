'use client';

interface RemoveModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export function RemoveModal({ onClose, onConfirm }: RemoveModalProps) {
  return (
    <div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-card p-6 rounded-md text-center text-card-foreground max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="mb-4">Remove your profile photo?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90"
            onClick={onConfirm}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
