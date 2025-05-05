import React, { useState } from "react";

interface MilestoneModalProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  onClose: () => void;
  onSave: (value: string) => void;
}
interface EditMilestoneModalProps {
  isOpen: boolean;
  title: string;
  placeholder: string;
  onClose: () => void;
  onSave: (value: string) => void;
}
export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  title,
  placeholder,
  onClose,
  onSave,
}) => {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(input);
              setInput("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export const EditMilestoneModal: React.FC<EditMilestoneModalProps> = ({
  isOpen,
  title,
  placeholder,
  onClose,
  onSave,
}) => {
  const [input, setInput] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-xl w-96 shadow">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="w-full border px-3 py-2 rounded mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave(input);
              setInput("");
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
