// // @/components/ServicesSection.tsx

// import { useRef, type FC } from 'react';
// import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
// // import { SERVICES_DATA, SERVICES_SECTION_CONFIG } from '@/config/services.config';

// // ============================================================================
// // UI SUB-COMPONENTS
// // ============================================================================

// type ServiceCardProps = Service;

// /**
//  * Renders a single, redesigned service card with a modern, sleek aesthetic.
//  * Features a contained icon, left-aligned text for readability, and enhanced
//  * group-hover effects for better user interaction.
//  * @param {LucideIcon} icon - The icon component to display.
//  * @param {string} title - The title of the service.
//  * @param {string} description - The description of the service.
//  */
// const ServiceCard: FC<ServiceCardProps> = ({ icon: Icon, title, description }) => (
//   <div className="group flex-none snap-center rounded-xl border border-transparent bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 min-w-[90%] sm:min-w-[48%] lg:min-w-0 lg:max-w-none">
//     {/* Contained Icon for stronger visual anchor */}
//     <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-indigo-100 transition-colors duration-300 group-hover:bg-indigo-600">
//       <Icon className="h-7 w-7 text-indigo-600 transition-colors duration-300 group-hover:text-white" />
//     </div>
//     <h3 className="mt-6 text-xl font-bold text-gray-900">
//       {title}
//     </h3>
//     <p className="mt-2 text-base text-gray-600">
//       {description}
//     </p>
//   </div>
// );

// // ============================================================================
// // MAIN SERVICES COMPONENT
// // ============================================================================

// /**
//  * The redesigned ServicesSection component displays a grid of services.
//  * It features a responsive design that transitions from a touch-friendly
//  * carousel on smaller screens to a clean grid layout on desktops.
//  */
// const ServicesSection: FC = () => {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollContainerRef.current) {
//       const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8;
//       scrollContainerRef.current.scrollBy({
//         left: direction === 'left' ? -scrollAmount : scrollAmount,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <section id={SERVICES_SECTION_CONFIG.id} className="bg-gray-50/70 py-20 sm:py-28">
//       <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        
//         {/* Section Header */}
//         <div className="mb-16 text-center">
//           <p className="font-semibold uppercase tracking-wider text-indigo-600">
//             {SERVICES_SECTION_CONFIG.preTitle}
//           </p>
//           <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             {SERVICES_SECTION_CONFIG.title}
//           </h2>
//           <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
//             {SERVICES_SECTION_CONFIG.description}
//           </p>
//         </div>

//         {/* Carousel & Grid Container */}
//         <div className="relative">
//           {/* Navigation Arrows (Visible only on touch/carousel view) */}
//           <button
//             onClick={() => scroll('left')}
//             className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm transition hover:bg-white lg:hidden"
//             aria-label="Scroll left"
//           >
//             <ChevronLeft className="h-6 w-6 text-gray-800" />
//           </button>
//           <button
//             onClick={() => scroll('right')}
//             className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg ring-1 ring-gray-900/5 backdrop-blur-sm transition hover:bg-white lg:hidden"
//             aria-label="Scroll right"
//           >
//             <ChevronRight className="h-6 w-6 text-gray-800" />
//           </button>

//           {/* Scrollable container on mobile, becomes a static grid on desktop.
//             The scrollbar is hidden for a cleaner look.
//           */}
//           <div
//             ref={scrollContainerRef}
//             className="flex gap-8 overflow-x-auto p-4 scroll-smooth snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:overflow-visible lg:p-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//           >
//             {SERVICES_DATA.map((service) => (
//               <ServiceCard key={service.title} {...service} />
//             ))}
//           </div>
//         </div>
        
//       </div>
//     </section>
//   );
// };

// export default ServicesSection;

// /**
//  * NOTE: Make sure to move the services config (types, constants) back to
//  * its original file, e.g., `@/config/services.config.ts`, if it's not
//  * already there. For this example, it's included for completeness.
//  */

// // ============================================================================
// // CONFIGURATION (e.g., @/config/services.config.ts)
// // This part remains unchanged as requested.
// // ============================================================================

// import { Factory, Layers, FlaskConical, Wrench, Cog, Users } from 'lucide-react';

// export type Service = {
//   icon: LucideIcon;
//   title: string;
//   description: string;
// };

// export const SERVICES_SECTION_CONFIG = {
//   id: 'ExploreServices',
//   preTitle: 'Our Expertise',
//   title: 'Solutions to Propel Your Business',
//   description: 'We offer a comprehensive suite of services designed to help you innovate, optimize, and grow in the polymer and automotive sectors.',
// };

// export const SERVICES_DATA: Service[] = [
//   {
//     icon: Factory,
//     title: 'Custom Polymer Manufacturing',
//     description: 'Specializing in precision molding and manufacturing of high-quality polymer components, tailored to meet your specific industrial and commercial requirements.',
//   },
//   {
//     icon: Wrench,
//     title: 'Automotive Service & Repair',
//     description: 'Comprehensive vehicle maintenance and repair services for all makes and models. Our skilled technicians ensure your vehicle runs smoothly and safely.',
//   },
//   {
//     icon: Layers,
//     title: 'Polymer Raw Material Supply',
//     description: 'Your reliable source for industrial-grade polymer granules, resins, and compounds. We ensure consistent quality and timely delivery for your production lines.',
//   },
//   {
//     icon: Cog,
//     title: 'Genuine Automobile Spare Parts',
//     description: 'We supply a vast inventory of genuine and OEM-certified spare parts for a wide range of vehicles, ensuring optimal performance and longevity.',
//   },
//   {
//     icon: FlaskConical,
//     title: 'Product Development & Consultation',
//     description: 'Partner with us to turn your concepts into reality. Our experts provide consultation on material selection, product design, and prototyping for innovative polymer solutions.',
//   },
//   {
//     icon: Users,
//     title: 'Corporate Fleet Management',
//     description: 'Tailored maintenance and management solutions for corporate and commercial vehicle fleets, helping you minimize downtime and reduce operational costs.',
//   },
// ];