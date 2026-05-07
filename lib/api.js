const BASE = 'https://dummyjson.com';

// Massively expanded Unsplash image pools — 20+ per category to eliminate repetition
const UNSPLASH = {
  skincare: [
    'photo-1556228578-0d85b1a4d571', 'photo-1570172619644-dfd03ed5d881', 'photo-1598440947619-2c35fc9aa908',
    'photo-1612817288484-6f916006741a', 'photo-1611930022073-b7a4ba5fcccd', 'photo-1608248543803-ba4f8c70ae0b',
    'photo-1631729371254-42c2892f0e6e', 'photo-1617897903246-719242758050', 'photo-1601049676869-702ea24cfd58',
    'photo-1573461160327-b450ce3d8e7f', 'photo-1596755389378-c31d21fd1273', 'photo-1583252127486-75e4093ff951',
    'photo-1619451334792-150fd785ee74', 'photo-1556228720-195a672e8a03', 'photo-1620916566398-39f1143ab7be',
    'photo-1611080626919-7cf5a9dbab5b', 'photo-1590439471364-192aa70c0b53', 'photo-1614859324967-bdf413cd2bef',
    'photo-1571781926291-c477ebfd024b', 'photo-1599733589046-833caccbbd03', 'photo-1596704017254-9b121068fb31',
    'photo-1576426863848-c21f53c60b19', 'photo-1580870069867-74c57ee1bb07', 'photo-1522335789203-aabd1fc54bc9',
  ],
  beauty: [
    'photo-1522335789203-aabd1fc54bc9', 'photo-1596462502278-27bfdc403348', 'photo-1487412720507-e7ab37603c6f',
    'photo-1512496015851-a90fb38ba796', 'photo-1586495777744-4413f21062fa', 'photo-1571781926291-c477ebfd024b',
    'photo-1599733589046-833caccbbd03', 'photo-1596704017254-9b121068fb31', 'photo-1503236823255-94609f598e71',
    'photo-1583241800698-e8ab01830a07', 'photo-1597225244660-1cd128c64284', 'photo-1560750588-73207b1ef5b8',
    'photo-1516975080664-ed2fc6a32937', 'photo-1590156546946-ce55a12da3d8', 'photo-1556228578-8c89e6adf883',
    'photo-1631214524115-785a07bef90b', 'photo-1512496015851-a90fb38ba796', 'photo-1598452963314-b09f397a5c48',
    'photo-1616394584738-fc6e612e71b9', 'photo-1609587312208-cea54be969e7', 'photo-1614859324967-bdf413cd2bef',
  ],
  fragrances: [
    'photo-1541643600914-78b084683601', 'photo-1588405748880-12d1d2a59f75', 'photo-1592945403244-b3fbafd7f539',
    'photo-1563170351-be82bc888aa4', 'photo-1587017539504-67cfbddac569', 'photo-1595425970377-c9703cf48b6d',
    'photo-1594035910387-fea081ae7d26', 'photo-1523293182086-7651a899d37f', 'photo-1547887538-e3a2f32cb1cc',
    'photo-1557170334-a9632e77c6e4', 'photo-1615634260167-c8cdede054de', 'photo-1590156546946-ce55a12da3d8',
    'photo-1608528577891-eb055944f2e7', 'photo-1606850246029-0f269eda5e27', 'photo-1619994121345-b61cd610c5a6',
    'photo-1595777457583-95e059d581b8', 'photo-1566174053879-31528523f8ae', 'photo-1583743814966-8936f5b7be1a',
  ],
  'womens-dresses': [
    'photo-1595777457583-95e059d581b8', 'photo-1496747611176-843222e1e57c', 'photo-1515886657613-9f3515b0c78f',
    'photo-1566174053879-31528523f8ae', 'photo-1583743814966-8936f5b7be1a', 'photo-1571513722275-4b41940f54b8',
    'photo-1572804013309-59a88b7e92f1', 'photo-1618932260643-eee4a2f652a6', 'photo-1502716119720-b23a1e3b63cd',
    'photo-1539008835657-9e8e9680c956', 'photo-1485462537746-965f33f7f6a7', 'photo-1515372039744-b8f02a3ae446',
    'photo-1562572159-4efc207f5aff', 'photo-1509631179647-0177331693ae', 'photo-1544957992-20514f595d6f',
    'photo-1612336307429-8a898d10e223', 'photo-1551803091-e20673f15770', 'photo-1469334031218-e382a71b716b',
    'photo-1558171813-4c088753af8f', 'photo-1520367445093-50dc08a59d9d',
  ],
  'womens-bags': [
    'photo-1584917865442-de89df76afd3', 'photo-1548036328-c9fa89d128fa', 'photo-1590874103328-eac38a683ce7',
    'photo-1566150905458-1bf1fc113f0d', 'photo-1591561954557-26941169b49e', 'photo-1575032617751-6ddec2089882',
    'photo-1614179689702-355944cd0918', 'photo-1553062407-98eeb64c6a62', 'photo-1594223274512-ad4803739b7c',
    'photo-1605733513597-a3f0e2a4b2fc', 'photo-1559563458-527698bf5295', 'photo-1622560480654-996b80f2a8da',
    'photo-1608528577891-eb055944f2e7', 'photo-1585488763177-eab9b4bfa0e5', 'photo-1544816155-12df9643f363',
    'photo-1600857062241-98e5dba7f214', 'photo-1612902456551-404854679c80', 'photo-1618354691373-d851c5c3a990',
  ],
  'womens-jewellery': [
    'photo-1515562141589-67f0d93e501b', 'photo-1535632066927-ab7c9ab60908', 'photo-1602751584552-8ba73aad10e1',
    'photo-1611591437281-460bfbe1220a', 'photo-1599643478518-a784e5dc4c8f', 'photo-1573408301185-9146fe634ad0',
    'photo-1606760227091-3dd870d97f1d', 'photo-1630019852942-f89202989a59', 'photo-1598560917807-1bae44bd2be8',
    'photo-1617038220319-276d3cfab638', 'photo-1611085583191-a3b181a88401', 'photo-1603561596112-0a132b757442',
    'photo-1573408301185-9146fe634ad0', 'photo-1605100804763-247f67b3557e', 'photo-1610694955371-d4a3e0ce4b52',
    'photo-1599459182681-c45e00990540', 'photo-1588444837495-c6cfeb53f32d', 'photo-1596944924616-7b38e7cfac36',
  ],
  'womens-shoes': [
    'photo-1543163521-1bf539c55dd2', 'photo-1560343090-f0409e92791a', 'photo-1518049362265-d5b2a6467637',
    'photo-1525966222134-fcfa99b8ae77', 'photo-1511556532299-8f662fc26c06', 'photo-1560769629-975ec94e6a86',
    'photo-1595950653106-6c9ebd614d3a', 'photo-1596703263926-eb0762ee17e4', 'photo-1606107557195-0e29a4b5b4aa',
    'photo-1543163521-1bf539c55dd2', 'photo-1549298916-b41d501d3772', 'photo-1562273138-f46be4ebdf33',
    'photo-1515347619252-60a4bf4fff4f', 'photo-1603808033192-082d6919d3e1', 'photo-1542291026-7eec264c27ff',
    'photo-1605408499391-6368c628ef42', 'photo-1587563871167-1ee9c731aefb', 'photo-1600185365483-26d7a4cc7519',
  ],
  'womens-watches': [
    'photo-1524592094714-0f0654e20314', 'photo-1522312346375-d1a52e2b99b3', 'photo-1542496658-e33a6d0d50f6',
    'photo-1509941943733-c0a31e2b35d4', 'photo-1434056886845-dbbdc83db6ff', 'photo-1533139502658-0198f920d8e8',
    'photo-1548171915-e79a380a2a4b', 'photo-1506193095-80a57f4497d5', 'photo-1612817159949-195b6eb9e31a',
    'photo-1614164185128-e4ec99c436d7', 'photo-1618220179428-22790b461013', 'photo-1539874754764-5a96559165b0',
    'photo-1623998021446-45cd9b269d5e', 'photo-1594534475808-b18fc33b045e', 'photo-1587925358603-c2eea5305bbc',
  ],
  sunglasses: [
    'photo-1511499767150-a48a237f0083', 'photo-1508296695146-257a814070b4', 'photo-1574258495973-f010dfbb5371',
    'photo-1577803645773-f96470509666', 'photo-1473496169904-658ba7c44d8a', 'photo-1509631179647-0177331693ae',
    'photo-1572635196237-14b3f281503f', 'photo-1556306535-0f09a537f0a3', 'photo-1625591342274-013866818de8',
    'photo-1591076482161-42ce6da69f67', 'photo-1511499767150-a48a237f0083', 'photo-1605100804763-247f67b3557e',
    'photo-1582142306909-195724d33ffc', 'photo-1574258495973-f010dfbb5371', 'photo-1596942517067-59ecf614fe4b',
  ],
  tops: [
    'photo-1434389677669-e08b4cda3a00', 'photo-1503342217505-b0a15ec9261c', 'photo-1485462537746-965f33f7f6a7',
    'photo-1469334031218-e382a71b716b', 'photo-1494790108377-be9c29b29330', 'photo-1515886657613-9f3515b0c78f',
    'photo-1525507119028-ed4c629a60a3', 'photo-1564257631407-4deb1f99d992', 'photo-1581044777550-4cfa60707998',
    'photo-1562572159-4efc207f5aff', 'photo-1583743814966-8936f5b7be1a', 'photo-1539008835657-9e8e9680c956',
    'photo-1509631179647-0177331693ae', 'photo-1544957992-20514f595d6f', 'photo-1551803091-e20673f15770',
    'photo-1618354691373-d851c5c3a990', 'photo-1520367445093-50dc08a59d9d', 'photo-1558171813-4c088753af8f',
  ],
};

