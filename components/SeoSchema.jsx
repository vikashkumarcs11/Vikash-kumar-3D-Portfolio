export default function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vikash Kumar",
    url: "https://vikashkumargportfolio.netlify.app/",
    image: "https://res.cloudinary.com/dyle3hnpw/image/upload/v1696091629/portfolio/WhatsApp_Image_2023-09-30_at_10.02.55_PM_jk44v9.jpg",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Ajeevak Nidhi Limited",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Patna",
      addressRegion: "Bihar",
      addressCountry: "IN",
    },
    sameAs: [
      "https://github.com/vikashkumarcs11",
      "https://www.linkedin.com/in/vikashkumarcs11",
    ],
    knowsAbout: [
      "React.js", "Node.js", "GraphQL", "MongoDB",
      "MERN Stack", "Full Stack Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}