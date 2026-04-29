import { useState } from "react";
import { X } from "lucide-react";

/**
 * MessageModal Component
 * Modal for generating and displaying referral messages
 */
const MessageModal = ({
  isOpen,
  onClose,
  onGenerate,
  generatedMessage,
  isGenerating,
  jobName,
}) => {
  const [contactName, setContactName] = useState("");
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = () => {
    onGenerate(contactName);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-foreground/40 flex items-center justify-center z-50 p-4 font-body">
      <div className="bg-surface rounded-2xl border border-border shadow-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h2 className="text-xl font-headings font-bold text-foreground tracking-tight">
            Generate Referral Message
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-muted-foreground hover:bg-neutral-bg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {!generatedMessage ? (
          <>
            <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
              Generate a referral request message for{" "}
              <span className="font-medium text-foreground">{jobName}</span>
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="e.g., John Smith"
                className="input-field"
                disabled={isGenerating}
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating || !contactName.trim()}
                className={`btn-primary ${isGenerating || !contactName.trim() ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isGenerating ? "Generating..." : "Generate Message"}
              </button>
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4 bg-neutral-bg border border-border rounded-xl p-4 max-h-96 overflow-y-auto">
              <p className="text-foreground whitespace-pre-wrap font-mono text-sm leading-relaxed">
                {generatedMessage}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                className={
                  copied
                    ? "btn-primary bg-secondary text-secondary-foreground shadow-none"
                    : "btn-primary"
                }
              >
                {copied ? "Copied!" : "Copy to Clipboard"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setContactName("");
                  onGenerate("");
                }}
                className="btn-secondary"
              >
                Generate Another
              </button>
              <button type="button" onClick={onClose} className="btn-secondary">
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessageModal;
