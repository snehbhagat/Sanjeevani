export function toRequestJSON(doc) {
  if (!doc) return null;
  return {
    id: String(doc._id),
    patientName: doc.patientName,
    bloodGroup: doc.bloodGroup,
    urgency: doc.urgency,
    hospital: doc.hospital,
    active: doc.active,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export function toRequestsList(docs) {
  return docs.map(toRequestJSON);
}
