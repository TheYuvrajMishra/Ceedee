import { ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router";

// Types
type NewsEvent = {
  _id: string;
  title: string;
  type: "News" | "Event";
  description: string;
  date?: string;
  location?: string;
  image?: string;
  status: "Draft" | "Published" | "Archived";
  tags: string[];
};

// Custom Hook for News & Events
const useNewsEvents = () => {
  const [newsEvents, setNewsEvents] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:5000/api/news-events";

  const fetchNewsEvents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch news and events");
      const data = await response.json();
      setNewsEvents(data.data?.newsEvents || data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const saveNewsEvent = async (itemData: any, editingId?: string) => {
    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const response = await fetch(url, {
      method: editingId ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(itemData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to save item");
    }

    fetchNewsEvents();
  };

  const deleteNewsEvent = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (!response.ok) throw new Error("Failed to delete item");
    fetchNewsEvents();
  };

  return {
    newsEvents,
    loading,
    error,
    fetchNewsEvents,
    saveNewsEvent,
    deleteNewsEvent,
  };
};

// Utility Functions
const formatDateForInput = (dateString?: string) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};

const formatDate = (dateString?: string) => {
  if (!dateString) return "No date";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Components
const NewsEventCard = ({
  item,
  onEdit,
  onDelete,
}: {
  item: NewsEvent;
  onEdit: (item: NewsEvent) => void;
  onDelete: (id: string) => void;
}) => {
  const typeStyles = {
    News: "bg-blue-100 text-blue-800",
    Event: "bg-purple-100 text-purple-800",
  };

  const statusStyles = {
    Published: "bg-green-100 text-green-800",
    Draft: "bg-yellow-100 text-yellow-800",
    Archived: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {item.title}
            </h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                typeStyles[item.type]
              }`}
            >
              {item.type}
            </span>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                statusStyles[item.status]
              }`}
            >
              {item.status}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
            <span>📅 {formatDate(item.date)}</span>
            {item.location && <span>📍 {item.location}</span>}
            {item.tags.length > 0 && (
              <span>
                🏷️ {item.tags.slice(0, 2).join(", ")}
                {item.tags.length > 2 ? "..." : ""}
              </span>
            )}
          </div>

          <p className="text-gray-700 text-sm line-clamp-2">
            {item.description}
          </p>

          {item.image && (
            <div className="mt-3">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-md border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(item)}
            className="px-3 py-1 text-xs cursor-pointer bg-yellow-100 text-yellow-800 rounded-md hover:bg-yellow-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="px-3 py-1 text-xs cursor-pointer bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const NewsEventForm = ({
  item,
  onSave,
  onCancel,
}: {
  item?: NewsEvent;
  onSave: (data: any, editingId?: string) => Promise<void>;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    type: item?.type || ("News" as NewsEvent["type"]),
    description: item?.description || "",
    date: formatDateForInput(item?.date) || "",
    location: item?.location || "",
    image: item?.image || "",
    status: item?.status || ("Published" as NewsEvent["status"]),
    tags: item?.tags?.join(", ") || "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      formData.title.trim().length < 5 ||
      formData.title.trim().length > 300
    ) {
      setError("Title must be between 5 and 300 characters");
      return;
    }

    if (
      formData.description.trim().length < 20 ||
      formData.description.trim().length > 10000
    ) {
      setError("Description must be between 20 and 10000 characters");
      return;
    }

    const itemData = {
      title: formData.title.trim(),
      type: formData.type,
      content: formData.description.trim(),
      date: formData.date || undefined,
      location: formData.location.trim() || undefined,
      image: formData.image.trim() || undefined,
      status: formData.status,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    try {
      await onSave(itemData, item?._id);
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
            {item ? "Edit News/Event" : "Create New News/Event"}
          </h2>
        </div>

        {error && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
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
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="News">News</option>
                <option value="Event">Event</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
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

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
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
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="technology, announcement, community"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 mt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 cursor-pointer text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 cursor-pointer text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors"
            >
              {item ? "Update Item" : "Create Item"}
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
            Delete News/Event
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to delete this item? This action cannot be
            undone.
          </p>
        </div>
        <div className="flex justify-center space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm cursor-pointer font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm cursor-pointer font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const AdminNewsAndEvents = () => {
  const {
    newsEvents,
    loading,
    error,
    fetchNewsEvents,
    saveNewsEvent,
    deleteNewsEvent,
  } = useNewsEvents();

  const [activeTab, setActiveTab] = useState<"list" | "form">("list");
  const [editingItem, setEditingItem] = useState<NewsEvent | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchNewsEvents();
  }, []);

  const handleEdit = (item: NewsEvent) => {
    setEditingItem(item);
    setActiveTab("form");
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (itemToDelete) {
      try {
        await deleteNewsEvent(itemToDelete);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
    setShowDeleteModal(false);
    setItemToDelete(null);
  };

  const handleSave = async (itemData: any, editingId?: string) => {
    await saveNewsEvent(itemData, editingId);
    setEditingItem(null);
    setActiveTab("list");
  };

  const handleCancel = () => {
    setEditingItem(null);
    setActiveTab("list");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <a
          href="/news-and-events"
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
                News & Events Management
              </h1>
              <p className="text-gray-600 mt-1">
                Manage news articles and events
              </p>
            </div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors"
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
            className={`px-6 py-3 text-sm cursor-pointer font-medium rounded-lg transition-colors ${
              activeTab === "list"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200"
            }`}
          >
            All Items ({newsEvents.length})
          </button>
          <button
            onClick={() => setActiveTab("form")}
            className={`px-6 py-3 text-sm cursor-pointer font-medium rounded-lg transition-colors ${
              activeTab === "form"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-700 bg-white hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {editingItem ? "Edit Item" : "Create New"}
          </button>
        </div>

        {/* Content */}
        {activeTab === "list" ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl  font-semibold text-gray-900">
                News & Events
              </h2>
              <button
                onClick={() => setActiveTab("form")}
                className="inline-flex cursor-pointer items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
              >
                + Add New Item
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading items...</p>
              </div>
            ) : newsEvents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No news or events found.</p>
                <button
                  onClick={() => setActiveTab("form")}
                  className="mt-4 cursor-pointer text-indigo-600 hover:text-indigo-800"
                >
                  Create your first item
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {newsEvents.map((item) => (
                  <NewsEventCard
                    key={item._id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <NewsEventForm
            item={editingItem || undefined}
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

export default AdminNewsAndEvents;
