import React, { useEffect, useState } from "react";
import axios from "axios";
import { MilestoneModal } from "./MilestoneModal";

interface SubItem {
  id: number;
  sub_clarification: string;
}

interface Clarification {
  id: number;
  clarification: string;
  sub_clarifications: SubItem[];
}

const ClarificationTable: React.FC<{ projectId: string }> = ({ projectId }) => {
  const [data, setData] = useState<Clarification[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    const res = await axios.get(`/api/clarification/${projectId}`);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async (clarification: string) => {
    await axios.post("/api/clarification", {
      clarification,
      estimation_id: parseInt(projectId),
      status: true,
      created_by: 1,
    });
    setShowModal(false);
    fetchData();
  };

  const handleAddSub = async (clarificationId: number, text: string) => {
    await axios.post("/api/sub-clarification", {
      clarification_id: clarificationId,
      sub_clarification: text,
      status: true,
      created_by: 1,
    });
    fetchData();
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create Milestone
      </button>

      <MilestoneModal
        isOpen={showModal}
        title="Add Clarification"
        placeholder="Enter clarification"
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="text-left p-3">Action</th>
            <th className="text-left p-3">Clarifications</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              <tr className="border-t">
                <td className="p-3">
                  <button
                    onClick={() =>
                      setExpanded(expanded === item.id ? null : item.id)
                    }
                    className="text-blue-600"
                  >
                    {expanded === item.id ? "−" : "+"}
                  </button>
                </td>
                <td className="p-3 font-semibold">{item.clarification}</td>
              </tr>

              {expanded === item.id && (
                <>
                  {item.sub_clarifications.map((sub) => (
                    <tr key={sub.id} className="bg-gray-50">
                      <td className="p-3 pl-8">•</td>
                      <td className="p-3">{sub.sub_clarification}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50">
                    <td></td>
                    <td className="p-3">
                      <input
                        placeholder="Enter sub-clarification"
                        className="border px-2 py-1 rounded w-2/3"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleAddSub(item.id, (e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                          }
                        }}
                      />
                    </td>
                  </tr>
                </>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClarificationTable;
