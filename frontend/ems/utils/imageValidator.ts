export const imageValidator = (imgFile: File): boolean => {
  if (!imgFile.type.startsWith('image/')) {
    throw new Error('File should be an image');
  }
  if (imgFile.size > 2_097_152) {
    throw new Error('Image size should be less than 2MB');
  }
  return true;
};
