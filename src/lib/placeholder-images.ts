import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;

export const placeholderImageMap = PlaceHolderImages.reduce((acc, img) => {
    acc[img.id] = img;
    return acc;
}, {} as Record<string, ImagePlaceholder>);
