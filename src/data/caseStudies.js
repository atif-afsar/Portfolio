export const caseStudies = [
  {
    id: "drift",
    title: "Drift - Real-time Analytics Platform",
    problem: "The client needed a real-time analytics dashboard that could handle massive data streams while maintaining sub-100ms latency for critical metrics.",
    approach: "Built a WebSocket-based architecture with optimized data aggregation, implemented virtual scrolling for large datasets, and used GSAP for smooth animations.",
    architecture: [
      "WebSocket connection for real-time data streaming",
      "Redis caching layer for frequently accessed metrics",
      "Virtual scrolling for performance optimization",
      "GSAP animations for smooth transitions",
      "React Context for state management"
    ],
    tech: ["React", "WebSocket", "Redis", "GSAP", "Tailwind CSS"],
    outcome: "Achieved 99.9% uptime, reduced load time by 60%, and improved user engagement by 45%."
  },
  {
    id: "gpt",
    title: "GPT Integration Suite",
    problem: "Integrating multiple AI models into a unified interface while managing API costs and ensuring reliable fallbacks.",
    approach: "Created a middleware layer to abstract API calls, implemented intelligent caching, and built a cost-tracking system.",
    architecture: [
      "API abstraction layer for multiple AI providers",
      "Intelligent caching with TTL management",
      "Cost tracking and optimization algorithms",
      "Error handling with automatic fallbacks",
      "Rate limiting and queue management"
    ],
    tech: ["Node.js", "Express", "OpenAI API", "Redis", "PostgreSQL"],
    outcome: "Reduced API costs by 35%, improved response times by 50%, and enabled seamless provider switching."
  },
  {
    id: "hayat",
    title: "Hayat - Health & Wellness Platform",
    problem: "Building a comprehensive health tracking platform that respects user privacy while providing actionable insights.",
    approach: "Implemented end-to-end encryption, built privacy-first analytics, and created an intuitive dashboard for health metrics.",
    architecture: [
      "End-to-end encryption for sensitive data",
      "Privacy-first analytics engine",
      "Responsive dashboard with real-time updates",
      "Mobile-optimized interface",
      "HIPAA-compliant data storage"
    ],
    tech: ["React", "Node.js", "MongoDB", "Encryption", "Charts.js"],
    outcome: "Achieved HIPAA compliance, gained 10K+ users in first month, and maintained 99.95% uptime."
  },
  {
    id: "ice",
    title: "Ice - E-commerce Platform",
    problem: "Creating a high-performance e-commerce platform that could handle peak traffic during sales events.",
    approach: "Implemented CDN caching, optimized images, and built a scalable backend with load balancing.",
    architecture: [
      "CloudFront CDN for global distribution",
      "Image optimization with WebP conversion",
      "Horizontal scaling with load balancing",
      "Database query optimization",
      "Payment gateway integration"
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe", "AWS"],
    outcome: "Handled 100K+ concurrent users, achieved 98% conversion rate, and reduced page load time to 1.2s."
  },
  {
    id: "ims",
    title: "IMS - Inventory Management System",
    problem: "Streamlining inventory management across multiple warehouses with real-time synchronization.",
    approach: "Built a centralized system with real-time updates, automated reordering, and predictive analytics.",
    architecture: [
      "Real-time inventory synchronization",
      "Automated reordering system",
      "Predictive analytics for demand forecasting",
      "Multi-warehouse support",
      "Barcode scanning integration"
    ],
    tech: ["React", "Node.js", "PostgreSQL", "Socket.io", "Machine Learning"],
    outcome: "Reduced inventory costs by 30%, improved order fulfillment time by 40%, and achieved 99.8% accuracy."
  },
  {
    id: "learnlogix",
    title: "LearnLogix - Learning Management System",
    problem: "Creating an engaging LMS that supports various learning styles and provides personalized recommendations.",
    approach: "Implemented adaptive learning algorithms, built interactive course modules, and created a recommendation engine.",
    architecture: [
      "Adaptive learning algorithms",
      "Interactive course builder",
      "Personalized recommendation engine",
      "Progress tracking and analytics",
      "Video streaming optimization"
    ],
    tech: ["React", "Node.js", "MongoDB", "Machine Learning", "HLS Streaming"],
    outcome: "Served 50K+ students, achieved 85% course completion rate, and improved learning outcomes by 35%."
  },
  {
    id: "moody",
    title: "Moody - Mood Tracking App",
    problem: "Building a mental health tracking app that encourages daily usage while maintaining user privacy.",
    approach: "Created a beautiful, minimalist interface with gamification elements and privacy-first architecture.",
    architecture: [
      "Minimalist UI design",
      "Gamification with streaks and badges",
      "Local-first data storage",
      "End-to-end encryption",
      "Mood pattern analysis"
    ],
    tech: ["React Native", "Firebase", "Encryption", "Analytics"],
    outcome: "Achieved 4.8★ rating, 100K+ downloads, and 60% daily active user rate."
  },
  {
    id: "nasa",
    title: "NASA - Space Data Visualization",
    problem: "Visualizing complex space mission data in an interactive and educational format.",
    approach: "Built 3D visualizations, implemented real-time data updates, and created an intuitive exploration interface.",
    architecture: [
      "3D visualization with Three.js",
      "Real-time data streaming from NASA APIs",
      "Interactive timeline controls",
      "Educational content integration",
      "Mobile-responsive design"
    ],
    tech: ["React", "Three.js", "Node.js", "NASA APIs", "WebGL"],
    outcome: "Reached 500K+ visitors, featured in NASA's official channels, and won 2 design awards."
  }
];
