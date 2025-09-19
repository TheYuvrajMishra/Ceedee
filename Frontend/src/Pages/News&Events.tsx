import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";

// Type definition
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

// Filter Controls
type FilterType = "All" | "News" | "Event";
const filterOptions: FilterType[] = ["All", "News", "Event"];

const FilterControls = ({
  activeFilter,
  setActiveFilter,
}: {
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
}) => (
  <div className="flex justify-center gap-4 mb-16">
    {filterOptions.map((option) => (
      <button
        key={option}
        onClick={() => setActiveFilter(option)}
        className={`px-6 py-3 text-sm font-light tracking-wider border transition-all duration-300 ${
          activeFilter === option
            ? "bg-gray-900 text-white border-gray-900"
            : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
        }`}
      >
        {option.toUpperCase()}
      </button>
    ))}
  </div>
);

// Date Formatter
const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// News & Event Card Component
const NewsEventCard = ({
  item,
  onReadMore,
  index,
  scrollY,
}: {
  item: NewsEvent;
  onReadMore: (item: NewsEvent) => void;
  index: number;
  scrollY: number;
}) => {
  const isEvent = item.type === "Event";

  return (
    <div
      className="bg-white border border-gray-200 hover:border-gray-900 transition-colors duration-300 group"
      style={{
        transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
      }}
    >
      {item.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 text-xs font-light tracking-wider bg-white text-gray-900 border border-gray-300">
              {item.type.toUpperCase()}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-8">
        <div className="mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <div className="w-3 h-3 border border-gray-400"></div>
            {formatDate(item.date)}
          </div>
          {isEvent && item.location && (
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
              {item.location}
            </div>
          )}
        </div>

        <h3 className="text-xl font-light text-gray-900 mb-4 leading-tight group-hover:text-black transition-colors">
          {item.title}
        </h3>

        <p className="text-gray-600 leading-relaxed mb-6">
          {item.description.substring(0, 150)}
          {item.description.length > 150 && "..."}
        </p>

        <div className="border-t border-gray-200 pt-6">
          <button
            onClick={() => onReadMore(item)}
            className="text-gray-900 text-sm font-light tracking-wider hover:underline transition-colors"
          >
            READ MORE →
          </button>
        </div>
      </div>
    </div>
  );
};

// Skeleton Loader Card
const SkeletonCard = () => (
  <div className="bg-white border border-gray-200 animate-pulse">
    <div className="bg-gray-200 h-48 w-full"></div>
    <div className="p-8">
      <div className="bg-gray-200 h-4 w-1/3 mb-4"></div>
      <div className="bg-gray-200 h-6 w-full mb-4"></div>
      <div className="space-y-2 mb-6">
        <div className="bg-gray-200 h-4 w-full"></div>
        <div className="bg-gray-200 h-4 w-full"></div>
        <div className="bg-gray-200 h-4 w-2/3"></div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <div className="bg-gray-200 h-4 w-24"></div>
      </div>
    </div>
  </div>
);

// Detail Modal Component
const NewsDetailModal = ({
  item,
  onClose,
}: {
  item: NewsEvent;
  onClose: () => void;
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const isEvent = item.type === "Event";

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 z-10 text-2xl leading-none"
        >
          ×
        </button>

        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-64 object-cover grayscale"
          />
        )}

        <div className="p-8 md:p-12">
          <div className="mb-6">
            <span className="px-3 py-1 text-xs font-light tracking-wider bg-gray-100 text-gray-900 border border-gray-300">
              {item.type.toUpperCase()}
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            {item.title}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border border-gray-400"></div>
              {formatDate(item.date)}
            </div>
            {isEvent && item.location && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                {item.location}
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-8">
            {item.description.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {item.tags.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h4 className="font-light text-gray-900 mb-4 text-sm tracking-wider">
                TAGS
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-light tracking-wider bg-gray-100 text-gray-700 px-3 py-1 border border-gray-300"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component
const NewsAndEvents = () => {
  const [items, setItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scrollY, setScrollY] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [selectedItem, setSelectedItem] = useState<NewsEvent | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchNewsAndEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/news-events`
        );
        if (!response.ok)
          throw new Error("Data could not be fetched right now.");
        const data = await response.json();

        const newsEvents = data.data.newsEvents || [];
        const publishedItems = newsEvents
          .filter((item: NewsEvent) => item.status === "Published")
          .sort(
            (a: NewsEvent, b: NewsEvent) =>
              new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
          );

        setItems(publishedItems);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchNewsAndEvents();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return items;
    return items.filter((item) => item.type === activeFilter);
  }, [items, activeFilter]);

  const handleReadMore = (item: NewsEvent) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const parallaxOffset = scrollY * 0.3;

  return (
    <div className="min-h-screen bg-white">
        <title>Ceedee's | News & Events</title>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            News & Events
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">
            Stay Informed
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            Stay updated with our latest announcements, industry insights, and upcoming events across our business portfolio.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <FilterControls
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          {error && (
            <div className="text-center mb-16">
              <div className="border border-red-200 bg-red-50 p-8 max-w-md mx-auto">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center">
                <div className="w-6 h-6 border border-gray-400"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-2">
                No {activeFilter !== "All" && activeFilter.toLowerCase()}s Available
              </h3>
              <p className="text-gray-600">
                Please check back soon for new updates.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredItems.map((item, index) => (
                <NewsEventCard
                  key={item._id}
                  item={item}
                  onReadMore={handleReadMore}
                  index={index}
                  scrollY={scrollY}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Stay Connected
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Follow our journey across different platforms and stay updated with the latest developments
            </p>
          </div>

          <div 
            className="grid md:grid-cols-3 gap-8"
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
            }}
          >
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {items.filter(i => i.type === 'News').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">NEWS UPDATES</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {items.filter(i => i.type === 'Event').length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">EVENTS HOSTED</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-light text-gray-900 mb-2">
                {items.length}
              </div>
              <div className="text-sm text-gray-600 tracking-wider">TOTAL UPDATES</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Partner With Excellence
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Discover how Ceedee Group's diversified expertise can serve your
            business needs across automotive and industrial sectors.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              to="/" 
              className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm"
            >
              EXPLORE COMPANIES
            </Link>
            <Link 
              to="/contact" 
              className="border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm"
            >
              CONTACT GROUP
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Industry News</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Stay informed about developments in automotive services and industrial polymers
              </p>
            </div>
            <div className="bg-gray-50 p-8">
              <h3 className="text-xl font-light text-gray-900 mb-4">Corporate Events</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600 mb-4">
                Join us at conferences, trade shows, and networking events across industries
              </p>
            </div>
          </div>
        </div>
      </section>

      {selectedItem && (
        <NewsDetailModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default NewsAndEvents;