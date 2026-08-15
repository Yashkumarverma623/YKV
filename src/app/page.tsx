import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ComplexAbout from "@/components/ComplexAbout";
import MarqueeStrip from "@/components/MarqueeStrip";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SpotlightSection from "@/components/SpotlightSection";
import EducationAndAchievements from "@/components/EducationAndAchievements";
import CoolSection from "@/components/CoolSection";
import FooterSection from "@/components/FooterSection";

const techStack1 = [
  'PYTHON', 'TYPESCRIPT', 'JAVASCRIPT', 'LANGCHAIN', 'LANGGRAPH', 'RAG', 
  'PROMPT ENGINEERING', 'MULTI-AGENT SYSTEMS', 'OPENAI API', 'GEMINI API', 
  'RAGAS', 'CHROMADB', 'PINECONE', 'QDRANT', 'CROSS-ENCODER', 'EMBEDDINGS', 
  'QLORA', 'VLLM', 'PYTORCH', 'TENSORFLOW', 'SCIKIT-LEARN', 'HUGGING FACE', 'MODEL FINE-TUNING'
];

const techStack2 = [
  'NODE.JS', 'FASTAPI', 'EXPRESS', 'MICROSERVICES', 'API GATEWAY', 'REST APIS', 'REDIS', 
  'KAFKA', 'DEBEZIUM', 'NEO4J', 'MCP PROTOCOL', 'MYSQL', 'MONGODB', 'POSTGRESQL', 'POSTGIS', 
  'REACT', 'NEXT.JS', 'REACT NATIVE', 'TAILWIND CSS', 'VITE', 'DOCKER', 'AWS', 'GCP', 
  'GITHUB ACTIONS', 'CI/CD', 'OPENTELEMETRY', 'LANGSMITH', 'SENTRY', 'VERCEL', 'FIREBASE', 'FULL-STACK AI ENGINEER'
];

export default function Home() {
  return (
    <>
      <Preloader />
      <HeroSection />
      <ComplexAbout />
      <MarqueeStrip words={techStack1} direction="left" className="border-b-0" />
      <MarqueeStrip words={techStack2} direction="right" />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <SpotlightSection />
      <EducationAndAchievements />
      <CoolSection />
      <FooterSection />
    </>
  );
}
