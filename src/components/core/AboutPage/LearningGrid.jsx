import React from "react";

// Dummy HighlightText component
const HighlightText = ({ text }) => (
  <span className="text-yellow-400"> {text} </span>
);

// Dummy CTAButton component
const CTAButton = ({ active, linkto, children }) => (
  <a
    href={linkto}
    className={`inline-block px-4 py-2 rounded-md text-white ${
      active ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600"
    }`}
  >
    {children}
  </a>
);

// Your array
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning,",
    highlightText: "Now Starting at KIIT",
    description:
      "CampusHive is a fresh initiative born from KIIT’s innovative spirit — bringing affordable, industry-ready, and accessible learning to everyone, everywhere. Though newly launched, our vision is bold and clear: to shape the future of online education from campus to the world.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Built on Real Industry Needs",
    description:
      "We’re building our curriculum with one focus — your future career. Every course is aligned with what today’s tech and business leaders expect, so you save time, learn smarter, and stay job-ready.",
  },
  {
    order: 2,
    heading: "Learning, the CampusHive Way",
    description:
      "From interactive content to hands-on projects and live mentorship, we’re crafting a modern learning experience that mirrors the energy and excellence of KIIT itself.",
  },
  {
    order: 3,
    heading: "Certification That Counts",
    description:
      "Earn certifications that showcase your skills — whether you're applying for internships, jobs, or upskilling while still on campus. CampusHive credentials are designed to carry real value.",
  },
  {
    order: 4,
    heading: `Smart Ratings & Auto-Grading`,
    description:
      "Progress tracking, instant feedback, and automated grading systems help you learn efficiently and confidently. Less wait, more growth.",
  },
  {
    order: 5,
    heading: "Ready for the Real World",
    description:
      "CampusHive isn’t just about learning — it’s about doing. Our goal is to prepare every learner to step confidently into internships, placements, and entrepreneurship.",
  },
];

// Component
const LearningGrid = () => {
  return (
    <div className="grid mx-auto w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 gap-4">
      {LearningGridArray.map((card, index) => {
        const isHighlight = card.order < 0;

        return (
          <div
            key={index}
            className={`${
              isHighlight
                ? "lg:col-span-2 bg-transparent"
                : card.order % 2 === 1
                ? "bg-gray-800"
                : "bg-gray-900"
            } p-5 rounded-lg lg:h-[280px]`}
          >
            {isHighlight ? (
              <div className="flex flex-col gap-3 text-white">
                <h2 className="text-4xl font-semibold">
                  {card.heading}
                  <HighlightText text={card.highlightText} />
                </h2>
                <p className="text-base font-medium">{card.description}</p>
                <div className="mt-4">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4 text-white">
                <h3 className="text-lg font-semibold">{card.heading}</h3>
                <p className="text-sm font-medium text-gray-300">
                  {card.description}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LearningGrid;
