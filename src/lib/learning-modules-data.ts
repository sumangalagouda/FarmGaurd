
export type SyllabusItem = {
    topic: string;
    points: number;
}

export type LearningModule = {
    id: string;
    title: string;
    description: string;
    syllabus: SyllabusItem[];
}

export const learningModules: LearningModule[] = [
  {
    id: "poultry-farming",
    title: "Modern Poultry Farming",
    description: "Protect your flock and improve productivity.",
    syllabus: [
        { topic: "Basics of Poultry Farming (breeds, housing)", points: 10 },
        { topic: "Feed & Nutrition for Poultry", points: 20 },
        { topic: "Biosecurity & Disease Prevention in Poultry", points: 30 },
        { topic: "Vaccination & Health Schedule", points: 25 },
        { topic: "Common Poultry Diseases & Detection", points: 20 },
        { topic: "Waste / Manure Management for Poultry", points: 15 },
        { topic: "Integrated Farming Practices (if overlapping)", points: 10 }
    ]
  },
  {
    id: "pig-farming",
    title: "Advanced Pig Management",
    description: "Best practices for managing sows and piglets.",
    syllabus: [
        { topic: "Basics of Pig Farming (breeds, housing)", points: 10 },
        { topic: "Pig Feed & Nutrition", points: 20 },
        { topic: "Pig Biosecurity & Hygiene", points: 30 },
        { topic: "Vaccination / Health Calendar for Pigs", points: 25 },
        { topic: "Common Pig Diseases & Early Detection", points: 20 },
        { topic: "Manure / Waste Handling for Pigs", points: 15 },
        { topic: "Integrated / overlap practices", points: 10 }
    ]
  },
  {
    id: "integrated-farming",
    title: "Integrated Farming Systems",
    description: "Increase efficiency and profitability.",
    syllabus: [
        { topic: "Comparison & differences between pig & poultry biosecurity", points: 20 },
        { topic: "Shared disease risks & management", points: 25 },
        { topic: "Integrated resource optimization (waste, space, feed)", points: 30 },
        { topic: "Market strategy combining both", points: 15 },
        { topic: "Cross-species health management", points: 20 }
    ]
  },
];
