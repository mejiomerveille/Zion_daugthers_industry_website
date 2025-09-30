import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.association': 'Association Zion Daughters',
    'nav.church': 'Église Apostolique',
    'nav.school': 'École Biblique',
    'nav.contact': 'Contact',
    'nav.donate': 'Faire un Don',
    
    // Home Page
    'home.hero.title': 'Group Zion Daughters Ministries',
    'home.hero.subtitle': 'Évangélisation, Formation et Service au nom de Jésus-Christ',
    'home.hero.cta': 'Découvrir nos Ministères',
    'home.about.title': 'Notre Mission',
    'home.about.description': 'Le Group Zion Daughters Ministries est un ensemble de structures dédiées à l\'évangélisation, à la formation biblique et au service communautaire, œuvrant pour l\'expansion du Royaume de Dieu.',
    
    // Association
    'association.hero.title': 'Association Zion Daughters',
    'association.hero.subtitle': 'Association Internationale d\'Évangélisation et d\'Aide aux Orphelins',
    'association.description': 'Légalisée au Cameroun en 2019, l\'Association Zion Daughters se consacre à l\'évangélisation, l\'aide aux orphelins et la promotion du ministère de la femme.',
    'association.president': 'Présidente Fondatrice : Mama Esther',
    'association.activities.title': 'Nos Activités',
    'association.activities.donations': 'Dons et Aide Humanitaire',
    'association.activities.concerts': 'Concerts Prophétiques de l\'Espoir',
    'association.activities.visits': 'Visites et Témoignages',
    
    // Church
    'church.hero.title': 'Église Apostolique de la Grâce et de la Royauté Divine',
    'church.hero.subtitle': 'Un lieu de culte, de prière et de communion fraternelle',
    'church.opened': 'Ouverte en Décembre 2021',
    'church.project.title': 'Notre Projet',
    'church.project.description': 'Construction d\'un lieu de culte permanent pour accueillir notre communauté grandissante.',
    'church.activities.title': 'Activités Régulières',
    'church.activities.worship': 'Cultes Dominicaux',
    'church.activities.prayer': 'Réunions de Prière',
    'church.activities.fellowship': 'Communion Fraternelle',
    
    // School
    'school.hero.title': 'École Biblique Zion Daughters',
    'school.hero.subtitle': 'Bible School of Impartation and Empowerment',
    'school.created': 'Créée en 2021',
    'school.programs.title': 'Nos Programmes',
    'school.programs.description': 'Formation complète en 3 années avec cours de 6 mois et stage pratique de 3 mois. Diplôme délivré après soutenance de mémoire.',
    'school.current': '5ème promotion en cours (octobre)',
    'school.register': 'S\'inscrire',
    
    // Contact & Forms
    'contact.title': 'Nous Contacter',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
    'donate.title': 'Faire un Don',
    'donate.amount': 'Montant',
    'donate.structure': 'Choisir la Structure',
    'donate.submit': 'Donner',
    
    // General
    'learn.more': 'En Savoir Plus',
    'back.home': 'Retour à l\'Accueil',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.association': 'Zion Daughters Association',
    'nav.church': 'Apostolic Church',
    'nav.school': 'Bible School',
    'nav.contact': 'Contact',
    'nav.donate': 'Donate',
    
    // Home Page
    'home.hero.title': 'Group Zion Daughters Ministries',
    'home.hero.subtitle': 'Evangelization, Training and Service in the name of Jesus Christ',
    'home.hero.cta': 'Discover Our Ministries',
    'home.about.title': 'Our Mission',
    'home.about.description': 'Group Zion Daughters Ministries is a collection of structures dedicated to evangelization, biblical training and community service, working for the expansion of God\'s Kingdom.',
    
    // Association
    'association.hero.title': 'Zion Daughters Association',
    'association.hero.subtitle': 'International Association for Evangelization and Orphan Aid',
    'association.description': 'Legalized in Cameroon in 2019, the Zion Daughters Association is dedicated to evangelization, helping orphans and promoting women\'s ministry.',
    'association.president': 'Founding President: Mama Esther',
    'association.activities.title': 'Our Activities',
    'association.activities.donations': 'Donations and Humanitarian Aid',
    'association.activities.concerts': 'Prophetic Concerts of Hope',
    'association.activities.visits': 'Visits and Testimonies',
    
    // Church
    'church.hero.title': 'Apostolic Church of Grace and Divine Royalty',
    'church.hero.subtitle': 'A place of worship, prayer and fellowship',
    'church.opened': 'Opened in December 2021',
    'church.project.title': 'Our Project',
    'church.project.description': 'Construction of a permanent place of worship to accommodate our growing community.',
    'church.activities.title': 'Regular Activities',
    'church.activities.worship': 'Sunday Services',
    'church.activities.prayer': 'Prayer Meetings',
    'church.activities.fellowship': 'Fellowship',
    
    // School
    'school.hero.title': 'Zion Daughters Bible School',
    'school.hero.subtitle': 'Bible School of Impartation and Empowerment',
    'school.created': 'Created in 2021',
    'school.programs.title': 'Our Programs',
    'school.programs.description': 'Complete 3-year training with 6-month courses and 3-month practical internship. Diploma awarded after thesis defense.',
    'school.current': '5th batch in progress (October)',
    'school.register': 'Register',
    
    // Contact & Forms
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send',
    'donate.title': 'Make a Donation',
    'donate.amount': 'Amount',
    'donate.structure': 'Choose Structure',
    'donate.submit': 'Donate',
    
    // General
    'learn.more': 'Learn More',
    'back.home': 'Back to Home',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.fr] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};