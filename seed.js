const admin = require('firebase-admin');

// Gunakan fail credential yang sama dengan server.js
const serviceAccount = require("./serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

const productData = [
  // ==========================================
  // PEPTIDES & WEIGHT LOSS (GROUPBUY)
  // ==========================================
  {
    id: "retatrutide",
    name: "Retatrutide",
    category: "Groupbuy Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 250.00 },
      { size: "5mg", type: "Vial", price: 25.00 },
      { size: "10mg", type: "Kit", price: 300.00 },
      { size: "10mg", type: "Vial", price: 30.00 },
      { size: "15mg", type: "Kit", price: 450.00 },
      { size: "15mg", type: "Vial", price: 45.00 },
      { size: "20mg", type: "Kit", price: 500.00 },
      { size: "20mg", type: "Vial", price: 50.00 },
      { size: "30mg", type: "Kit", price: 750.00 },
      { size: "30mg", type: "Vial", price: 75.00 },
      { size: "40mg", type: "Kit", price: 900.00 },
      { size: "40mg", type: "Vial", price: 90.00 }
    ]
  },
  {
    id: "reta_cagri",
    name: "Reta Cagri",
    category: "Groupbuy Peptides",
    variations: [
      { size: "10mg", type: "Kit", price: 800.00 },
      { size: "10mg", type: "Vial", price: 80.00 }
    ]
  },
  {
    id: "reta_tirze",
    name: "Reta Tirze",
    category: "Groupbuy Peptides",
    variations: [
      { size: "60mg", type: "Kit", price: 1800.00 },
      { size: "60mg", type: "Vial", price: 180.00 }
    ]
  },
  {
    id: "tirzepatide",
    name: "Tirzepatide",
    category: "Groupbuy Peptides",
    variations: [
      { size: "10mg", type: "Kit", price: 250.00 },
      { size: "10mg", type: "Vial", price: 25.00 },
      { size: "15mg", type: "Kit", price: 350.00 },
      { size: "15mg", type: "Vial", price: 35.00 },
      { size: "20mg", type: "Kit", price: 400.00 },
      { size: "20mg", type: "Vial", price: 40.00 },
      { size: "30mg", type: "Kit", price: 500.00 },
      { size: "30mg", type: "Vial", price: 50.00 }
    ]
  },
  {
    id: "semaglutide",
    name: "Semaglutide",
    category: "Groupbuy Peptides",
    variations: [
      { size: "10mg", type: "Kit", price: 250.00 },
      { size: "10mg", type: "Vial", price: 25.00 },
      { size: "15mg", type: "Kit", price: 300.00 },
      { size: "15mg", type: "Vial", price: 30.00 },
      { size: "20mg", type: "Kit", price: 350.00 },
      { size: "20mg", type: "Vial", price: 35.00 },
      { size: "30mg", type: "Kit", price: 450.00 },
      { size: "30mg", type: "Vial", price: 45.00 }
    ]
  },
  {
    id: "cagrilintide",
    name: "Cagrilintide",
    category: "Groupbuy Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 450.00 },
      { size: "5mg", type: "Vial", price: 45.00 },
      { size: "10mg", type: "Kit", price: 650.00 },
      { size: "10mg", type: "Vial", price: 65.00 }
    ]
  },
  {
    id: "mots_c",
    name: "MOTS-C",
    category: "Cellular Health",
    variations: [
      { size: "10mg", type: "Kit", price: 300.00 },
      { size: "10mg", type: "Vial", price: 30.00 },
      { size: "20mg", type: "Kit", price: 500.00 },
      { size: "20mg", type: "Vial", price: 50.00 },
      { size: "30mg", type: "Kit", price: 700.00 },
      { size: "30mg", type: "Vial", price: 70.00 }
    ]
  },
  {
    id: "bpc_157",
    name: "BPC 157",
    category: "Recovery Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 250.00 },
      { size: "5mg", type: "Vial", price: 25.00 },
      { size: "10mg", type: "Kit", price: 350.00 },
      { size: "10mg", type: "Vial", price: 35.00 }
    ]
  },
  {
    id: "tb500",
    name: "TB500",
    category: "Recovery Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 350.00 },
      { size: "5mg", type: "Vial", price: 35.00 },
      { size: "10mg", type: "Kit", price: 550.00 },
      { size: "10mg", type: "Vial", price: 55.00 }
    ]
  },
  {
    id: "nad_plus",
    name: "NAD+",
    category: "Cellular Health",
    variations: [
      { size: "500mg", type: "Kit", price: 300.00 },
      { size: "500mg", type: "Vial", price: 30.00 },
      { size: "1000mg", type: "Kit", price: 350.00 },
      { size: "1000mg", type: "Vial", price: 35.00 }
    ]
  },

  // ==========================================
  // BEAUTY PRODUCT CATALOGUE (DIRECT TOPICALS)
  // ==========================================
  {
    id: "ghkcu_serum_blue",
    name: "GHK-Cu SERUM (BLUE)",
    category: "Skincare Topicals",
    description: "Supports Collagen Production, Improves Skin Firmness & Elasticity, Helps Reduce Acne Scars.",
    variations: [
      { size: "1 set", type: "Topical/Microneedling (With Applicator)", price: 10.00 }
    ]
  },
  {
    id: "hydro_glow_serum_pink",
    name: "HYDRO GLOW SERUM (PINK)",
    category: "Skincare Topicals",
    description: "Brightens Dull Skin, Enhances Natural Radiance, Improves Skin Hydration.",
    variations: [
      { size: "1 vial", type: "Topical or Microneedling", price: 10.00 }
    ]
  },
  {
    id: "fiona_masker_green",
    name: "FIONA MASKER (GREEN)",
    category: "Skincare Topicals",
    description: "Absorbs Excess Oil, Refines Skin Texture, Minimizes Pores.",
    variations: [
      { size: "1 set", type: "Topical Treatment", price: 15.00 }
    ]
  }
];

async function seedProducts() {
  console.log(" Memulakan proses memasukkan data ke Firestore...");
  const batch = db.batch();
  
  productData.forEach((product) => {
    const docRef = db.collection('products').doc(product.id);
    batch.set(docRef, {
      name: product.name,
      category: product.category,
      ...(product.description && { description: product.description }),
      variations: product.variations,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

  try {
    await batch.commit();
    console.log(` SUKSES! ${productData.length} sampel produk utama berserta variasi harga telah selamat masuk ke Firestore.`);
  } catch (error) {
    console.error("❌ Ralat ketika seeding data:", error);
  }
}

seedProducts();