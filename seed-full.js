const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ==================== FULL PRODUCT LIST (from your PDFs) ====================
const allProducts = [
  // Peptides & Weight Loss
  {
    name: "Retatrutide",
    category: "Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 },
      { size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 },
      { size: "15mg", type: "Kit", price: 450.00 }, { size: "15mg", type: "Vial", price: 45.00 },
      { size: "20mg", type: "Kit", price: 500.00 }, { size: "20mg", type: "Vial", price: 50.00 },
      { size: "30mg", type: "Kit", price: 750.00 }, { size: "30mg", type: "Vial", price: 75.00 },
      { size: "40mg", type: "Kit", price: 900.00 }, { size: "40mg", type: "Vial", price: 90.00 }
    ]
  },
  { name: "Reta Cagri", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 800.00 }, { size: "10mg", type: "Vial", price: 80.00 }] },
  { name: "Reta Tirze", category: "Peptides", variations: [{ size: "60mg", type: "Kit", price: 1800.00 }, { size: "60mg", type: "Vial", price: 180.00 }] },
  {
    name: "Tirzepatide", category: "Peptides",
    variations: [
      { size: "10mg", type: "Kit", price: 250.00 }, { size: "10mg", type: "Vial", price: 25.00 },
      { size: "15mg", type: "Kit", price: 350.00 }, { size: "15mg", type: "Vial", price: 35.00 },
      { size: "20mg", type: "Kit", price: 400.00 }, { size: "20mg", type: "Vial", price: 40.00 },
      { size: "30mg", type: "Kit", price: 500.00 }, { size: "30mg", type: "Vial", price: 50.00 }
    ]
  },
  {
    name: "Semaglutide", category: "Peptides",
    variations: [
      { size: "10mg", type: "Kit", price: 250.00 }, { size: "10mg", type: "Vial", price: 25.00 },
      { size: "15mg", type: "Kit", price: 300.00 }, { size: "15mg", type: "Vial", price: 30.00 },
      { size: "20mg", type: "Kit", price: 350.00 }, { size: "20mg", type: "Vial", price: 35.00 },
      { size: "30mg", type: "Kit", price: 450.00 }, { size: "30mg", type: "Vial", price: 45.00 }
    ]
  },
  {
    name: "Cagrilintide", category: "Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 450.00 }, { size: "5mg", type: "Vial", price: 45.00 },
      { size: "10mg", type: "Kit", price: 650.00 }, { size: "10mg", type: "Vial", price: 65.00 }
    ]
  },
  { name: "Cagri Sema", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 550.00 }, { size: "5mg", type: "Vial", price: 55.00 }, { size: "10mg", type: "Kit", price: 900.00 }, { size: "10mg", type: "Vial", price: 90.00 }] },
  { name: "Cagri Tirze", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 800.00 }, { size: "20mg", type: "Vial", price: 80.00 }] },
  { name: "Adipotide", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 800.00 }, { size: "5mg", type: "Vial", price: 80.00 }] },
  { name: "Survodutide", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 1200.00 }, { size: "10mg", type: "Vial", price: 120.00 }] },
  { name: "Mazdutide", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 800.00 }, { size: "10mg", type: "Vial", price: 80.00 }] },
  {
    name: "MOTS-C", category: "Cellular Health",
    variations: [
      { size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 },
      { size: "20mg", type: "Kit", price: 500.00 }, { size: "20mg", type: "Vial", price: 50.00 },
      { size: "30mg", type: "Kit", price: 700.00 }, { size: "30mg", type: "Vial", price: 70.00 },
      { size: "40mg", type: "Kit", price: 800.00 }, { size: "40mg", type: "Vial", price: 80.00 }
    ]
  },
  { name: "AOD-9604", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 450.00 }, { size: "5mg", type: "Vial", price: 45.00 }, { size: "10mg", type: "Kit", price: 700.00 }, { size: "10mg", type: "Vial", price: 70.00 }] },
  { name: "SLU-PP-322", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 450.00 }, { size: "5mg", type: "Vial", price: 45.00 }] },
  {
    name: "5 Amino 1MQ", category: "Peptides",
    variations: [
      { size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 },
      { size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 },
      { size: "50mg", type: "Kit", price: 650.00 }, { size: "50mg", type: "Vial", price: 65.00 }
    ]
  },
  { name: "NAD+", category: "Cellular Health", variations: [{ size: "500mg", type: "Kit", price: 300.00 }, { size: "500mg", type: "Vial", price: 30.00 }, { size: "1000mg", type: "Kit", price: 350.00 }, { size: "1000mg", type: "Vial", price: 35.00 }] },
  { name: "Wolverine", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }, { size: "20mg", type: "Kit", price: 650.00 }, { size: "20mg", type: "Vial", price: 65.00 }] },
  { name: "BPC 157", category: "Recovery Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "TB500", category: "Recovery Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 550.00 }, { size: "10mg", type: "Vial", price: 55.00 }] },
  { name: "KPV", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "Tesamorelin", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 450.00 }, { size: "5mg", type: "Vial", price: 45.00 }, { size: "10mg", type: "Kit", price: 700.00 }, { size: "10mg", type: "Vial", price: 70.00 }, { size: "20mg", type: "Kit", price: 1300.00 }, { size: "20mg", type: "Vial", price: 130.00 }] },
  { name: "Tesa IPA", category: "Peptides", variations: [{ size: "15mg", type: "Kit", price: 950.00 }, { size: "15mg", type: "Vial", price: 95.00 }] },
  { name: "Ipamorelin", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "CJC No DAC", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 750.00 }, { size: "10mg", type: "Vial", price: 75.00 }] },
  { name: "CJC With DAC", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 800.00 }, { size: "5mg", type: "Vial", price: 80.00 }] },
  { name: "CJC No DAC IPA", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 450.00 }, { size: "10mg", type: "Vial", price: 45.00 }] },
  { name: "IGF-1 LR3", category: "Peptides", variations: [{ size: "0.1mg", type: "Kit", price: 250.00 }, { size: "0.1mg", type: "Vial", price: 25.00 }, { size: "1mg", type: "Kit", price: 800.00 }, { size: "1mg", type: "Vial", price: 80.00 }] },
  { name: "IGF-1 DES", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 400.00 }, { size: "2mg", type: "Vial", price: 40.00 }] },
  { name: "PEG MGF", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 550.00 }, { size: "2mg", type: "Vial", price: 55.00 }] },
  { name: "GHRP 2", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }] },
  { name: "GHRP 6", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "HCG", category: "Hormones", variations: [{ size: "5000iu", type: "Kit", price: 500.00 }, { size: "5000iu", type: "Vial", price: 50.00 }, { size: "10000iu", type: "Kit", price: 900.00 }, { size: "10000iu", type: "Vial", price: 90.00 }] },
  { name: "HMG 75iu", category: "Hormones", variations: [{ size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "Semax", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 200.00 }, { size: "5mg", type: "Vial", price: 20.00 }, { size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "Semax Selank", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 550.00 }, { size: "20mg", type: "Vial", price: 55.00 }] },
  { name: "Selank", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 200.00 }, { size: "5mg", type: "Vial", price: 20.00 }, { size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "SS-31", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }, { size: "50mg", type: "Kit", price: 1300.00 }, { size: "50mg", type: "Vial", price: 130.00 }] },
  { name: "Epithalon", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 200.00 }, { size: "10mg", type: "Vial", price: 20.00 }, { size: "50mg", type: "Kit", price: 550.00 }, { size: "50mg", type: "Vial", price: 55.00 }] },
  { name: "DSIP", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 200.00 }, { size: "5mg", type: "Vial", price: 20.00 }] },
  { name: "ARA 290", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "PT-141", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "Kisspeptin", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 300.00 }, { size: "5mg", type: "Vial", price: 30.00 }, { size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }] },
  { name: "AICAR", category: "Peptides", variations: [{ size: "50mg", type: "Kit", price: 350.00 }, { size: "50mg", type: "Vial", price: 35.00 }] },
  { name: "LL37", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "Relaxation PM", category: "Peptides", variations: [{ size: "10ml", type: "Kit", price: 350.00 }, { size: "10ml", type: "Vial", price: 35.00 }] },
  { name: "VIP", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 600.00 }, { size: "10mg", type: "Vial", price: 60.00 }] },
  { name: "Hexarelin Acetate", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 400.00 }, { size: "2mg", type: "Vial", price: 40.00 }, { size: "5mg", type: "Kit", price: 500.00 }, { size: "5mg", type: "Vial", price: 50.00 }, { size: "10mg", type: "Kit", price: 800.00 }, { size: "10mg", type: "Vial", price: 80.00 }] },
  { name: "Sermorelin Acetate", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 450.00 }, { size: "10mg", type: "Vial", price: 45.00 }] },
  { name: "Thymosin B4 Acetate", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 550.00 }, { size: "10mg", type: "Vial", price: 55.00 }] },
  { name: "Thymosin Alpha 1", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 650.00 }, { size: "10mg", type: "Vial", price: 65.00 }] },
  { name: "Adamax", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 500.00 }, { size: "10mg", type: "Vial", price: 50.00 }] },
  { name: "Thymalin", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "Pinealon", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "FOXO4-DRI", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 400.00 }, { size: "2mg", type: "Vial", price: 40.00 }] },
  { name: "Oxytocin Acetate", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 200.00 }, { size: "2mg", type: "Vial", price: 20.00 }] },
  { name: "MT1", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "MT2", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 300.00 }, { size: "10mg", type: "Vial", price: 30.00 }] },
  { name: "Melatonin", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 350.00 }, { size: "10mg", type: "Vial", price: 35.00 }] },
  { name: "Cerebrolysin", category: "Peptides", variations: [{ size: "60mg", type: "Kit", price: 90.00 }, { size: "60mg", type: "Vial", price: 15.00 }] },
  { name: "ACE 031", category: "Peptides", variations: [{ size: "1mg", type: "Kit", price: 200.00 }, { size: "1mg", type: "Vial", price: 20.00 }] },
  { name: "B7-33", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 250.00 }, { size: "2mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 900.00 }, { size: "10mg", type: "Vial", price: 90.00 }] },
  { name: "Cortagen", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 450.00 }, { size: "20mg", type: "Vial", price: 45.00 }] },
  { name: "Demorphin", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 200.00 }, { size: "2mg", type: "Vial", price: 20.00 }, { size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }] },
  { name: "EPO", category: "Hormones", variations: [{ size: "3000iu", type: "Kit", price: 500.00 }, { size: "3000iu", type: "Vial", price: 50.00 }] },
  { name: "Gonadorelin Acetate", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }] },
  { name: "Humanin", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 1200.00 }, { size: "10mg", type: "Vial", price: 120.00 }] },
  { name: "RA 260", category: "Peptides", variations: [{ size: "50mg", type: "Kit", price: 350.00 }, { size: "50mg", type: "Vial", price: 35.00 }] },
  { name: "PNC 27", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 450.00 }, { size: "5mg", type: "Vial", price: 45.00 }] },
  { name: "P21", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 1400.00 }, { size: "5mg", type: "Vial", price: 140.00 }] },
  { name: "TB FRAG", category: "Peptides", variations: [{ size: "2mg", type: "Kit", price: 300.00 }, { size: "2mg", type: "Vial", price: 30.00 }, { size: "5mg", type: "Kit", price: 350.00 }, { size: "5mg", type: "Vial", price: 35.00 }, { size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }] },
  { name: "Dulaglutide", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 650.00 }, { size: "5mg", type: "Vial", price: 65.00 }, { size: "10mg", type: "Kit", price: 900.00 }, { size: "10mg", type: "Vial", price: 95.00 }] },
  { name: "Liraglutide", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 500.00 }, { size: "5mg", type: "Vial", price: 50.00 }, { size: "10mg", type: "Kit", price: 750.00 }, { size: "10mg", type: "Vial", price: 75.00 }, { size: "20mg", type: "Kit", price: 1200.00 }, { size: "20mg", type: "Vial", price: 120.00 }] },
  { name: "Follistatin", category: "Peptides", variations: [{ size: "1mg", type: "Kit", price: 600.00 }, { size: "1mg", type: "Vial", price: 60.00 }] },
  { name: "Cartalax", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 400.00 }, { size: "20mg", type: "Vial", price: 40.00 }] },
  { name: "ACTH", category: "Peptides", variations: [{ size: "5mg", type: "Kit", price: 650.00 }, { size: "5mg", type: "Vial", price: 65.00 }] },
  { name: "Carcinogen", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 450.00 }, { size: "20mg", type: "Vial", price: 45.00 }] },
  { name: "Crystagen", category: "Peptides", variations: [{ size: "20mg", type: "Kit", price: 400.00 }, { size: "20mg", type: "Vial", price: 40.00 }] },
  { name: "SX or XA", category: "Peptides", variations: [{ size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }] },
  // Beauty & Fat Blasters
  { name: "Lipo C - Fat Blaster", category: "Beauty / Fat Loss", variations: [{ size: "1 set", type: "Topical", price: 250.00 }, { size: "1 set", type: "Vial", price: 25.00 }] },
  { name: "Lemon Bottle", category: "Beauty / Fat Loss", variations: [{ size: "10ml", type: "Kit", price: 250.00 }, { size: "10ml", type: "Vial", price: 25.00 }, { size: "50ml", type: "Kit", price: 600.00 }, { size: "50ml", type: "Vial", price: 60.00 }] },
  { name: "Super Human Blend", category: "Beauty", variations: [{ size: "10ml", type: "Kit", price: 350.00 }, { size: "10ml", type: "Vial", price: 35.00 }] },
  { name: "Super Shred", category: "Beauty / Fat Loss", variations: [{ size: "10ml", type: "Kit", price: 500.00 }, { size: "10ml", type: "Vial", price: 50.00 }] },
  { name: "Shred", category: "Beauty / Fat Loss", variations: [{ size: "10ml", type: "Kit", price: 700.00 }, { size: "10ml", type: "Vial", price: 70.00 }] },
  { name: "Immunological Enhancement (GAZ)", category: "Beauty / Health", variations: [{ size: "10ml", type: "Kit", price: 500.00 }, { size: "10ml", type: "Vial", price: 50.00 }] },
  { name: "SZ352", category: "Beauty", variations: [{ size: "10ml", type: "Kit", price: 700.00 }, { size: "10ml", type: "Vial", price: 70.00 }] },
  { name: "Vitamin B (B, B2, B6, B12)", category: "Vitamins", variations: [{ size: "2ml", type: "B", price: 150.00 }, { size: "2ml", type: "B2", price: 150.00 }, { size: "2ml", type: "B6", price: 150.00 }, { size: "1ml", type: "B12", price: 100.00 }] },
  { name: "Vitamin C", category: "Vitamins", variations: [{ size: "2ml", type: "Kit", price: 150.00 }, { size: "2ml", type: "Vial", price: 15.00 }] },
  { name: "Vitamin D2", category: "Vitamins", variations: [{ size: "1ml", type: "Kit", price: 250.00 }, { size: "1ml", type: "Vial", price: 25.00 }] },
  { name: "GHK-CU", category: "Skincare Topicals", variations: [{ size: "50mg", type: "Kit", price: 120.00 }, { size: "50mg", type: "Vial", price: 12.00 }, { size: "100mg", type: "Kit", price: 150.00 }, { size: "100mg", type: "Vial", price: 15.00 }] },
  { name: "AHK-CU", category: "Skincare Topicals", variations: [{ size: "50mg", type: "Kit", price: 200.00 }, { size: "50mg", type: "Vial", price: 20.00 }, { size: "100mg", type: "Kit", price: 350.00 }, { size: "100mg", type: "Vial", price: 35.00 }] },
  { name: "Glutathione", category: "Skincare Topicals", variations: [{ size: "600mg", type: "Kit", price: 150.00 }, { size: "600mg", type: "Vial", price: 15.00 }, { size: "1500mg", type: "Kit", price: 350.00 }, { size: "1500mg", type: "Vial", price: 35.00 }] },
  { name: "Glow", category: "Skincare Topicals", variations: [{ size: "70mg", type: "Kit", price: 700.00 }, { size: "70mg", type: "Vial", price: 70.00 }] },
  { name: "Klow", category: "Skincare Topicals", variations: [{ size: "80mg", type: "Kit", price: 800.00 }, { size: "80mg", type: "Vial", price: 80.00 }] },
  { name: "SNAP-8", category: "Skincare Topicals", variations: [{ size: "10mg", type: "Kit", price: 200.00 }, { size: "10mg", type: "Vial", price: 20.00 }] },
  { name: "Matrixyl", category: "Skincare Topicals", variations: [{ size: "10mg", type: "Kit", price: 250.00 }, { size: "10mg", type: "Vial", price: 25.00 }] },
  { name: "Matrixyl 3000", category: "Skincare Topicals", variations: [{ size: "10mg", type: "Kit", price: 1200.00 }, { size: "10mg", type: "Vial", price: 120.00 }] },
  { name: "GGH", category: "Skincare Topicals", variations: [{ size: "10ml", type: "Kit", price: 700.00 }, { size: "10ml", type: "Vial", price: 70.00 }] },
  { name: "Exosome", category: "Skincare Topicals", variations: [{ size: "100mg", type: "Kit", price: 450.00 }, { size: "100mg", type: "Vial", price: 45.00 }] },
  { name: "PDRN", category: "Skincare Topicals", variations: [{ size: "5ml", type: "Kit", price: 250.00 }, { size: "5ml", type: "Vial", price: 25.00 }] },
  { name: "Botulinum Toxin", category: "Beauty", variations: [{ size: "100iu", type: "Kit", price: 400.00 }, { size: "100iu", type: "Vial", price: 40.00 }] },
  { name: "Super Beauty (HHB)", category: "Beauty", variations: [{ size: "10ml", type: "Kit", price: 350.00 }, { size: "10ml", type: "Vial", price: 35.00 }] },
  { name: "PE 22 28", category: "Beauty", variations: [{ size: "5mg", type: "Kit", price: 250.00 }, { size: "5mg", type: "Vial", price: 25.00 }, { size: "10mg", type: "Kit", price: 400.00 }, { size: "10mg", type: "Vial", price: 40.00 }] },
  { name: "Hyaluronic Acid", category: "Skincare Topicals", variations: [{ size: "5mg", type: "Kit", price: 150.00 }, { size: "5mg", type: "Vial", price: 15.00 }] },
  { name: "Pink Hyaluronic Acid", category: "Skincare Topicals", variations: [{ size: "5ml", type: "Kit", price: 250.00 }, { size: "5ml", type: "Vial", price: 25.00 }] },
  { name: "Whitening & Spot Fading", category: "Skincare Topicals", variations: [{ size: "5ml", type: "Kit", price: 300.00 }, { size: "5ml", type: "Vial", price: 30.00 }] },
  { name: "Snake Venom", category: "Skincare Topicals", variations: [{ size: "5ml", type: "Kit", price: 100.00 }, { size: "5ml", type: "Vial", price: 10.00 }] },
  { name: "Bac Water", category: "Solvents", variations: [{ size: "10ml", type: "Kit", price: 50.00 }, { size: "10ml", type: "Vial", price: 5.00 }, { size: "3ml", type: "Kit", price: 40.00 }, { size: "3ml", type: "Vial", price: 4.00 }] },
  { name: "Sterilized Water", category: "Solvents", variations: [{ size: "10ml", type: "Kit", price: 50.00 }, { size: "10ml", type: "Vial", price: 5.00 }] },
  { name: "Acetic Acid", category: "Solvents", variations: [{ size: "10ml", type: "Kit", price: 50.00 }, { size: "10ml", type: "Vial", price: 5.00 }] }
];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

async function seedAll() {
  console.log(`📦 Seeding ${allProducts.length} products to Firestore...`);
  const batch = db.batch();
  let count = 0;

  for (const product of allProducts) {
    const docId = slugify(product.name);
    const docRef = db.collection('products').doc(docId);
    batch.set(docRef, {
      name: product.name,
      category: product.category,
      variations: product.variations
    });
    count++;
    // Firestore batch max 500 operations; commit every 400
    if (count % 400 === 0) {
      await batch.commit();
      console.log(`Committed ${count} products...`);
      // start a new batch
      batch = db.batch();
    }
  }
  await batch.commit();
  console.log(`✅ Success! ${count} products have been uploaded to Firestore.`);
  process.exit(0);
}

seedAll().catch(err => {
  console.error("❌ Error seeding products:", err);
  process.exit(1);
});