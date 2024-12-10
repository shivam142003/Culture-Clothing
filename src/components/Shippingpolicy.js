import React from 'react';
import '../css/Privacy.css';

const ShippingPolicy = () => {
  return (
    <div className="container box-return">
      <h2 className="text-center mb-4">
        Shipping Policy
      </h2>

      <h3 className="return-title">Applicability of Policy</h3>
      <p>
        By using the Found Culture Exchanges Portal and/or initiating a request for the purchase of products, you agree to the terms contained in this shipping policy without modification. If you do not agree to these terms, we advise you not to transact on foundculture.com.
      </p>
      <p>
        Please note that we may change the terms of this policy from time to time. Every time you wish to use the portal, please check the policy to ensure you understand the terms and conditions that apply.
      </p>

      <h3 className="return-title">Shipping Time & Costs</h3>
      <p>
        Orders are processed within <strong className="bold-text">2-3 business days</strong> from the date of order confirmation. Standard shipping will typically take between <strong className="bold-text">5-7 business days</strong> depending on your location.
      </p>
      <p>
        Shipping charges are calculated at checkout and vary depending on the shipping method chosen, the delivery address, and the weight of the package.
      </p>

      <h3 className="return-title">Order Tracking</h3>
      <p>
        Once your order has shipped, you will receive an email containing your tracking information. You can track your order status by visiting the courier's website.
      </p>

      <h3 className="return-title">Delivery Issues</h3>
      <p>
        If you experience any delivery issues such as delayed, lost, or damaged shipments, please contact our customer support team immediately. We will work with the courier to resolve the issue as quickly as possible.
      </p>

      <h3 className="return-title">Important Conditions</h3>
      <p>
        We are not responsible for shipping delays caused by factors beyond our control, such as weather conditions, natural disasters, or courier errors. While we make every effort to ensure timely delivery, we cannot guarantee delivery times.
      </p>
      <p>
        Please ensure that the shipping address is accurate and complete. We are not liable for orders shipped to incorrect addresses provided by the customer.
      </p>

      <h3 className="return-title">Customer Support</h3>
      <p>If you have any questions or concerns regarding shipping, please contact our customer support team:</p>
      <p>Call: <strong className="bold-text">+91 8448441388</strong></p>
      <p>Email: <a href="mailto:ordersupport@foundculture.com" style={{ backgroundColor: 'whitesmoke', padding: '6px' }}>ordersupport@foundculture.com</a></p>
    </div>
  );
};

export default ShippingPolicy;
