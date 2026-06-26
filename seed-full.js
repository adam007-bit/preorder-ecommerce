const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ==================== PRODUK HANYA DARI SENARAI PENDEK ====================
// Oral Peptides (kapsul)
const oralPeptidesData = [
  { id: "oral_5amino_1mq", name: "5-Amino-1MQ", category: "oral", description: "Supports metabolism, helps increase calorie burning, and may assist with fat loss.", variations: [{ size: "50mg", type: "60 Capsules", price: 210 }], stock: 100 },
  { id: "oral_bpc157", name: "BPC-157", category: "oral", description: "Supports recovery, tissue repair, gut health, and injury healing.", variations: [{ size: "500mcg", type: "100 Capsules", price: 160 }], stock: 100 },
  { id: "oral_tesofensine", name: "Tesofensine", category: "oral", description: "Helps reduce appetite, control cravings, and support weight loss.", variations: [{ size: "500mcg", type: "60 Capsules", price: 140 }], stock: 100 },
  { id: "oral_dihexa", name: "Dihexa", category: "oral", description: "Supports memory, focus, learning, and cognitive performance.", variations: [{ size: "10mg", type: "60 Capsules", price: 150 }], stock: 100 },
  { id: "oral_bam15", name: "BAM15", category: "oral", description: "May increase energy expenditure and support fat loss without stimulants.", variations: [{ size: "50mg", type: "60 Capsules", price: 470 }], stock: 100 },
  { id: "oral_orforglipron", name: "Orforglipron", category: "oral", description: "Helps reduce appetite, improve blood sugar control, and support weight management.", variations: [{ size: "6mg", type: "90 Capsules", price: 480 }], stock: 100 },
  { id: "oral_slupp332", name: "SLU-PP-332", category: "oral", description: "Designed to enhance endurance, increase energy utilization, and support fat burning.", variations: [{ size: "250mcg", type: "100 Capsules", price: 70 }], stock: 100 },
  { id: "oral_kpv", name: "KPV", category: "oral", description: "Used to calm inflammation in the gut, skin, and throughout the body.", variations: [{ size: "300mcg", type: "60 Capsules", price: 100 }], stock: 100 }
];

