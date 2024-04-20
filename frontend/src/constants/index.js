import {
  discordBlack,
  facebook,
  instagram,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  service3,
  telegram,
  twitter,
  mem,
} from "../../public/assets";

export const navigation = [
  {
    id: "0",
    title: "INSIGHTS",
    url: "#Insights",
  },
  {
    id: "1",
    title: "RATE && REVIEWS",
    url: "#Ratereview",
  },
  {
    id: "2",
    title: "TEAM-MATES",
    url: "#Teammates",
  },
  {
    id: "3",
    title: "CONTACT US",
    url: "#Footer",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign in",
    url: "#login",
    onlyMobile: true,
  },
];

export const insight = [
  {
    id: "0",
    title: "Multiple Form Creation:",
    text: "Provide a user-friendly interface where administrators can easily design, modify, and manage various forms according to specific needs.",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Graph-Based Analysis of Teacher Progress:",
    text: "Utilize graph-based analytics to track key metrics such as student satisfaction, engagement levels, and overall teaching effectiveness.",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Performance Benchmarking and Comparison:",
    text: "Enable administrators to identify top-performing teachers, recognize achievements, and provide targeted support or training for educators who may require improvement.",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "NLP Integration for Comments:",
    text: "Utilize sentiment analysis to categorize comments into positive, negative, or neutral sentiments, providing a comprehensive overview of teacher performance.",
    imageUrl: roadmap4,
  },
];

export const rating = [
  {
    id: "0",
    title: "M T Institute of Fashion and Act",
    rate: "5",
    features: [
      "Innovative and User-Friendly Platform",
      "Efficient and Customizable Feedback Management",
      "Empowering Collaboration and Continuous Improvement",
    ],
  },
  {
    id: "1",
    title: "NSVIT Vadodra Institute of Technology",
    rate: "5",
    features: [
      "Insightful and Data-Driven Feedback Solution",
      "Streamlined Feedback Process with Enhanced Analytics",
      "Transformative Feedback Management Tool",
    ],
  },
  {
    id: "2",
    title: "Balajain Institute of Commerce",
    rate: "4.5",
    features: [
      "Innovative and User-Friendly Platform",
      "Efficient and Customizable Feedback Management",
      "Empowering Collaboration and Continuous Improvement",
    ],
  },
];

export const members = [
  {
    id: "0",
    title: "Farhan Akhtar",
    roll: "21103047",
    text: "farhana.cs.21@nitj.ac.in",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: mem,
    imageUrl: service3,
  },
  {
    id: "1",
    title: "Vedant Taak",
    roll: "21103160",
    text: "vedanttak@nitj.ac.in",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: mem,
    imageUrl: service3,
  },
  {
    id: "2",
    title: "Unnati Sacchan",
    roll: "21103158",
    text: "unnatisacchan@nitj.ac.in",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    iconUrl: mem,
    imageUrl: service3,
  },
  {
    id: "3",
    title: "Vidyanand Kumar",
    roll: "21103162",
    text: "vidyanandkumar@nitj.ac.in",
    backgroundUrl: "./src/assets/benefits/card-4.svg",
    iconUrl: mem,
    imageUrl: service3,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: discordBlack,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook,
    url: "#",
  },
];
