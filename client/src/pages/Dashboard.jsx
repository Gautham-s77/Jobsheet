import { useState, useMemo } from "react";
import { LayoutDashboard, Plus, FileUp, ArrowLeft } from "lucide-react";
import JobTable from "../components/JobTable.jsx";
import JobForm from "../components/JobForm.jsx";
import DataImporter from "../components/DataImporter.jsx";
import { useJobs } from "../hooks/useJobs.js";

/**
 * Dashboard Page
 * Main page showing all jobs and ability to add/edit/delete jobs
 */
const Dashboard = () => {
  const { jobs, loading, error, addJob, editJob, removeJob } = useJobs();
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [hideRejected, setHideRejected] = useState(false);
  const [sortByStatus, setSortByStatus] = useState(false);

  const processedJobs = useMemo(() => {
    let result = [...jobs];
    
    if (hideRejected) {
      result = result.filter(job => job.status !== 'Rejected');
    }
    
    if (sortByStatus) {
      const statusOrder = {
        "Interview": 1,
        "Referral Requested": 2,
        "Applied": 3,
        "Saved": 4,
        "Rejected": 5
      };
      result.sort((a, b) => {
        const orderA = statusOrder[a.status] || 99;
        const orderB = statusOrder[b.status] || 99;
        return orderA - orderB;
      });
    }
    
    return result;
  }, [jobs, hideRejected, sortByStatus]);

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

  const handleStatusChange = async (job, newStatus) => {
    try {
      await editJob(job._id, { ...job, status: newStatus });
    } catch {
      alert("Failed to update status. Please try again.");
    }
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
      ) : showImport ? (
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => {
              setShowImport(false);
              // Force a refresh of the jobs list when returning to dashboard
              window.location.reload();
            }} 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground self-start mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <DataImporter />
        </div>
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
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setShowImport(true)}
                className="btn-secondary flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md font-medium transition-colors border border-gray-200 shadow-sm"
              >
                <FileUp className="w-5 h-5 shrink-0" strokeWidth={2} />
                Import Data
              </button>
              <button
                type="button"
                onClick={() => setShowForm(true)}
                className="btn-primary"
              >
                <Plus className="w-5 h-5 shrink-0" strokeWidth={2} />
                Add New Job
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center bg-surface p-3 px-4 rounded-lg border border-border shadow-sm">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium font-body text-foreground">
              <input
                type="checkbox"
                checked={hideRejected}
                onChange={(e) => setHideRejected(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Hide Rejected Jobs
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium font-body text-foreground">
              <input
                type="checkbox"
                checked={sortByStatus}
                onChange={(e) => setSortByStatus(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              Sort by Status
            </label>
          </div>

          <div className="mt-4">
            <JobTable
              jobs={processedJobs}
              onEdit={handleEditClick}
              onDelete={handleDeleteJob}
              onStatusChange={handleStatusChange}
              loading={loading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