// Additional Products (solvent, beauty, peptides – hanya VIAL dan harga asal)
const additionalProducts = [
 // SOLVENT
    { id: "solvent_bac_water", name: "Bac Water", category: "solvent", description: "Bacteriostatic water for reconstitution.", variations: [{ size: "3ml", type: "Vial", price: 4 }, { size: "10ml", type: "Vial", price: 5 }], stock: 100 },
    { id: "solvent_usb_bac_water", name: "USP Bac Water", category: "solvent", description: "Bacteriostatic water for reconstitution.", variations: [{ size: "10ml", type: "Vial", price: 12 }], stock: 100 },
    { id: "solvent_steriled_water", name: "Sterilized Water", category: "solvent", description: "Sterile water for injection.", variations: [{ size: "10ml", type: "Vial", price: 5 }], stock: 100 },
   { id: "solvent_acetic_acid", name: "Acetic Acid", category: "solvent", description: "For peptide reconstitution.", variations: [{ size: "3ml", type: "Vial", price: 4 }, { size: "10ml", type: "Vial", price: 5 }], stock: 100 },
    // BEAUTY PEPTIDES
    { id: "beauty_ghk_cu", name: "GHK-Cu", category: "beauty", description: "Copper peptide for hair and skin (injectable).", variations: [{ size: "50mg", type: "Vial", price: 12 }, { size: "100mg", type: "Vial", price: 15 }], stock: 100 },
    { id: "beauty_ahk_cu", name: "AHK-CU", category: "beauty", description: "Copper peptide for hair growth.", variations: [{ size: "50mg", type: "Vial", price: 20 }, { size: "100mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "beauty_glutathione", name: "Glutathione (Fuan)", category: "beauty", description: "Antioxidant for skin brightening.", variations: [{ size: "600mg", type: "Vial", price: 15 }, { size: "1500mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "beauty_glow", name: "Glow", category: "beauty", description: "Skin brightening and anti-aging.", variations: [{ size: "70mg", type: "Vial", price: 70 }], stock: 100 },
    { id: "beauty_klow", name: "Klow", category: "beauty", description: "Brightening and anti-aging peptide complex.", variations: [{ size: "80mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "beauty_snap8", name: "Snap-8", category: "beauty", description: "Anti-aging peptide.", variations: [{ size: "10mg", type: "Vial", price: 20 }], stock: 100 },
    { id: "beauty_matrixyl", name: "Matrixyl", category: "beauty", description: "Anti-wrinkle peptide.", variations: [{ size: "10mg", type: "Vial", price: 25 }], stock: 100 },
    { id: "beauty_matrixyl3000", name: "Matrixyl 3000", category: "beauty", description: "Advanced anti-aging peptide.", variations: [{ size: "10mg", type: "Vial", price: 120 }], stock: 100 },
    { id: "beauty_ggh", name: "GGH", category: "beauty", description: "Growth hormone releasing peptide for skin.", variations: [{ size: "10ml", type: "Vial", price: 70 }], stock: 100 },
    { id: "beauty_exosome", name: "Exosome", category: "beauty", description: "Exosome for cellular regeneration.", variations: [{ size: "100mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "beauty_pdrn", name: "PDRN", category: "beauty", description: "Polydeoxyribonucleotide for tissue repair.", variations: [{ size: "5ml", type: "Vial", price: 25 }], stock: 100 },
    { id: "beauty_botulinum_toxin", name: "Botulinum Toxin", category: "beauty", description: "Neurotoxin for cosmetic use.", variations: [{ size: "100iu", type: "Vial", price: 40 }], stock: 100 },
    { id: "beauty_super_beauty", name: "Super Beauty (HHB)", category: "beauty", description: "Skin brightening and anti-aging.", variations: [{ size: "10ml", type: "Vial", price: 35 }], stock: 100 },
    { id: "beauty_hyaluronic_acid", name: "Hyaluronic Acid", category: "beauty", description: "Moisture retention.", variations: [{ size: "5mg", type: "Vial", price: 15 }], stock: 100 },
    { id: "beauty_pink_hyaluronic", name: "Pink Hyaluronic Acid", category: "beauty", description: "Hyaluronic acid formulation.", variations: [{ size: "5ml", type: "Vial", price: 25 }], stock: 100 },
    { id: "beauty_whitening_spot", name: "Whitening & Spot Fading", category: "beauty", description: "Skin lightening complex.", variations: [{ size: "5ml", type: "Vial", price: 30 }], stock: 100 },
    { id: "beauty_snake_venom", name: "Snake Venom", category: "beauty", description: "Synthetic peptide for anti-wrinkle.", variations: [{ size: "5ml", type: "Vial", price: 10 }], stock: 100 },
    { id: "beauty_pe_22_28", name: "PE 22 28", category: "beauty", description: "Anti-aging peptide.", variations: [{ size: "5mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "beauty_pigment_serum", name: "Pigment Serum", category: "beauty", description: "Brightening and spot fading serum.", variations: [{ size: "10ml", type: "Serum", price: 10 }], stock: 100 },
    { id: "beauty_oligo_peptide24", name: "Oligo Peptide 24", category: "beauty", description: "Anti-aging peptide complex.", variations: [{ size: "10mg", type: "Peptide", price: 15 }], stock: 100 },
    { id: "beauty_vitamin_c_tablet", name: "Vitamin C Tablet With Essense", category: "beauty", description: "Vitamin C brightening tablets with essence.", variations: [{ size: "10pcs", type: "Tablet", price: 20 }], stock: 100 },
    { id: "beauty_acne_serum", name: "Acne Serum", category: "beauty", description: "Anti-acne and soothing serum.", variations: [{ size: "5ml", type: "Serum", price: 10 }], stock: 100 },
    { id: "beauty_hydro_glow", name: "Hydro Glow Serum", category: "beauty", description: "Hydrating and brightening serum.", variations: [{ size: "5ml", type: "Serum", price: 10 }], stock: 100 },
    { id: "beauty_ghkcu_serum", name: "GHK-Cu Serum", category: "beauty", description: "Copper peptide serum for anti-aging.", variations: [{ size: "5ml", type: "Serum", price: 10 }], stock: 100 },
    { id: "beauty_ghkcu_topical", name: "GHK-Cu Topical", category: "beauty", description: "Copper peptide topical.", variations: [{ size: "1000mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "beauty_fiona_masker", name: "Fiona Masker", category: "beauty", description: "Facial mask.", variations: [{ size: "10mg", type: "Set", price: 15 }], stock: 100 },

{ id: "beauty_gluthion_600mg_1vial", name: "Gluthion Injection - 600mg", category: "beauty", description: "Gluthion injection 600mg per vial.", variations: [{ size: "1 vial", type: "Vial", price: 16 }, { size: "10 vials", type: "Vial", price: 160 }], stock: 100 },
{ id: "beauty_glutaone_1200mg", name: "Glutaone Injection - 1200mg", category: "beauty", description: "Glutaone injection 1200mg per vial.", variations: [{ size: "1 vial", type: "Vial", price: 19 }, { size: "10 vials", type: "Vial", price: 190 }], stock: 100 },
{ id: "beauty_chiotocin_25mg_10vial", name: "Chiotocin Injection - 25mg", category: "beauty", description: "Chiotocin injection 25mg, 10 vials per box.", variations: [{ size: "10 vials", type: "Vial", price: 100 }], stock: 100 },
{ id: "beauty_lipotocin_600mg_10vial", name: "Lipotocin Injection - 600mg", category: "beauty", description: "Lipotocin injection 600mg, 10 vials per box.", variations: [{ size: "10 vials", type: "Vial", price: 160 }], stock: 100 },
{ id: "beauty_luthione_600mg", name: "Luthione - 600mg", category: "beauty", description: "Luthione 600mg per vial.", variations: [{ size: "1 vial", type: "Vial", price: 15 }, { size: "10 vials", type: "Vial", price: 150 }], stock: 100 },
{ id: "beauty_luthione_1200mg", name: "Luthione - 1200mg", category: "beauty", description: "Luthione 1200mg per vial.", variations: [{ size: "1 vial", type: "Vial", price: 19 }, { size: "10 vials", type: "Vial", price: 190 }], stock: 100 },
{ id: "beauty_cinderella_inj_10vial", name: "Cindella Injection", category: "beauty", description: "Cindella injection, 10 vials per box.", variations: [{ size: "10 vials", type: "Vial", price: 120 }], stock: 100 },
{ id: "beauty_vitamin_c_inj_10vial", name: "Vitamin C Injection", category: "beauty", description: "Vitamin C injection, 10 vials per box.", variations: [{ size: "10 vials", type: "Vial", price: 130 }], stock: 100 },
{ id: "beauty_profhilo_1syringe", name: "Profhilo", category: "beauty", description: "Profhilo 1 syringe.", variations: [{ size: "1 syringe", type: "Syringe", price: 350 }], stock: 100 },
{ id: "beauty_sculptra_1vial", name: "Sculptra", category: "beauty", description: "Sculptra 1 vial.", variations: [{ size: "1 vial", type: "Vial", price: 700 }], stock: 100 },
{ id: "beauty_juvederm_skinvive_2syringes", name: "Juvederm Skinvive", category: "beauty", description: "Juvederm Skinvive 2 syringes.", variations: [{ size: "2 syringes", type: "Syringe", price: 500 }], stock: 100 },
{ id: "beauty_juvederm_voluma_2syringes", name: "Juvederm Voluma", category: "beauty", description: "Juvederm Voluma 2 syringes.", variations: [{ size: "2 syringes", type: "Syringe", price: 700 }], stock: 100 },
{ id: "beauty_juvederm_volift_2syringes", name: "Juvederm Volift", category: "beauty", description: "Juvederm Volift 2 syringes.", variations: [{ size: "2 syringes", type: "Syringe", price: 700 }], stock: 100 },
{ id: "beauty_juvederm_volbella_2syringes", name: "Juvederm Volbella", category: "beauty", description: "Juvederm Volbella 2 syringes.", variations: [{ size: "2 syringes", type: "Syringe", price: 700 }], stock: 100 },
{ id: "beauty_juvederm_volux_2syringes", name: "Juvederm Volux", category: "beauty", description: "Juvederm Volux 2 syringes.", variations: [{ size: "2 syringes", type: "Syringe", price: 700 }], stock: 100 },
{ id: "beauty_lemon_bottle_1vial", name: "Lemon Bottle", category: "beauty", description: "Lemon Bottle per vial.", variations: [{ size: "1 vial", type: "Vial", price: 50 }, { size: "5 vials", type: "Vial", price: 250 }], stock: 100 },
{ id: "beauty_plenhyage_1box", name: "Plenhyage", category: "beauty", description: "Plenhyage 1 box.", variations: [{ size: "1 box", type: "Box", price: 720 }], stock: 100 },
{ id: "beauty_pink_glow_1vial", name: "Pink Glow", category: "beauty", description: "Pink Glow per vial.", variations: [{ size: "1 vial", type: "Vial", price: 31 }, { size: "10 vials", type: "Vial", price: 310 }], stock: 100 },
{ id: "beauty_rejuran_black_healer_1box", name: "Rejuran Black Healer", category: "beauty", description: "Rejuran Black Healer 1 box.", variations: [{ size: "1 box", type: "Box", price: 600 }], stock: 100 },
{ id: "beauty_rejuran_i_1box", name: "Rejuran I", category: "beauty", description: "Rejuran I 1 box.", variations: [{ size: "1 box", type: "Box", price: 240 }], stock: 100 },
{ id: "beauty_rejuran_s_1box", name: "Rejuran S", category: "beauty", description: "Rejuran S 1 box.", variations: [{ size: "1 box", type: "Box", price: 240 }], stock: 100 },
{ id: "beauty_rejuran_hb_1box", name: "Rejuran HB", category: "beauty", description: "Rejuran HB 1 box.", variations: [{ size: "1 box", type: "Box", price: 250 }], stock: 100 },
{ id: "beauty_nctf_135_5vial", name: "NCTF 135", category: "beauty", description: "NCTF 135 per vial set.", variations: [{ size: "5 vials", type: "Vial", price: 600 }, { size: "10 vials", type: "Vial", price: 900 }], stock: 100 },
{ id: "beauty_luhilo_snow_1box", name: "Luhilo Snow", category: "beauty", description: "Luhilo Snow 1 box.", variations: [{ size: "1 box", type: "Box", price: 380 }], stock: 100 },
{ id: "beauty_cindella_set_full", name: "Cindella Set", category: "beauty", description: "Cindella full set.", variations: [{ size: "full set", type: "Set", price: 370 }], stock: 100 },
{ id: "beauty_snow_white_advance_fullset", name: "Snow White Advance - Very Strong (Gluta 1)", category: "beauty", description: "Snow White Advance full set.", variations: [{ size: "full set", type: "Set", price: 480 }], stock: 100 },
{ id: "beauty_lipo_lab_ppc_1vial", name: "Lipo Lab PPC", category: "beauty", description: "Lipo Lab PPC per vial.", variations: [{ size: "1 vial", type: "Vial", price: 19 }, { size: "10 vials", type: "Vial", price: 190 }], stock: 100 },
{ id: "beauty_lipo_vela_1vial", name: "Lipo Vela", category: "beauty", description: "Lipo Vela per vial.", variations: [{ size: "1 vial", type: "Vial", price: 18 }, { size: "10 vials", type: "Vial", price: 180 }], stock: 100 },
{ id: "beauty_lipo_lab_v_line_1vial", name: "Lipo Lab V Line", category: "beauty", description: "Lipo Lab V Line per vial.", variations: [{ size: "1 vial", type: "Vial", price: 40 }, { size: "5 vials", type: "Vial", price: 200 }], stock: 100 },
{ id: "beauty_kabelline_1vial", name: "Kabelline", category: "beauty", description: "Kabelline per vial.", variations: [{ size: "1 vial", type: "Vial", price: 42 }, { size: "5 vials", type: "Vial", price: 210 }], stock: 100 },
{ id: "beauty_curenex_booster", name: "Curenex Daily Skincare Booster", category: "beauty", description: "Daily skincare booster for skin rejuvenation and hydration.", variations: [{ size: "1 set", type: "Booster", price: 50 }], stock: 100 },
{ id: "beauty_glutathione_factory", name: "Glutathione (Factory)", category: "beauty", description: "Glutathione injection for skin brightening and antioxidant support.", variations: [{ size: "600mg", type: "Vial", price: 10 }, { size: "15000mg", type: "Vial", price: 15 }], stock: 100 },
// ===== MARINE COLLAGEN =====
{ id: "beauty_marine_collagen", name: "Marine Collagen", category: "beauty", description: "Marine collagen for skin elasticity and hydration.", variations: [{ size: "5ml", type: "Vial", price: 25 }], stock: 100 },
// ===== EXOSOME PDRN =====
{ id: "beauty_exosome_pdrn", name: "Exosome PDRN", category: "beauty", description: "Exosome PDRN for cellular regeneration and tissue repair.", variations: [{ size: "100mg", type: "Vial", price: 35 }], stock: 100 },
{ id: "beauty_hikari_premium_drip", name: "Hikari Premium Drip", category: "beauty", description: "Hikari Premium Drip for skin hydration and rejuvenation.", variations: [{ size: "500ml", type: "Drip", price: 220 }], stock: 100 },
    // PEPTIDES (injectable & fat loss)
    { id: "peptide_retatrutide", name: "Retatrutide", category: "peptides", description: "Triple agonist for weight management.", variations: [{ size: "5mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 30 }, { size: "15mg", type: "Vial", price: 45 }, { size: "20mg", type: "Vial", price: 50 }, { size: "30mg", type: "Vial", price: 75 }, { size: "40mg", type: "Vial", price: 90 }], stock: 100 },
    { id: "peptide_reta_cagri", name: "Reta Cagri", category: "peptides", description: "Retatrutide + Cagrilintide blend.", variations: [{ size: "10mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_reta_tirze", name: "Reta Tirze", category: "peptides", description: "Retatrutide + Tirzepatide blend.", variations: [{ size: "60mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_tirzepatide", name: "Tirzepatide", category: "peptides", description: "Dual GIP/GLP-1 agonist.", variations: [{ size: "10mg", type: "Vial", price: 25 }, { size: "15mg", type: "Vial", price: 35 }, { size: "20mg", type: "Vial", price: 40 }, { size: "30mg", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_semaglutide", name: "Semaglutide", category: "peptides", description: "GLP-1 for weight management.", variations: [{ size: "10mg", type: "Vial", price: 25 }, { size: "15mg", type: "Vial", price: 30 }, { size: "20mg", type: "Vial", price: 35 }, { size: "30mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_cagrilintide", name: "Cagrilintide", category: "peptides", description: "Amylin analogue.", variations: [{ size: "5mg", type: "Vial", price: 45 }, { size: "10mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_cagri_sema", name: "Cagri Sema", category: "peptides", description: "Cagrilintide + Semaglutide blend.", variations: [{ size: "5mg", type: "Vial", price: 55 }, { size: "10mg", type: "Vial", price: 90 }], stock: 100 },
    { id: "peptide_cagri_tirze", name: "Cagri Tirze", category: "peptides", description: "Cagrilintide + Tirzepatide blend.", variations: [{ size: "20mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_adipotide", name: "Adipotide", category: "peptides", description: "Fat cell apoptosis.", variations: [{ size: "5mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_survodutide", name: "Survodutide", category: "peptides", description: "Dual agonist.", variations: [{ size: "10mg", type: "Vial", price: 120 }], stock: 100 },
    { id: "peptide_mazdutide", name: "Mazdutide", category: "peptides", description: "Dual agonist.", variations: [{ size: "10mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_mots_c", name: "MOTS-C", category: "peptides", description: "Mitochondrial peptide.", variations: [{ size: "10mg", type: "Vial", price: 30 }, { size: "20mg", type: "Vial", price: 50 }, { size: "30mg", type: "Vial", price: 70 }, { size: "40mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_aod", name: "AOD-9604", category: "peptides", description: "Fat burning.", variations: [{ size: "5mg", type: "Vial", price: 45 }, { size: "10mg", type: "Vial", price: 70 }], stock: 100 },
    { id: "peptide_nad", name: "NAD+", category: "peptides", description: "Cellular energy.", variations: [{ size: "500mg", type: "Vial", price: 30 }, { size: "1000mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_wolverine", name: "Wolverine", category: "peptides", description: "Healing blend.", variations: [{ size: "10mg", type: "Vial", price: 40 }, { size: "20mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_tb500", name: "TB-500", category: "peptides", description: "Tissue repair.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 55 }], stock: 100 },
    { id: "peptide_tesamorelin", name: "Tesamorelin", category: "peptides", description: "Growth hormone releasing hormone.", variations: [{ size: "5mg", type: "Vial", price: 45 }, { size: "10mg", type: "Vial", price: 70 }, { size: "20mg", type: "Vial", price: 130 }], stock: 100 },
    { id: "peptide_tesa_ipa", name: "Tesa IPA", category: "peptides", description: "Tesamorelin + Ipamorelin blend.", variations: [{ size: "15mg", type: "Vial", price: 95 }], stock: 100 },
    { id: "peptide_ipamorelin", name: "Ipamorelin", category: "peptides", description: "Growth hormone secretagogue.", variations: [{ size: "5mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_cjc_no_dac", name: "CJC-1295 (No DAC)", category: "peptides", description: "GHRH.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 75 }], stock: 100 },
    { id: "peptide_cjc_dac", name: "CJC-1295 (With DAC)", category: "peptides", description: "GHRH long-acting.", variations: [{ size: "5mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_cjc_ipa", name: "CJC-1295 + Ipamorelin", category: "peptides", description: "GHRH + GHRP blend.", variations: [{ size: "10mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_igf_lr3", name: "IGF-1 LR3", category: "peptides", description: "Insulin-like growth factor.", variations: [{ size: "0.1mg", type: "Vial", price: 25 }, { size: "1mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_igf_des", name: "IGF-1 DES", category: "peptides", description: "Insulin-like growth factor.", variations: [{ size: "2mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_peg_mgf", name: "PEG MGF", category: "peptides", description: "Mechano growth factor.", variations: [{ size: "2mg", type: "Vial", price: 55 }], stock: 100 },
    { id: "peptide_ghrp2", name: "GHRP-2", category: "peptides", description: "Growth hormone releasing peptide.", variations: [{ size: "5mg", type: "Vial", price: 25 }], stock: 100 },
    { id: "peptide_ghrp6", name: "GHRP-6", category: "peptides", description: "Growth hormone releasing peptide.", variations: [{ size: "5mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_hcg", name: "HCG", category: "peptides", description: "Human chorionic gonadotropin.", variations: [{ size: "5000iu", type: "Vial", price: 50 }, { size: "10000iu", type: "Vial", price: 90 }], stock: 100 },
    { id: "peptide_hmg", name: "HMG 75iu", category: "peptides", description: "Human menopausal gonadotropin.", variations: [{ size: "75iu", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_semax", name: "Semax", category: "peptides", description: "Nootropic.", variations: [{ size: "5mg", type: "Vial", price: 20 }, { size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_semax_selank", name: "Semax Selank", category: "peptides", description: "Nootropic blend.", variations: [{ size: "20mg", type: "Vial", price: 55 }], stock: 100 },
    { id: "peptide_selank", name: "Selank", category: "peptides", description: "Anxiolytic.", variations: [{ size: "5mg", type: "Vial", price: 20 }, { size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_ss31", name: "SS-31", category: "peptides", description: "Mitochondrial peptide.", variations: [{ size: "10mg", type: "Vial", price: 35 }, { size: "50mg", type: "Vial", price: 130 }], stock: 100 },
    { id: "peptide_epithalon", name: "Epithalon", category: "peptides", description: "Telomere lengthening.", variations: [{ size: "10mg", type: "Vial", price: 20 }, { size: "50mg", type: "Vial", price: 55 }], stock: 100 },
    { id: "peptide_dsip", name: "DSIP", category: "peptides", description: "Delta sleep inducing peptide.", variations: [{ size: "5mg", type: "Vial", price: 20 }], stock: 100 },
    { id: "peptide_ara290", name: "ARA 290", category: "peptides", description: "Erythropoietin mimetic.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_pt141", name: "PT-141", category: "peptides", description: "Libido enhancer.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_kisspeptin", name: "Kisspeptin", category: "peptides", description: "Reproductive hormone.", variations: [{ size: "5mg", type: "Vial", price: 30 }, { size: "10mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_aicar", name: "AICAR", category: "peptides", description: "AMPK activator.", variations: [{ size: "50mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_ll37", name: "LL-37", category: "peptides", description: "Antimicrobial peptide.", variations: [{ size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_relaxation_pm", name: "Relaxation PM", category: "peptides", description: "Sleep aid.", variations: [{ size: "10ml", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_vip", name: "VIP", category: "peptides", description: "Vasoactive intestinal peptide.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 60 }], stock: 100 },
    { id: "peptide_hexarelin", name: "Hexarelin Acetate", category: "peptides", description: "GHRP.", variations: [{ size: "2mg", type: "Vial", price: 40 }, { size: "5mg", type: "Vial", price: 50 }, { size: "10mg", type: "Vial", price: 80 }], stock: 100 },
    { id: "peptide_sermorelin", name: "Sermorelin Acetate", category: "peptides", description: "GHRH.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_thymosin_b4", name: "Thymosin Beta-4", category: "peptides", description: "Tissue repair.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 55 }], stock: 100 },
    { id: "peptide_thymosin_alpha1", name: "Thymosin Alpha-1", category: "peptides", description: "Immune modulator.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_adamax", name: "Adamax", category: "peptides", description: "Nootropic.", variations: [{ size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_thymalin", name: "Thymalin", category: "peptides", description: "Immune support.", variations: [{ size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_pinealon", name: "Pinealon", category: "peptides", description: "Neuroprotective.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_foxo4_dri", name: "FOXO4-DRI", category: "peptides", description: "Senolytic.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_oxytocin", name: "Oxytocin Acetate", category: "peptides", description: "Hormone peptide.", variations: [{ size: "2mg", type: "Vial", price: 20 }], stock: 100 },
    { id: "peptide_mt1", name: "Melanotan-1", category: "peptides", description: "Tanning peptide.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_mt2", name: "Melanotan-2", category: "peptides", description: "Tanning peptide.", variations: [{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_melatonin", name: "Melatonin", category: "peptides", description: "Sleep regulation.", variations: [{ size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_cerebrolysin", name: "Cerebrolysin", category: "peptides", description: "Neurotrophic.", variations: [{ size: "60mg", type: "Vial", price: 15 }], stock: 100 },
    { id: "peptide_ace031", name: "ACE 031", category: "peptides", description: "Myostatin inhibitor.", variations: [{ size: "1mg", type: "Vial", price: 20 }], stock: 100 },
    { id: "peptide_b7_33", name: "B7-33", category: "peptides", description: "Relaxin agonist.", variations: [{ size: "2mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 90 }], stock: 100 },
    { id: "peptide_cortagen", name: "Cortagen", category: "peptides", description: "Cellular repair.", variations: [{ size: "20mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_demorphin", name: "Demorphin", category: "peptides", description: "Opioid peptide.", variations: [{ size: "2mg", type: "Vial", price: 20 }, { size: "10mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_epo", name: "EPO", category: "peptides", description: "Erythropoietin.", variations: [{ size: "3000iu", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_gonadorelin", name: "Gonadorelin Acetate", category: "peptides", description: "GnRH agonist.", variations: [{ size: "5mg", type: "Vial", price: 25 }], stock: 100 },
    { id: "peptide_humanin", name: "Humanin", category: "peptides", description: "Neuroprotective.", variations: [{ size: "10mg", type: "Vial", price: 120 }], stock: 100 },
    { id: "peptide_ra260", name: "RA 260", category: "peptides", description: "Unknown.", variations: [{ size: "50mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_pnc27", name: "PNC 27", category: "peptides", description: "Anti-cancer peptide.", variations: [{ size: "5mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_p21", name: "P21", category: "peptides", description: "Nootropic.", variations: [{ size: "5mg", type: "Vial", price: 140 }], stock: 100 },
    { id: "peptide_tb_frag", name: "TB Frag", category: "peptides", description: "Thymosin Beta fragment.", variations: [{ size: "2mg", type: "Vial", price: 30 }, { size: "5mg", type: "Vial", price: 35 }, { size: "10mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_dulaglutide", name: "Dulaglutide", category: "peptides", description: "GLP-1 agonist.", variations: [{ size: "5mg", type: "Vial", price: 65 }, { size: "10mg", type: "Vial", price: 95 }], stock: 100 },
    { id: "peptide_liraglutide", name: "Liraglutide", category: "peptides", description: "GLP-1 agonist.", variations: [{ size: "5mg", type: "Vial", price: 50 }, { size: "10mg", type: "Vial", price: 75 }, { size: "20mg", type: "Vial", price: 120 }], stock: 100 },
    { id: "peptide_follistatin", name: "Follistatin", category: "peptides", description: "Myostatin inhibitor.", variations: [{ size: "1mg", type: "Vial", price: 60 }], stock: 100 },
    { id: "peptide_cartalax", name: "Cartalax", category: "peptides", description: "Cartilage repair.", variations: [{ size: "20mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_acth", name: "ACTH", category: "peptides", description: "Adrenocorticotropic hormone.", variations: [{ size: "5mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_cardiogen", name: "Cardiogen", category: "peptides", description: "Cardiac repair.", variations: [{ size: "20mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_crystagen", name: "Crystagen", category: "peptides", description: "Unknown.", variations: [{ size: "20mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_sx_xa", name: "SX or XA", category: "peptides", description: "Unknown.", variations: [{ size: "10mg", type: "Vial", price: 40 }], stock: 100 },
    { id: "peptide_lipo_c", name: "Lipo C - Fat Blaster", category: "peptides", description: "Fat burning injection.", variations: [{ size: "1 vial", type: "Vial", price: 25 }], stock: 100 },
    { id: "peptide_lemon_bottle", name: "Lemon Bottle", category: "peptides", description: "Fat dissolving.", variations: [{ size: "10ml", type: "Vial", price: 25 }, { size: "50ml", type: "Vial", price: 60 }], stock: 100 },
    { id: "peptide_immunological_enhancement", name: "Immunological Enhancement (GAZ)", category: "peptides", description: "Immune support.", variations: [{ size: "10ml", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_sz352", name: "SZ352", category: "peptides", description: "Unknown.", variations: [{ size: "10ml", type: "Vial", price: 70 }], stock: 100 },
    { id: "vitamin_b2", name: "Vitamin B2", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "2ml", type: "Vial", price: 15 }], stock: 100 },
    { id: "vitamin_b12_2ml", name: "Vitamin B12", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "2ml", type: "Vial", price: 20 }], stock: 100 },
    { id: "vitamin_b6", name: "Vitamin B6", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "2ml", type: "Vial", price: 15 }], stock: 100 },
    { id: "vitamin_b12_1ml", name: "Vitamin B12", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "10ml", type: "Vial", price: 15 },{ size: "1ml", type: "Vial", price: 10 }], stock: 100 },
    { id: "vitamin_c", name: "Vitamin C", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "2ml", type: "Vial", price: 15 }], stock: 100 },
    { id: "vitamin_d2", name: "Vitamin D2", category: "peptides", description: "Vitamin supplement.", variations: [{ size: "1ml", type: "Vial", price: 25 }], stock: 100 },
    { id: "fatloss_super_human_blend", name: "Super Human Blend", category: "peptides", description: "Fat burning and energy blend.", variations: [{ size: "10ml", type: "Vial", price: 35 }], stock: 100 },
    { id: "fatloss_super_shred", name: "Super Shred", category: "peptides", description: "Advanced fat loss support.", variations: [{ size: "10ml", type: "Vial", price: 50 }], stock: 100 },
    { id: "fatloss_shred", name: "Shred", category: "peptides", description: "Fat loss support.", variations: [{ size: "10ml", type: "Vial", price: 70 }], stock: 100 },
    { id: "peptide_rtd1", name: "RTD-1", category: "peptides", description: "Unknown.", variations: [{ size: "10mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_mk677", name: "MK 677", category: "peptides", description: "Growth hormone secretagogue.", variations: [{ size: "5mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_cbl514", name: "CBL 514", category: "peptides", description: "Fat reduction peptide.", variations: [{ size: "10mg", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_ipa_serm", name: "IPA SERM (Ipamorelin + Sermorelin)", category: "peptides", description: "GHRP + GHRH blend.", variations: [{ size: "15mg", type: "Vial", price: 65 }, { size: "30mg", type: "Vial", price: 75 }], stock: 100 },
    { id: "peptide_l_carnitine", name: "L-Carnitine", category: "peptides", description: "Fatty acid transport.", variations: [{ size: "600mg", type: "Vial", price: 35 }, { size: "1200mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_b12_inj", name: "B12", category: "peptides", description: "Vitamin B12 supplement.", variations: [{ size: "10ml", type: "Vial", price: 15 }], stock: 100 },
    { id: "peptide_insulin", name: "Insulin", category: "peptides", description: "Insulin for injection.", variations: [{ size: "3ml", type: "Vial", price: 15 }], stock: 100 },
    { id: "peptide_lipo_c_focus", name: "Lipo C Focus", category: "peptides", description: "Fat burning focus.", variations: [{ size: "10ml", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_lipo_mino_mix", name: "Lipo Mino Mix", category: "peptides", description: "Fat burning blend.", variations: [{ size: "10ml", type: "Vial", price: 50 }], stock: 100 },
    { id: "peptide_lipo_c_booster", name: "Lipo C Booster", category: "peptides", description: "Fat burning booster.", variations: [{ size: "10ml", type: "Vial", price: 25 }], stock: 100 },
    { id: "peptide_slu_pp_322", name: "SLU-PP-322", category: "peptides", description: "SLU-PP-322 peptide.", variations: [{ size: "5mg", type: "Vial", price: 45 }], stock: 100 },
    { id: "peptide_5amino_1mq", name: "5 Amino 1MQ", category: "peptides", description: "5 Amino 1MQ peptide.", variations: [{ size: "5mg", type: "Vial", price: 25 },{ size: "10mg", type: "Vial", price: 35 },{ size: "50mg", type: "Vial", price: 65 }], stock: 100 },
    { id: "peptide_kpv", name: "KPV", category: "peptides", description: "KPV peptide.", variations: [{ size: "5mg", type: "Vial", price: 25 },{ size: "10mg", type: "Vial", price: 30 }], stock: 100 },
    { id: "peptide_bpc157", name: "BPC-157", category: "peptides", description: "Healing and repair peptide for tissue regeneration, gut health, and injury recovery.", variations: [{ size: "5mg", type: "Vial", price: 25 }, { size: "10mg", type: "Vial", price: 35 }], stock: 100 },
    { id: "peptide_larazotide", name: "Larazotide", category: "peptides", description: "Tight junction regulator for gut health and inflammation.", variations: [{ size: "10mg", type: "Vial", price: 40 }, { size: "50mg", type: "Vial", price: 60 }], stock: 100 },
    { id: "peptide_eloralintide", name: "Eloralintide", category: "peptides", description: "GLP-1 receptor agonist for weight management.", variations: [{ size: "10mg", type: "Vial", price: 40 }, { size: "50mg", type: "Vial", price: 60 }], stock: 100 },
    // ===== ELORA TIRZE =====
{ id: "peptide_elora_tirze", name: "Elora Tirze", category: "peptides", description: "Elora Tirze peptide for weight management and metabolic support.", variations: [{ size: "5mg", type: "Vial", price: 30 },{ size: "10mg", type: "Vial", price: 40 },{ size: "15mg", type: "Vial", price: 45 },{ size: "20mg", type: "Vial", price: 60 },{ size: "30mg", type: "Vial", price: 65 },{ size: "40mg", type: "Vial", price: 85 }
], stock: 100 },
  { id: "peptide_reta_elora", name: "Reta Elora", category: "peptides", description: "Reta Elora peptide for weight management and metabolic support.", variations: [{ size: "15mg", type: "Vial", price: 45 },{ size: "30mg", type: "Vial", price: 70 }], stock: 100 }
];

// Gabungkan semua produk
const allProducts = [...oralPeptidesData, ...additionalProducts];

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
}

async function seedAll() {
  console.log(`📦 Seeding ${allProducts.length} products to Firestore...`);

  // Pilihan 1: Padam semua produk sedia ada dalam koleksi 'products'
  const productsRef = db.collection('products');
  const snapshot = await productsRef.get();
  const batchDelete = db.batch();
  snapshot.forEach(doc => {
    batchDelete.delete(doc.ref);
  });
  await batchDelete.commit();
  console.log('🧹 Existing products deleted.');

  // Semai produk baru
  let batch = db.batch();
  let count = 0;
  for (const product of allProducts) {
    const docId = slugify(product.name);
    const docRef = db.collection('products').doc(docId);
    batch.set(docRef, {
      id: product.id,
      name: product.name,
      category: product.category,
      description: product.description,
      variations: product.variations,
      stock: product.stock
    });
    count++;
    if (count % 400 === 0) {
      await batch.commit();
      console.log(`Committed ${count} products...`);
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
