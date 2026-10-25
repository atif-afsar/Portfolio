// Exactly the projects on the current resume (MarTech & Digital Growth
// Developer), in the resume's order. Images live in /public (old .png shots)
// or /public/projects (.webp shots).
export const projects = [
  // ---------- Commercial agency & live client projects ----------
  {
    id: "erp",
    featured: true,
    title: "EduNexus – School & Coaching ERP Software",
    description:
      "Developed a centralized full-stack MERN ERP that digitizes admissions, fee collection and institutional operations for schools and coaching institutes in India. Live as a cloud product covering admissions, attendance with QR check-in, UPI fee collection with receipts, exams and report cards, staff payroll and parent portals.",
    tech: ["MongoDB", "Express.js", "React", "Node.js", "Cloud SaaS"],
    image: "/projects/edunexus.webp",
    liveLink: "https://www.edunexus.network/",
    sourceCode: "https://github.com/atif-afsar/ERP",
    category: "Client Work",
  },
  {
    id: "brandsway",
    title: "The BrandsWay Agency Platform + AI Lead Assistant",
    description:
      "Built a modern PR & marketing agency website with a visually engaging UI using React, Vite and Tailwind CSS, featuring a custom Groq API-powered AI assistant for instant visitor support and interactive lead engagement.",
    tech: ["React", "Vite", "Tailwind CSS", "Groq API", "AI Lead Assistant"],
    image: "/projects/brandsway.webp",
    liveLink: "https://thebrandsway.com/",
    sourceCode: "https://github.com/atif-afsar/BrandsWay-React",
    category: "Client Work",
  },
  {
    id: "velisqa",
    title: "Velisqa – Full-Stack D2C E-Commerce Storefront",
    description:
      "Engineered a complete direct-to-consumer e-commerce platform with a conversion-optimized storefront, product/order admin panel, Razorpay checkout integration and automated delivery-partner fulfillment.",
    tech: ["Conversion-Optimized Storefront", "Admin Panel", "Razorpay", "Delivery-Partner Fulfillment"],
    image: "/projects/velisqa.webp",
    liveLink: "https://www.velisqa.com/",
    sourceCode: "https://github.com/atif-afsar/Velisqa",
    category: "Client Work",
  },
  {
    id: "mehdihasan",
    title: "Mehdi Hasan Tailors – Animated Brand Experience",
    description:
      "Designed and developed a bespoke fashion/tailoring brand website using Framer Motion and Lenis for luxury smooth-scrolling animations and mobile responsiveness.",
    tech: ["Framer Motion", "Lenis", "Smooth Scroll", "Responsive Design"],
    image: "/projects/mehdihasan.webp",
    liveLink: "https://mehdihasantailors.com/",
    sourceCode: "https://github.com/atif-afsar/Mehndi-Hasan",
    category: "Client Work",
  },
  {
    id: "02",
    caseStudyId: "hayat",
    title: "Hayat Eye Centre – Healthcare Lead-Gen Portal",
    description:
      "Delivered a responsive healthcare client website featuring a NodeMailer-automated patient inquiry and appointment contact pipeline.",
    tech: ["React", "Node.js", "NodeMailer", "Tailwind CSS"],
    image: "/hayat.png",
    liveLink: "https://hayateyecentre.in/",
    sourceCode: "https://github.com/atif-afsar/Hayat-Eye-Center",
    category: "Client Work",
  },
  {
    id: "04",
    caseStudyId: "learnlogix",
    title: "LearnLogix – Education Portal",
    description:
      "High-performance education platform with a custom admin panel and NodeMailer inquiry capture, deployed on a custom domain.",
    tech: ["React", "Node.js", "NodeMailer", "Admin Panel"],
    image: "/learnlogix.png",
    liveLink: "https://learnlogix.in/",
    sourceCode: "https://github.com/atif-afsar/LearnLogix",
    category: "Client Work",
  },
  {
    id: "08",
    caseStudyId: "ims",
    title: "Islamic Mission School Portal",
    description:
      "High-performance school platform with a custom admin panel on a Supabase backend, Web3Forms inquiry capture and a custom GoDaddy/Vercel domain deployment.",
    tech: ["React", "Tailwind CSS", "Supabase", "Web3Forms", "Vercel", "GoDaddy"],
    image: "/ims.png",
    liveLink: "https://www.islamicmissionschool.org/",
    sourceCode: "https://github.com/atif-afsar/ims-website",
    category: "Client Work",
  },

  // ---------- AI & interactive media ----------
  {
    id: "06",
    caseStudyId: "gpt",
    title: "Exact-GPT – Persistent-Memory Conversational AI Agent",
    description:
      "Built a real-time conversational AI chatbot using the Gemini API, Pinecone vector embeddings for long-term user memory, MongoDB and Socket.io.",
    tech: ["Gemini API", "Pinecone", "Vector Embeddings", "MongoDB", "Socket.io"],
    image: "/gpt.png",
    sourceCode: "https://github.com/atif-afsar/Exact-GPT",
    category: "AI & Interactive Media",
  },
  {
    id: "05",
    caseStudyId: "moody",
    title: "Moody Player – AI Emotion-Driven Media Web App",
    description:
      "Created an interactive media web app using React, Node.js, Face API and ImageKit that detects user facial expressions via webcam to personalize content delivery in real time.",
    tech: ["React", "Node.js", "Face API", "ImageKit"],
    image: "/moody.png",
    sourceCode: "https://github.com/atif-afsar/Moody-Player",
    category: "AI & Interactive Media",
  },
  {
    id: "07",
    caseStudyId: "nasa",
    title: "NASA Mission Control Dashboard",
    description:
      "Built an interactive data visualization and scheduling dashboard using React, Node.js and REST APIs.",
    tech: ["React", "Node.js", "REST APIs"],
    image: "/nasa.png",
    sourceCode: "https://github.com/atif-afsar/NASA-Project",
    category: "AI & Interactive Media",
  },

  // ---------- Internship builds (InLighnX Global) ----------
  {
    id: "foodify",
    title: "Foodify – Grocery E-Commerce Web App",
    description:
      "Fast-loading e-commerce grocery web app with real-time search, dynamic filtering and lazy loading.",
    tech: ["React", "Redux Toolkit", "Tailwind CSS", "Vite"],
    image: "/projects/foodify.webp",
    liveLink: "https://foodify-atif.netlify.app/",
    sourceCode: "https://github.com/atif-afsar/Foodify",
    category: "Internship Builds",
  },
  {
    id: "portfolio-v1",
    title: "Portfolio Platform – Dark/Light Mode",
    description: "Modern portfolio platform with dark/light mode and automated EmailJS lead capture.",
    tech: ["React", "Tailwind CSS", "EmailJS"],
    image: "/projects/portfolio-v1.webp",
    liveLink: "https://my-portfolio1123.netlify.app/",
    sourceCode: "https://github.com/atif-afsar/My-Portfolio",
    category: "Internship Builds",
  },
];
