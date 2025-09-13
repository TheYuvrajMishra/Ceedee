import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

// ✅ EXPANDED TYPE: Includes all relevant fields from the backend model
type Inquiry = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  query: string;
  status: "new" | "contacted" | "pending" | "resolved" | "archived"; // Example statuses
  createdAt: string;
  notes?: string; // Optional field
  contactPreference: "Email" | "Phone" | "WhatsApp" | "Any";
};

const AdminClientQueryViewer = () => {
  const [queries, setQueries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ NEW: State for pagination, filtering, and sorting
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState(""); // Empty string means 'all'
  // const [sortBy, setSortBy] = useState('createdAt'); // Default sort

  // ✅ REFACTORED: Fetch logic is now a reusable, memoized function
  const fetchQueries = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found. Please log in.");
        return;
      }

      // Build query parameters dynamically
      const params = new URLSearchParams({
        page: String(currentPage),
        limit: "10",
      });
      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const response = await fetch(
        `http://localhost:5000/api/clients?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch queries. You may not be authorized.");
      }

      const data = await response.json();
      setQueries(data.data.inquiries || []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  }, [currentPage, statusFilter]); // Re-run fetch when these change

  // Main effect to fetch data
  useEffect(() => {
    fetchQueries();
  }, [fetchQueries]);

  // ✅ NEW: Handler to delete an inquiry
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete inquiry.");
      }

      // Refresh the list after deleting
      fetchQueries();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Could not delete the inquiry."
      );
    }
  };

  // ✅ NEW: Handler to update the status of an inquiry
  const handleStatusChange = async (
    id: string,
    newStatus: Inquiry["status"]
  ) => {
    // Optimistic UI update for a smoother experience
    setQueries((prevQueries) =>
      prevQueries.map((q) => (q._id === id ? { ...q, status: newStatus } : q))
    );

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // If the API call fails, revert the change and show an error
        throw new Error("Failed to update status.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update status.");
      // Re-fetch to get the true state from the server on failure
      fetchQueries();
    }
  };

  // Simple helper to format date
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="container mx-auto p-6 font-sans bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center py-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Client Queries</h1>
        </div>
        <Link
          to="/admin/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {/* ✅ NEW: Controls for Filtering and Sorting */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
        <div>
          <label
            htmlFor="statusFilter"
            className="font-semibold text-gray-700 mr-2"
          >
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }} // Reset to page 1 on filter change
            className="p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="pending">Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-500 bg-red-100 p-3 rounded-md mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Loading inquiries...</p>
      ) : (
        <>
          <ul className="space-y-6">
            {queries.length > 0 ? (
              queries.map((q) => (
                <li
                  key={q._id}
                  className="p-6 bg-white rounded-lg shadow-md transition hover:shadow-lg"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-4">
                        <p className="text-xl font-bold text-gray-900">
                          {q.name}
                        </p>{" "}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{q.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(q.createdAt)}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <p>
                      <strong className="font-semibold text-gray-700">
                        Email:
                      </strong>{" "}
                      <a
                        href={`mailto:${q.email}`}
                        className="text-blue-600 hover:underline"
                      >
                        {q.email}
                      </a>
                    </p>
                    <p>
                      <strong className="font-semibold text-gray-700">
                        Phone:
                      </strong>{" "}
                      {q.phone}
                    </p>
                    <p className="col-span-full">
                      <strong className="font-semibold text-gray-700">
                        Message:
                      </strong>{" "}
                      {q.query}
                    </p>
                  </div>

                  {/* ✅ NEW: Action buttons for update and delete */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 space-x-4">
                    <span className="italic py-1 px-2">
                      Prefered Contact By : {q.contactPreference}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <label
                          htmlFor={`status-${q._id}`}
                          className="text-sm font-medium text-gray-700 mr-2"
                        >
                          Status:
                        </label>
                        <select
                          id={`status-${q._id}`}
                          value={q.status}
                          onChange={(e) =>
                            handleStatusChange(
                              q._id,
                              e.target.value as Inquiry["status"]
                            )
                          }
                          className="p-1 border rounded-md text-sm"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="pending">Pending</option>
                          <option value="resolved">Resolved</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <button
                        onClick={() => handleDelete(q._id)}
                        className="px-3 py-1 bg-red-500 cursor-pointer text-white rounded-md hover:bg-red-600 text-sm font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500 bg-white p-10 rounded-lg shadow-sm">
                No client inquiries found for the selected filter.
              </p>
            )}
          </ul>

          {/* ✅ NEW: Pagination Controls */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage <= 1}
              className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage >= totalPages}
              className="px-4 py-2 bg-gray-300 cursor-pointer text-gray-800 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminClientQueryViewer;
