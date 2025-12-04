import { Calendar, MapPin, Clock, Users } from 'lucide-react';

export default function Events() {
  const events = [
    {
      title: "Havilah 2026",
      date: "05 au 07 Decembre 2025",
      time: "17h00 - 22h00",
      location: "Sanctuaire Principal",
      description: "Une soirée dédiée au batissement du temple  spirituel avec des invités spéciaux.",
      attendees: "150+",
      image: "/images/havilah2.jpeg"
    },
     {
      title: "Conférence Spirituelle",
      date: "15 Mars 2025",
      time: "19h00 - 22h00",
      location: "Sanctuaire Principal",
      description: "Une soirée dédiée à l'approfondissement spirituel avec des invités spéciaux.",
      attendees: "150+",
      image: "/images/worship.jpg"
    },
    {
      title: "Retraite de Jeunesse",
      date: "22-24 Mars 2025",
      time: "Vendredi 18h - Dimanche 16h",
      location: "Centre de Retraite",
      description: "Weekend de formation, de communion et d'activités pour les 16-35 ans.",
      attendees: "80+",
      image: "/images/worship.jpg"
    },
    {
      title: "Baptême Collectif",
      date: "5 Avril 2025",
      time: "15h00 - 17h00",
      location: "Piscine Baptismale",
      description: "Cérémonie de baptême par immersion pour nouveaux convertis.",
      attendees: "200+",
      image: "/images/ecole/bapt.jpeg"
    },
    {
      title: "Action Caritative",
      date: "12 Avril 2025",
      time: "10h00 - 16h00",
      location: "Centre Ville",
      description: "Distribution de repas et aide aux personnes dans le besoin.",
      attendees: "50+",
      image: "/images/worship.jpg"
    }
  ];

  return (
    <section id="evenements" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Événements à Venir
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos prochains événements et activités. Rejoignez-nous pour des moments 
            de partage, de formation et de communion fraternelle.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {events.map((event, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {event.date}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users size={16} />
                    <span>{event.attendees} participants attendus</span>
                  </div>
                </div>
                
                <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors">
                  S'inscrire à l'événement
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="text-center">
            <Calendar className="text-amber-500 mx-auto mb-4" size={48} />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Restez Informé de Nos Événements
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir les dernières nouvelles 
              sur nos événements, activités et messages spirituels.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}