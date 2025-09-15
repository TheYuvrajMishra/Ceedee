type LandingPageData = {
  hero: {
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    backgroundImage: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
  legacy: {
    title: string;
    content: string[];
    image: string;
    imageAlt: string;
  };
  philosophy: {
    title: string;
    subtitle: string;
    cards: {
      title: string;
      description: string;
      image: string;
      imageAlt: string;
    }[];
  };
  services: {
    title: string;
    image: string;
    imageAlt: string;
    services: {
      title: string;
      description: string;
    }[];
  };
  certification: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    backgroundColor: string;
    stats: {
      value: string;
      label: string;
    }[];
  };
  experience: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    leftColumn: {
      title: string;
      points: string[];
    };
    rightColumn: {
      title: string;
      points: string[];
    };
  };
  cta: {
    title: string;
    description: string;
    buttons: {
      primary: string;
      secondary: string;
    };
  };
};

export const venbroData: LandingPageData = {
  hero: {
    title: "Venbro Polymers",
    subtitle: "",
    tagline: "20+ Years of Industrial Experience",
    description: "Maintaining high standards in Food Grade PP Woven Fabrics, Sacks and Bags for Indian and International markets",
    backgroundImage: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    buttons: {
      primary: "VIEW PRODUCTS",
      secondary: "CONTACT US"
    }
  },
  legacy: {
    title: "Our Legacy",
    content: [
      "Venbro Polymers has grown from its inception in <span class=\"font-medium\">1995</span>, under the leadership of <span class=\"font-medium\">D.Venkateswaran and D. Shanmugasundaram</span>, in developing and delivering suitable solutions with their Food Grade PP Woven Fabrics, Sacks and Bags, for the Indian and International markets.",
      "Our expertise in manufacturing and delivering PP Woven Fabrics, Sacks and Bags at right time, to the manufacturing units, supports them to pack and ship their consignments on time.",
      "The need for the best packaging solutions across industry segments has given opportunities to Venbro Polymers to provide quality solutions across diverse sectors."
    ],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Industrial manufacturing facility"
  },
  philosophy: {
    title: "Our Vision & Mission",
    subtitle: "Committed to excellence through Innovation, Teamwork, and Ethical practices",
    cards: [
      {
        title: "Growth & Employment",
        description: "Assuring Happiness through Growth to 1000+ employees in 2025, creating opportunities and fostering professional development.",
        image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Team collaboration"
      },
      {
        title: "Innovation & Quality",
        description: "Developing into a Rs.300 Crore Manufacturing and Trading company in the Technical Textiles field through continuous innovation.",
        image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Manufacturing innovation"
      },
      {
        title: "Customer Satisfaction",
        description: "Constant addition to Customer value and Satisfaction through ethical practices and reliable service delivery.",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Customer satisfaction"
      }
    ]
  },
  services: {
    title: "Our Products & Services",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Textile manufacturing process",
    services: [
      {
        title: "Food Grade PP Woven Fabrics",
        description: "High-quality fabrics designed specifically for food packaging applications, ensuring safety and compliance with international standards."
      },
      {
        title: "Agricultural & Food Products Packaging",
        description: "Specialized sacks and bags for Rice, Pulses, Wheat Flour, Sooji, Atta, Maida, Tea, and other food commodities."
      },
      {
        title: "Industrial & Specialty Applications",
        description: "Packaging solutions for Desiccated Coconut, Oil Cakes, Turmeric, Sugar, Activated Charcoal, Cattle Feed, and Sabudana."
      },
      {
        title: "Construction & Fertilizer Packaging",
        description: "Robust and durable packaging solutions for Fertilizer, Cement, and other industrial materials requiring heavy-duty protection."
      }
    ]
  },
  certification: {
    title: "Quality Excellence",
    description: "We maintain the highest quality standards with internationally recognized certifications, ensuring excellence in every product we manufacture and deliver.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Quality control and certification",
    backgroundColor: "bg-gray-900",
    stats: [
      { value: "Since 1995", label: "ESTABLISHED" },
      { value: "ISO 9002", label: "CERTIFIED" },
      { value: "ZED", label: "CERTIFIED" },
      { value: "₹300Cr", label: "TARGET REVENUE" },
      { value: "1000+", label: "EMPLOYEE GOAL" },
      { value: "International", label: "MARKETS" }
    ]
  },
  experience: {
    title: "Industry Excellence",
    description: "Our commitment to delivering the best packaging solutions across industry segments has established us as a trusted partner for businesses nationwide.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Manufacturing excellence",
    leftColumn: {
      title: "Food & Agriculture",
      points: [
        "Rice and Pulses packaging",
        "Wheat Flour, Sooji, Atta, Maida solutions",
        "Tea and beverage packaging",
        "Desiccated Coconut containers",
        "Oil Cakes and agricultural products",
        "Turmeric and spice packaging"
      ]
    },
    rightColumn: {
      title: "Industrial & Specialty",
      points: [
        "Sugar and sweetener packaging",
        "Activated Charcoal containers",
        "Cattle Feed and nutrition products",
        "Sabudana packaging solutions",
        "Fertilizer and agricultural chemicals",
        "Cement and construction materials"
      ]
    }
  },
  cta: {
    title: "Partner With Excellence",
    description: "Experience two decades of industrial expertise and commitment to quality. Let us provide the perfect packaging solution for your business needs.",
    buttons: {
      primary: "GET QUOTE",
      secondary: "EXPLORE PRODUCTS"
    }
  }
};