function unsplashUrl(id, w = 400) {
  return `https://images.unsplash.com/${id}?w=${w}&h=${Math.round(w * 1.33)}&fit=crop&q=80`;
}

// Expanded brands and product names
const BRANDS = [
  'Lumina', 'Aura', 'Velvet', 'Pearl', 'Maison Lux', 'Noir & Rose', 'Demi', 'Estée Vie',
  'Casa Bella', 'Oria', 'Soleil', 'Amara', 'Noire', 'Elysée', 'Florentina',
  'La Maison', 'Ines', 'Aurelia', 'Rosalia', 'Bellissima', 'Celestine', 'Ophelia',
  'Seraphina', 'Vivienne', 'Isolde', 'Margaux', 'Delphine', 'Violette',
];
const ADJ = [
  'Premium', 'Signature', 'Essential', 'Luxe', 'Radiant', 'Classic', 'Everyday', 'Heritage',
  'Artisan', 'Limited Edition', 'Exclusive', 'Iconic', 'Timeless', 'Refined', 'Botanical',
  'Midnight', 'Golden', 'Silk', 'Crystal', 'Velvet', 'Royal', 'Pearl', 'Rose',
  'Ivory', 'Satin', 'Matte', 'Sheer', 'Luminous', 'Opulent', 'Delicate',
];
const NOUNS = {
  skincare: ['Serum', 'Moisturizer', 'Cleanser', 'Toner', 'Eye Cream', 'Night Cream', 'Face Oil', 'Mask', 'Exfoliant', 'Essence', 'Mist', 'Balm', 'Gel Cream', 'Ampoule', 'Sleeping Pack', 'Sunscreen SPF50', 'Lip Balm', 'Micellar Water', 'Clay Mask', 'Retinol Treatment'],
  beauty: ['Lipstick', 'Foundation', 'Concealer', 'Blush', 'Highlighter', 'Mascara', 'Eyeshadow Palette', 'Bronzer', 'Setting Spray', 'Primer', 'Lip Gloss', 'Brow Pencil', 'Lip Liner', 'Setting Powder', 'Contour Kit', 'Lash Serum', 'CC Cream', 'Tinted Moisturizer', 'Lip Oil', 'Eye Primer'],
  fragrances: ['Eau de Parfum', 'Body Mist', 'Rollerball', 'Eau de Toilette', 'Perfume Oil', 'Discovery Set', 'Scented Candle', 'Room Spray', 'Travel Atomizer', 'Incense Set', 'Solid Perfume', 'Hair Mist', 'Fragrance Layering Kit', 'Reed Diffuser', 'Bath Oil'],
  'womens-dresses': ['Midi Dress', 'Maxi Dress', 'Wrap Dress', 'Slip Dress', 'Shirt Dress', 'Cocktail Dress', 'Summer Dress', 'Evening Gown', 'A-Line Dress', 'Blazer Dress', 'Knit Dress', 'Linen Dress', 'Halter Dress', 'Bodycon Dress', 'Tiered Dress', 'Off-Shoulder Dress', 'Pleated Dress', 'Tunic Dress'],
  'womens-bags': ['Tote Bag', 'Crossbody Bag', 'Clutch', 'Shoulder Bag', 'Mini Bag', 'Bucket Bag', 'Satchel', 'Hobo Bag', 'Belt Bag', 'Camera Bag', 'Weekender', 'Chain Bag', 'Envelope Clutch', 'Top Handle Bag', 'Backpack', 'Phone Bag', 'Woven Bag'],
  'womens-jewellery': ['Gold Necklace', 'Pendant', 'Hoop Earrings', 'Bracelet', 'Ring Set', 'Anklet', 'Choker', 'Statement Earrings', 'Chain Bracelet', 'Pearl Studs', 'Layered Necklace', 'Cuff Bangle', 'Signet Ring', 'Drop Earrings', 'Tennis Bracelet', 'Charm Bracelet', 'Bar Necklace'],
  'womens-shoes': ['Heels', 'Mules', 'Sandals', 'Sneakers', 'Flats', 'Boots', 'Loafers', 'Wedges', 'Platforms', 'Kitten Heels', 'Ankle Boots', 'Slides', 'Espadrilles', 'Slingbacks', 'Mary Janes', 'Ballet Flats', 'Chelsea Boots'],
  'womens-watches': ['Analog Watch', 'Bracelet Watch', 'Chronograph', 'Dress Watch', 'Petite Watch', 'Rose Gold Watch', 'Mesh Strap Watch', 'Leather Watch', 'Diamond Watch', 'Minimalist Watch', 'Dual-Tone Watch', 'Tank Watch'],
  sunglasses: ['Cat Eye Sunglasses', 'Aviators', 'Oversized Frames', 'Round Sunglasses', 'Square Frames', 'Retro Sunglasses', 'Shield Sunglasses', 'Tortoise Frames', 'Mirrored Aviators', 'Slim Frames', 'Geometric Frames', 'Gradient Lens', 'Rimless Sunglasses'],
  tops: ['Silk Blouse', 'Knit Top', 'Camisole', 'Bodysuit', 'Crop Top', 'Linen Shirt', 'Peplum Top', 'Turtleneck', 'Wrap Top', 'Off-Shoulder Top', 'Halter Top', 'Tank Top', 'Ruffle Blouse', 'Button-Down', 'Bandeau Top', 'Polo Shirt'],
};

