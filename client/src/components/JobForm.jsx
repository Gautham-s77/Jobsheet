import { useState } from "react";

/**
 * JobForm Component
 * Form to add or edit a job
 */
const JobForm = ({ initialData = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      companyName: "",
      role: "",
      jobLink: "",
      source: "LinkedIn",
      status: "Saved",
      notes: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.companyName ||
      !formData.role ||
      !formData.jobLink ||
      !formData.source
    ) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-2xl mx-auto w-full">
      <h2 className="text-2xl font-headings font-bold text-foreground tracking-tight mb-6">
        {initialData ? "Edit Job" : "Add New Job"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium font-body text-foreground mb-2">
            Company Name *
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="e.g., Google"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-body text-foreground mb-2">
            Role *
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
            className="input-field"
          />
        </div>

        <div>
          <label className="block text-sm font-medium font-body text-foreground mb-2">
            Source *
          </label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="input-field"
          >
            <option value="LinkedIn">LinkedIn</option>
            <option value="Naukri">Naukri</option>
            <option value="Indeed">Indeed</option>
            <option value="Referral">Referral</option>
            <option value="Company Site">Company Site</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium font-body text-foreground mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-field"
          >
            <option value="Saved">Saved</option>
            <option value="Applied">Applied</option>
            <option value="Referral Requested">Referral Requested</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium font-body text-foreground mb-2">
          Job Link *
        </label>
        <input
          type="url"
          name="jobLink"
          value={formData.jobLink}
          onChange={handleChange}
          placeholder="https://example.com/job-posting"
          className="input-field"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium font-body text-foreground mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any additional notes..."
          rows="4"
          className="input-field"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary">
          {initialData ? "Update Job" : "Add Job"}
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default JobForm;
