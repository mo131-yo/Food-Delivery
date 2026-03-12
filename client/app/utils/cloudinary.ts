export const getCloudinaryUrl = (publicId: string) => {
  if (!publicId) return "https://via.placeholder.com/500?text=No+ID";

  if (publicId.startsWith('http')) return publicId;

  const cloudName = "dzljgphud";
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_fill,w_600,h_400/${publicId}`;
};