export default function StructuredData() {
  const events = [
    { city: 'Katowice', date: '2025-12-15' },
    { city: 'Kraków', date: '2025-12-20' },
    { city: 'Warszawa', date: '2025-12-22' },
    { city: 'Poznań', date: '2026-01-10' },
    { city: 'Racibórz', date: '2026-01-15' },
  ];

  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Ocean Spokoju',
    description: 'Premium kąpiel w dźwiękach - warsztaty mis tybetańskich dla relaksacji i harmonii wewnętrznej',
    url: 'https://oceanspokoju.studio',
    telephone: '+48-123-456-789',
    email: 'kontakt@oceanspokoju.studio',
    priceRange: '200-300 PLN',
    areaServed: ['Katowice', 'Kraków', 'Warszawa', 'Poznań', 'Racibórz'],
    slogan: 'Zabieg pielęgnacyjny dla duszy',
  };

  const eventsSchema = events.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `Ocean Spokoju - Kąpiel w Dźwiękach ${event.city}`,
    description: '2,5h luksusowej kąpieli w dźwiękach. Warsztaty mis tybetańskich, medytacja i głęboka relaksacja w małej grupie (max 7 osób).',
    startDate: event.date,
    endDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.city,
      address: {
        '@type': 'PostalAddress',
        addressLocality: event.city,
        addressCountry: 'PL',
      },
    },
    offers: {
      '@type': 'Offer',
      price: '200',
      priceCurrency: 'PLN',
      availability: 'https://schema.org/InStock',
      url: 'https://oceanspokoju.studio/#contact',
      validFrom: new Date().toISOString(),
    },
    performer: {
      '@type': 'Organization',
      name: 'Ocean Spokoju',
      url: 'https://oceanspokoju.studio',
    },
    organizer: {
      '@type': 'Organization',
      name: 'Ocean Spokoju',
      url: 'https://oceanspokoju.studio',
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      {eventsSchema.map((event, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(event) }}
        />
      ))}
    </>
  );
}
