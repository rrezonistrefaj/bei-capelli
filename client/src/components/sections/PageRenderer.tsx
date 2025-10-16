import ContentSection from './ContentSection';
import SimpleImageSection from './SimpleImageSection';
import PolicySection from './PolicySection';

export default function PageRenderer({ sections }: { sections: any[] }) {
  if (!sections || !Array.isArray(sections)) return null;
  return (
    <>
      {sections.map((section, index) => {
        switch (section.__component) {
          case 'sections.content-section':
            return <ContentSection key={index} data={section} />;
          case 'sections.simple-image-section':
            return <SimpleImageSection key={index} data={section} />;
          case 'sections.policy-section':
            return <PolicySection key={index} data={section} />;
          default:
            return null;
        }
      })}
    </>
  );
}


