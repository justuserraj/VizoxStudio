export interface CaseStudy {
  businessOverview: string;
  problem: string;
  whatWeDid: string[];
  outcome: string;
  screenshots: string[];
}

export interface FullCaseStudy {
  fullOverview: string;
  problemStatement: string;
  solutionDelivered: { title: string; description: string }[];
  businessImpact: string;
}

export interface Project {
  slug: string;
  title: string;
  context: string;
  category: string;
  image: string;
  alt: string;
  caseStudy: CaseStudy;
  fullCaseStudy: FullCaseStudy;
}

export const PORTFOLIO_ITEMS: Project[] = [
  {
    slug: "coffee-roast",
    title: "Coffee Roast",
    context: "A premium coffee brand scaling its direct-to-consumer digital presence.",
    category: "Digital Transformation",
    image: "/images/Pic/coffeeroastsite/coffeeroastsite.netlify.app [1].png",
    alt: "Coffee Roast brand digital presence",
    caseStudy: {
      businessOverview: "Coffee Roast is a premium coffee roastery looking to bridge the gap between their high-quality physical products and their online customer experience.",
      problem: "The brand lacked a professional digital storefront, resulting in missed opportunities for direct-to-consumer sales and a weak online brand perception.",
      whatWeDid: [
        "Digital infrastructure development",
        "Brand positioning alignment",
        "User experience restructuring"
      ],
      outcome: "We helped this business establish a credible online presence that accurately reflects their premium market position and facilitates seamless customer acquisition.",
      screenshots: [
        "/images/Pic/coffeeroastsite/coffeeroastsite.netlify.app [1].png",
        "/images/Pic/coffeeroastsite/coffeeroastsite.netlify.app [2].png",
        "/images/Pic/coffeeroastsite/coffeeroastsite.netlify.app [3].png"
      ]
    },
    fullCaseStudy: {
      fullOverview: "Coffee Roast approached Vizox Studio with a clear mission: establish a strong digital presence that would reflect the premium quality of their products and drive direct-to-consumer sales. The brand had a loyal local following but lacked a professional digital infrastructure capable of converting online interest into business growth.",
      problemStatement: "Despite having a superior product, Coffee Roast was losing potential market share due to an outdated digital presence. Their online touchpoints didn't communicate the 'premium' nature of the brand, leading to high bounce rates and low customer trust during the digital discovery phase.",
      solutionDelivered: [
        {
          title: "Strategic Digital Infrastructure",
          description: "We engineered a high-performance digital platform built for speed and reliability, ensuring the first touchpoint with customers is seamless."
        },
        {
          title: "Brand Perception Alignment",
          description: "We restructured their visual and narrative communication to align with their high-end market positioning, using rich palettes and sophisticated typography."
        },
        {
          title: "Conversion Path Optimization",
          description: "We simplified the digital journey from discovery to action, removing friction points that previously hindered business growth."
        }
      ],
      businessImpact: "The project resulted in a significant improvement in brand authority and a more professional digital identity that successfully supports their long-term growth objectives."
    }
  },
  {
    slug: "mazaqal-reef-bakery",
    title: "Mazaqal Reef Bakery",
    context: "An artisanal bakery transitioning from traditional walk-ins to a digital-first customer approach.",
    category: "Business Digitization",
    image: "/images/Pic/mazaqalreefbakery/mazaqalreefbakery.netlify.app [1].png",
    alt: "Mazaqal Reef Bakery digital identity",
    caseStudy: {
      businessOverview: "Mazaqal Reef Bakery is a established local producer of artisanal baked goods seeking to expand their reach beyond physical foot traffic.",
      problem: "The business had no digital identity, making it difficult for new customers to discover their services or understand their full product range online.",
      whatWeDid: [
        "Digital storefront design",
        "Information architecture restructuring",
        "Local search visibility improvement"
      ],
      outcome: "We helped this business improve its digital presence, making their traditional artisanal offerings accessible to a wider modern audience.",
      screenshots: [
        "/images/Pic/mazaqalreefbakery/mazaqalreefbakery.netlify.app [1].png",
        "/images/Pic/mazaqalreefbakery/mazaqalreefbakery.netlify.app [2].png",
        "/images/Pic/mazaqalreefbakery/mazaqalreefbakery.netlify.app [3].png"
      ]
    },
    fullCaseStudy: {
      fullOverview: "Mazaqal Reef Bakery is a beloved local artisanal producer with a strong reputation for quality. However, they were operating in a digital blind spot, relying entirely on physical location for customer acquisition.",
      problemStatement: "The lack of a digital presence meant the business was invisible to the growing demographic of customers who search for local services online. There was no centralized platform to showcase their seasonal offerings or build a digital relationship with their community.",
      solutionDelivered: [
        {
          title: "Digital Presence Foundation",
          description: "We built a professional digital storefront that serves as the central hub for their brand story and product showcase."
        },
        {
          title: "Strategic Content Structure",
          description: "We organized their extensive product range into a digestible digital menu, prioritizing ease of navigation for all user demographics."
        },
        {
          title: "Visual Brand Storytelling",
          description: "We utilized high-quality visual assets to communicate the warmth and tradition of the bakery, bridging the gap between the physical and digital experience."
        }
      ],
      businessImpact: "The business now possesses a professional digital identity that has improved its local market visibility and streamlined customer inquiries."
    }
  },
  {
    slug: "the-brothers-cafe",
    title: "The Brothers Cafe",
    context: "A local dining establishment modernizing its customer engagement and digital identity.",
    category: "Digital Experience",
    image: "/images/Pic/thebrotherscafeandrestaurantbgs/thebrotherscafeandrestaurantbgs.netlify.app [1].png",
    alt: "The Brothers Cafe digital presence",
    caseStudy: {
      businessOverview: "The Brothers Cafe & Restaurant is a local favorite that needed to align its digital experience with the high quality of its physical dining service.",
      problem: "Their digital presence was poorly structured, making it difficult for customers to find essential information like menus and location details efficiently.",
      whatWeDid: [
        "Digital menu restructuring",
        "User experience design",
        "Brand visual enhancement"
      ],
      outcome: "We helped this business improve its digital presence by creating a well-structured platform that makes customer engagement effortless and professional.",
      screenshots: [
        "/images/Pic/thebrotherscafeandrestaurantbgs/thebrotherscafeandrestaurantbgs.netlify.app [1].png",
        "/images/Pic/thebrotherscafeandrestaurantbgs/thebrotherscafeandrestaurantbgs.netlify.app [2].png",
        "/images/Pic/thebrotherscafeandrestaurantbgs/thebrotherscafeandrestaurantbgs.netlify.app [3].png"
      ]
    },
    fullCaseStudy: {
      fullOverview: "The Brothers Cafe & Restaurant required a digital identity that reflected their commitment to quality. They needed to move from a basic online presence to a strategic platform that drives customer visits.",
      problemStatement: "The existing digital touchpoints were fragmented and not optimized for mobile users—the primary demographic for restaurant searches. This friction was preventing potential diners from committing to a visit.",
      solutionDelivered: [
        {
          title: "Mobile-First Information Architecture",
          description: "We restructured the digital platform to prioritize the most requested information, ensuring a seamless experience on mobile devices."
        },
        {
          title: "Visual Identity Modernization",
          description: "We implemented a warm, sophisticated design system that captures the physical ambiance of the restaurant and applies it to the digital space."
        },
        {
          title: "Interactive Menu Systems",
          description: "We replaced static, hard-to-read menus with a dynamic, well-structured digital menu system that improves user engagement."
        }
      ],
      businessImpact: "The result is a more professional brand perception and a significantly improved digital journey for their customers."
    }
  },
  {
    slug: "hulk-gym",
    title: "Hulk Gym",
    context: "A specialized fitness facility focused on member acquisition through a high-impact digital presence.",
    category: "Business Growth",
    image: "/images/Pic/hulkgymbgs/hulkgymbgs.netlify.app [1].png",
    alt: "Hulk Gym digital growth platform",
    caseStudy: {
      businessOverview: "Hulk Gym is a specialized fitness facility that needed to translate its high-energy environment into a professional lead-generation tool.",
      problem: "The business lacked a central digital platform to showcase its specialized equipment and training programs, limiting its ability to attract new members beyond word-of-mouth.",
      whatWeDid: [
        "Lead generation infrastructure",
        "Visual authority building",
        "Service structure optimization"
      ],
      outcome: "We helped this business improve its digital presence, transforming their online identity into a high-impact tool for professional member acquisition.",
      screenshots: [
        "/images/Pic/hulkgymbgs/hulkgymbgs.netlify.app [1].png",
        "/images/Pic/hulkgymbgs/hulkgymbgs.netlify.app [2].png",
        "/images/Pic/hulkgymbgs/hulkgymbgs.netlify.app [3].png"
      ]
    },
    fullCaseStudy: {
      fullOverview: "Hulk Gym needed to establish a dominant digital footprint to compete in a crowded fitness market. They required more than just a website; they needed a business-focused growth platform.",
      problemStatement: "Without a professional digital presence, Hulk Gym was struggling to communicate the unique value of their specialized training environment, leading to stagnant membership growth.",
      solutionDelivered: [
        {
          title: "Strategic Visual Presence",
          description: "We developed a high-energy visual system that builds instant authority and resonates with their target demographic."
        },
        {
          title: "Conversion-Focused Structure",
          description: "We designed a streamlined user journey focused on moving prospects from discovery to facility inquiry."
        },
        {
          title: "Facility Showcase Strategy",
          description: "We organized their amenities and programs into a professional digital showcase that builds trust before a prospect even enters the gym."
        }
      ],
      businessImpact: "The gym now possesses a professional digital asset that actively supports their member acquisition goals and strengthens their local market position."
    }
  }
];

