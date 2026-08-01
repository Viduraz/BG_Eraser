import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — EraseImageBg",
  description:
    "EraseImageBg's Privacy Policy. Learn how we handle your data, how Google AdSense advertising works on our site, our use of the DoubleClick DART cookie, and our commitment to processing all images locally in your browser.",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="Your privacy is the foundation our product is built on. This policy explains, in plain English, exactly what data we collect, what we do not collect, and how third-party advertising works on this site."
      lastUpdated="1 August 2025"
    >
      {/* ── 1. Introduction ──────────────────────────────────────────── */}
      <h2>1. Introduction and Who We Are</h2>
      <p>
        Welcome to <strong>EraseImageBg</strong> ("we", "us", "our"), a free, browser-based
        AI background removal tool available at{" "}
        <a href="https://eraseimagebg.com">eraseimagebg.com</a> (the "Service"). We are committed
        to protecting your personal information and your right to privacy. This Privacy
        Policy explains what information we collect when you visit our website, how we use
        it, and what rights you have in relation to it.
      </p>
      <p>
        If you have any questions or concerns about this policy or our practices with
        regard to your personal information, please contact us at{" "}
        <a href="mailto:privacy@eraseimagebg.com">privacy@eraseimagebg.com</a>.
      </p>
      <p>
        Please read this policy carefully, as it will help you understand what we do with
        any information we collect. This policy applies to all information collected
        through our website, as well as any related services, sales, marketing, or events.
      </p>

      {/* ── 2. Images — Local Processing ─────────────────────────────── */}
      <h2>2. How We Handle Your Images — Local Processing</h2>
      <p>
        <strong>
          We do not collect, upload, store, transmit, or process your images on any
          server we operate or control.
        </strong>
      </p>
      <p>
        EraseImageBg's background removal technology operates entirely within your web
        browser using WebAssembly (WASM) and ONNX Runtime Web. When you upload an image
        to our tool, the following happens:
      </p>
      <ol>
        <li>
          Your image file is loaded into your browser's local memory (RAM) via the
          browser's{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/File_API"
            target="_blank"
            rel="noopener noreferrer"
          >
            File API
          </a>
          .
        </li>
        <li>
          An AI neural network model — already downloaded and stored in your browser's
          cache — processes the image data locally to produce a segmentation mask
          identifying foreground and background pixels.
        </li>
        <li>
          The resulting transparent PNG is generated in browser memory and made available
          for download.
        </li>
        <li>
          When you navigate away from the page or close your browser, all image data in
          memory is discarded. No image data is written to disk by our application, and no
          image data is sent over the network to any server at any point in this process.
        </li>
      </ol>
      <p>
        This architecture is not merely a policy commitment — it is a technical guarantee.
        You can verify this independently by opening your browser's Developer Tools
        (F12), navigating to the "Network" tab, and observing that no image data is
        transmitted when you process a photo using EraseImageBg. The only network requests
        made during tool usage are the one-time downloads of the AI model files (WASM and
        ONNX), which contain no user data.
      </p>
      <p>
        <strong>
          In summary: your photos are never uploaded to our servers, never stored, never
          sold, never analysed by us, and never shared with any third party by us.
        </strong>
      </p>

      {/* ── 3. Information We Collect ─────────────────────────────────── */}
      <h2>3. Information We Automatically Collect</h2>
      <p>
        Like most websites, we collect certain information automatically when you visit
        our Service. This information does not include your images (see Section 2 above).
      </p>
      <h3>3.1 Log Data</h3>
      <p>
        Our web hosting provider may automatically record standard server log information
        when you access our website, including your Internet Protocol (IP) address, the
        date and time of your request, the specific pages you viewed, your browser type
        and version, your operating system, and the referring URL. This log data is used
        for the purposes of maintaining server security, diagnosing technical problems,
        and understanding aggregate traffic patterns. We do not link log data to any
        personally identifiable information.
      </p>
      <h3>3.2 Cookies</h3>
      <p>
        We use cookies and similar tracking technologies to access or store information.
        Cookies are small data files placed on your device. We use the following categories
        of cookies:
      </p>
      <ul>
        <li>
          <strong>Strictly Necessary Cookies:</strong> Required for the basic operation of
          our website (e.g., session cookies).
        </li>
        <li>
          <strong>Analytics Cookies:</strong> We may use Google Analytics to understand
          aggregate, anonymised usage patterns on our site (e.g., which pages are most
          visited). Google Analytics collects anonymised data about your interactions with
          our website.
        </li>
        <li>
          <strong>Advertising Cookies:</strong> Used by Google AdSense to display
          relevant advertisements. See Section 4 below for full details.
        </li>
      </ul>
      <p>
        You can instruct your browser to refuse all cookies or to indicate when a cookie
        is being sent. However, if you do not accept cookies, some portions of our Service
        may not function properly.
      </p>

      {/* ── 4. Google AdSense & DoubleClick ──────────────────────────── */}
      <h2>4. Google AdSense Advertising and the DoubleClick DART Cookie</h2>
      <p>
        EraseImageBg is a free service funded by advertising revenue. We use{" "}
        <strong>Google AdSense</strong>, a third-party advertising service operated by
        Google LLC, to display advertisements on our website. Google AdSense uses
        advertising cookies to serve ads based on a user's prior visits to our website
        and other sites on the internet.
      </p>
      <h3>4.1 The DoubleClick DART Cookie</h3>
      <p>
        Google, as a third-party vendor, uses the{" "}
        <strong>DoubleClick DART cookie</strong> to serve ads to users based on their
        visit to EraseImageBg and other websites on the internet. The DART cookie is set by
        Google's DoubleClick ad-serving platform, which is the underlying technology that
        powers Google AdSense ad delivery.
      </p>
      <p>
        Specifically, the DoubleClick DART cookie enables Google to:
      </p>
      <ul>
        <li>
          Record which ads are shown to individual users and which ads are clicked, to
          prevent the same ads from being displayed too frequently.
        </li>
        <li>
          Provide advertisers with aggregate reports on the performance of their
          advertisements, including impression counts and click-through rates.
        </li>
        <li>
          Serve ads that are relevant to a user's interests based on anonymised browsing
          behaviour across websites in the Google Display Network.
        </li>
      </ul>
      <p>
        Users may opt out of the use of the DART cookie by visiting the{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ad and Content Network Privacy Policy
        </a>
        . You can also manage your Google ad personalisation settings at{" "}
        <a
          href="https://adssettings.google.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          adssettings.google.com
        </a>
        .
      </p>
      <h3>4.2 Google's Privacy Policy</h3>
      <p>
        Google's use of advertising cookies is governed by Google's own Privacy Policy,
        which you can review at{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/privacy
        </a>
        . We have no control over and no access to the data collected by Google through
        AdSense cookies. We receive only aggregate, anonymised revenue reporting from
        Google and do not receive any personally identifiable user data from Google's
        advertising systems.
      </p>
      <h3>4.3 Other Third-Party Advertisers</h3>
      <p>
        From time to time, other third-party vendors or advertisers may also use cookies
        to serve ads on our site through Google AdSense's auction-based ad delivery
        system. These third-party ad servers may use cookies, web beacons, and similar
        technologies to measure the effectiveness of their advertisements and to
        personalise advertising content. Each of these third-party vendors has its own
        Privacy Policy governing their data collection practices, which we encourage you
        to review.
      </p>

      {/* ── 5. AI Model Data ─────────────────────────────────────────── */}
      <h2>5. AI Model Downloads and Caching</h2>
      <p>
        To perform background removal in your browser, EraseImageBg downloads AI model files
        (in ONNX format) from a content delivery network (CDN) on your first visit. These
        files contain model weights — numerical parameters that define the neural network
        — and contain no user data whatsoever.
      </p>
      <p>
        After the initial download, these model files are cached in your browser's local
        cache. On subsequent visits, EraseImageBg uses the cached model files rather than
        downloading them again, which also means the tool functions offline after the
        first use. You can clear these cached files by clearing your browser's cache and
        cookies in the usual way.
      </p>

      {/* ── 6. GDPR Rights ───────────────────────────────────────────── */}
      <h2>6. Your Rights Under GDPR (UK and EU Users)</h2>
      <p>
        If you are located in the United Kingdom or the European Economic Area, you have
        certain data protection rights under the UK General Data Protection Regulation
        (UK GDPR) and the EU GDPR respectively. These include the right to:
      </p>
      <ul>
        <li>Access the personal data we hold about you.</li>
        <li>Request correction of inaccurate personal data.</li>
        <li>Request deletion of your personal data ("right to be forgotten").</li>
        <li>Object to the processing of your personal data.</li>
        <li>Request restriction of processing of your personal data.</li>
        <li>Request transfer of your personal data to another service provider.</li>
        <li>Withdraw consent at any time where we relied on consent to process your data.</li>
      </ul>
      <p>
        Please note that because EraseImageBg processes no personally identifiable information
        beyond standard web server logs (which are not linked to any individual identity),
        there is very limited personal data for us to action. To exercise any of these
        rights, please contact us at{" "}
        <a href="mailto:privacy@eraseimagebg.com">privacy@eraseimagebg.com</a>.
      </p>

      {/* ── 7. CCPA Rights ───────────────────────────────────────────── */}
      <h2>7. Your Rights Under CCPA (California / US Users)</h2>
      <p>
        If you are a California resident, the California Consumer Privacy Act (CCPA)
        grants you specific rights regarding your personal information. You have the right
        to know what personal information we collect about you, the right to request
        deletion of your personal information, and the right to opt out of the sale of
        your personal information. EraseImageBg does not sell personal information to third
        parties. To exercise your CCPA rights, contact us at{" "}
        <a href="mailto:privacy@eraseimagebg.com">privacy@eraseimagebg.com</a>.
      </p>

      {/* ── 8. Data Retention ─────────────────────────────────────────── */}
      <h2>8. Data Retention</h2>
      <p>
        We retain server log data for a period of up to 90 days for security and
        diagnostic purposes, after which it is automatically purged. We do not retain any
        image data (see Section 2). Advertising cookies are governed by Google's own
        retention policies.
      </p>

      {/* ── 9. Children ───────────────────────────────────────────────── */}
      <h2>9. Children's Privacy</h2>
      <p>
        EraseImageBg is not directed to children under the age of 13 in the United States, or
        under 16 in the United Kingdom and European Union. We do not knowingly collect
        personal information from children. If you believe we have inadvertently collected
        information from a child, please contact us immediately at{" "}
        <a href="mailto:privacy@eraseimagebg.com">privacy@eraseimagebg.com</a>.
      </p>

      {/* ── 10. Third-Party Links ─────────────────────────────────────── */}
      <h2>10. Third-Party Links</h2>
      <p>
        Our website may contain links to other websites, including links within
        advertisements served by Google AdSense. We have no control over and assume no
        responsibility for the content, privacy policies, or practices of any third-party
        websites. We encourage you to read the Privacy Policy of every website you visit.
      </p>

      {/* ── 11. Changes to Policy ─────────────────────────────────────── */}
      <h2>11. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our
        practices or for other operational, legal, or regulatory reasons. We will notify
        you of any significant changes by updating the "Last updated" date at the top of
        this page. We encourage you to review this Policy periodically. Your continued use
        of EraseImageBg after any changes constitutes your acceptance of the updated Policy.
      </p>

      {/* ── 12. Contact ───────────────────────────────────────────────── */}
      <h2>12. Contact Us</h2>
      <p>
        If you have questions, comments, or concerns about this Privacy Policy, or if you
        wish to exercise any of your data rights, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:privacy@eraseimagebg.com">privacy@eraseimagebg.com</a>
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href="https://eraseimagebg.com/contact">eraseimagebg.com/contact</a>
        </li>
      </ul>
    </LegalPageLayout>
  );
}
