import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

// Types
type Career = {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Internship" | "Contract";
  description: string;
  requirements: string[];
  salaryRange: { min?: number; max?: number };
};

type Application = {
  _id: string;
  careerId: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
};

// Custom Hooks
const useJobs = () => {
  const [jobs, setJobs] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers`);
      if (!response.ok) throw new Error("Failed to fetch jobs");
      const data = await response.json();
      setJobs(data.data?.jobs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id: string) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/careers/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Failed to delete job");
    fetchJobs();
  };

  const saveJob = async (jobData: any, editingId?: string) => {
    const url = editingId
      ? `${import.meta.env.VITE_API_URL}/api/careers/${editingId}`
      : `${import.meta.env.VITE_API_URL}/api/careers`;
    const response = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save job");
    }

    fetchJobs();
  };

  return { jobs, loading, error, fetchJobs, deleteJob, saveJob };
};

const useApplications = () => {
  const [applications, setApplications] = useState<{
    [key: string]: Application[];
  }>({});
  const [loadingAppId, setLoadingAppId] = useState<string | null>(null);

  const fetchApplications = async (jobId: string) => {
    if (applications[jobId]) return;

    setLoadingAppId(jobId);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/career-applications/career/${jobId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications((prev) => ({
        ...prev,
        [jobId]: data.data?.applications || [],
      }));
    } catch (err) {
      setApplications((prev) => ({ ...prev, [jobId]: [] }));
    } finally {
      setLoadingAppId(null);
    }
  };

  return { applications, loadingAppId, fetchApplications };
};

// Components
const JobCard = ({
  job,
  onEdit,
  onDelete,
  onToggleApplications,
  expanded,
  applications,
  loadingAppId,
}: {
  job: Career;
  onEdit: (job: Career) => void;
  onDelete: (id: string) => void;
  onToggleApplications: (id: string) => void;
  expanded: boolean;
  applications: Application[];
  loadingAppId: string | null;
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const typeStyles = {
    "Full-Time": "bg-green-100 text-green-800",
    "Part-Time": "bg-blue-100 text-blue-800",
    Internship: "bg-purple-100 text-purple-800",
    Contract: "bg-orange-100 text-orange-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  typeStyles[job.type]
                }`}
              >
                {job.type}
              </span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              {job.department && <span>📁 {job.department}</span>}
              {job.location && <span>📍 {job.location}</span>}
              {job.salaryRange &&
                (job.salaryRange.min || job.salaryRange.max) && (
                  <span>
                    💰 ${job.salaryRange.min?.toLocaleString() || "..."} - $
                    {job.salaryRange.max?.toLocaleString() || "..."}
                  </span>
                )}
            </div>
            <p className="text-gray-700 text-sm line-clamp-2">
              {job.description}
            </p>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onEdit(job)}
              className="px-3 py-1 cursor-pointer text-xs bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(job._id)}
              className="px-3 py-1 cursor-pointer text-xs bg-red-100 text-red-800 rounded-md hover:bg-red-200"
            >
              Delete
            </button>
            <button
              onClick={() => onToggleApplications(job._id)}
              className="px-3 py-1 text-xs bg-gray-100 cursor-pointer text-gray-800 rounded-md hover:bg-gray-200 whitespace-nowrap"
            >
              {expanded ? "Hide" : "View"} Applications
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-200 bg-gray-50 p-6">
          <h4 className="text-md font-medium text-gray-900 mb-4">
            Applications
          </h4>
          {loadingAppId === job._id ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-sm text-gray-600">
                Loading applications...
              </span>
            </div>
          ) : applications.length > 0 ? (
            <div className="grid gap-3">
              {applications.map((app) => (
                <div
                  key={app._id}
                  className="bg-white p-4 rounded-md border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full font-medium">
                        {app.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900">
                          {app.name}
                        </h5>
                        <p className="text-sm text-gray-600">{app.email}</p>
                        {app.phone && (
                          <p className="text-sm text-gray-600">{app.phone}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Applied on</p>
                      {/* CORRECTED: Changed app.appliedAt to app.createdAt */}
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(app.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No applications yet for this position.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const JobForm = ({
  job,
  onSave,
  onCancel,
}: {
  job?: Career;
  onSave: (data: any, editingId?: string) => Promise<void>;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: job?.title || "",
    department: job?.department || "",
    location: job?.location || "",
    type: job?.type || ("Full-Time" as Career["type"]),
    description: job?.description || "",
    requirements: job?.requirements || ([] as string[]),
    salaryMin: job?.salaryRange?.min?.toString() || "",
    salaryMax: job?.salaryRange?.max?.toString() || "",
  });
  const [currentRequirement, setCurrentRequirement] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()],
      }));
      setCurrentRequirement("");
    }
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      formData.title.trim().length < 5 ||
      formData.title.trim().length > 200
    ) {
      setError("Job title must be between 5 and 200 characters");
      return;
    }

    if (
      formData.description.trim().length < 50 ||
      formData.description.trim().length > 5000
    ) {
      setError("Job description must be between 50 and 5000 characters");
      return;
    }

    const salaryRange: any = {};
    if (formData.salaryMin && !isNaN(Number(formData.salaryMin)))
      salaryRange.min = Number(formData.salaryMin);
    if (formData.salaryMax && !isNaN(Number(formData.salaryMax)))
      salaryRange.max = Number(formData.salaryMax);

    const jobData = {
      title: formData.title.trim(),
      department: formData.department.trim() || undefined,
      location: formData.location.trim() || undefined,
      type: formData.type,
      description: formData.description.trim(),
      requirements: formData.requirements.filter((req) => req.trim() !== ""),
      ...(Object.keys(salaryRange).length > 0 && { salaryRange }),
    };

    try {
      await onSave(jobData, job?._id);
      onCancel();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {job ? "Edit Job Posting" : "Create New Job Posting"}
          </h2>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Internship">Internship</option>
                <option value="Contract">Contract</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Min Salary
              </label>
              <input
                type="number"
                name="salaryMin"
                value={formData.salaryMin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Salary
              </label>
              <input
                type="number"
                name="salaryMax"
                value={formData.salaryMax}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={currentRequirement}
                  onChange={(e) => setCurrentRequirement(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addRequirement())
                  }
                  placeholder="Add a requirement..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={addRequirement}
                  className="px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Add
                </button>
              </div>

              {formData.requirements.length > 0 && (
                <div className="space-y-2">
                  {formData.requirements.map((req, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                    >
                      <span className="text-sm text-gray-800">{req}</span>
                      <button
                        type="button"
                        onClick={() => removeRequirement(index)}
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-sm cursor-pointer font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              {job ? "Update Job" : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteModal = ({
  show,
  onConfirm,
  onCancel,
}: {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center mb-4">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <span className="text-red-600 text-xl">⚠️</span>
          </div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Delete Job Posting
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this job posting? This action cannot
            be undone.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 cursor-pointer text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Delete Job
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AdminCareer = () => {
  const { jobs, loading, error, fetchJobs, deleteJob, saveJob } = useJobs();
  const { applications, loadingAppId, fetchApplications } = useApplications();

  const [activeTab, setActiveTab] = useState<"list" | "form">("list");
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set());
  const [editingJob, setEditingJob] = useState<Career | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const toggleJobExpansion = (jobId: string) => {
    const newExpanded = new Set(expandedJobs);
    if (newExpanded.has(jobId)) {
      newExpanded.delete(jobId);
    } else {
      newExpanded.add(jobId);
      fetchApplications(jobId);
    }
    setExpandedJobs(newExpanded);
  };

  const handleEdit = (job: Career) => {
    setEditingJob(job);
    setActiveTab("form");
  };

  const handleDeleteClick = (id: string) => {
    setJobToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (jobToDelete) {
      try {
        await deleteJob(jobToDelete);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
    setShowDeleteModal(false);
    setJobToDelete(null);
  };

  const handleSave = async (jobData: any, editingId?: string) => {
    await saveJob(jobData, editingId);
    setEditingJob(null);
    setActiveTab("list");
  };

  const handleCancel = () => {
    setEditingJob(null);
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <title>Ceedee's | Career</title>
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <a
          href="/careers"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bg-blue-400 text-white p-4 hover:-rotate-135 transition-all ease duration-250 rounded-full bottom-10 right-10 cursor-pointer -rotate-110"
        >
          <ArrowDown />
        </a>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Career Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage job postings and view applications
              </p>
            </div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-6 py-3 text-sm font-medium cursor-pointer rounded-lg transition-colors ${
              activeTab === "list"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200"
            }`}
          >
            Job Listings & Applications ({jobs.length})
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
              activeTab === "form"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-700 bg-white cursor-pointer hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {editingJob ? "Edit Job" : "Create New Job"}
          </button>
        </div>

        {/* Content */}
        {activeTab === "list" ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">
                Active Job Postings
              </h2>
              <button
                onClick={() => setActiveTab("form")}
                className="inline-flex items-center cursor-pointer px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700"
              >
                + Add New Job
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No job postings found.</p>
                <button
                  onClick={() => setActiveTab("form")}
                  className="mt-4 text-indigo-600 cursor-pointer hover:text-indigo-800"
                >
                  Create your first job posting
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                    onToggleApplications={toggleJobExpansion}
                    expanded={expandedJobs.has(job._id)}
                    applications={applications[job._id] || []}
                    loadingAppId={loadingAppId}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <JobForm
            job={editingJob || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>

      <DeleteModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
};

export default AdminCareer;