const CATS = Object.keys(NOUNS);

function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateProduct(index) {
  const cat = CATS[index % CATS.length];
  const nouns = NOUNS[cat];
  const imgs = UNSPLASH[cat] || UNSPLASH.beauty;
  const r = seededRandom(index + 1);
  const r2 = seededRandom(index + 7);
  const r3 = seededRandom(index + 13);
  const r4 = seededRandom(index + 19);

  const brand = BRANDS[Math.floor(r * BRANDS.length)];
  const adj = ADJ[Math.floor(r2 * ADJ.length)];
  const noun = nouns[Math.floor(r3 * nouns.length)];

  const price = Math.round((15 + r * 285) * 100) / 100;
  const discount = r2 > 0.6 ? Math.round(10 + r3 * 40) : 0;
  const rating = Math.round((3.5 + r * 1.5) * 10) / 10;
  // Use multiple image indices to avoid repetition
  const imgIdx = Math.floor(r4 * imgs.length);
  const imgId = imgs[imgIdx % imgs.length];

  return {
    id: 1 + (index % 194),
    _uid: index,
    title: `${adj} ${noun}`,
    brand,
    category: cat,
    price,
    discountPercentage: discount,
    rating,
    stock: Math.round(5 + r * 95),
    description: `Discover the ${adj.toLowerCase()} ${noun.toLowerCase()} by ${brand}. Expertly crafted with premium materials for an elevated everyday experience.`,
    thumbnail: unsplashUrl(imgId, 400),
    images: [
      unsplashUrl(imgId, 800),
      unsplashUrl(imgs[(imgIdx + 3) % imgs.length], 800),
      unsplashUrl(imgs[(imgIdx + 7) % imgs.length], 800),
    ],
    reviews: [
      { reviewerName: 'Amara K.', rating: 5, comment: 'Absolutely love this — quality is outstanding.' },
      { reviewerName: 'Ngozi F.', rating: 4, comment: 'Beautiful piece, arrived quickly. Would recommend.' },
      { reviewerName: 'Fatima R.', rating: 5, comment: 'Exceeded my expectations. Will order again.' },
    ],
  };
}

