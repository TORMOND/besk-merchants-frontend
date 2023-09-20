import { NavBar, Products, Footer, PopUps, Brands, HeroSection, Categories, HeroMobile}from '../components';
import{ useEffect } from "react";
const ReturnPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-col ">
      <NavBar />
      <div className='mx-auto max-w-6xl mt-24'>

 
        <h2>Returns and Refunds Policy</h2>
        <h3>Introduction</h3>
        <p>At Besk Merchants, we want you to have a positive experience every time you shop with us. Occasionally though, we know you may want to return items you have purchased. This Returns & Refunds Policy sets out our conditions for accepting returns and issuing refunds for items purchased on Besk Merchants, on behalf of our sellers. It also sets out when we will not accept returns or issue refunds.</p>
        <h3>Return period and conditions for acceptance of returns</h3>
        <p>Subject to the rules set out in this Returns & Refunds Policy, we Besk Merchants offer returns for most items within 15 days of delivery; and within 15 days of delivery for Official Store items only (''the returns period'') We do not accept returns, for any reason whatsoever, after the returns period has lapsed. This does not affect your legal rights against the seller. You may return items purchased on Besk Merchants within the returns period, for the reasons listed below.</p>
    <h3>Items that cannot be returned</h3>
    <ul>
        <li>
        We do not accept returns of certain product categories for health and hygiene reasons:- Customer safety is important to us, so certain product categories cannot be returned due to health and hygiene reasons, or if they may deteriorate or expire rapidly. You shall only be entitled to return and refund in respect of these items if you received the wrong item; a damaged or defective item; or a fake or inauthentic item. You are not entitled to a refund or return of these product categories if you have changed your mind.
        </li>
        <li>
        We do not accept returns of customized items We do not accept returns of goods made, configured or inscribed to your specification or (e.g. personalized engravings, stamps, monograms, embroidery, embossing, etching, carving or printing). The seller is not required to accept returns unless the items are damaged or defective upon arrival, or materially different from what was ordered.
        </li>
        <li>
        We do not accept returns of items that you have damaged after delivery:- We do not accept returns of used or worn items, unless the reason for return is that the item stopped working or became damaged or defective after reasonable use (in accordance with manufacturers guidelines where applicable) during the returns period. Items becoming defective after delivery is not an applicable return reason in respect of the following product categories: clothing, sport & fitness and consumables. If an item is covered by a warranty, and becomes damaged or defective during the warranty period, it is not covered by this Returns and Refunds Policy, but by the seller warranty. Warranty information is displayed on each product page.
        </li>
       </ul>
       <h3>Packaging returns</h3>
        <p>When returning an item for any reason, you must do so in the exact condition you received it from Besk Merchants, with its original packaging and all tags and labels attached (e.g. shoes should be returned within the original shoe box; and seals on items including audio or video recordings or software must not be removed). Returned items are your responsibility until they reach us, so do make sure they are packaged properly and can't get damaged on the way. You must not include in the packaging with the returned item any item not pertaining to the returned item as originally received from Besk Merchants. You must entirely delete and eliminate all personal data pertaining to you and/or any third party which may be possibly present in an item, and de-latch any account possibly latched to the item. Besk Merchants will not be responsible for any items erroneously contained within a returned package, or for any data breach resulting from failure to eliminate personal data contained in a returned item.</p>
    <h3>Refunds</h3>
    <p>If we accept your return, or if you order but do not receive an item, we aim to refund you the purchase price of the item within the period of time stated on the return timelines page. For incorrect, defective, or damaged items, you will also be refunded for the full cost of delivery of the returned items, once your return is processed. If the return is not the result of Besk Merchants error or seller error (i.e. you changed your mind or the size does not fit as expected) you will not receive any refund on delivery fees. The refund request form shall state which payment method(s) for receipt of refunds are available to you.</p>
    <h3>Rejected return and refund requests and forfeiture</h3>
    <p>All items are inspected on return to verify the return reasons provided. If your return request is not approved by Besk Merchants, you shall not receive any refund of the purchase price or the delivery fees, and we will make 2 attempts to redeliver within 7 business days. If both re-delivery attempts are unsuccessful, we will immediately notify you that we will hold the item for a further 30 days from the date of the initial notification. Our notification will include details about pick up location and opening hours. If you do not collect the item within the required period, you shall forfeit the item i.e. the item shall become Besk Merchants property and Besk Merchants may dispose of it in any manner that it determines appropriate e.g. by sale, charitable donation, recycling or destruction.</p>
    <h3>No exchange</h3>
  
    <p>We don't offer exchanges. If you would like a different size or color, please return your unwanted item and place a new order.</p>
    </div>
    <Footer />
    </div>
  )
}

export default ReturnPolicy