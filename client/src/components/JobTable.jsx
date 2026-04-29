import { useState } from "react";
import { Pencil, MessageSquare, Trash2 } from "lucide-react";
import { generateMessage } from "../services/messageService.js";
import MessageModal from "./MessageModal.jsx";

function companyInitial(name) {
  const t = (name || "").trim();
  return t ? t[0].toUpperCase() : "?";
}

function sourceBadgeClass(source) {
  const s = (source || "").toLowerCase();
  if (s.includes("referral")) {
    return "bg-secondary text-secondary-foreground";
  }
  return "bg-info-bg text-info-text";
}

function statusBadgeClass(status) {
  switch (status) {
    case "Interview":
      return "bg-secondary text-secondary-foreground";
    case "Saved":
    case "Applied":
      return "bg-neutral-bg text-neutral-text";
    case "Referral Requested":
      return "bg-info-bg text-info-text";
    case "Rejected":
      return "bg-red-50 text-danger font-medium";
    default:
      return "bg-neutral-bg text-neutral-text";
  }
}

/**
 * JobTable Component
 * Display all jobs in a table format with actions
 */
const JobTable = ({ jobs, onEdit, onDelete, loading }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [generatedMessage, setGeneratedMessage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleGenerateMessage = async (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleConfirmGenerate = async (contact) => {
    if (!contact.trim()) {
      alert("Please enter a contact name");
      return;
    }

    setIsGenerating(true);
    try {
      const message = await generateMessage(selectedJob._id, contact);
      setGeneratedMessage(message);
    } catch (err) {
      alert("Failed to generate message: " + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedJob(null);
    setGeneratedMessage(null);
  };

  const inner = () => {
    if (loading) {
      return (
        <div className="px-6 py-12 text-center text-sm text-muted-foreground font-body">
          Loading jobs...
        </div>
      );
    }

    if (jobs.length === 0) {
      return (
        <div className="px-6 py-12 text-center text-sm text-muted-foreground font-body">
          No jobs yet. Add your first job to get started!
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-neutral-bg">
              <th className="px-6 py-4 font-headings font-semibold text-muted-foreground text-sm">
                Company
              </th>
              <th className="px-6 py-4 font-headings font-semibold text-muted-foreground text-sm">
                Role
              </th>
              <th className="px-6 py-4 font-headings font-semibold text-muted-foreground text-sm">
                Source
              </th>
              <th className="px-6 py-4 font-headings font-semibold text-muted-foreground text-sm">
                Status
              </th>
              <th className="px-6 py-4 font-headings font-semibold text-muted-foreground text-sm text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {jobs.map((job) => (
              <tr key={job._id} className="bg-surface">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-headings font-bold text-sm shrink-0">
                      {companyInitial(job.companyName)}
                    </div>
                    <span className="font-body font-medium text-foreground">
                      {job.companyName}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 font-body text-foreground text-sm">
                  {job.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body ${sourceBadgeClass(
                      job.source
                    )}`}
                  >
                    {job.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium font-body ${statusBadgeClass(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onEdit(job)}
                      className="btn-ghost"
                      title="Edit"
                      aria-label="Edit job"
                    >
                      <Pencil className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleGenerateMessage(job)}
                      className="btn-ghost"
                      title="Generate message"
                      aria-label="Generate referral message"
                    >
                      <MessageSquare
                        className="w-4 h-4 shrink-0"
                        strokeWidth={2}
                      />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(job._id)}
                      className="btn-ghost-danger"
                      title="Delete"
                      aria-label="Delete job"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const countLabel =
    loading || jobs.length === 0
      ? null
      : `Showing ${jobs.length} of ${jobs.length} jobs`;

  return (
    <>
      <div className="w-full bg-surface rounded-2xl border border-border shadow-sm overflow-hidden">
        {inner()}
        {countLabel && (
          <div className="px-6 py-4 border-t border-border bg-neutral-bg flex items-center justify-between text-sm text-muted-foreground font-body">
            <span>{countLabel}</span>
          </div>
        )}
      </div>

      {modalOpen && (
        <MessageModal
          isOpen={modalOpen}
          onClose={closeModal}
          onGenerate={handleConfirmGenerate}
          generatedMessage={generatedMessage}
          isGenerating={isGenerating}
          jobName={selectedJob?.companyName}
        />
      )}
    </>
  );
};

export default JobTable;
