export const predictDonorAvailability = async (donorId) => {
  // Placeholder ML logic; returns deterministic mock based on id hash
  const score = Array.from(String(donorId)).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 100;
  const availability = score > 50 ? 'high' : score > 25 ? 'medium' : 'low';
  return { donorId, availability, score };
};
