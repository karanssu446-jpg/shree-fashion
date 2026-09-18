import { PolicyPage } from "@/components/policy-page";

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Delivery details"
      title="Shipping Policy"
      intro="At Shree Fashion, we strive to deliver your orders as quickly and safely as possible. Please read our shipping policy below."
    >
      <section>
        <h2>1. Processing Time</h2>
        <p>All orders are processed within <strong>1-3 business days</strong> after payment confirmation. Orders placed on weekends or public holidays will be processed on the next business day.</p>
      </section>
      <section>
        <h2>2. Shipping Time</h2>
        <p>Once dispatched, estimated delivery times are:</p>
        <ul>
          <li><strong>Metro cities:</strong> 3-5 business days</li>
          <li><strong>Other cities &amp; towns:</strong> 5-8 business days</li>
          <li><strong>Remote areas:</strong> 7-12 business days</li>
        </ul>
      </section>
      <section>
        <h2>3. Shipping Charges</h2>
        <p>Shipping charges are calculated at checkout based on your location and order weight. We offer <strong>free shipping</strong> on orders above a certain amount. Please check our store for current offers.</p>
      </section>
      <section>
        <h2>4. Order Tracking</h2>
        <p>Once your order is shipped, you will receive a tracking number via email or SMS. You can use this to track your order through our courier partner's website.</p>
      </section>
      <section>
        <h2>5. Delays</h2>
        <p>While we do our best to ensure timely delivery, we are not responsible for delays caused by courier partners, weather conditions, or other unforeseen circumstances.</p>
      </section>
      <section>
        <h2>6. Damaged or Lost Packages</h2>
        <p>If your package arrives damaged or is lost in transit, please contact us within 48 hours of the expected delivery date. We will investigate and resolve the issue promptly.</p>
      </section>
      <section>
        <h2>7. Incorrect Address</h2>
        <p>Please ensure your shipping address is correct at the time of placing the order. Shree Fashion is not responsible for orders delivered to an incorrect address provided by the customer.</p>
      </section>
      <section>
        <h2>8. Contact Us</h2>
        <p>For any shipping-related queries, feel free to reach out to us through our store. We're happy to help!</p>
      </section>
    </PolicyPage>
  );
}
