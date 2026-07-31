import Preloader from "@/components/Preloader";
import HeroSection from "@/components/HeroSection";
import ComplexAbout from "@/components/ComplexAbout";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SpotlightSection from "@/components/SpotlightSection";
import EducationAndAchievements from "@/components/EducationAndAchievements";
import CoolSection from "@/components/CoolSection";
import FooterSection from "@/components/FooterSection";

export default function Home() {
  return (
    <>
      <Preloader />
      <HeroSection />
      <ComplexAbout />
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
