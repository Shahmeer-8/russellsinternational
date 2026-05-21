import PageHero from "@/components/PageHero";
import { usePageSections } from "@/hooks/api";
import { sectionText } from "@/lib/content";

type Crumb = { label: string; to?: string };

interface DynamicPageHeroProps {
  page: string;
  fallback: {
    eyebrow: string;
    title: string;
    description: string;
    image: string;
    crumbs: Crumb[];
  };
}

const DynamicPageHero = ({ page, fallback }: DynamicPageHeroProps) => {
  const { data } = usePageSections(page);
  const hero = data?.data?.hero;

  const content = hero
    ? {
        eyebrow: sectionText(hero, "eyebrow", fallback.eyebrow),
        title: sectionText(hero, "title", fallback.title),
        description: sectionText(hero, "subtitle", fallback.description),
        image: hero.image_url ?? fallback.image,
      }
    : fallback;

  return (
    <PageHero
      eyebrow={content.eyebrow}
      title={content.title}
      description={content.description}
      image={content.image}
      crumbs={fallback.crumbs}
    />
  );
};

export default DynamicPageHero;
