import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const carouselData = [
  {
    id: 1,
    title: "High-Quality Packaging",
    subtitle: "World-class PP woven fabrics, sacks, and bags",
    description:
      "We ensure timely delivery of rice, flour, tea, sugar, fertilizer, and cement packaging, helping manufacturers avoid costly delays and maintain operational efficiency.",
    image: "/images/01.png",
  },
  {
    id: 2,
    title: "Durable PP Fabrics",
    subtitle: "Strong, reliable & eco-friendly woven solutions",
    description:
      "Our products are trusted by industries worldwide for their exceptional strength, durability, and cost efficiency in complex logistics operations.",
    image: "/images/02.png",
  },
  {
    id: 3,
    title: "Trusted by 1000+ Clients",
    subtitle: "Partnering growth with excellence",
    description:
      "With a skilled workforce and cutting-edge technology, Venbro Polymers leads in innovation, customer satisfaction, and sustainable packaging solutions.",
    image: "/images/03.png",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setCurrent((prevIndex) => {
      if (newDirection === 1) {
        return prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1;
      }
      return prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1;
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(interval);
  }, [paginate]);

  return (
    <section className="relative w-full bg-gradient-to-br from-yellow-50 via-white to-gray-100 py-12 sm:py-16">
      <div className="absolute inset-0 bg-grid-slate-200/20 bg-[length:40px_40px]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold underline text-gray-900 text-center mb-4 sm:mb-5 tracking-tight">
          Industrial Packaging Applications
        </h1>
        <p className="text-center text-sm sm:text-base mb-8 sm:mb-12">
          The need for the best of the packaging solutions across industry segments, has given opportunities to Venbro Polymers
        </p>

        {/* Carousel Content */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12">
            {/* Left: Text Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselData[current].id}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-6 text-center lg:text-left"
              >
                <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 uppercase tracking-tight">
                  {carouselData[current].title}
                </h2>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                  {carouselData[current].subtitle}
                </p>
                <p className="text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {carouselData[current].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Right: Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={carouselData[current].image}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center"
              >
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-[350px] sm:h-[400px] lg:h-[450px] flex items-center justify-center">
                  <img
                    src={carouselData[current].image}
                    alt={carouselData[current].title}
                    className="h-full w-auto object-contain rounded-xl border border-gray-200 p-4"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2 sm:px-4 pointer-events-none">
            <button
              onClick={() => paginate(-1)}
              className="bg-black/80 text-yellow-400 p-3 sm:p-4 rounded-full shadow-md hover:scale-105 transition pointer-events-auto"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="bg-black/80 text-yellow-400 p-3 sm:p-4 rounded-full shadow-md hover:scale-105 transition pointer-events-auto"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-8 sm:mt-12 space-x-2 sm:space-x-3">
          {carouselData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full transition-all ${
                current === index
                  ? "bg-black scale-110 sm:scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
