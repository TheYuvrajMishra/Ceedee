import { useState} from 'react';
import { useNavigate } from 'react-router';

const VenbroProducts = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const productCategories = [
    { id: 'all', name: 'All Products' },
    { id: 'fabrics', name: 'PP Woven Fabrics' },
    { id: 'sacks', name: 'Food Grade Sacks' },
    { id: 'bags', name: 'Industrial Bags' },
    { id: 'specialty', name: 'Specialty Products' }
  ];

  const products = [
    {
      id: 1,
      category: 'fabrics',
      name: 'Food Grade PP Woven Fabric',
      description: 'High-quality polypropylene woven fabric specifically designed for food packaging applications with superior strength and food safety compliance.',
      specifications: [
        'Material: 100% Virgin Polypropylene',
        'Weight: 80-200 GSM',
        'Width: 61-240 cm',
        'Tensile Strength: 900-1200 N/5cm',
        'Food Grade Certified',
        'UV Stabilized Available'
      ],
      applications: ['Rice Packaging', 'Flour Sacks', 'Sugar Bags', 'Tea Pouches', 'Grain Storage'],
      image: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      category: 'sacks',
      name: 'Wheat Flour Sacks',
      description: 'Durable PP woven sacks designed specifically for wheat flour packaging, ensuring product freshness and protection during storage and transportation.',
      specifications: [
        'Material: Food Grade PP Woven Fabric',
        'Capacity: 5kg - 50kg',
        'Closure: Heat Sealed / Sewn',
        'Printing: Up to 6 Colors',
        'Moisture Resistant',
        'FDA Approved Materials'
      ],
      applications: ['Wheat Flour', 'Atta', 'Maida', 'Sooji', 'Semolina'],
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      category: 'sacks',
      name: 'Rice & Pulses Sacks',
      description: 'Premium quality woven sacks for rice and pulses packaging with excellent barrier properties and durability for long-term storage.',
      specifications: [
        'Material: HDPE Woven with PP Lamination',
        'Capacity: 1kg - 50kg',
        'Barrier Properties: Moisture & Pest Resistant',
        'Bottom: Flat / Gusset Available',
        'Handle: Optional Reinforced Handles',
        'Custom Printing Available'
      ],
      applications: ['Basmati Rice', 'Non-Basmati Rice', 'Dal', 'Pulses', 'Lentils'],
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      category: 'bags',
      name: 'Cement Bags',
      description: 'Heavy-duty PP woven bags engineered for cement packaging with superior strength and durability to withstand rough handling.',
      specifications: [
        'Material: 100% Virgin PP Woven',
        'Weight: 70-120 GSM',
        'Capacity: 25kg - 50kg',
        'Valve Type: Pinch Bottom / Sewn',
        'Tensile Strength: 1200+ N/5cm',
        'Multi-wall Construction Available'
      ],
      applications: ['Portland Cement', 'Ready Mix', 'Mortar', 'Construction Materials', 'Building Supplies'],
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      category: 'bags',
      name: 'Fertilizer Bags',
      description: 'Chemical-resistant PP woven bags designed for fertilizer packaging with enhanced durability and protection against chemical corrosion.',
      specifications: [
        'Material: Chemical Grade PP Woven',
        'Weight: 90-140 GSM',
        'Capacity: 25kg - 50kg',
        'UV Protection: Up to 12 months',
        'Chemical Resistant Coating',
        'Leak-proof Construction'
      ],
      applications: ['Urea', 'DAP', 'NPK Fertilizers', 'Organic Fertilizers', 'Agricultural Chemicals'],
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      category: 'sacks',
      name: 'Sugar Packaging Sacks',
      description: 'Food-safe PP woven sacks for sugar packaging with moisture barrier properties to maintain product quality and prevent contamination.',
      specifications: [
        'Material: Food Grade PP + PE Liner',
        'Capacity: 1kg - 50kg',
        'Moisture Barrier: PE Inner Lining',
        'Closure: Heat Sealed',
        'Printing: Food Safe Inks',
        'Transparent Window Option'
      ],
      applications: ['Crystal Sugar', 'Powdered Sugar', 'Brown Sugar', 'Jaggery', 'Sweeteners'],
      image: 'https://media.istockphoto.com/photos/stacks-of-sacks-picture-id118398910?k=6&m=118398910&s=612x612&w=0&h=XLKBwcquxJsez-3tTcrGT2fCPbfesh9ntXrPUZ1xS94='
    },
    {
      id: 7,
      category: 'specialty',
      name: 'Tea Packaging Bags',
      description: 'Specialized packaging solutions for tea with aroma retention properties and elegant presentation for premium tea brands.',
      specifications: [
        'Material: Food Grade PP Woven + Foil',
        'Weight: 60-100 GSM',
        'Aroma Barrier: Aluminum Foil Lining',
        'Closure: Zip Lock / Heat Seal',
        'Printing: High Quality Graphics',
        'Various Sizes Available'
      ],
      applications: ['Black Tea', 'Green Tea', 'Herbal Tea', 'Tea Leaves', 'Premium Blends'],
      image: 'https://tse4.mm.bing.net/th/id/OIP.nOXKLLVWdQUeI57Yook2-gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id: 8,
      category: 'specialty',
      name: 'Cattle Feed Bags',
      description: 'Nutritional-grade packaging for cattle feed with enhanced protection against moisture and pests to maintain feed quality.',
      specifications: [
        'Material: PP Woven + PE Liner',
        'Capacity: 10kg - 50kg',
        'Pest Resistant Coating',
        'Ventilation: Micro-perforations',
        'UV Stabilized',
        'Easy Handling Design'
      ],
      applications: ['Cattle Feed', 'Poultry Feed', 'Dairy Feed', 'Pet Food', 'Animal Nutrition'],
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 9,
      category: 'specialty',
      name: 'Activated Charcoal Bags',
      description: 'Specialized packaging for activated charcoal with dust-proof construction and superior sealing to prevent contamination.',
      specifications: [
        'Material: Anti-Static PP Woven',
        'Weight: 100-150 GSM',
        'Dust Proof Construction',
        'Anti-Static Properties',
        'Multiple Closure Options',
        'Custom Sizes Available'
      ],
      applications: ['Activated Charcoal', 'Industrial Carbon', 'Water Treatment', 'Air Purification', 'Chemical Processing'],
      image: 'https://tse3.mm.bing.net/th/id/OIP.dVTrUy09D-52JjTI3Mp3aQHaFj?rs=1&pid=ImgDetMain&o=7&rm=3'
    }
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <title>Ceedee's | Venbro Polymer's Products</title>
      {/* Hero Section */}
      <section className="relative py-24 bg-gray-900 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-fixed bg-center opacity-20"
          style={{
            // transform: `translateY(${parallaxOffset}px)`,
            backgroundImage: `url('https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-light mb-6 tracking-wide">
            Our Products
          </h1>
          <div className="w-24 h-px bg-white mx-auto mb-8"></div>
          <p className="text-xl font-light mb-4">
            Food Grade PP Woven Solutions
          </p>
          <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
            Premium quality polypropylene woven fabrics, sacks and bags designed for diverse packaging needs across industries since 1995.
          </p>
        </div>
      </section>

      {/* Product Categories Filter */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-gray-900 mb-4">Product Categories</h2>
            <div className="w-16 h-px bg-gray-900 mx-auto"></div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {productCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 text-sm cursor-pointer font-light tracking-wider border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                }`}
              >
                {category.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white border border-gray-200 hover:border-gray-900 transition-colors duration-300 group"
                style={{
                  // transform: `translateY(${scrollY * 0.02 * (index + 1)}px)`,
                }}
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover  group-hover:-0 transition-all duration-300"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-4 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  {/* Specifications */}
                  <div className="mb-6">
                    <h4 className="text-sm font-light text-gray-900 mb-3 tracking-wider">
                      SPECIFICATIONS
                    </h4>
                    <div className="w-12 h-px bg-gray-400 mb-4"></div>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, specIndex) => (
                        <li key={specIndex} className="text-sm text-gray-600 flex items-start">
                          <div className="w-2 h-2 border border-gray-400 mt-2 mr-3 flex-shrink-0"></div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-sm font-light text-gray-900 mb-3 tracking-wider">
                      APPLICATIONS
                    </h4>
                    <div className="w-12 h-px bg-gray-400 mb-4"></div>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, appIndex) => (
                        <span 
                          key={appIndex}
                          className="px-3 py-1 text-xs font-light tracking-wider bg-gray-100 text-gray-700 border border-gray-300"
                        >
                          {app.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials & Quality Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
              Materials & Quality
            </h2>
            <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We use only the finest raw materials and adhere to strict quality standards in our manufacturing process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div 
                className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                  // transform: `translateY(${scrollY * 0.02}px)`,
                }}
              >
                <div className="w-8 h-8 border border-gray-500"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Virgin Polypropylene</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                100% virgin PP resin sourced from certified suppliers ensuring consistent quality and performance
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                  // transform: `translateY(${scrollY * 0.025}px)`,
                }}
              >
                <div className="w-8 h-8 border border-gray-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">Food Grade Certified</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                FDA approved materials with food safety certifications for direct food contact applications
              </p>
            </div>

            <div className="text-center">
              <div 
                className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center"
                style={{
                  // transform: `translateY(${scrollY * 0.03}px)`,
                }}
              >
                <div className="w-6 h-6 border-2 border-gray-500"></div>
              </div>
              <h3 className="text-xl font-light text-gray-900 mb-4">ISO 9002 Quality</h3>
              <div className="w-12 h-px bg-gray-400 mx-auto mb-4"></div>
              <p className="text-gray-600 leading-relaxed">
                Rigorous quality control processes following ISO 9002 standards from raw material to finished products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8">
                Technical Excellence
              </h2>
              <div className="w-16 h-px bg-gray-900 mb-8"></div>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p>
                  Our manufacturing facility is equipped with state-of-the-art circular looms and lamination units, enabling us to produce high-quality PP woven fabrics with consistent specifications.
                </p>
                <p>
                  Advanced quality testing equipment ensures that every batch meets international standards for tensile strength, elongation, and dimensional stability.
                </p>
                <p>
                  Custom printing capabilities with food-grade inks allow for branded packaging solutions while maintaining product safety standards.
                </p>
              </div>
            </div>
            
            <div 
              className="relative"
              style={{
                // transform: `translateY(${scrollY * 0.1}px)`,
              }}
            >
              <div className="bg-gray-100 p-8 border border-gray-200">
                <h3 className="text-xl font-light text-gray-900 mb-6">Standard Specifications</h3>
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Fabric Weight</span>
                    <span className="text-gray-900">60-200 GSM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Width Range</span>
                    <span className="text-gray-900">61-240 cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">Tensile Strength</span>
                    <span className="text-gray-900">900-1500 N/5cm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-300">
                    <span className="text-gray-600">UV Stability</span>
                    <span className="text-gray-900">Up to 12 months</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Temperature Range</span>
                    <span className="text-gray-900">-40°C to +80°C</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">
            Quality Packaging Solutions
          </h2>
          <div className="w-16 h-px bg-gray-900 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 mb-12 leading-relaxed">
            Partner with Venbro Polymers for reliable, food-grade packaging solutions that protect your products and enhance your brand value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={()=>navigate("/")} className="bg-gray-900 cursor-pointer text-white px-8 py-3 hover:bg-gray-800 transition-colors duration-300 tracking-wider text-sm">
              REQUEST QUOTE
            </button>
            <button className="border cursor-pointer border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 transition-colors duration-300 tracking-wider text-sm">
              TECHNICAL SPECS
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-light text-gray-900 mb-4">Custom Solutions</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600">
                Tailored packaging solutions designed to meet your specific product requirements and branding needs.
              </p>
            </div>
            <div className="bg-white p-8 border border-gray-200">
              <h3 className="text-xl font-light text-gray-900 mb-4">Bulk Manufacturing</h3>
              <div className="w-12 h-px bg-gray-400 mb-4"></div>
              <p className="text-gray-600">
                Large-scale production capabilities with consistent quality and on-time delivery for industrial requirements.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VenbroProducts;