import { PolicyPage } from "@/components/policy-page";

export default function TermsOfServicePage() {
  return (
    <PolicyPage
      eyebrow="Please read carefully"
      title="Terms of Service"
      intro="Welcome to Shree Fashion. By accessing or purchasing from our store, you agree to the following terms."
    >
      <section>
        <h2>1. General</h2>
        <p>By visiting our site and/or purchasing something from us, you engage in our &quot;Service&quot; and agree to be bound by the following terms and conditions. These terms apply to all users of the site.</p>
      </section>
      <section>
        <h2>2. Products</h2>
        <p>We reserve the right to refuse service to anyone for any reason at any time. Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</p>
      </section>
      <section>
        <h2>3. Orders &amp; Payment</h2>
        <p>We accept major payment methods. By placing an order, you confirm that the payment information provided is accurate. We reserve the right to cancel any order at our discretion.</p>
      </section>
      <section>
        <h2>4. Shipping</h2>
        <p>Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.</p>
      </section>
      <section>
        <h2>5. Returns &amp; Refunds</h2>
        <p>We want you to be satisfied with your purchase. Please refer to our Refund Policy for detailed information on returns and exchanges.</p>
      </section>
      <section>
        <h2>6. Privacy</h2>
        <p>Your use of our store is also governed by our Privacy Policy, which is incorporated into these Terms by reference.</p>
      </section>
      <section>
        <h2>7. Intellectual Property</h2>
        <p>All content on this site, including images, text, and logos, is the property of Shree Fashion and may not be reproduced without permission.</p>
      </section>
      <section>
        <h2>8. Limitation of Liability</h2>
        <p>Shree Fashion shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
      </section>
      <section>
        <h2>9. Changes to Terms</h2>
        <p>We reserve the right to update these terms at any time. Continued use of our store constitutes acceptance of any changes.</p>
      </section>
      <section>
        <h2>10. Contact</h2>
        <p>If you have any questions about these Terms, please contact us through our store.</p>
      </section>
    </PolicyPage>
  );
}
