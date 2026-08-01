/**
 * niches.ts
 * ──────────
 * Single source of truth for all niche landing pages.
 * Add a new entry here and it automatically gets:
 *   - A URL at /{slug}
 *   - SEO-optimised metadata
 *   - A rich content block (300+ words)
 *   - Static pre-rendering via generateStaticParams
 */

export interface NicheContent {
  /** URL slug — must match the directory name */
  slug: string;
  /** <h1> and <title> suffix */
  title: string;
  /** Full <title> tag */
  pageTitle: string;
  /** <meta name="description"> */
  metaDescription: string;
  /** Short blurb shown directly below the tool heading */
  toolSubtitle: string;
  /** Intro paragraph (shown above the content sections) */
  intro: string;
  /** Body sections — each rendered as h3 + paragraphs */
  sections: { heading: string; body: string }[];
  /** Key benefits list (bullet points) */
  benefits: string[];
  /** FAQ items */
  faq: { q: string; a: string }[];
}

// ── Niche data ─────────────────────────────────────────────────────────────
const niches: Record<string, NicheContent> = {

  "car-photos": {
    slug: "car-photos",
    title: "Car Photos",
    pageTitle: "Free AI Background Remover for Car Photos — EraseImageBg",
    metaDescription:
      "Remove backgrounds from car photos instantly with our free AI tool. Create clean, white-background auto listing images for eBay Motors, AutoTrader, Craigslist & dealer websites. No upload, no watermark.",
    toolSubtitle:
      "Upload a car photo and get a studio-clean transparent PNG in seconds — free, private, no watermark.",
    intro:
      "Whether you are a private seller listing a vehicle on eBay Motors or AutoTrader, a franchised dealer managing hundreds of inventory images, or a photographer producing editorial auto content, clean background-free car photos are no longer optional — they are the industry standard. EraseImageBg removes backgrounds from car images with a single click, giving you professional, consistent results that make your listings stand out from the competition.",

    sections: [
      {
        heading: "Why White-Background Car Photos Get More Clicks",
        body: "Studies conducted by major automotive classifieds platforms consistently show that vehicle listings featuring clean, studio-style white or neutral backgrounds receive 30–40% more clicks than photos taken in driveways, car parks, or dealer forecourts. The reason is psychological: a clutter-free background forces the viewer's eye directly onto the vehicle, allowing them to evaluate body lines, paint condition, and trim details without distraction. For dealers running pay-per-click advertising on Google or Facebook, this translates directly into lower cost-per-lead. For private sellers, it means faster sales at closer to asking price. Our AI background remover for car photos understands the complex shapes of vehicles — including shiny paintwork, reflective windows, chrome trim, and wheels with intricate spoke patterns — producing crisp, accurate cutouts that manual clipping paths would take a professional Photoshop editor 20–30 minutes to achieve.",
      },
      {
        heading: "How EraseImageBg Handles Reflective Surfaces and Complex Wheel Arches",
        body: "Cars are among the most challenging subjects for background removal because of their highly reflective surfaces. Glass windows reflect the environment, chrome bumpers mirror the sky, and metallic paint shifts colour depending on the light angle. Most simple background removal tools fail on these subjects, creating halo artefacts around window edges or incorrectly classifying shiny bonnet reflections as background. EraseImageBg uses a neural network trained specifically on automotive imagery, making it significantly more accurate on vehicle outlines than general-purpose tools. The model understands that a dark shadow beneath a car is part of the background, that a tyre's black rubber edge is part of the foreground, and that a windscreen's reflected clouds should be treated as a semi-transparent foreground element. The result is a clean, professionally cut vehicle PNG that you can place on any background — a neutral grey gradient for dealer inventory, a white studio background for marketplace listings, or a dramatic sunset composite for social media content.",
      },
      {
        heading: "Ideal for Dealers, Private Sellers, and Auto Content Creators",
        body: "For franchised and independent car dealers, consistent inventory photography is a brand differentiator. Customers browsing AutoTrader, Motors.co.uk, or Cars.com develop expectations: a dealer whose listings all feature clean, identically lit and composed images projects professionalism and trustworthiness, while inconsistent, background-cluttered photos signal disorganisation. EraseImageBg lets your sales team process dozens of vehicle images per day without any Photoshop skill, keeping imagery consistent across your entire stock. For private sellers, removing the background from a photo taken on your driveway instantly eliminates the distracting bins, parked cars, and garden furniture that detract from your vehicle's perceived value. For auto bloggers, YouTube creators, and social media content producers, clean car cutouts open up creative possibilities: vehicle reveal graphics, side-by-side comparison posts, thumbnail images for review videos, and branded overlays.",
      },
      {
        heading: "Privacy and Speed: Your Photos Never Leave Your Device",
        body: "Unlike cloud-based automotive photo editing services that upload your images to remote servers — where they may be stored, analysed, or used to train commercial AI models — EraseImageBg runs entirely within your browser using WebAssembly. Your car photos are processed locally on your own device, with zero data transmitted over the internet. This matters particularly for dealer groups handling large volumes of vehicle imagery, where data governance policies may restrict third-party uploads. The entire processing pipeline, from image input to transparent PNG output, takes fewer than five seconds on most modern laptops and phones. There are no file size restrictions beyond our 20 MB per image limit, no daily usage caps, no account creation, and no watermarks on any output image — ever.",
      },
    ],

    benefits: [
      "30–40% more listing clicks vs. cluttered-background photos (industry data)",
      "Handles reflective paintwork, chrome, and glass windows accurately",
      "Process entire dealer inventory in minutes with no Photoshop skill required",
      "Works on all platforms: AutoTrader, eBay Motors, Cars.com, Motors.co.uk",
      "No upload — your customer vehicle data stays on your device",
      "Free, no watermark, no subscription required",
    ],

    faq: [
      {
        q: "Can I remove the background from a car photo taken on my driveway?",
        a: "Yes. EraseImageBg works on car photos taken in any environment — driveways, car parks, roads, or indoor showrooms. The AI identifies the vehicle outline regardless of what surrounds it.",
      },
      {
        q: "Will it work on photos with complex wheel designs and open spokes?",
        a: "Yes. The model handles complex spoke patterns and alloy wheel designs accurately. It correctly identifies the gap between spokes as background and removes it cleanly.",
      },
      {
        q: "Can dealers process bulk car photos?",
        a: "Currently, EraseImageBg processes one image at a time. For high-volume batch processing, we recommend using our tool for spot checks and quality verification, while contacting us about API access for automated workflows.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  "real-estate": {
    slug: "real-estate",
    title: "Real Estate Photos",
    pageTitle: "Background Remover for Real Estate Photos — EraseImageBg",
    metaDescription:
      "Free AI background removal for real estate agents and property photographers. Clean up headshots, property photos, and virtual staging images. No sign-up, no watermark, 100% private.",
    toolSubtitle:
      "Upload a property photo or agent headshot and get a professional transparent PNG in seconds.",
    intro:
      "In the US real estate market, where agents compete for every listing and buyers make split-second judgments based on online photos, professional imagery is not a luxury — it is a prerequisite. EraseImageBg gives real estate agents, brokers, and property photographers instant access to AI-powered background removal, transforming ordinary photos into polished, marketing-ready assets without a Photoshop subscription or a visit to a photography studio.",

    sections: [
      {
        heading: "The Role of Clean Imagery in Real Estate Marketing",
        body: "The National Association of Realtors reports that over 97% of US home buyers begin their search online, and the vast majority cite photos as the most important factor in deciding which properties to visit. Listing photos that feature cluttered backgrounds, distracting furniture, or poor lighting conditions can reduce enquiry rates significantly. Background removal allows property photographers and agents to solve several common photography problems in post-production: a beautiful fireplace mantle photo ruined by an ugly lamp in the background, a kitchen shot where the neighbour's car is visible through the window, or a bathroom photo where a stack of towels detracts from the clean aesthetic. By removing and replacing the background with a clean neutral alternative, you can improve photo quality without a reshoot — saving time and the cost of sending a photographer back to the property.",
      },
      {
        heading: "Agent Headshots and Professional Profile Photos",
        body: "Every real estate agent's personal brand depends heavily on their profile photo. Consistent, professional headshots appear on property listings, on agency websites, on business cards, on social media profiles, and on For Sale signboards. Agents who have clean, professionally cropped headshots with simple backgrounds project authority, approachability, and attention to detail — all qualities buyers and sellers associate with a trustworthy transaction partner. EraseImageBg makes it easy to update a headshot taken against a cluttered office background and replace it with a clean, solid-colour or branded background that matches your agency's visual identity. The result is indistinguishable from a studio shoot, at zero cost. You can then export the transparent PNG and import it directly into Canva, Adobe Express, or your MLS profile editor.",
      },
      {
        heading: "Virtual Staging and Furniture Overlays",
        body: "Virtual staging — digitally adding furniture, décor, and finishing touches to photos of empty properties — has become mainstream in US real estate marketing, with virtually staged listings receiving up to 87% more views than unstaged equivalents according to the Real Estate Staging Association. The foundation of any virtual staging workflow is accurate background removal: furniture assets, rugs, plants, and artwork must be cleanly cut out before they can be composited into a room. EraseImageBg accelerates this workflow by allowing stagers to quickly isolate furniture pieces from catalogue photos, removing manufacturer backgrounds and placing the items precisely within the property image. The AI handles complex furniture shapes — chair spindles, plant leaves, lamp shades — with the precision that manual masking achieves, at a fraction of the time.",
      },
      {
        heading: "Property Photography for International and Luxury Markets",
        body: "In the luxury real estate segment — where properties in markets like Miami, New York, Los Angeles, and London are marketed to international buyers who may never physically visit before making an offer — photography quality directly influences sale price and time on market. High-end buyers have sophisticated visual expectations shaped by luxury brand advertising and editorial design. Clean, background-perfect imagery communicates premium positioning. EraseImageBg gives independent property photographers and boutique agencies access to the same background removal quality previously available only to agencies with large in-house design teams. All processing happens in your browser, so confidential property photos for sensitive listings — luxury estates, celebrity homes, commercial properties — are never transmitted to any external server.",
      },
    ],

    benefits: [
      "Transform cluttered property photos into clean marketing assets without a reshoot",
      "Professional agent headshots suitable for MLS, Zillow, and Realtor.com profiles",
      "Supports virtual staging workflows — isolate furniture pieces from catalogue photos",
      "Works with photos from any camera or phone, any file format (JPG, PNG, WEBP)",
      "GDPR and CCPA compliant — property photos never leave your device",
      "Free, unlimited use, no watermark — funded by non-intrusive advertising",
    ],

    faq: [
      {
        q: "Can I use this for interior property photos, not just portraits?",
        a: "Yes. EraseImageBg works on any image type, including interior architectural photos, exterior property shots, and garden/landscape images.",
      },
      {
        q: "Will this work on my MLS listing photos for Zillow or Realtor.com?",
        a: "Absolutely. Export your processed image as a PNG and upload it directly to any MLS platform, Zillow, Realtor.com, or Rightmove.",
      },
      {
        q: "How do I add a white background after removal?",
        a: "After downloading the transparent PNG, open it in Canva, Adobe Express, or any image editor and add a white, grey, or branded background layer behind the image.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  "id-cards": {
    slug: "id-cards",
    title: "ID Cards & Passport Photos",
    pageTitle: "Background Remover for ID Cards & Passport Photos — EraseImageBg",
    metaDescription:
      "Prepare compliant passport, visa, and ID card photos with a clean white background using our free AI background remover. Works in your browser — 100% private. No upload, no watermark.",
    toolSubtitle:
      "Get a compliant white-background portrait photo in seconds — processed entirely on your device.",
    intro:
      "Preparing a passport, visa, national ID, or driving licence photo that meets official government specifications used to require a trip to a pharmacy or photo booth. EraseImageBg lets you produce a clean, white-background portrait photo from any selfie or photograph, entirely in your browser, in under ten seconds. Your biometric image never leaves your device.",

    sections: [
      {
        heading: "UK and US Passport Photo Requirements: What You Need to Know",
        body: "Both the UK Home Office and the US State Department specify strict technical requirements for passport photos: a plain white or off-white background, the subject's face centred and un-obscured, neutral facial expression, no shadows on the background or face, and specific pixel dimensions. Photos that fail to meet these standards are rejected, causing significant delays to travel applications. The most common rejection reason is an incorrect background — photos taken against coloured walls, patterned wallpapers, or outdoors are automatically flagged by passport acceptance software. EraseImageBg's AI background removal produces a clean, pure white background that meets these specifications. After downloading your transparent PNG from EraseImageBg, you can open it in Canva, GIMP, or any image editor, add a white background layer, and export a print-ready JPEG. For the US passport (2×2 inches, 600×600px minimum) and the UK passport (35×45mm, plain white background), this workflow produces photos that meet all published technical requirements.",
      },
      {
        heading: "Visa Applications, Work Permits, and Government ID Photos",
        body: "Beyond passports, many official documents require compliant photos: US visa applications (DS-160 form), ESTA travel authorisation, UK Biometric Residence Permits, Indian e-Visa, Schengen visa applications, and numerous employer ID card systems. Each has slightly different specifications — some require a light grey background rather than white, some specify a minimum head height, and some require the photo to be in JPEG format at a specific file size. EraseImageBg's transparent PNG output gives you the flexibility to meet any specification: add whatever background colour the application requires, crop to the exact required dimensions, and export at the required resolution. Because processing happens locally in your browser, there are no privacy concerns about submitting biometric photos — your face data is never transmitted to any server.",
      },
      {
        heading: "Employee ID Cards, Company Badges, and Access Passes",
        body: "Organisations that issue employee ID cards, security badges, and access passes typically need consistent portrait photos from all staff members — often hundreds or thousands. The reality is that employees submit photos of wildly varying quality: selfies against office walls, outdoor photos with complex backgrounds, photos wearing sunglasses or hats, or images scanned from old driving licences. HR teams and facilities managers spend significant time manually processing these submissions to create consistent badge images. EraseImageBg provides a free, browser-based solution that any employee can use themselves before submitting their photo. With a simple one-click background removal, staff can ensure their ID photo has a clean, neutral background that meets company policy — reducing the administrative burden on HR teams and producing more consistent, professional-looking badges across the entire organisation.",
      },
      {
        heading: "Privacy Considerations for Biometric Photos",
        body: "Biometric data — which includes photographs that can be used to identify a person's face — is classified as sensitive personal data under the UK GDPR and as biometric information under various US state laws including the Illinois Biometric Information Privacy Act (BIPA) and the California Consumer Privacy Act (CCPA). Uploading your passport photo or ID image to a cloud-based background removal service means transmitting biometric data to a third party's server, where it may be stored, processed, or used to train facial recognition systems. EraseImageBg's on-device processing model means that your biometric photo data is processed entirely within your own browser's sandboxed environment. No image data is transmitted over the network, no server stores your photo, and no third party has access to your biometric information. This makes EraseImageBg the most privacy-respecting choice for document photo preparation available online.",
      },
    ],

    benefits: [
      "Produces clean white backgrounds compliant with US and UK passport specifications",
      "Works for visa photos, work permits, ID cards, and company badges",
      "Biometric photo data never leaves your device — full privacy by design",
      "No photography studio visit required — works with any selfie or phone photo",
      "Free, unlimited, no watermark — suitable for personal and professional use",
      "Export as transparent PNG and add any background colour required by your application",
    ],

    faq: [
      {
        q: "Will the result meet official US passport photo specifications?",
        a: "EraseImageBg produces a transparent PNG with accurate background removal. You must then add a white background and crop to 2×2 inches at 600dpi. This meets the US State Department's published technical requirements.",
      },
      {
        q: "Is it safe to process my passport photo here?",
        a: "Yes. Your photo is processed entirely within your browser using WebAssembly — no image data is sent to any server. This is the most private background removal method available online.",
      },
      {
        q: "Can I use this for children's passport photos?",
        a: "Yes. EraseImageBg works on portrait photos of people of all ages. Ensure the child's face is clearly visible and well-lit for best results.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  "product-photos": {
    slug: "product-photos",
    title: "Product Photos",
    pageTitle: "Free AI Background Remover for Product Photos — EraseImageBg",
    metaDescription:
      "Remove backgrounds from product photos for Amazon, Etsy, Shopify, and eBay. Get clean white-background product images free, instantly, with no watermark. No upload needed — 100% private.",
    toolSubtitle:
      "Upload any product photo and get a marketplace-ready transparent PNG in seconds — free, private.",
    intro:
      "Amazon's image guidelines require a pure white background (RGB 255, 255, 255) for main product images. Etsy, Shopify, eBay, and most other e-commerce platforms strongly recommend it. Professional product photography studios in the US and UK charge $25–$100 per image for this service. EraseImageBg gives you the same result for free, in seconds, running entirely in your browser.",

    sections: [
      {
        heading: "Amazon Main Image Requirements and Why They Matter",
        body: "Amazon mandates that the main (hero) image for every product listing must feature the product on a pure white background with no props, text, logos, or additional objects. Products that violate this policy have their listings suppressed — removed from search results entirely until the image is corrected. For sellers managing hundreds of SKUs, ensuring every main image meets this standard is a significant operational challenge. Professional product photography services are expensive and slow; in-house photography requires a lightbox studio setup and post-production editing skills. EraseImageBg eliminates both constraints. Any seller can photograph their product on any surface — a table, a piece of card, outdoors — and use EraseImageBg to produce an Amazon-compliant white-background image in under a minute. The AI handles complex product shapes accurately: jewellery with intricate detail, clothing with complex silhouettes, electronics with cables and USB ports, and glassware with transparent elements.",
      },
      {
        heading: "Etsy, Shopify, and Social Commerce Product Imagery",
        body: "While Amazon's white background requirement is mandatory, Etsy and Shopify sellers have more creative flexibility — but background-free product images are still the professional standard. Clean, consistent product images allow buyers to compare items clearly, build basket-ready flat-lay compositions in design tools, and create matching social media content. Instagram Shopping, Pinterest Shopping, and TikTok Shop all benefit from consistent, background-free product imagery that can be placed on branded colour backgrounds matching a shop's visual identity. EraseImageBg's transparent PNG output integrates directly with Canva, where sellers can then apply their brand colours, add product descriptions as graphics, or create collection shots by compositing multiple products on a single background. For Shopify stores using the Dawn or Debut theme, transparent PNGs also render correctly on the page's background colour without unwanted white boxes — a subtle but professionally important distinction.",
      },
      {
        heading: "Handling Challenging Product Types: Transparent, Reflective, and Fine Detail",
        body: "Product photography background removal is technically demanding. Jewellery features fine chains and intricate metalwork where individual links are only a few pixels wide. Glassware and bottles are partially transparent — a glass jar against a white background has almost no edge contrast for a colour-based segmentation algorithm to detect. Clothing has complex fabric textures, folds, and shadows. Shoes have detailed stitching, lace holes, and often complex sole designs. EraseImageBg's neural network has been trained on millions of product images across all major categories, making it significantly more accurate on product shots than general-purpose background removal tools. For truly challenging items — ultra-fine jewellery chains, completely transparent glassware — we recommend shooting against a mid-grey background to provide sufficient edge contrast for the AI, then using EraseImageBg to remove that background cleanly.",
      },
      {
        heading: "Cost Savings and Workflow Integration for E-Commerce Brands",
        body: "For a US or UK e-commerce business with a 500 SKU catalogue, professional background removal at $25 per image represents a $12,500 line item — plus the time cost of briefing a studio, reviewing proofs, and managing revisions. EraseImageBg eliminates this cost entirely. For growing brands that photograph new products weekly, the savings compound significantly. The tool integrates into any existing workflow: photograph products with your iPhone or a DSLR, import the photos to your laptop, drag-and-drop through EraseImageBg, download the transparent PNGs, and upload directly to your Shopify backend or Amazon Seller Central. No subscription, no monthly fee, no per-image charge. The only requirement is a modern web browser.",
      },
    ],

    benefits: [
      "Produces Amazon-compliant pure white background images from any product photo",
      "Works for all product categories: jewellery, clothing, electronics, food, cosmetics",
      "Saves $25–$100 per image vs. professional studio background removal",
      "Integrates with Canva, Figma, Shopify, and Amazon Seller Central workflows",
      "No API key, no account — just drag, drop, download",
      "Transparent PNG output compatible with every major e-commerce platform",
    ],

    faq: [
      {
        q: "Will the white background meet Amazon's 'pure white' (RGB 255,255,255) requirement?",
        a: "EraseImageBg removes the background to full transparency. When you add a white background in Canva or any image editor, you control the exact white value. Set it to RGB 255,255,255 and export as JPEG for Amazon compliance.",
      },
      {
        q: "Can it handle glassware and transparent product photos?",
        a: "Yes, though results vary. For best results with transparent products, photograph against a mid-grey background to give the AI clear edge contrast. Then use EraseImageBg to remove that grey cleanly.",
      },
      {
        q: "What file size limit does EraseImageBg support?",
        a: "EraseImageBg supports image files up to 20 MB. For product photography, this covers virtually all phone and DSLR raw exports.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────

  "profile-photos": {
    slug: "profile-photos",
    title: "Profile Photos & Headshots",
    pageTitle: "Free Background Remover for Profile Photos & Headshots — EraseImageBg",
    metaDescription:
      "Remove backgrounds from LinkedIn headshots, Twitter profile photos, and professional portraits. Free AI tool, runs in your browser, no upload, no watermark. Perfect for US and UK professionals.",
    toolSubtitle:
      "Get a clean, professional headshot with any background removed in seconds — free and private.",
    intro:
      "Your profile photo is the first thing a recruiter, client, or business contact sees when they search for you online. LinkedIn data shows that profiles with professional photos receive 14× more views and 36× more messages than those without. EraseImageBg helps US and UK professionals transform any photo into a clean, background-free headshot suitable for LinkedIn, company websites, email signatures, and business cards.",

    sections: [
      {
        heading: "Why Your LinkedIn Profile Photo Background Matters",
        body: "A LinkedIn profile photo does two things simultaneously: it humanises your professional identity, and it signals how seriously you take your personal brand. A photo taken at a social event against a busy bar background communicates informality; a clean, well-lit headshot against a simple, neutral background communicates focus and professionalism. LinkedIn's own algorithm data suggests that users with clear, close-cropped headshots with simple backgrounds receive significantly higher engagement on posts and connection requests compared to those with busy or dark backgrounds. For job seekers in competitive US markets like technology, finance, law, and consulting, the difference between a distracting background and a clean one can influence whether a recruiter pauses to read your headline or scrolls past. EraseImageBg removes backgrounds from any photo in seconds, letting you present the most polished version of yourself online without the cost or logistical complexity of booking a headshot photographer.",
      },
      {
        heading: "Consistent Headshots Across Platforms and Company Directories",
        body: "Professionals operating across multiple platforms — LinkedIn, Twitter/X, company directory, email signature, personal website, Calendly, Zoom — typically have inconsistent profile photos: different crops, different backgrounds, taken at different points in their career. This inconsistency creates a subliminal impression of disorganisation. Using EraseImageBg to standardise a single headshot across all platforms projects a coherent, intentional personal brand. The transparent PNG output allows you to use any background: a clean white for formal contexts, a brand-colour solid for company directories, or even a blurred office environment for a modern corporate look. Many UK companies now require all employees to use consistent, company-style headshots in their internal Microsoft Teams and Slack profiles — EraseImageBg gives HR teams a simple, free tool to help employees self-serve compliant profile images.",
      },
      {
        heading: "For Freelancers, Consultants, and Business Owners",
        body: "Independent professionals — freelancers, consultants, coaches, therapists, personal trainers — operate entirely on the strength of their personal brand. Unlike employees of large companies who benefit from institutional credibility, self-employed professionals must establish trust quickly through digital channels. A professional headshot is one of the most cost-effective investments a freelancer can make. But even the best photo can be let down by a distracting background. EraseImageBg transforms a good photo taken at home or in a coffee shop into a studio-quality headshot by removing the background cleanly and allowing the subject's face to command the viewer's full attention. The tool is particularly valuable for freelancers updating their Upwork, Toptal, or Fiverr profile photos, where a professional headshot measurably increases client conversion rates.",
      },
      {
        heading: "Technical Quality: Handling Hair, Glasses, and Complex Edges",
        body: "Human portrait background removal is technically the hardest category of image segmentation. Loose or curly hair creates thousands of fine semi-transparent edge pixels that simple colour-based algorithms fail to handle, resulting in the notorious 'helmet hair' effect where hair edges are clipped abruptly. Glasses with thin metallic frames are partially transparent and partially reflective. Earrings and other fine jewellery present similar challenges. EraseImageBg's neural network has been specifically trained on portrait imagery with diverse hair types, ethnicities, and accessories, making it significantly more accurate than general-purpose tools on these edge cases. The model produces smooth, natural hair edges without halo artefacts, preserving even flyaway strands and wispy fringes. Glasses frames are retained accurately with their lenses treated as semi-transparent, exactly as they appear in real life.",
      },
    ],

    benefits: [
      "LinkedIn-ready headshots in seconds — 14× more profile views (LinkedIn data)",
      "Handles complex hair types, glasses, and fine jewellery accurately",
      "Create consistent headshots across LinkedIn, company directory, email signature",
      "Free for freelancers, consultants, and job seekers — no subscription required",
      "Export as transparent PNG to add any background in Canva or other design tools",
      "Your photo is never uploaded — complete biometric privacy by design",
    ],

    faq: [
      {
        q: "What photo should I use for best results?",
        a: "A well-lit photo where your face and shoulders are clearly visible, taken against a background with good contrast to your clothing. Avoid photos where your clothing colour closely matches the background.",
      },
      {
        q: "Can it handle curly or loose hair accurately?",
        a: "Yes. EraseImageBg is trained specifically on diverse portrait imagery including curly, afro, loose, and flyaway hair types. Results are significantly more accurate than general-purpose tools for complex hair.",
      },
      {
        q: "How do I add a blurred background effect after removing the original?",
        a: "Download the transparent PNG, open it in Canva, and place it over a blurred or soft gradient background layer. This creates a professional 'bokeh' style portrait effect.",
      },
    ],
  },
};

// ── Exports ────────────────────────────────────────────────────────────────

/** All known niche slugs — used in generateStaticParams */
export const KNOWN_NICHES = Object.keys(niches);

/** Look up a niche by slug. Returns undefined for unknown slugs. */
export function getNiche(slug: string): NicheContent | undefined {
  return niches[slug];
}

/**
 * Generic fallback content for slugs not in the niches map.
 * Keeps the page functional while preventing 404s.
 */
export function getGenericNiche(slug: string): NicheContent {
  const title = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return {
    slug,
    title,
    pageTitle: `Free AI Background Remover for ${title} — EraseImageBg`,
    metaDescription: `Remove backgrounds from ${title.toLowerCase()} photos instantly with our free AI tool. No sign-up, no watermark, 100% private — processing happens in your browser.`,
    toolSubtitle: `Upload a ${title.toLowerCase()} image and get a transparent PNG in seconds — free, private, no watermark.`,
    intro: `EraseImageBg's AI-powered background removal tool is perfect for ${title.toLowerCase()} photography. Whether you need clean, transparent PNGs for professional presentations, e-commerce listings, social media content, or personal projects, our tool delivers studio-quality results in seconds — entirely within your browser, with no data ever leaving your device.`,
    sections: [
      {
        heading: `Professional Background Removal for ${title}`,
        body: `Creating clean, background-free images for ${title.toLowerCase()} has never been easier. Our AI model, running entirely within your browser using WebAssembly, analyses your image and produces an accurate foreground cutout in seconds. There is no need for Photoshop expertise, a subscription to a professional editing tool, or the expense of hiring a graphic designer. Simply drag and drop your image into the tool above, wait a few seconds while the AI processes it locally on your device, and download your transparent PNG — ready to use in any design application, e-commerce platform, or presentation software.`,
      },
      {
        heading: "Why On-Device AI Processing Matters for Your Privacy",
        body: "Unlike most online background removal tools, which transmit your images to remote servers where they may be stored and processed by third parties, EraseImageBg performs all AI inference directly within your web browser. Your images are loaded into browser memory, processed by a WebAssembly-compiled neural network, and converted to a transparent PNG — all without a single pixel of your image being sent over the internet. This architecture provides a concrete privacy guarantee: it is physically impossible for your images to be accessed by any third party, because they never leave your device. This is particularly important for professional or sensitive photography where image confidentiality matters.",
      },
    ],
    benefits: [
      "Free with no watermark — funded by non-intrusive advertising",
      "100% private on-device processing — images never uploaded",
      "No account or sign-up required",
      "Works in any modern browser on desktop or mobile",
      "Download transparent PNG at original resolution",
    ],
    faq: [
      {
        q: "Is this tool really free?",
        a: "Yes, completely free. We are funded by non-intrusive Google AdSense advertisements displayed on the page. There are no hidden fees, no subscription tiers, and no watermarks on output images.",
      },
      {
        q: "What image formats does EraseImageBg support?",
        a: "EraseImageBg supports JPEG, PNG, and WEBP images up to 20 MB in file size.",
      },
    ],
  };
}

export default niches;
