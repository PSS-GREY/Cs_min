// kb.js - Knowledge Base for Skin Diseases

const knowledgeBase = [
  {
    keywords: ["eczema", "atopic dermatitis"],
    answer: `Eczema (atopic dermatitis) is a chronic inflammatory skin condition 
that causes itching, redness, dryness, and sometimes oozing. It is linked to 
immune system overreaction and environmental triggers. Moisturizers and topical 
anti-inflammatory treatments are commonly used.`
  },
  {
    keywords: ["melanoma", "skin cancer", "mole"],
    answer: `Melanoma is a dangerous type of skin cancer that arises from pigment-producing 
cells called melanocytes. Warning signs include asymmetry, irregular borders, 
multiple colors, and rapid growth. Early detection is vital for successful treatment.`
  },
  {
    keywords: ["basal cell carcinoma", "bcc"],
    answer: `Basal Cell Carcinoma (BCC) is the most common type of skin cancer. 
It often appears as a pearly bump, pink growth, or scar-like lesion. 
BCC grows slowly and rarely spreads but requires treatment to prevent local damage.`
  },
  {
    keywords: ["melanocytic nevus", "mole"],
    answer: `Melanocytic nevi (moles) are benign skin growths made up of melanocytes. 
Most are harmless, but changes in color, size, or shape should be evaluated 
to rule out melanoma.`
  },
  {
    keywords: ["benign keratosis", "seborrheic keratosis"],
    answer: `Benign keratoses, including seborrheic keratosis, are non-cancerous skin growths 
that appear as waxy, brown, or black raised spots. They are harmless and common with aging, 
but can sometimes resemble melanoma.`
  },
  {
    keywords: ["psoriasis", "plaques", "scaly patches"],
    answer: `Psoriasis is an autoimmune disease that accelerates skin cell turnover, 
leading to thick, red, scaly patches on the skin. It can flare with stress or illness. 
Treatment includes creams, phototherapy, and immune-targeting medicines.`
  },
  {
    keywords: ["seborrheic keratosis"],
    answer: `Seborrheic keratosis is a common benign skin growth with a “stuck-on” appearance. 
It may be light tan to black in color and often appears in groups. 
It does not progress to cancer and usually requires no treatment unless irritated.`
  },
  {
    keywords: ["tinea", "ringworm", "fungal infection"],
    answer: `Tinea, commonly called ringworm, is a fungal infection that forms red, 
itchy, ring-shaped rashes with raised borders. It spreads via direct contact. 
Treatment involves antifungal creams or oral antifungals.`
  },
  {
    keywords: ["warts", "verruca", "hpv"],
    answer: `Warts are skin growths caused by the human papillomavirus (HPV). 
They may appear on hands, feet, or genitals. Warts are contagious but often 
disappear on their own; treatments include cryotherapy and salicylic acid.`
  },
  {
    keywords: ["molluscum contagiosum", "mollus"],
    answer: `Molluscum contagiosum is a viral skin infection that causes small, 
pearl-like bumps with a dimple in the center. It spreads by skin contact or shared objects. 
It usually resolves naturally but may need treatment in some cases.`
  },
  {
    keywords: ["actinic keratosis", "solar keratosis"],
    answer: `Actinic keratosis is a precancerous lesion caused by long-term sun exposure. 
It appears as rough, scaly patches on sun-exposed areas. Some cases can progress 
to squamous cell carcinoma, so treatment is recommended.`
  },
  {
    keywords: ["squamous cell" ,"carcinoma", "scc"],
    answer: `Squamous Cell Carcinoma (SCC) is a common type of skin cancer that appears 
as scaly, red patches, open sores, or warty growths. It can spread if untreated, 
so early medical care is important.`
  },
  {
    keywords: ["rosacea"],
    answer: `Rosacea is a chronic skin condition that causes facial redness, 
visible blood vessels, and acne-like bumps. Triggers include sun, alcohol, and spicy foods. 
Treatment includes topical and oral medications.`
  },
  {
    keywords: ["alopecia", "hair loss"],
    answer: `Alopecia is the partial or complete loss of hair from areas where it normally grows. 
It may be autoimmune (alopecia areata), genetic (male/female pattern baldness), or stress-related. 
Treatment depends on the type and severity.`
  },
  {
    keywords: ["dermatitis"],
    answer: `Dermatitis is a broad term for skin inflammation, which can be caused 
by allergies, irritants, or immune conditions. It leads to redness, itching, 
and sometimes blisters. Treatment involves avoiding triggers and using medicated creams.`
  },
  {
    keywords: ["urticaria", "hives"],
    answer: `Urticaria (hives) are itchy, raised welts that appear suddenly, often due to allergies. 
They may be short-term or chronic. Antihistamines are commonly used for treatment.`
  },
  {
    keywords: ["impetigo"],
    answer: `Impetigo is a contagious bacterial skin infection, common in children. 
It causes red sores that rupture and form honey-colored crusts. 
It spreads easily but responds well to antibiotics.`
  },
  {
    keywords: ["cellulitis"],
    answer: `Cellulitis is a bacterial skin infection that causes redness, swelling, 
warmth, and pain. It usually requires oral or IV antibiotics, as untreated cases 
can spread and become serious.`
  },
  {
    keywords: ["vitiligo", "loss of skin color"],
    answer: `Vitiligo is a condition where skin loses pigment due to melanocyte destruction, 
causing white patches. It is not contagious and may be autoimmune-related. 
Light therapy and medications can help manage its appearance.`
  },
  {
    keywords: ["lupus rash", "butterfly rash"],
    answer: `Lupus is an autoimmune disease that can affect the skin, joints, and organs. 
A common sign is a “butterfly-shaped” rash across the cheeks and nose. 
Skin symptoms may worsen with sun exposure.`
  }
];

// 🔎 Search function
export function searchKnowledgeBase(query) {
  if (!query) return null;
  const q = query.toLowerCase();

  for (let item of knowledgeBase) {
    if (item.keywords.some(keyword => q.includes(keyword))) {
      return item.answer;
    }
  }

  return null; // fallback to API
}