export interface Service {
  slug: string;
  title: string;
  description: string;
  icon: any; // We'll handle icons in the component
  fullDescription: string;
  process: string[];
}

export const SERVICES_DATA = [
  {
    slug: "brand-foundation",
    title: "Brand Foundation",
    description: "Establishing visual authority and trust signals.",
    fullDescription: "With over 5 years of experience in the Indian market, we build brand systems that establish trust instantly and position you as a market leader. Your brand foundation is more than a logo; it's a strategic asset designed to drive conversion.",
    process: [
      "Market Discovery & Competitor Analysis",
      "Visual Identity Strategy",
      "Psychological Color Mapping",
      "Brand Guidelines Development",
      "Visual Trust Signals Optimization"
    ]
  },
  {
    slug: "digital-infrastructure",
    title: "Digital Infrastructure",
    description: "Engineering high-performance online presences.",
    fullDescription: "We build digital backbones that are engineered for growth. Using Next.js and high-performance architectures, we ensure your website is fast, secure, and ready to handle scale without compromises.",
    process: [
      "High-Performance Architecture Design",
      "SEO-Engineered Code Structure",
      "Mobile-First Responsive Systems",
      "Secure & Scalable Hosting Setup",
      "Conversion Pixel & Tracking Integration"
    ]
  },
  {
    slug: "growth-systems",
    title: "Growth Systems",
    description: "Conversion-first strategies for predictable results.",
    fullDescription: "Traffic is a vanity metric; conversion is a business metric. We deploy data-driven systems that turn interest into revenue by optimizing every touchpoint of your user journey.",
    process: [
      "Landing Page Optimization (LPO)",
      "User Journey Mapping",
      "Lead Capture Automation",
      "High-Intent Traffic Strategy",
      "ROI Tracking & Performance Analysis"
    ]
  }
];
