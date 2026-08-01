import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service — BgEraser",
  description:
    "BgEraser Terms of Service. Read the terms and conditions governing your use of our free AI background removal tool.",
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      subtitle="Please read these Terms of Service carefully before using BgEraser. By accessing or using our Service, you agree to be bound by these terms."
      lastUpdated="1 August 2025"
    >
      {/* ── 1. Acceptance ─────────────────────────────────────────────── */}
      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using <strong>BgEraser</strong> ("Service"), operated by BgEraser
        ("Company", "we", "us", "our"), you agree to be bound by these Terms of Service
        ("Terms"). If you disagree with any part of these Terms, you may not access the
        Service. These Terms apply to all visitors, users, and others who access or use
        the Service.
      </p>
      <p>
        We reserve the right to modify these Terms at any time. We will notify users of
        significant changes by updating the "Last updated" date. Your continued use of the
        Service after any modification constitutes your acceptance of the new Terms. If
        you do not agree to the modified Terms, you must stop using the Service.
      </p>

      {/* ── 2. Description of Service ─────────────────────────────────── */}
      <h2>2. Description of Service</h2>
      <p>
        BgEraser provides a free, web-based tool that uses artificial intelligence to
        remove backgrounds from digital images ("Service"). The Service operates entirely
        within your web browser: your images are processed locally on your device using
        WebAssembly-compiled AI models and are not uploaded to any server operated by us.
      </p>
      <p>
        The Service is provided free of charge and is funded by third-party advertising
        revenue (Google AdSense). We reserve the right to modify, suspend, or discontinue
        the Service (or any part thereof) at any time, with or without notice.
      </p>
      <p>
        The Service is intended for users who are at least 13 years of age (or 16 in the
        UK/EU). By using the Service, you represent that you meet this age requirement.
      </p>

      {/* ── 3. Acceptable Use ─────────────────────────────────────────── */}
      <h2>3. Acceptable Use Policy</h2>
      <p>
        You agree to use BgEraser only for lawful purposes and in a manner that does not
        infringe the rights of others or restrict or inhibit anyone else's use and
        enjoyment of the Service. Specifically, you agree not to:
      </p>
      <ul>
        <li>
          Use the Service to process images that contain, depict, promote, or facilitate
          illegal content, including but not limited to child sexual abuse material
          (CSAM), non-consensual intimate imagery ("revenge porn"), or content that
          incites violence or hatred.
        </li>
        <li>
          Use the Service to create deceptive, fraudulent, or misleading content,
          including the creation of identity documents containing false information.
        </li>
        <li>
          Attempt to reverse-engineer, decompile, or extract the AI model files or any
          other proprietary components of the Service.
        </li>
        <li>
          Use automated scripts, bots, or crawlers to make excessive requests to the
          Service in a manner that could impair the Service's performance for other users.
        </li>
        <li>
          Circumvent or attempt to circumvent any security or access control features of
          the Service.
        </li>
        <li>
          Resell, sublicense, or commercially exploit the Service itself (as distinct from
          the output images you produce using the Service) without our prior written
          consent.
        </li>
        <li>
          Use the Service to process images of other individuals without their knowledge
          or consent, particularly for the purpose of manipulating or creating deceptive
          depictions of those individuals.
        </li>
      </ul>
      <p>
        We reserve the right to terminate your access to the Service immediately and
        without notice if we believe you are in violation of these Terms.
      </p>

      {/* ── 4. Intellectual Property ──────────────────────────────────── */}
      <h2>4. Intellectual Property</h2>
      <h3>4.1 Our Content</h3>
      <p>
        The Service and its original content (excluding user-provided images), features,
        and functionality are and will remain the exclusive property of BgEraser and its
        licensors. Our trademarks, service marks, and trade dress may not be used in
        connection with any product or service without our prior written consent.
      </p>
      <h3>4.2 Your Images and Output</h3>
      <p>
        You retain full ownership of any images you process using the Service. Because
        your images are processed locally in your browser and are never transmitted to our
        servers, we have no access to your images and make no claim of ownership over
        them or any output images you produce using the Service.
      </p>
      <p>
        You represent and warrant that you own or have the necessary rights to any image
        you process using the Service, and that your use of the Service with respect to
        those images does not infringe the intellectual property rights or other rights of
        any third party. You are solely responsible for ensuring you have the right to
        process and use any image you submit to the Service.
      </p>
      <h3>4.3 AI Models</h3>
      <p>
        The AI models used by BgEraser are based on open-source research and are made
        available under their respective licences. By using the Service, you do not
        acquire any ownership rights in these models.
      </p>

      {/* ── 5. Privacy ────────────────────────────────────────────────── */}
      <h2>5. Privacy</h2>
      <p>
        Your use of the Service is also governed by our{" "}
        <a href="/privacy-policy">Privacy Policy</a>, which is incorporated into these
        Terms by reference. Our Privacy Policy explains how we handle information
        collected through the Service, including our use of Google AdSense advertising
        and the DoubleClick DART cookie, and confirms our commitment to local-only image
        processing.
      </p>

      {/* ── 6. Third-Party Services ───────────────────────────────────── */}
      <h2>6. Third-Party Services and Advertising</h2>
      <p>
        The Service displays advertisements provided by Google AdSense, a third-party
        advertising platform operated by Google LLC. These advertisements may be targeted
        based on your browsing behaviour using cookies (including the DoubleClick DART
        cookie). We do not control the content of these advertisements and are not
        responsible for any products, services, or websites advertised through them.
      </p>
      <p>
        The Service may also incorporate third-party libraries and services (including
        open-source AI model frameworks). Your interaction with any such third-party
        services is governed by their respective terms and privacy policies, not by these
        Terms.
      </p>

      {/* ── 7. Disclaimer of Warranties ───────────────────────────────── */}
      <h2>7. Disclaimer of Warranties</h2>
      <p>
        <strong>
          The Service is provided on an "as is" and "as available" basis, without any
          warranties of any kind, either express or implied.
        </strong>{" "}
        To the fullest extent permitted by applicable law, we disclaim all warranties,
        express or implied, including but not limited to:
      </p>
      <ul>
        <li>
          Implied warranties of merchantability, fitness for a particular purpose, and
          non-infringement.
        </li>
        <li>
          Any warranty that the Service will be uninterrupted, error-free, or virus-free.
        </li>
        <li>
          Any warranty regarding the accuracy, reliability, or quality of the AI
          background removal results. Results may vary depending on image content,
          lighting conditions, and other factors.
        </li>
        <li>
          Any warranty that the Service will meet your specific requirements or produce
          results compliant with any particular government, platform, or employer
          specification (including passport photo requirements).
        </li>
      </ul>

      {/* ── 8. Limitation of Liability ────────────────────────────────── */}
      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, in no event shall BgEraser,
        its directors, employees, partners, agents, suppliers, or affiliates be liable for
        any indirect, incidental, special, consequential, or punitive damages, including
        without limitation loss of profits, data, goodwill, or other intangible losses,
        resulting from:
      </p>
      <ul>
        <li>Your access to or use of (or inability to access or use) the Service.</li>
        <li>
          Any conduct or content of any third party on or through the Service, including
          advertisement content.
        </li>
        <li>
          Any content obtained from the Service, including background removal results.
        </li>
        <li>Unauthorised access, use, or alteration of your transmissions or content.</li>
      </ul>
      <p>
        Our total aggregate liability to you for all claims arising out of or relating to
        the Service shall not exceed $100 USD (or the equivalent in your local currency).
        This limitation applies whether the claim is based in contract, tort, negligence,
        strict liability, or otherwise.
      </p>

      {/* ── 9. Indemnification ────────────────────────────────────────── */}
      <h2>9. Indemnification</h2>
      <p>
        You agree to defend, indemnify, and hold harmless BgEraser and its affiliates,
        licensors, and service providers from and against any claims, liabilities,
        damages, judgments, awards, losses, costs, expenses, or fees (including
        reasonable attorneys' fees) arising out of or relating to your violation of these
        Terms or your use of the Service, including but not limited to your use of the
        Service to process images that infringe third-party rights.
      </p>

      {/* ── 10. Governing Law ─────────────────────────────────────────── */}
      <h2>10. Governing Law and Dispute Resolution</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of
        England and Wales, without regard to its conflict of law provisions, except that
        users in the United States may elect to have disputes governed by the laws of the
        state in which they are domiciled.
      </p>
      <p>
        Any disputes arising out of or relating to these Terms or the Service shall first
        be attempted to be resolved through informal negotiation. If the parties cannot
        resolve the dispute informally within 30 days, either party may pursue formal
        dispute resolution in the courts of competent jurisdiction.
      </p>
      <p>
        If you are a consumer in the UK or EU, you retain the right to bring proceedings
        in the courts of your country of residence, and nothing in these Terms limits
        your statutory consumer rights.
      </p>

      {/* ── 11. Severability ──────────────────────────────────────────── */}
      <h2>11. Severability and Entire Agreement</h2>
      <p>
        If any provision of these Terms is found to be unenforceable or invalid, that
        provision shall be limited or eliminated to the minimum extent necessary so that
        the Terms shall otherwise remain in full force and effect and enforceable. These
        Terms, together with our Privacy Policy, constitute the entire agreement between
        you and BgEraser regarding the Service and supersede all prior agreements and
        understandings.
      </p>

      {/* ── 12. Contact ───────────────────────────────────────────────── */}
      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about these Terms of Service, please contact us:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:legal@bgeraser.com">legal@bgeraser.com</a>
        </li>
        <li>
          <strong>Website:</strong>{" "}
          <a href="https://bgeraser.com/contact">bgeraser.com/contact</a>
        </li>
      </ul>
    </LegalPageLayout>
  );
}
