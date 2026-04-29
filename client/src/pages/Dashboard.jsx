import { useState } from "react";
import { LayoutDashboard, Plus } from "lucide-react";
import JobTable from "../components/JobTable.jsx";
import JobForm from "../components/JobForm.jsx";
import { useJobs } from "../hooks/useJobs.js";

/**
 * Dashboard Page
 * Main page showing all jobs and ability to add/edit/delete jobs
 */
const Dashboard = () => {
  const { jobs, loading, error, addJob, editJob, removeJob } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  const handleAddJob = async (jobData) => {
    try {
      await addJob(jobData);
      setShowForm(false);
      alert("Job added successfully!");
    } catch {
      alert("Failed to add job. Please try again.");
    }
  };

  const handleEditJob = async (jobData) => {
    try {
      await editJob(editingJob._id, jobData);
      setEditingJob(null);
      setShowForm(false);
      alert("Job updated successfully!");
    } catch {
      alert("Failed to update job. Please try again.");
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await removeJob(jobId);
        alert("Job deleted successfully!");
      } catch {
        alert("Failed to delete job. Please try again.");
      }
    }
  };

  const handleEditClick = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  if (error) {
    return (
      <div className="page-shell">
        <p className="text-center text-danger font-body">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-shell">
      {showForm ? (
        <JobForm
          initialData={editingJob}
          onSubmit={editingJob ? handleEditJob : handleAddJob}
          onCancel={() => {
            setShowForm(false);
            setEditingJob(null);
          }}
        />
      ) : (
        <>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl font-headings font-extrabold text-foreground tracking-tight flex items-center gap-3">
                <LayoutDashboard
                  className="w-8 h-8 shrink-0 text-primary"
                  strokeWidth={2}
                />
                Job Dashboard
              </h1>
              <p className="text-lg font-body text-muted-foreground max-w-lg">
                Track your job applications, organize referrals, and manage
                your career journey in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="btn-primary self-start md:self-auto"
            >
              <Plus className="w-5 h-5 shrink-0" strokeWidth={2} />
              Add New Job
            </button>
          </div>

          <div className="mt-4">
            <JobTable
              jobs={jobs}
              onEdit={handleEditClick}
              onDelete={handleDeleteJob}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
