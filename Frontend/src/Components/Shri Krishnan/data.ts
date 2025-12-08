type LandingPageData = {
  hero: {
    logo: string;
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    backgroundImage: string;
    buttons: {
      primary: string;
      secondary: string;
    };
    theme: "red" | "blue"
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

export const skaeData: LandingPageData = {
  hero: {
    logo: "skae_logo.png",
    title: "SKA Enterprises",
    subtitle: "~By Ceedee Group",
    tagline: "The Oldest Service Centre in South India",
    description: "Available 6 days a week for all Maruti Cars since 1986",
    backgroundImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    buttons: {
      primary: "BOOK SERVICE",
      secondary: "CONTACT US"
    },
    theme: "red"
  },
  legacy: {
    title: "Our Legacy",
    content: [
      "Sri Krishna Automobile Enterprises (SKAE), in existence since <span class=\"font-medium\">1986</span>, is The Longest Serving Maruti Authorized Service Station (MASS) in South India.",
      "This is an <span class=\"font-medium\">\"A\" Grade MASS</span>, undertaking Free Service, Running, Major and Accident Repairs, all under one roof.",
      "Our facility operates Six days a week and provides <span class=\"font-medium\">3Q Service</span> - Quick and Quality Services, at Quite low prices - enriching customer experience that keeps our customers coming back."
    ],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Auto service facility"
  },
  philosophy: {
    title: "3Q Service Excellence",
    subtitle: "Our commitment to providing Quick and Quality Services at Quite low prices",
    cards: [
      {
        title: "Quick",
        description: "Fast and efficient service delivery without compromising on thoroughness. Your time is valuable to us.",
        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Quick service"
      },
      {
        title: "Quality",
        description: "Uncompromising quality standards with genuine spares and trained technicians for every service.",
        image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        imageAlt: "Quality service"
      },
      {
        title: "Quite Low Prices",
        description: "Competitive and transparent pricing that offers exceptional value without hidden costs.",
        image: "https://marinemakeover.com/images/2021/08/26/motorservice.jpg",
        imageAlt: "Affordable pricing"
      }
    ]
  },
  services: {
    title: "Our Services",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Maruti service",
    services: [
      {
        title: "Authorized Maruti Service",
        description: "Complete range of Maruti services including Free Service, Running repairs, Major overhauls, and Accident repairs - all under one roof."
      },
      {
        title: "Multi-Brand Service",
        description: "Through Ceedee's Automobile Enterprises, we extend our expertise to service all other makes of cars with the same dedication and quality."
      },
      {
        title: "Insurance Services",
        description: "Comprehensive insurance services to mitigate risks and provide complete peace of mind for automobile users."
      },
      {
        title: "Genuine Parts & Expert Technicians",
        description: "Only genuine spares are used, and all vehicles are handled by trained and certified technicians."
      }
    ]
  },
  certification: {
    title: "A-Grade Excellence",
    description: "As an \"A\" Grade Maruti Authorized Service Station (MASS), we maintain the highest standards of service quality and customer satisfaction in South India.",
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Professional service",
    backgroundColor: "bg-black/95",
    stats: [
      { value: "Since 1986", label: "LONGEST SERVING" },
      { value: "A-Grade", label: "MASS CERTIFICATION" },
      { value: "6 Days", label: "WEEKLY SERVICE" },
      { value: "3Q", label: "SERVICE PROMISE" }
    ]
  },
  experience: {
    title: "Customer Experience",
    description: "Our commitment to enriching customer experience keeps our clients coming back for all their automotive service needs.",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    imageAlt: "Customer service",
    leftColumn: {
      title: "Why Choose SKAE?",
      points: [
        "Longest serving Maruti service center in South India",
        "\"A\" Grade MASS certification",
        "Complete service range under one roof",
        "Six days a week availability",
        "Genuine parts guarantee",
        "Trained and certified technicians"
      ]
    },
    rightColumn: {
      title: "Extended Services",
      points: [
        "Comprehensive insurance solutions",
        "Multi-brand service through Ceedee's",
        "Accident repair specialists",
        "Free service programs",
        "Emergency repair services",
        "Customer-focused pricing"
      ]
    }
  },
  cta: {
    title: "Experience Excellence",
    description: "Trust your vehicle to South India's most experienced and reliable automobile service center.",
    buttons: {
      primary: "BOOK SERVICE NOW",
      secondary: "GET QUOTE"
    }
  }
};
