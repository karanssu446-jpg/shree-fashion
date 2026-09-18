import { PolicyPage } from "@/components/policy-page";

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Your privacy"
      title="Privacy Policy"
      intro="At Shree Fashion, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit or make a purchase from our store."
    >
      <section>
        <h2>1. Information We Collect</h2>
        <p>We collect information you provide directly to us, such as your name, email address, phone number, shipping address, and payment details when you place an order or create an account.</p>
      </section>
      <section>
        <h2>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Send order confirmations and updates</li>
          <li>Respond to your queries and provide customer support</li>
          <li>Send promotional communications (only if you opt in)</li>
          <li>Improve our website and services</li>
        </ul>
      </section>
      <section>
        <h2>3. Sharing Your Information</h2>
        <p>We do not sell, trade, or rent your personal information to third parties. We may share your data with trusted service providers, such as payment processors and shipping partners, solely to fulfill your orders.</p>
      </section>
      <section>
        <h2>4. Cookies</h2>
        <p>Our website uses cookies to enhance your browsing experience. Cookies help us understand how you use our site and allow us to improve it. You can disable cookies in your browser settings, though this may affect some features of our store.</p>
      </section>
      <section>
        <h2>5. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.</p>
      </section>
      <section>
        <h2>6. Your Rights</h2>
        <p>You have the right to access, correct, or delete your personal data. To make a request, please contact us through our store. We will respond within a reasonable timeframe.</p>
      </section>
      <section>
        <h2>7. Third-Party Links</h2>
        <p>Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
      </section>
      <section>
        <h2>8. Changes to This Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of our store constitutes acceptance of the revised policy.</p>
      </section>
      <section>
        <h2>9. Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us through our store.</p>
      </section>
    </PolicyPage>
  );
}
