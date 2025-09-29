/**
 * Mock service to fetch nearby disease outbreaks.
 * In a real application, this would fetch data from a database or external API.
 */

export async function getNearbyOutbreaks(location: string): Promise<{ disease: string; date: string }[]> {
  console.log(`Fetching outbreaks for location: ${location}`);

  // Mock data - in a real app, you'd query a database based on location.
  const allOutbreaks = {
    'jos': [
      { disease: 'Avian Influenza', date: '2024-07-15' },
      { disease: 'African Swine Fever', date: '2024-07-10' },
    ],
    'lagos': [
      { disease: 'Newcastle Disease', date: '2024-07-20' },
    ],
    'abuja': [],
    'enugu': [
        { disease: 'Fowl Pox', date: '2024-07-05' }
    ],
  };

  const locationKey = location.toLowerCase().split(',')[0].trim();
  
  // Return a promise to simulate async behavior
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(allOutbreaks[locationKey as keyof typeof allOutbreaks] || []);
    }, 500);
  });
}
