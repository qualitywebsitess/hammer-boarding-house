import type { ImageMetadata } from 'astro';

export type ImageRatio = '16/10' | '4/3' | '3/2' | '1/1';

interface ImageSlot {
  file: string;
  ratio: ImageRatio;
  alt: string;
}

// Fixed, permanent slots. To add a real photo later, drop a file at the exact
// name below into src/assets/images/ — no code changes required.
export const imageSlots = {
  // Brand mark. Save the logo as src/assets/images/logo.png (or .svg) and it
  // replaces the text wordmark automatically — no code change needed.
  logo: {
    file: 'logo.png',
    ratio: '1/1',
    alt: 'Hammer Boarding House',
  },
  hero: {
    file: 'hero.jpg',
    ratio: '16/10',
    alt: 'Hammer Boarding House — photography coming soon',
  },
  exterior: {
    file: 'exterior.jpg',
    ratio: '4/3',
    alt: 'Hammer Boarding House exterior — photography coming soon',
  },
  room01: {
    file: 'room-01.jpg',
    ratio: '4/3',
    alt: 'Furnished room at Hammer Boarding House — photography coming soon',
  },
  room02: {
    file: 'room-02.jpg',
    ratio: '4/3',
    alt: 'Furnished room at Hammer Boarding House — photography coming soon',
  },
  amenityWifi: {
    file: 'amenity-wifi.jpg',
    ratio: '1/1',
    alt: 'Wi-Fi included at Hammer Boarding House — photography coming soon',
  },
} as const satisfies Record<string, ImageSlot>;

export type ImageSlotKey = keyof typeof imageSlots;

// Optional, precise alt text for individual gallery photos, keyed by filename.
// Not required — gallery images fall back to a sensible generic alt text
// if a filename has no entry here.
const galleryAltOverrides: Record<string, string> = {};

const fixedImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

const galleryImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/gallery/*.{jpg,jpeg,png,webp,avif}',
  { eager: true }
);

function findByFilename(
  modules: Record<string, { default: ImageMetadata }>,
  filename: string
): ImageMetadata | undefined {
  const entry = Object.entries(modules).find(([path]) => path.endsWith(`/${filename}`));
  return entry?.[1]?.default;
}

/** Resolves a fixed slot to its real image asset, or undefined if no file has been added yet. */
export function getSlotImage(key: ImageSlotKey): ImageMetadata | undefined {
  return findByFilename(fixedImages, imageSlots[key].file);
}

export interface GalleryEntry {
  image: ImageMetadata;
  alt: string;
}

/** Returns every gallery photo currently present, in filename order. Empty until real photos are added. */
export function getGalleryImages(): GalleryEntry[] {
  return Object.entries(galleryImages)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, mod]) => {
      const filename = path.split('/').pop() ?? '';
      return {
        image: mod.default,
        alt: galleryAltOverrides[filename] ?? 'Hammer Boarding House — photograph pending',
      };
    });
}