export function getProducts(page = 1, perPage = 24, category = null) {
  const TOTAL = 2400;
  let all = [];
  for (let i = 0; i < TOTAL; i++) {
    all.push(generateProduct(i));
  }
  if (category) {
    all = all.filter((p) => p.category === category);
  }
  const start = (page - 1) * perPage;
  return {
    products: all.slice(start, start + perPage),
    total: all.length,
    totalPages: Math.ceil(all.length / perPage),
    page,
  };
}

export async function fetchCategory(category, limit = 30) {
  try {
    const res = await fetch(`${BASE}/products/category/${category}?limit=${limit}`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const imgs = UNSPLASH[category] || UNSPLASH.beauty;
    return data.products.map((p, i) => ({
      ...p,
      _unsplashThumb: unsplashUrl(imgs[i % imgs.length], 400),
      _unsplashImages: [
        unsplashUrl(imgs[i % imgs.length], 800),
        unsplashUrl(imgs[(i + 3) % imgs.length], 800),
        unsplashUrl(imgs[(i + 7) % imgs.length], 800),
      ],
    }));
  } catch {
    return getProducts(1, limit, category).products;
  }
}

export async function fetchProduct(id) {
  try {
    const res = await fetch(`${BASE}/products/${id}`);
    if (!res.ok) throw new Error();
    const p = await res.json();
    const imgs = UNSPLASH[p.category] || UNSPLASH.beauty;
    return {
      ...p,
      _unsplashThumb: unsplashUrl(imgs[0], 400),
      _unsplashImages: imgs.slice(0, 5).map((id) => unsplashUrl(id, 900)),
    };
  } catch {
    return generateProduct(parseInt(id) || 1);
  }
}

export async function searchProducts(q, limit = 12) {
  try {
    const res = await fetch(`${BASE}/products/search?q=${encodeURIComponent(q)}&limit=${limit}`);
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export const CATEGORIES = [
  { slug: 'skincare', label: 'Skincare' },
  { slug: 'beauty', label: 'Beauty' },
  { slug: 'fragrances', label: 'Fragrances' },
  { slug: 'womens-dresses', label: 'Dresses' },
  { slug: 'womens-bags', label: 'Bags' },
  { slug: 'womens-jewellery', label: 'Jewellery' },
  { slug: 'womens-shoes', label: 'Shoes' },
  { slug: 'womens-watches', label: 'Watches' },
  { slug: 'sunglasses', label: 'Sunglasses' },
  { slug: 'tops', label: 'Tops' },
];

export function formatPrice(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
}

export function getOriginalPrice(price, disc) {
  return disc > 5 ? price / (1 - disc / 100) : null;
}
