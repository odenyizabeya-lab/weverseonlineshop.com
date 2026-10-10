// Product listings — shop items uploaded by the owner from their
// Downloads folder. Images are stored locally in public/products/ so
// the showroom cards always load. Uses the same card format as cars,
// trucks, and motorhomes.

const IMG = (p) => `/products/${p}`;

function gallery(...paths) {
  return paths.map((p) => IMG(p));
}

export const PRODUCT_LISTINGS = [];