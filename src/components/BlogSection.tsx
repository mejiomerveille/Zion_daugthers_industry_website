import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, Heart, MessageCircle, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  likes: number;
  comments: Comment[];
  category: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  avatar: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Concert Prophétique de l\'Espoir - Novembre 2024',
    excerpt: 'Rejoignez-nous pour une soirée de louange et d\'adoration exceptionnelle...',
    content: `
      <h2>Une Soirée Inoubliable de Louange et d'Adoration</h2>
      
      <p>Le Concert Prophétique de l'Espoir revient pour sa 5ème édition ! Cette année, nous vous invitons à vivre une expérience spirituelle unique qui marquera vos cœurs et transformera vos vies.</p>
      
      <h3>Programme de la Soirée</h3>
      <ul>
        <li><strong>18h00</strong> - Accueil et temps de communion</li>
        <li><strong>19h00</strong> - Ouverture avec la chorale Zion Daughters</li>
        <li><strong>19h30</strong> - Témoignages de transformation</li>
        <li><strong>20h00</strong> - Concert avec des artistes invités</li>
        <li><strong>21h00</strong> - Temps de prière et de prophétie</li>
        <li><strong>22h00</strong> - Clôture et bénédiction</li>
      </ul>
      
      <h3>Artistes Invités</h3>
      <p>Nous aurons l'honneur d'accueillir des artistes gospel reconnus qui partageront leurs dons pour la gloire de Dieu. Préparez vos cœurs pour des moments d'adoration profonde.</p>
      
      <h3>Informations Pratiques</h3>
      <p><strong>Date :</strong> 25 Novembre 2024<br>
      <strong>Lieu :</strong> Église Apostolique de la Grâce, Yaoundé<br>
      <strong>Entrée :</strong> Libre (offrandes volontaires)<br>
      <strong>Contact :</strong> +237 6XX XX XX XX</p>
      
      <p>Venez nombreux pour cette célébration de la foi et de l'espoir !</p>
    `,
    author: 'Mama Esther',
    date: '2024-11-01',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    likes: 45,
    comments: [
      {
        id: '1',
        author: 'Marie Kouadio',
        content: 'Hâte d\'y être ! Ces concerts sont toujours si inspirants.',
        date: '2024-11-02',
        avatar: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=100'
      },
      {
        id: '2',
        author: 'Paul Nsangou',
        content: 'Que Dieu bénisse cette initiative. Je serai présent avec ma famille.',
        date: '2024-11-02',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Événement'
  },
  {
    id: '2',
    title: 'Donation à l\'Orphelinat d\'Ekounou',
    excerpt: 'L\'Association Zion Daughters a organisé une grande collecte pour les enfants...',
    content: `
      <h2>Un Geste d'Amour pour les Enfants Orphelins</h2>
      
      <p>Dans le cadre de notre mission d'aide aux plus démunis, l'Association Zion Daughters a organisé une collecte exceptionnelle pour l'orphelinat d'Ekounou. Cette action témoigne de notre engagement envers les enfants vulnérables.</p>
      
      <h3>Ce qui a été collecté</h3>
      <ul>
        <li>200 kg de riz</li>
        <li>150 kg de haricots</li>
        <li>100 litres d'huile de cuisine</li>
        <li>Vêtements pour 80 enfants</li>
        <li>Fournitures scolaires complètes</li>
        <li>Médicaments de première nécessité</li>
      </ul>
      
      <h3>Impact sur la Communauté</h3>
      <p>Cette donation permettra à l'orphelinat de subvenir aux besoins de 80 enfants pendant plusieurs mois. Au-delà de l'aide matérielle, nous avons également organisé des activités ludiques et spirituelles pour apporter joie et espoir à ces enfants.</p>
      
      <h3>Témoignages</h3>
      <blockquote>
        "Voir la joie dans les yeux de ces enfants nous rappelle pourquoi nous faisons ce travail. Chaque sourire est une bénédiction." - Mama Esther, Présidente
      </blockquote>
      
      <p>Nous remercions tous les donateurs qui ont rendu cette action possible. Ensemble, nous continuons à faire la différence dans la vie de ces enfants.</p>
    `,
    author: 'Équipe Zion Daughters',
    date: '2024-10-28',
    image: './images/association/Image interview crtv.png',
    likes: 67,
    comments: [
      {
        id: '3',
        author: 'Grace Mballa',
        content: 'Merci pour cette belle action. Ces enfants méritent tout notre amour.',
        date: '2024-10-29',
        avatar: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Action Sociale'
  },
  {
    id: '3',
    title: 'Nouvelle Promotion à l\'École Biblique',
    excerpt: 'La 5ème promotion de l\'École Biblique Zion Daughters a débuté en octobre...',
    content: `
      <h2>Accueil de la 5ème Promotion</h2>
      
      <p>C'est avec une grande joie que nous accueillons la 5ème promotion de l'École Biblique Zion Daughters. Cette nouvelle cohorte de 25 étudiants s'engage dans un parcours de formation spirituelle et théologique de 3 ans.</p>
      
      <h3>Profil des Nouveaux Étudiants</h3>
      <p>Cette promotion se distingue par sa diversité :</p>
      <ul>
        <li>15 femmes et 10 hommes</li>
        <li>Âges de 22 à 45 ans</li>
        <li>Provenant de 8 régions du Cameroun</li>
        <li>Différents milieux professionnels</li>
      </ul>
      
      <h3>Programme de Formation</h3>
      <p>Les étudiants suivront un cursus complet comprenant :</p>
      <ul>
        <li><strong>1ère Année :</strong> Fondements bibliques et théologie de base</li>
        <li><strong>2ème Année :</strong> Leadership chrétien et homilétique</li>
        <li><strong>3ème Année :</strong> Évangélisation et missions</li>
      </ul>
      
      <h3>Cérémonie d'Ouverture</h3>
      <p>La cérémonie d'ouverture s'est déroulée dans une atmosphère de recueillement et de joie. Les étudiants ont reçu leurs manuels de cours et ont été bénis pour leur parcours académique.</p>
      
      <p>Nous prions pour que cette formation transforme leurs vies et les équipe pour un service efficace dans le Royaume de Dieu.</p>
    `,
    author: 'Direction École Biblique',
    date: '2024-10-15',
    image: './images/ecole/ecole.jpeg',
    likes: 38,
    comments: [],
    category: 'Formation'
  },
  {
    id: '4',
    title: 'Avancement du Projet de Construction',
    excerpt: 'Les travaux de construction du nouveau lieu de culte progressent bien...',
    content: `
      <h2>Progression des Travaux de Construction</h2>
      
      <p>Nous sommes heureux de vous informer de l'avancement significatif des travaux de construction de notre nouveau lieu de culte. Grâce à vos dons généreux et à la grâce de Dieu, le projet prend forme.</p>
      
      <h3>État d'Avancement</h3>
      <ul>
        <li><strong>Fondations :</strong> 100% terminées</li>
        <li><strong>Structure :</strong> 75% terminée</li>
        <li><strong>Toiture :</strong> 60% terminée</li>
        <li><strong>Électricité :</strong> 40% terminée</li>
        <li><strong>Plomberie :</strong> 30% terminée</li>
      </ul>
      
      <h3>Prochaines Étapes</h3>
      <p>Dans les semaines à venir, nous nous concentrerons sur :</p>
      <ul>
        <li>Finalisation de la toiture</li>
        <li>Installation des systèmes électriques</li>
        <li>Début des travaux de finition intérieure</li>
        <li>Aménagement du système audio-visuel</li>
      </ul>
      
      <h3>Besoins Financiers</h3>
      <p>Pour terminer le projet, nous avons encore besoin de :</p>
      <ul>
        <li>Finitions intérieures : 2,500,000 FCFA</li>
        <li>Système audio-visuel : 1,800,000 FCFA</li>
        <li>Mobilier : 1,200,000 FCFA</li>
      </ul>
      
      <p>Nous comptons sur votre soutien continu pour mener à bien ce projet qui servira la communauté pour les générations à venir.</p>
    `,
    author: 'Comité de Construction',
    date: '2024-10-20',
    image: './images/havilah2.jpeg',
    likes: 52,
    comments: [
      {
        id: '4',
        author: 'Jean Baptiste',
        content: 'Gloire à Dieu ! Hâte de voir le projet terminé.',
        date: '2024-10-21',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Construction'
  },
  {
    id: '5',
    title: 'HAPPY HOME Network  ',
    excerpt: 'Another beautiful season to remember the poor, the needy, IDPs and vulnerable children. For 6 years now God has shown us mercy to support the  education and health of vulnerable children.  Join us this season as we offer them a beautiful and memorable Christmas. Nothing is to small to give. ',
    content: `
     Another beautiful season to remember the poor, the needy, IDPs and vulnerable children. For 6 years now God has shown us mercy to support the  education and health of vulnerable children.  Join us this season as we offer them a beautiful and memorable Christmas. Nothing is to small to give. `,
    author: 'Équipe Zion Daughters',
    date: '2024-10-28',
    image: 'https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/592856144_10226497303092710_5690884568520448927_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGb_9JtSE43iBSOm2RJ8vGQaur7_IP67Ulq6vv8g_rtSbmbQ1FHTyzQ4jyw_aURCY_gx59VSdAs2JpbOvNyTI7I&_nc_ohc=lZdfIcICZZ4Q7kNvwGs_fXp&_nc_oc=Adl6rGSRClUecnjaaTHw9P3uz7ZC1I5iP47-WWlOWMrz31kcC--Ec_-_TkJ4jEFdBb8&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=H1HWg3mJUBadRTPL7RdQ6w&oh=00_AflDTB7apy_NpnfSSJTOlBqtzWgxGN5UCOA2ksoGhVhMKA&oe=69376234',
    likes: 67,
    comments: [
      {
        id: '3',
        author: 'Grace Mballa',
        content: 'Merci pour cette belle action. Ces enfants méritent tout notre amour.',
        date: '2024-10-29',
        avatar: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Action Sociale'
  },
  {
    id: '6',
    title: 'Nouvelle Promotion à l\'École Biblique',
    excerpt: 'La 5ème promotion de l\'École Biblique Zion Daughters a débuté en octobre...',
    content: `
      <h2>Accueil de la 5ème Promotion</h2>
      
      <p>C'est avec une grande joie que nous accueillons la 5ème promotion de l'École Biblique Zion Daughters. Cette nouvelle cohorte de 25 étudiants s'engage dans un parcours de formation spirituelle et théologique de 3 ans.</p>
      
      <h3>Profil des Nouveaux Étudiants</h3>
      <p>Cette promotion se distingue par sa diversité :</p>
      <ul>
        <li>15 femmes et 10 hommes</li>
        <li>Âges de 22 à 45 ans</li>
        <li>Provenant de 8 régions du Cameroun</li>
        <li>Différents milieux professionnels</li>
      </ul>
      
      <h3>Programme de Formation</h3>
      <p>Les étudiants suivront un cursus complet comprenant :</p>
      <ul>
        <li><strong>1ère Année :</strong> Fondements bibliques et théologie de base</li>
        <li><strong>2ème Année :</strong> Leadership chrétien et homilétique</li>
        <li><strong>3ème Année :</strong> Évangélisation et missions</li>
      </ul>
      
      <h3>Cérémonie d'Ouverture</h3>
      <p>La cérémonie d'ouverture s'est déroulée dans une atmosphère de recueillement et de joie. Les étudiants ont reçu leurs manuels de cours et ont été bénis pour leur parcours académique.</p>
      
      <p>Nous prions pour que cette formation transforme leurs vies et les équipe pour un service efficace dans le Royaume de Dieu.</p>
    `,
    author: 'Direction École Biblique',
    date: '2024-10-15',
    image: './images/ecole/ecole.jpeg',
    likes: 38,
    comments: [],
    category: 'Formation'
  },
  {
    id: '7',
    title: 'Avancement du Projet de Construction',
    excerpt: 'Les travaux de construction du nouveau lieu de culte progressent bien...',
    content: `
      <h2>Progression des Travaux de Construction</h2>
      
      <p>Nous sommes heureux de vous informer de l'avancement significatif des travaux de construction de notre nouveau lieu de culte. Grâce à vos dons généreux et à la grâce de Dieu, le projet prend forme.</p>
      
      <h3>État d'Avancement</h3>
      <ul>
        <li><strong>Fondations :</strong> 100% terminées</li>
        <li><strong>Structure :</strong> 75% terminée</li>
        <li><strong>Toiture :</strong> 60% terminée</li>
        <li><strong>Électricité :</strong> 40% terminée</li>
        <li><strong>Plomberie :</strong> 30% terminée</li>
      </ul>
      
      <h3>Prochaines Étapes</h3>
      <p>Dans les semaines à venir, nous nous concentrerons sur :</p>
      <ul>
        <li>Finalisation de la toiture</li>
        <li>Installation des systèmes électriques</li>
        <li>Début des travaux de finition intérieure</li>
        <li>Aménagement du système audio-visuel</li>
      </ul>
      
      <h3>Besoins Financiers</h3>
      <p>Pour terminer le projet, nous avons encore besoin de :</p>
      <ul>
        <li>Finitions intérieures : 2,500,000 FCFA</li>
        <li>Système audio-visuel : 1,800,000 FCFA</li>
        <li>Mobilier : 1,200,000 FCFA</li>
      </ul>
      
      <p>Nous comptons sur votre soutien continu pour mener à bien ce projet qui servira la communauté pour les générations à venir.</p>
    `,
    author: 'Comité de Construction',
    date: '2024-10-20',
    image: './images/havilah2.jpeg',
    likes: 52,
    comments: [
      {
        id: '4',
        author: 'Jean Baptiste',
        content: 'Gloire à Dieu ! Hâte de voir le projet terminé.',
        date: '2024-10-21',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Construction'
  },
    
  {
    id: '8',
    title: 'Donation à l\'Orphelinat d\'Ekounou',
    excerpt: 'L\'Association Zion Daughters a organisé une grande collecte pour les enfants...',
    content: `
      <h2>Un Geste d'Amour pour les Enfants Orphelins</h2>
      
      <p>Dans le cadre de notre mission d'aide aux plus démunis, l'Association Zion Daughters a organisé une collecte exceptionnelle pour l'orphelinat d'Ekounou. Cette action témoigne de notre engagement envers les enfants vulnérables.</p>
      
      <h3>Ce qui a été collecté</h3>
      <ul>
        <li>200 kg de riz</li>
        <li>150 kg de haricots</li>
        <li>100 litres d'huile de cuisine</li>
        <li>Vêtements pour 80 enfants</li>
        <li>Fournitures scolaires complètes</li>
        <li>Médicaments de première nécessité</li>
      </ul>
      
      <h3>Impact sur la Communauté</h3>
      <p>Cette donation permettra à l'orphelinat de subvenir aux besoins de 80 enfants pendant plusieurs mois. Au-delà de l'aide matérielle, nous avons également organisé des activités ludiques et spirituelles pour apporter joie et espoir à ces enfants.</p>
      
      <h3>Témoignages</h3>
      <blockquote>
        "Voir la joie dans les yeux de ces enfants nous rappelle pourquoi nous faisons ce travail. Chaque sourire est une bénédiction." - Mama Esther, Présidente
      </blockquote>
      
      <p>Nous remercions tous les donateurs qui ont rendu cette action possible. Ensemble, nous continuons à faire la différence dans la vie de ces enfants.</p>
    `,
    author: 'Équipe Zion Daughters',
    date: '2024-10-28',
    image: './images/association/Image interview crtv.png',
    likes: 67,
    comments: [
      {
        id: '3',
        author: 'Grace Mballa',
        content: 'Merci pour cette belle action. Ces enfants méritent tout notre amour.',
        date: '2024-10-29',
        avatar: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Action Sociale'
  },
  {
    id: '9',
    title: 'Nouvelle Promotion à l\'École Biblique',
    excerpt: 'La 5ème promotion de l\'École Biblique Zion Daughters a débuté en octobre...',
    content: `
      <h2>Accueil de la 5ème Promotion</h2>
      
      <p>C'est avec une grande joie que nous accueillons la 5ème promotion de l'École Biblique Zion Daughters. Cette nouvelle cohorte de 25 étudiants s'engage dans un parcours de formation spirituelle et théologique de 3 ans.</p>
      
      <h3>Profil des Nouveaux Étudiants</h3>
      <p>Cette promotion se distingue par sa diversité :</p>
      <ul>
        <li>15 femmes et 10 hommes</li>
        <li>Âges de 22 à 45 ans</li>
        <li>Provenant de 8 régions du Cameroun</li>
        <li>Différents milieux professionnels</li>
      </ul>
      
      <h3>Programme de Formation</h3>
      <p>Les étudiants suivront un cursus complet comprenant :</p>
      <ul>
        <li><strong>1ère Année :</strong> Fondements bibliques et théologie de base</li>
        <li><strong>2ème Année :</strong> Leadership chrétien et homilétique</li>
        <li><strong>3ème Année :</strong> Évangélisation et missions</li>
      </ul>
      
      <h3>Cérémonie d'Ouverture</h3>
      <p>La cérémonie d'ouverture s'est déroulée dans une atmosphère de recueillement et de joie. Les étudiants ont reçu leurs manuels de cours et ont été bénis pour leur parcours académique.</p>
      
      <p>Nous prions pour que cette formation transforme leurs vies et les équipe pour un service efficace dans le Royaume de Dieu.</p>
    `,
    author: 'Direction École Biblique',
    date: '2024-10-15',
    image: './images/ecole/ecole.jpeg',
    likes: 38,
    comments: [],
    category: 'Formation'
  },
  {
    id: '10',
    title: 'Avancement du Projet de Construction',
    excerpt: 'Les travaux de construction du nouveau lieu de culte progressent bien...',
    content: `
      <h2>Progression des Travaux de Construction</h2>
      
      <p>Nous sommes heureux de vous informer de l'avancement significatif des travaux de construction de notre nouveau lieu de culte. Grâce à vos dons généreux et à la grâce de Dieu, le projet prend forme.</p>
      
      <h3>État d'Avancement</h3>
      <ul>
        <li><strong>Fondations :</strong> 100% terminées</li>
        <li><strong>Structure :</strong> 75% terminée</li>
        <li><strong>Toiture :</strong> 60% terminée</li>
        <li><strong>Électricité :</strong> 40% terminée</li>
        <li><strong>Plomberie :</strong> 30% terminée</li>
      </ul>
      
      <h3>Prochaines Étapes</h3>
      <p>Dans les semaines à venir, nous nous concentrerons sur :</p>
      <ul>
        <li>Finalisation de la toiture</li>
        <li>Installation des systèmes électriques</li>
        <li>Début des travaux de finition intérieure</li>
        <li>Aménagement du système audio-visuel</li>
      </ul>
      
      <h3>Besoins Financiers</h3>
      <p>Pour terminer le projet, nous avons encore besoin de :</p>
      <ul>
        <li>Finitions intérieures : 2,500,000 FCFA</li>
        <li>Système audio-visuel : 1,800,000 FCFA</li>
        <li>Mobilier : 1,200,000 FCFA</li>
      </ul>
      
      <p>Nous comptons sur votre soutien continu pour mener à bien ce projet qui servira la communauté pour les générations à venir.</p>
    `,
    author: 'Comité de Construction',
    date: '2024-10-20',
    image: './images/havilah2.jpeg',
    likes: 52,
    comments: [
      {
        id: '4',
        author: 'Jean Baptiste',
        content: 'Gloire à Dieu ! Hâte de voir le projet terminé.',
        date: '2024-10-21',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    ],
    category: 'Construction'
  },
      
];

interface BlogSectionProps {
  showAll?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ showAll = false }) => {
  const [_selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [showAllPosts, setShowAllPosts] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_newComment, _setNewComment] = useState('');

  const displayedPosts = showAll ? blogPosts : blogPosts.slice(0, 3);

  // const MarqueeRow = ({ posts, direction = 'left' }: { posts: BlogPost[], direction?: 'left' | 'right' }) => (
  //   <motion.div
  //     className="flex gap-6 whitespace-nowrap"
  //     animate={{
  //       x: direction === 'left' ? [0, -1000] : [0, 1000]
  //     }}
  //     transition={{
  //       duration: 20,
  //       repeat: Infinity,
  //       ease: "linear"
  //     }}
  //   >
  //     {[...posts, ...posts, ...posts].map((post, index) => (
  //       <motion.div
  //         key={`${post.id}-${index}`}
  //         className="flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
  //         whileHover={{ scale: 1.05, y: -5 }}
  //         onClick={() => setSelectedPost(post)}
  //       >
  //         <div className="relative h-48 overflow-hidden">
  //           <img
  //             src={post.image}
  //             alt={post.title}
  //             className="w-full h-full object-cover"
  //           />
  //           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
  //           <div className="absolute bottom-4 left-4 right-4">
  //             <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
  //               {post.category}
  //             </span>
  //           </div>
  //         </div>
  //         <div className="p-6">
  //           <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
  //             {post.title}
  //           </h3>
  //           <p className="text-gray-600 text-sm mb-4 line-clamp-3">
  //             {post.excerpt}
  //           </p>
  //           <div className="flex items-center justify-between text-sm text-gray-500">
  //             <div className="flex items-center gap-2">
  //               <User className="w-4 h-4" />
  //               {post.author}
  //             </div>
  //             <div className="flex items-center gap-2">
  //               <Calendar className="w-4 h-4" />
  //               {new Date(post.date).toLocaleDateString('fr-FR')}
  //             </div>
  //           </div>
  //         </div>
  //       </motion.div>
  //     ))}
  //   </motion.div>
  // );

  return (
<section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">

  {/* Vue complète sans effet marquee */}
  {showAll || showAllPosts ? (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            viewport={{ once: true }}
            onClick={() => setSelectedPost(post)}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  ) : (
    /* Vue normale pour la page d'accueil */
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayedPosts.map((post, index) => (
          <motion.article
            key={post.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.02, y: -5 }}
            viewport={{ once: true }}
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.date).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments.length}
                  </div>
                </div>

                <motion.button
                  onClick={() => setSelectedPost(post)}
                  className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center gap-1"
                  whileHover={{ x: 5 }}
                >
                  Lire plus
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <div className="text-center">
        <motion.button
          onClick={() => setShowAllPosts(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Charger plus d'articles
        </motion.button>
      </div>
    </div>
  )}

</section>

  );
};