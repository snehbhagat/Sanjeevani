export function toDonorJSON(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    userId: doc.user ? String(doc.user) : undefined,
    name: doc.name,
    email: doc.email,
    bloodGroup: doc.bloodGroup,
    location: doc.location,
    availability: doc.availability,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toDonorsList(docs) {
  return docs.map(toDonorJSON);
}
