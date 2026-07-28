/** Normalize Next.js StaticImageData or string asset imports for <img src>. */
export function assetSrc(image: string | { src: string }): string {
  return typeof image === "string" ? image : image.src;
}
