import { PolicyPage } from "@/components/policy-page";

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      eyebrow="Returns & exchanges"
      title="Refund Policy"
      intro="At Shree Fashion, we want you to love what you ordered. If you are not completely satisfied, we're here to help."
    >
      <section>
        <h2>1. Returns</h2>
        <p>We accept returns within <strong>7 days</strong> of delivery. To be eligible for a return, the item must be:</p>
        <ul>
          <li>Unused and unworn</li>
          <li>In the same condition you received it</li>
          <li>In its original packaging with all tags intact</li>
        </ul>
      </section>
      <section>
        <h2>2. Non-Returnable Items</h2>
        <p>The following items cannot be returned:</p>
        <ul>
          <li>Sale or discounted items</li>
          <li>Customized or stitched garments</li>
          <li>Innerwear or intimate apparel</li>
        </ul>
      </section>
      <section>
        <h2>3. How to Initiate a Return</h2>
        <p>To initiate a return, please contact us through our store with your order number and reason for return. Once approved, we will provide instructions for sending the item back.</p>
      </section>
      <section>
        <h2>4. Refunds</h2>
        <p>Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within <strong>7-10 business days</strong> to your original payment method.</p>
      </section>
      <section>
        <h2>5. Exchanges</h2>
        <p>If you received a damaged or defective item, we will replace it at no extra cost. Please contact us within 48 hours of delivery with photos of the damaged product.</p>
      </section>
      <section>
        <h2>6. Shipping Costs for Returns</h2>
        <p>Return shipping costs are the responsibility of the customer unless the item is defective or incorrect.</p>
      </section>
      <section>
        <h2>7. Contact Us</h2>
        <p>For any questions about our Refund Policy, please reach out to us through our store and we'll be happy to assist.</p>
      </section>
    </PolicyPage>
  );
}
