// data/projects.ts

export interface LocalizedString {
    de: string;
    en: string;
  }
  
  export interface ProjectItemData {
    image: string;
    title: LocalizedString;
  }
  
  export interface Project {
    id: string;
    hero: {
      badges: string[];
      title: LocalizedString;
      subtitle: LocalizedString;
      description: LocalizedString;
      imageSrc: string;
      transitionName: string;
      imageAlt: LocalizedString;
    };
    message: LocalizedString;
    items: ProjectItemData[];
    card: {
      image: string;
      title: LocalizedString;
      description: LocalizedString;
      ctaLabel: LocalizedString;
      badges: string[];
      transitionName: string;
    };
  }
  
  export const projects: Project[] = [
    {
      id: 'hochschulstart',
      hero: {
        badges: ['UI Design', 'Figma'],
        title: {
          de: 'Hochschulstart',
          en: 'Hochschulstart',
        },
        subtitle: {
          de: 'Projektdauer: 6 Wochen · 150 Seiten',
          en: 'Project duration: 6 weeks · 150 pages',
        },
        description: {
          de: 'Ein vorhandenes UX Konzept soll anhand der <a href="https://carbondesignsystem.com/" target="_blank" rel="noopener noreferrer" class="text-primary-500 dark:text-primary-400 no-underline hover:underline">Carbon Library</a> von IBM in ein fertiges UI Design überführt werden. Hoher Fokus auf Barrierefreiheit.',
          en: 'An existing UX concept is to be transformed into a finished UI design using IBM\'s <a href="https://carbondesignsystem.com/" target="_blank" rel="noopener noreferrer" class="text-primary-500 dark:text-primary-400 no-underline hover:underline">Carbon Library</a>. High focus on accessibility',
        },
        imageSrc: '/images/hss00.webp',
        transitionName: 'project-image-hochschulstart',
        imageAlt: {
          de: 'Projekt Vorschau Hochschulstart',
          en: 'Project Preview Hochschulstart',
        },
      },
      message: {
        de: 'Die Bewerbung an Hochschulen sollte einfach und zugänglich sein.',
        en: 'Applying to universities should be simple and accessible.',
      },
      items: [
        { image: '/images/hss01.webp', title: { de: 'Suche · Studiengänge', en: 'Search · Study Programs' } },
        { image: '/images/hss02.webp', title: { de: 'Dashboard · Nachrichten', en: 'Dashboard · Messages' } },
        { image: '/images/hss03.webp', title: { de: 'Bewerbungspfad', en: 'Application Path' } },
        { image: '/images/hss04.webp', title: { de: 'Hochschulpfad', en: 'University Path' } },
        { image: '/images/hss05.webp', title: { de: 'Stiftungspfad', en: 'Foundation Path' } },
      ],
      card: {
        image: '/images/hss00.webp',
        title: {
          de: 'Barrierefrei an Hochschulen bewerben',
          en: 'Apply to universities accessibly',
        },
        description: {
          de: 'Portal für Hochschulbewerbungen mit Numerus Clausus.',
          en: 'Portal for university applications with Numerus Clausus.',
        },
        ctaLabel: { // Project name for the button
          de: 'Hochschulstart',
          en: 'Hochschulstart',
        },
        badges: ['UI Design', 'Figma'],
        transitionName: 'project-image-hochschulstart',
      }
    },
    {
      id: 'carnabo',
      hero: {
        badges: ['UX/UI Design', 'Figma'],
        title: {
          de: 'Carnabo',
          en: 'Carnabo',
        },
        subtitle: {
          de: 'Projektdauer: 1 Woche',
          en: 'Project duration: 1 week',
        },
        description: {
          de: 'Überarbeitung der Fahrzeugsuche eines Webportals, das sich auf Auto-Abonnemonts spezialisiert hat.',
          en: 'Redesign of the vehicle search for a web portal specializing in car subscriptions.',
        },
        imageSrc: '/images/car00.webp',
        transitionName: 'project-image-carnabo',
        imageAlt: {
          de: 'Projekt Vorschau Carnabo',
          en: 'Project Preview Carnabo',
        },
      },
      message: {
        de: 'Ich möchte schnell und unkompliziert ein Auto-Abo finden.',
        en: 'I want to find a car subscription quickly and easily.',
      },
      items: [
        { image: '/images/car01.webp', title: { de: 'Ausgangspunkt', en: 'Starting Point' } },
        { image: '/images/car02.webp', title: { de: 'Erste Überarbeitung', en: 'First Revision' } },
        { image: '/images/car03.webp', title: { de: 'Layout Variationen', en: 'Layout Variations' } },
        { image: '/images/car04.webp', title: { de: 'Mobile Ansicht', en: 'Mobile View' } },
        { image: '/images/car05.webp', title: { de: 'Styleguide', en: 'Style Guide' } },
      ],
      card: {
        image: '/images/car00.webp',
        title: { // Descriptive phrase for the card title
          de: 'Auto-Abos finden und vergleichen',
          en: 'Find and compare car subscriptions',
        },
        description: {
          de: 'Überarbeitung der Fahrzeugsuche eines Webportals, das sich auf Auto-Abonnemonts spezialisiert hat.',
          en: 'Redesign of the vehicle search for a web portal specializing in car subscriptions.',
        },
        ctaLabel: { // Project name for the button
          de: 'Carnabo',
          en: 'Carnabo',
        },
        badges: ['UX/UI Design', 'Figma'],
        transitionName: 'project-image-carnabo',
      }
    },
    {
      id: 'otopia',
      hero: {
        badges: ['UI Design', 'Prototyp', 'Figma'],
        title: {
          de: 'Otopia',
          en: 'Otopia',
        },
        subtitle: {
          de: 'Freizeitprojekt',
          en: 'Leisure Project',
        },
        description: {
          de: 'Ideen- und Kollaborationsnetzwerk für Open-Source Projekte, Entwickler und Enthusiasten auf Basis von <a href="https://ocelot.social/" target="_blank" rel="noopener noreferrer" class="text-primary-500 dark:text-primary-400 no-underline hover:underline">Ocelot Social</a>.',
          en: 'Idea and collaboration network for open-source projects, developers, and enthusiasts based on <a href="https://ocelot.social/" target="_blank" rel="noopener noreferrer" class="text-primary-500 dark:text-primary-400 no-underline hover:underline">Ocelot Social</a>.',
        },
        imageSrc: '/images/oto00.webp',
        transitionName: 'project-image-otopia',
        imageAlt: {
          de: 'Projekt Vorschau Otopia',
          en: 'Project Preview Otopia',
        },
      },
      message: {
        de: 'Meinem Open Source Projekt fehlt es an Unterstützung.',
        en: 'My open source project lacks some support.',
      },
      items: [
        { image: '/images/oto01.webp', title: { de: 'Feed · Startseite', en: 'Feed · Homepage' } },
        { image: '/images/oto02.webp', title: { de: 'Projektübersicht', en: 'Project Overview' } },
        { image: '/images/oto03.webp', title: { de: 'Profil', en: 'Profile' } },
        { image: '/images/oto04.webp', title: { de: 'Styleguide', en: 'Style Guide' } },
        { image: '/images/oto05.webp', title: { de: 'Dark Mode', en: 'Dark Mode' } },
      ],
      card: {
        image: '/images/oto00.webp',
        title: { // Descriptive phrase for the card title
          de: 'Open Source fördern und verbinden',
          en: 'Promote and connect open source',
        },
        description: {
          de: 'Ideen- und Kollaborationsnetzwerk für Open-Source Projekte, Entwickler und Enthusiasten.',
          en: 'Idea and collaboration network for open-source projects, developers, and enthusiasts.',
        },
        ctaLabel: { // Project name for the button
          de: 'Otopia',
          en: 'Otopia',
        },
        badges: ['UI Design', 'Prototyp', 'Figma'],
        transitionName: 'project-image-otopia',
      }
    },
  ];
  
  // Helper function to easily find a project by its ID (remains the same)
  export const findProjectById = (id: string | string[]): Project | undefined => {
    const projectId = Array.isArray(id) ? id[0] : id;
    return projects.find(p => p.id === projectId);
  };