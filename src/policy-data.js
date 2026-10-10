// Country/region-specific policy documents for Weverse Online Shop.
// Each region provides its own Privacy, Terms, Refund and Shipping policy,
// tailored to the consumer-privacy and consumer-rights law that applies there.
// All content is written for Weverse (Elementary Innovation Pte. Ltd.) and
// mirrors the professional scope and structure of leading global marketplaces,
// without copying any third party's legal text.
//
// Notes on accuracy: we reflect the real legal frameworks that apply per region
// (GDPR / UK GDPR / CCPA-CPRA / APPI / PIPEDA / FADP / Australian Consumer Law).
// Where a law grants a default right (e.g. EU/UK 14-day cooling-off), we state it.
// Where no such right exists (e.g. general returns in the USA/Japan), we make
// clear that our voluntary returns policy applies.

const S = (o) => JSON.stringify(o);

const CONTACT = 'support@weverseonlineshop.com';
const COMPANY = 'Elementary Innovation Pte. Ltd.';
const ENTITY_LINE = `${COMPANY}, a Singaporean company, and its affiliates ("Weverse", "we", "us" or "our")`;

export const REGIONS = [
  { key: 'usa',      flag: '🇺🇸', name: 'United States',      currency: '$' },
  { key: 'uk',       flag: '🇬🇧', name: 'United Kingdom',     currency: '£' },
  { key: 'eu',       flag: '🇪🇺', name: 'European Union',     currency: '€' },
  { key: 'germany',  flag: '🇩🇪', name: 'Germany',            currency: '€' },
  { key: 'france',   flag: '🇫🇷', name: 'France',             currency: '€' },
  { key: 'japan',    flag: '🇯🇵', name: 'Japan',              currency: '¥' },
  { key: 'canada',   flag: '🇨🇦', name: 'Canada',             currency: 'C$' },
  { key: 'australia',flag: '🇦🇺', name: 'Australia',          currency: 'A$' },
  { key: 'switzerland', flag: '🇨🇭', name: 'Switzerland',     currency: 'CHF' },
];

const sharedIntro = () => ENTITY_LINE;

export const POLICY_TYPES = {
  privacy: { icon: 'shield',   label: 'Privacy Policy',    key: 'privacy' },
  terms:   { icon: 'file-text', label: 'Terms of Use',     key: 'terms' },
  refund:  { icon: 'rotate-ccw', label: 'Refund Policy',   key: 'refund' },
  shipping:{ icon: 'truck',    label: 'Shipping Policy',   key: 'shipping' },
};

// ---------------------------------------------------------------------------
// USA
// ---------------------------------------------------------------------------
const usa = {
  name: 'United States',
  lawNote: 'Relevant law: CCPA/CPRA (California), FTC rules, Magnuson-Moss Warranty Act and applicable state UDAP laws. Under US law there is no blanket federal right to return a non-defective item; our voluntary returns policy applies unless a state or federal rule requires otherwise.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Weverse Online Shop service (the "Service") for users in the United States. We care about your privacy and process personal information in line with the California Consumer Privacy Act (as amended by the California Privacy Rights Act, "CCPA/CPRA"), the Federal Trade Commission Act, and other applicable US laws.` },
    { h: 'Information We Collect', b: 'We collect information you provide (name, email, phone, shipping and billing address, payment details), information related to your orders and browsing, and information collected automatically such as device data, IP address and usage information. In the preceding 12 months we have not sold consumers\' personal information. Any disclosure is for the business purposes described on this page, such as payment processing, delivery, customer support and fraud prevention.' },
    { h: 'How We Use It', b: 'We use your information to process and deliver orders, communicate with you, provide customer support, prevent fraud, improve the Service and, with your choices, send marketing. We never sell your personal information.' },
    { h: 'Your California Privacy Rights', b: 'If you are a California resident, you have the right to know what personal information we collect, use and disclose; to access and request a copy; to correct inaccurate information; to delete your information; and to opt out of the \u201csale\u201d or \u201csharing\u201d of personal information for cross-context behavioural advertising. We do not sell your data. To exercise a right, email us at ' + CONTACT + ' with \u201cCalifornia Privacy Request\u201d in the subject. We respond within 45 days. We do not discriminate against you for exercising these rights.' },
    { h: 'Do Not Sell / Share My Personal Information', b: 'We do not sell personal information as defined by the CCPA/CPRA. We do not engage in cross-context behavioural advertising that would constitute \u201csharing\u201d.' },
    { h: 'Children', b: 'Our Service is not directed to children under 16. We do not knowingly collect personal information from children. If you believe a child has provided us information, contact ' + CONTACT + ' and we will delete it.' },
    { h: 'Data Security', b: 'We use SSL-encrypted connections, access controls and industry-standard safeguards to protect your data. Payment information is processed by certified payment gateways (including Flutterwave) and is never stored by us in plain text.' },
    { h: 'Data Retention', b: 'We keep your account data while your account is active and order records for as long as required (up to 7 years for legal and tax purposes). You may delete your account at any time.' },
    { h: 'Changes & Contact', b: 'We may update this policy and will post changes here with a new date. For privacy questions or requests in the US, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your access to and use of the Weverse Online Shop Service in the United States. By using the Service you agree to these terms.' },
    { h: 'Your Account & Orders', b: 'You are responsible for keeping your account details accurate and secure. When you place an order you agree to provide current, complete and accurate information and to authorise payment for the total stated at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are displayed in US dollars ($). We may charge sales tax where required. Payment is processed securely by certified gateways. We reserve the right to refuse or cancel any order, including where payment is declined or an error occurs.' },
    { h: 'Returns & Refunds', b: 'Our voluntary Refund Policy applies, subject to applicable state and federal law (including the Magnuson-Moss Warranty Act and FTC Mail, Internet or Telephone Order Merchandise Rule). If your order did not arrive on time and we cannot ship it within the stated timeframe, we will offer you a choice to consent to the delay or cancel and receive a prompt refund.' },
    { h: 'Intellectual Property', b: 'All content on the Service, including the Weverse name, logos, text and graphics, is owned by or licensed to us and may not be used without permission.' },
    { h: 'Prohibited Conduct', b: 'You may not misuse the Service, attempt to gain unauthorised access, infringe others\' rights, or use the Service for any unlawful purpose.' },
    { h: 'Limitation of Liability', b: 'To the maximum extent permitted by law, our liability is limited to the amount you paid for the affected product(s). Nothing in these terms limits rights you have under applicable law that cannot be limited by contract.' },
    { h: 'Governing Law', b: 'These terms are governed by the laws of the State of Singapore and the applicable laws of the United States where the consumer is located. Disputes are subject to the consumer protections available in your state.' },
    { h: 'Contact', b: 'For questions about these Terms, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Our Voluntary Returns Policy', b: 'Because US law does not create a blanket right to return a non-defective item, our voluntary returns policy below applies unless a specific state or federal rule (such as the Magnuson-Moss Warranty Act or FTC rules) grants you a stronger right.' },
    { h: '14-Day Returns', b: 'You may return most unused items within 14 days of delivery for a refund or exchange, provided the item is in its original condition with tags and packaging. Items marked as final sale and certain categories (e.g. personalised or hygiene-sealed items) are excluded.' },
    { h: 'Damaged, Defective or Not As Described', b: 'If your item arrives damaged, defective or not as described, contact us within 7 days with photos. We will arrange a free return, replacement or full refund, including return shipping.' },
    { h: 'Non-Delivery', b: 'If your order does not arrive within the estimated window plus a reasonable period, contact us with your order and tracking information. If we cannot ship on time, we will follow the FTC Mail/Internet/Telephone Order rule: we will notify you and offer a choice to consent to the delay or cancel for a prompt refund.' },
    { h: 'How to Request a Return', b: 'Email ' + CONTACT + ' with your order number and reason. Our team reviews requests within 48 hours and will send return instructions.' },
    { h: 'Refund Timing', b: 'Approved refunds are issued to your original payment method. Card and digital-wallet refunds typically post within 5-10 business days; bank transfers within 7-14 business days.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We currently ship to the United States and most major destinations worldwide. Delivery times and options are shown at checkout for your address.' },
    { h: 'Shipping Methods & Times', b: 'Standard delivery within the United States typically takes 3-7 business days. Express (2-4 business days) and Priority (1-2 business days) options are available at checkout where offered.' },
    { h: 'Shipping Costs', b: 'Standard shipping is offered free on qualifying orders; otherwise costs are displayed before you pay. Customs, duties and import taxes are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing', b: 'Orders are processed within 1-2 business days after payment confirmation and you will receive a tracking number by email.' },
    { h: 'Non-Delivery & Delays', b: 'If a shipment is late, we investigate with the carrier. Under the FTC Mail/Internet/Telephone Order rule, if we cannot ship within the promised (or default 30-day) timeframe we will offer you the choice to consent to the delay or cancel for a prompt refund.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// UK
// ---------------------------------------------------------------------------
const uk = {
  name: 'United Kingdom',
  lawNote: 'Relevant law: UK GDPR & Data Protection Act 2018, and the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, which give you a 14-day statutory right to cancel distance purchases.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in the United Kingdom. We process your personal information in line with the UK GDPR and the Data Protection Act 2018. Our supervisory authority is the Information Commissioner\'s Office (ICO).` },
    { h: 'Information We Collect', b: 'We collect information you provide (name, email, phone, address, payment details), order and browsing information, and automatically collected device and usage data (including via cookies you have consented to).' },
    { h: 'Lawful Bases', b: 'We rely on: (a) performance of a contract \u2014 to provide the Service, process orders and deliver products; (b) our legitimate interests \u2014 to improve the Service, prevent fraud and keep it secure; (c) your consent \u2014 for marketing communications and non-essential cookies, which you may withdraw at any time; and (d) legal obligations.' },
    { h: 'How We Use It', b: 'We use your information to create and maintain your account, process and deliver orders, provide customer support, personalise your experience, send service messages, prevent fraud, and (with consent) send marketing.' },
    { h: 'Sharing', b: 'We share information only with trusted parties who help us operate: payment processors (e.g. Flutterwave), shipping carriers (DHL, FedEx, UPS, EMS), and email/customer-support providers. We do not sell your personal information.' },
    { h: 'Your Rights', b: 'Under UK GDPR you have the right to access, correct, delete, restrict or port your personal information, and to object to processing. You may withdraw consent at any time. Email ' + CONTACT + ' to exercise a right; we respond within one month.' },
    { h: 'Cookies', b: 'We use necessary cookies to run the Service and (with your consent) analytics and advertising cookies. You can control cookies in your browser or via our cookie banner.' },
    { h: 'Data Security & Retention', b: 'We use encryption and access controls to protect your data, and retain account data while your account is active (order records for up to 7 years for legal/tax reasons). You may delete your account at any time.' },
    { h: 'Contact', b: 'For privacy questions or to exercise your rights, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in the United Kingdom. By using the Service you agree to these terms, which apply alongside your statutory consumer rights.' },
    { h: 'Your Account & Orders', b: 'You must keep your account details accurate and secure. When you place an order you agree to provide accurate information, authorise payment, and accept the price and terms shown at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in pounds sterling (£). VAT will be charged where applicable. Payment is processed by certified gateways. We may cancel orders where payment is declined, an error occurs, or an item is unavailable.' },
    { h: 'Right to Cancel', b: 'You have a statutory right to cancel most distance purchases within 14 days of receiving the goods, without giving a reason, under the Consumer Contracts Regulations 2013. See our Refund Policy for how refunds are returned within 14 days.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Limitation of Liability', b: 'Nothing in these terms limits your statutory rights under UK law. To the extent permitted by law, our liability is limited to the amount you paid for the affected product.' },
    { h: 'Governing Law & Contact', b: 'These terms are governed by the laws of England and Wales (and Scotland/Northern Ireland as applicable). For questions, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Your Statutory Right to Cancel', b: 'Under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, you may cancel most distance purchases within 14 days of receiving the goods, without giving a reason.' },
    { h: 'The 14-Day Cancellation Period', b: 'The period runs for 14 calendar days from the day you (or someone you nominate) receives the goods. If your right is extended because we did not give you the required cancellation information, the period is up to 12 months.' },
    { h: 'How to Cancel', b: 'Email ' + CONTACT + ' with your order number before the period ends to tell us you are cancelling. We provide a model withdrawal form on request.' },
    { h: 'Returning the Goods', b: 'You must return the goods within 14 days of telling us you cancel. You may be responsible for the cost of returning them unless we offered free returns or the item was faulty/not as described.' },
    { h: 'Refund Within 14 Days', b: 'We will refund the price you paid, including standard delivery costs, within 14 days of being informed of your cancellation (or of receiving the goods/evidence they were returned, whichever is later). We may reduce the refund if the goods were handled more than necessary to check them.' },
    { h: 'Faulty or Not As Described', b: 'If goods are faulty or not as described, your UK consumer rights let you choose a repair, replacement or refund, with a full refund for significant faults. Return costs are covered by us in these cases.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship across the United Kingdom and worldwide. Delivery times and options for your postcode are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard UK delivery typically takes 3-5 business days. Express (1-3 business days) and Priority (next-working-day where available) options appear at checkout.' },
    { h: 'Shipping Costs', b: 'Standard shipping is free on qualifying orders; otherwise costs are displayed before payment. Import duties are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation. You receive a tracking number by email.' },
    { h: 'Late or Non-Delivery', b: 'If your order does not arrive within the estimated window, contact us and we will investigate with the carrier and resolve it, including a refund or reshipment where required.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// EU
// ---------------------------------------------------------------------------
const eu = {
  name: 'European Union',
  lawNote: 'Relevant law: the GDPR (Regulation (EU) 2016/679) and the Consumer Rights Directive 2011/83/EU, which give you a 14-day right of withdrawal for distance purchases throughout the EU/EEA.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in the European Union and EEA. We process personal data in accordance with the General Data Protection Regulation (GDPR). Your local data protection authority can be contacted in relation to a complaint.` },
    { h: 'Information We Collect', b: 'We collect information you provide (name, email, phone, address, payment details), order and browsing information, and automatically collected device and usage data (including cookies you have consented to).' },
    { h: 'Lawful Bases (GDPR)', b: 'We rely on: (a) performance of a contract \u2014 to provide the Service and process orders; (b) legitimate interests \u2014 to improve the Service, prevent fraud and keep it secure; (c) your consent \u2014 for marketing and non-essential cookies, withdrawable at any time; and (d) legal obligations.' },
    { h: 'How We Use It', b: 'We use your data to create your account, process and deliver orders, provide support, personalise your experience, send service messages, prevent fraud and (with consent) market to you.' },
    { h: 'International Transfers', b: 'As a global service we may transfer data outside the EEA. Where we do, we rely on appropriate safeguards such as Standard Contractual Clauses or an adequacy decision by the European Commission, to keep your data protected.' },
    { h: 'Your GDPR Rights', b: 'You have the right to access, rectify, erase, restrict processing, data portability, and to object to processing (including direct marketing). You may withdraw consent and may lodge a complaint with your supervisory authority. Email ' + CONTACT + ' to exercise your rights; we respond within one month.' },
    { h: 'Cookies', b: 'We use necessary cookies and, with consent, analytics/advertising cookies. You can manage consent via our cookie banner or browser settings.' },
    { h: 'Security & Retention', b: 'We apply encryption, access controls and data minimisation by default. Account data is kept while active; order records up to 7 years for legal/tax reasons. You may delete your account at any time.' },
    { h: 'Contact', b: 'For privacy questions or to exercise rights, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in the EU/EEA. They apply alongside your statutory consumer rights, which cannot be excluded.' },
    { h: 'Your Account & Orders', b: 'You must keep account details accurate and secure. When you place an order you agree to provide accurate information, authorise payment and accept the price and terms at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in euros (€) for EU customers. VAT is charged where applicable. Payment is processed by certified gateways. We may cancel orders for declined payment, errors or unavailability.' },
    { h: 'Right of Withdrawal', b: 'You have a statutory right to withdraw from a distance purchase within 14 days of receiving the goods, without giving a reason, under the Consumer Rights Directive 2011/83/EU. See our Refund Policy.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Limitation of Liability', b: 'Nothing in these terms limits your mandatory consumer rights under EU or national law. To the extent permitted, our liability is limited to the amount you paid for the affected product.' },
    { h: 'Governing Law & Contact', b: 'These terms are governed by applicable EU law and the consumer law of your country of residence. For questions, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Your Right of Withdrawal', b: 'Under the Consumer Rights Directive 2011/83/EU you may withdraw from a distance purchase within 14 days of receiving the goods, without giving any reason and without penalty.' },
    { h: 'The 14-Day Period', b: 'The right runs for 14 calendar days from the day you (or your carrier agent) receive(s) the goods.' },
    { h: 'How to Withdraw', b: 'Email ' + CONTACT + ' with your order number, or use our online returns form, before the period ends. We provide a model withdrawal form on request.' },
    { h: 'Returning the Goods', b: 'Send the goods back within 14 days of notifying us. You may be asked to bear return costs unless we offered free returns or the item was faulty/not as described.' },
    { h: 'Refund Within 14 Days', b: 'We refund the price plus standard delivery within 14 days of being informed of your withdrawal (or of receiving the goods or proof of return). We may reduce the refund for diminished value caused by handling beyond what is necessary to inspect the goods.' },
    { h: 'Faulty Goods', b: 'If goods are faulty or not as described, your EU/national consumer rights entitle you to repair, replacement or a refund under the goods guarantee (typically 2 years).' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship throughout the EU/EEA and worldwide. Delivery times and options for your address are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard EU delivery typically takes 3-7 business days. Express (2-4 business days) and Priority (1-2 business days) options appear where offered.' },
    { h: 'Shipping Costs', b: 'Standard shipping is free on qualifying orders; otherwise costs are shown before payment. Import duties are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation and you receive a tracking number by email.' },
    { h: 'Late or Non-Delivery', b: 'If your order does not arrive within the estimated window, contact us and we will investigate with the carrier and resolve it, including a refund or reshipment where required.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// Germany
// ---------------------------------------------------------------------------
const germany = {
  name: 'Germany',
  lawNote: 'Relevant law: the GDPR & Bundesdatenschutzgesetz (BDSG), and the German Civil Code (BGB) implementing the 14-day right of withdrawal (Widerrufsrecht).',
  privacy: [
    { h: 'Verantwortlicher / Controller', b: `${sharedIntro()} ist der Verantwortliche für die Verarbeitung personenbezogener Daten im Weverse Online Shop in Deutschland. Wir verarbeiten Ihre Daten gemäss der DSGVO und dem Bundesdatenschutzgesetz (BDSG).` },
    { h: 'Welche Daten wir erheben', b: 'Wir erheben Daten, die Sie angeben (Name, E-Mail, Telefon, Adresse, Zahlungsdaten), Bestell- und Nutzungsdaten sowie automatisch erhobene Geräte- und Nutzungsdaten (einschliesslich Cookies, soweit Sie eingewilligt haben).' },
    { h: 'Rechtsgrundlagen (DSGVO)', b: 'Wir stützen uns auf: (a) Vertragserfüllung \u2014 Bereitstellung des Dienstes und Abwicklung von Bestellungen; (b) berechtigte Interessen \u2014 Verbesserung des Dienstes, Betrugsprävention und Sicherheit; (c) Ihre Einwilligung \u2014 für Marketing und nicht notwendige Cookies, jederzeit widerrufbar; (d) gesetzliche Pflichten.' },
    { h: 'Ihre Rechte', b: 'Nach der DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch (einschliesslich Direktwerbung). Sie können eine Beschwerde bei der zuständigen Datenschutzaufsichtsbehörde einreichen. E-Mail: ' + CONTACT + '.' },
    { h: 'Cookies', b: 'Wir verwenden notwendige Cookies und \u2014 mit Ihrer Einwilligung \u2014 Analyse- und Werbe-Cookies. Sie verwalten Ihre Einwilligung über unser Cookie-Banner oder die Browsereinstellungen.' },
    { h: 'Sicherheit & Speicherung', b: 'Wir wenden Verschlüsselung, Zugriffskontrollen und Datenminimierung an. Kontodaten bleiben während der Aktivität des Kontos gespeichert; Bestellunterlagen bis zu 7 Jahre aus rechtlichen/steuerlichen Gründen.' },
    { h: 'Kontakt', b: 'Für Datenschutzfragen: ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Einführung', b: 'Diese Nutzungsbedingungen regeln Ihre Nutzung des Weverse Online Shop in Deutschland. Sie gelten neben Ihren gesetzlichen Verbraucherrechten.' },
    { h: 'Konto & Bestellungen', b: 'Sie sind für die Richtigkeit und Sicherheit Ihrer Kontodaten verantwortlich. Mit einer Bestellung bestätigen Sie die Angaben und autorisieren die Zahlung zum im Checkout angezeigten Preis.' },
    { h: 'Preise & Zahlung', b: 'Preise werden in Euro angezeigt; die gesetzliche MwSt. wird gegebenenfalls erhoben. Die Zahlung erfolgt über zertifizierte Zahlungsdienstleister. Wir können Bestellungen bei Zahlungsverweigerung, Fehlern oder Nichtverfügbarkeit stornieren.' },
    { h: 'Widerrufsrecht', b: 'Als Verbraucher haben Sie gemäss § 355 BGB ein 14-tägiges Widerrufsrecht bei Fernabsatzverträgen. Siehe unsere Widerrufs- und Rückgabepolitik.' },
    { h: 'Geistiges Eigentum', b: 'Name, Logo, Texte und Grafiken von Weverse gehören uns bzw. sind lizenziert und dürfen nicht ohne Erlaubnis verwendet werden.' },
    { h: 'Haftung & Kontakt', b: 'Nichts in diesen Bedingungen schränkt Ihre gesetzlichen Verbraucherrechte ein. Bei Fragen: ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Ihr Widerrufsrecht', b: 'Als Verbraucher haben Sie gemäss § 355 BGB das Recht, einen Fernabsatzvertrag innerhalb von 14 Tagen ohne Angabe von Gründen zu widerrufen.' },
    { h: 'Die Widerspruchsfrist', b: 'Die Frist beträgt 14 Tage ab dem Tag, an dem Sie (oder eine von Ihnen benannte Person) die Waren erhalten.' },
    { h: 'Wie Sie widerrufen', b: 'Senden Sie eine eindeutige Erklärung (z.B. E-Mail an ' + CONTACT + ' mit Ihrer Bestellnummer) vor Ablauf der Frist. Wir stellen auf Anfrage ein Muster-Widerrufsformular bereit.' },
    { h: 'Rücksendung', b: 'Senden Sie die Waren innerhalb von 14 Tagen ab der Widerrufserklärung zurück. Rücknahmekosten tragen Sie, sofern wir keine kostenlose Rücksendung anbieten oder die Ware fehlerhaft/nicht wie beschrieben ist.' },
    { h: 'Rückerstattung', b: 'Wir erstatten den Kaufpreis einschliesslich Standardversand innerhalb von 14 Tagen ab Zugang der Widerrufserklärung bzw. Zugang der Ware. Wir können den Betrag bei übermässiger Nutzung mindern.' },
    { h: 'Fehlerhafte Ware', b: 'Bei mangelhafter Ware haben Sie gesetzliche Gewährleistungsrechte (Reparatur, Ersatz, Minderung, Rücktritt).' },
  ],
  shipping: [
    { h: 'Lieferziele', b: 'Wir liefern nach Deutschland, in die EU und weltweit. Lieferzeiten und Optionen für Ihre Adresse finden Sie im Checkout.' },
    { h: 'Lieferzeiten', b: 'Standardlieferung nach Deutschland in der Regel 3-5 Werktage; Express (1-3 Werktage) und Priorität (nach Verfügbarkeit 1 Werktag) im Checkout.' },
    { h: 'Versandkosten', b: 'Standardversand bei berechtigten Bestellungen kostenlos; sonst werden Kosten vor der Zahlung angezeigt. Einfuhrzölle trägt der Käufer, soweit anwendbar.' },
    { h: 'Bearbeitung & Sendungsverfolgung', b: 'Bestellungen werden innerhalb von 1-2 Werktagen nach Zahlungsbestätigung bearbeitet; Sie erhalten eine Sendungsnummer.' },
    { h: 'Verspätete Lieferung', b: 'Wenn Ihre Bestellung nicht innerhalb des geschätzten Zeitraums ankommt, kontaktieren Sie uns; wir klären dies mit dem Zusteller und lösen es (Erstattung oder erneuter Versand).' },
    { h: 'Kontakt', b: 'Versandfragen: ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// France
// ---------------------------------------------------------------------------
const france = {
  name: 'France',
  lawNote: 'Relevant law: the GDPR & loi Informatique et Libertés, and the French Consumer Code (Code de la consommation) implementing the 14-day right of withdrawal (délai de rétractation).',
  privacy: [
    { h: 'Responsable de traitement', b: `${sharedIntro()} est responsable du traitement des données personnelles sur le Service Weverse en France, conformément au RGPD et à la loi Informatique et Libertés.` },
    { h: 'Données collectées', b: 'Nous collectons les données que vous fournissez (nom, e-mail, téléphone, adresse, paiement), les données de commande et de navigation, ainsi que des données d\'appareil et d\'utilisation (y compris des cookies soumis à votre consentement).' },
    { h: 'Bases légales (RGPD)', b: 'Nous nous appuyons sur : (a) l\'exécution du contrat \u2014 fourniture du service et traitement des commandes ; (b) nos intérêts légitimes \u2014 amélioration, prévention de la fraude et sécurité ; (c) votre consentement \u2014 marketing et cookies non essentiels, révocable à tout moment ; (d) des obligations légales.' },
    { h: 'Vos droits', b: 'Le RGPD vous confère les droits d\'accès, de rectification, d\'effacement, de limitation, de portabilité et d\'opposition (y compris à la prospection). Vous pouvez déposer une réclamation auprès de la CNIL. E-mail : ' + CONTACT + '.' },
    { h: 'Cookies', b: 'Nous utilisons des cookies nécessaires et, avec votre consentement, des cookies d\'analyse et de publicité. Gérez vos préférences via notre bannière de consentement.' },
    { h: 'Sécurité & conservation', b: 'Nous appliquons chiffrement, contrôles d\'accès et minimisation. Les données de compte restent conservées pendant l\'activité ; les dossiers de commande jusqu\'à 7 ans.' },
    { h: 'Contact', b: 'Questions données personnelles : ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'Les présentes Conditions d\'utilisation régissent l\'utilisation du Service Weverse en France et s\'appliquent aux côtés de vos droits légaux de consommateur.' },
    { h: 'Compte & commandes', b: 'Vous êtes responsable de l\'exactitude et de la sécurité des données de votre compte. En passant commande, vous confirmez les informations et autorisez le paiement au prix affiché au moment du paiement.' },
    { h: 'Prix & paiement', b: 'Les prix sont affichés en euros ; la TVA est appliquée le cas échéant. Le paiement est traité par des prestataires certifiés. Nous pouvons annuler une commande en cas de paiement refusé, d\'erreur ou d\'indisponibilité.' },
    { h: 'Droit de rétractation', b: 'Conformément au Code de la consommation, vous disposez d\'un droit de rétractation de 14 jours pour les achats à distance. Voir notre Politique de remboursement.' },
    { h: 'Propriété intellectuelle', b: 'Le nom, le logo, les textes et les graphiques Weverse nous appartiennent ou sont sous licence et ne peuvent être utilisés sans autorisation.' },
    { h: 'Responsabilité & contact', b: 'Ces conditions ne limitent pas vos droits impératifs de consommateur. Contact : ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Votre droit de rétractation', b: 'En vertu du Code de la consommation, vous disposez d\'un délai de rétractation de 14 jours pour les achats à distance, sans avoir à vous justifier.' },
    { h: 'Le délai de 14 jours', b: 'Le délai court à compter du jour où vous (ou un tiers désigné) prenez physiquement possession des biens.' },
    { h: 'Comment vous rétracter', b: 'Envoyez-nous une déclaration claire de rétractation (par e-mail à ' + CONTACT + ' avec votre numéro de commande) avant l\'expiration du délai.' },
    { h: 'Renvoi des biens', b: 'Renvoyez les biens dans les 14 jours suivant votre rétractation. Vous pouvez supporter les frais de retour sauf offre de retour gratuit ou produit défectueux.' },
    { h: 'Remboursement', b: 'Nous remboursons le prix payé, y compris les frais de livraison standard, dans les 14 jours suivant votre rétractation (ou réception des biens).' },
    { h: 'Produits défectueux', b: 'Pour tout produit défectueux ou non conforme, vos droits légaux vous permettent la réparation, le remplacement ou le remboursement.' },
  ],
  shipping: [
    { h: 'Destinations de livraison', b: 'Nous livrons en France, dans l\'UE et dans le monde. Les délais et options pour votre adresse sont indiqués au moment du paiement.' },
    { h: 'Délais de livraison', b: 'Livraison standard en France : généralement 3-5 jours ouvrés. Express (1-3 jours) et prioritaire (selon disponibilité) au checkout.' },
    { h: 'Frais de livraison', b: 'Livraison standard gratuite sur les commandes éligibles ; sinon frais affichés avant paiement. Les droits d\'importation sont à la charge de l\'acheteur.' },
    { h: 'Traitement & suivi', b: 'Commandes traitées sous 1-2 jours ouvrés après confirmation ; numéro de suivi envoyé par e-mail.' },
    { h: 'Livraison tardive', b: 'En cas de retard, contactez-nous ; nous interviendrons auprès du transporteur (remboursement ou réexpédition le cas échéant).' },
    { h: 'Contact', b: 'Questions livraison : ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// Japan
// ---------------------------------------------------------------------------
const japan = {
  name: 'Japan',
  lawNote: 'Relevant law: the Act on the Protection of Personal Information (APPI) and the Act on Specified Commercial Transactions (for certain distance-sale cancellations). Our voluntary returns policy applies to most purchases.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in Japan. We handle personal information in accordance with the Act on the Protection of Personal Information (APPI) and take appropriate measures to protect it.` },
    { h: 'Information We Collect', b: 'We collect the personal information you provide (name, e-mail, phone number, address, payment information) and information automatically collected such as device data, IP address and usage history, as needed to provide the Service.' },
    { h: 'Notice of Purpose of Use', b: 'We use personal information to the extent needed to: process orders and deliver products, provide customer support, provide and improve the Service, prevent fraud, and (with your consent) send marketing. We provide notice of the purpose of use at the point of collection.' },
    { h: 'Third-Party Provision', b: 'We do not provide personal information to third parties for marketing, and we do not sell personal information. We may share data with subcontractors (payment, shipping, support) to the extent necessary, and share as required by law.' },
    { h: 'Your Rights (APPI)', b: 'Under APPI you may request disclosure, correction, addition, deletion, or suspension of use of your personal information. To make a request, email ' + CONTACT + '. We handle requests without undue delay.' },
    { h: 'Data Security & Retention', b: 'We take reasonable technical and organisational measures to protect personal information. We retain data only as long as necessary to fulfil the purposes described, then delete or anonymise it.' },
    { h: 'Contact', b: 'For privacy inquiries in Japan, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in Japan. By using the Service you agree to these terms.' },
    { h: 'Your Account & Orders', b: 'You are responsible for keeping your account details accurate and secure. When you place an order you authorise payment and agree to the price and conditions shown at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in Japanese yen (¥). Consumption tax is applied where applicable. Payment is processed securely by certified gateways. We may cancel orders in case of declined payment or unavailability.' },
    { h: 'Cancellation & Returns', b: 'Certain transactions may be subject to cooling-off rules under the Act on Specified Commercial Transactions. For general online purchases of goods, our voluntary Returns Policy applies.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Contact', b: 'For questions about these Terms, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Returns Policy', b: 'For most online purchases of goods in Japan there is no general statutory right to return a non-defective item; our voluntary returns policy below applies.' },
    { h: '14-Day Voluntary Returns', b: 'You may return most unused items within 14 days of delivery for a refund or exchange, provided the item is in its original condition with tags and packaging. Final-sale and hygiene-sealed or personalised items are excluded.' },
    { h: 'Damaged, Defective or Not As Described', b: 'If an item arrives damaged, defective or not as described, contact us within 7 days with photos. We will arrange a free return, replacement or full refund, including return shipping.' },
    { h: 'Cooling-Off (where applicable)', b: 'For sales covered by the Act on Specified Commercial Transactions, we honour any applicable cancellation rights and will refund promptly in accordance with the Act.' },
    { h: 'How to Request', b: 'Email ' + CONTACT + ' with your order number and reason. We review requests within 48 hours.' },
    { h: 'Refund Timing', b: 'Approved refunds are issued to your original payment method; card and digital-wallet refunds typically post within 5-10 business days.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship to Japan and worldwide. Local delivery times and options are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard Japan delivery typically takes 3-7 business days; express options appear at checkout where offered.' },
    { h: 'Shipping Costs', b: 'Shipping costs are displayed before payment and may be free on qualifying orders. Import duties are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation and you receive a tracking number.' },
    { h: 'Late or Non-Delivery', b: 'If your order does not arrive within the estimated window, contact us and we will investigate and resolve it.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// Canada
// ---------------------------------------------------------------------------
const canada = {
  name: 'Canada',
  lawNote: 'Relevant law: the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable provincial consumer-protection laws. There is no federal cooling-off right for online purchases; our voluntary returns policy applies.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in Canada. We handle personal information in line with PIPEDA and, where applicable, provincial private-sector privacy laws.` },
    { h: 'Information We Collect', b: 'We collect the personal information you provide (name, email, phone, address, payment information), order and browsing information, and automatically collected device and usage data.' },
    { h: 'How We Use & Disclose It', b: 'We use personal information to provide the Service, process and deliver orders, provide support, prevent fraud and improve the Service. We do not sell your personal information. We disclose it only to service providers who help us operate (payment, shipping, support) or as required by law.' },
    { h: 'Your PIPEDA Rights', b: 'Under PIPEDA you may access and request correction of the personal information we hold, and you may withdraw consent to certain uses with reasonable notice. Email ' + CONTACT + ' to make a request.' },
    { h: 'Out-of-Province / Cross-Border', b: 'Some service providers may process data outside Canada. Where this occurs, we rely on contracts and safeguards to keep your information protected.' },
    { h: 'Data Security & Retention', b: 'We apply encryption, access controls and retention limits. Account data is kept while active; order records for as long as legally required.' },
    { h: 'Contact', b: 'For privacy questions in Canada, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in Canada and apply alongside applicable provincial consumer-protection laws.' },
    { h: 'Your Account & Orders', b: 'You are responsible for accurate and secure account details. Placing an order authorises payment and confirms your agreement to the price and terms at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in Canadian dollars (C$) with applicable taxes at checkout. Payment is processed by certified gateways. We may cancel orders for declined payment or unavailability.' },
    { h: 'Returns & Refunds', b: 'Our voluntary Refund Policy applies, subject to provincial consumer-protection laws that cannot be excluded.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Contact', b: 'For questions about these Terms, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Voluntary Returns Policy', b: 'Because Canadian law does not create a general federal right to return a non-defective online purchase, our voluntary returns policy below applies, subject to provincial laws that may grant you stronger rights.' },
    { h: '14-Day Voluntary Returns', b: 'You may return most unused items within 14 days of delivery for a refund or exchange, provided the item is in original condition with tags and packaging. Final-sale and hygiene-sealed or personalised items are excluded.' },
    { h: 'Damaged, Defective or Not As Described', b: 'If an item arrives damaged, defective or not as described, contact us within 7 days with photos. We arrange a free return, replacement or full refund.' },
    { h: 'How to Request', b: 'Email ' + CONTACT + ' with your order number and reason. We review requests within 48 hours.' },
    { h: 'Refund Timing', b: 'Approved refunds are issued to your original payment method within 5-10 business days for cards and digital wallets.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship to Canada and worldwide. Delivery times and options are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard Canada delivery typically takes 3-7 business days; express options appear at checkout where offered.' },
    { h: 'Shipping Costs & Duties', b: 'Shipping costs are shown before payment and may be free on qualifying orders. Duties and taxes are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation and you receive a tracking number.' },
    { h: 'Late or Non-Delivery', b: 'If an order does not arrive within the estimated window, contact us and we will investigate and resolve it.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// Australia
// ---------------------------------------------------------------------------
const australia = {
  name: 'Australia',
  lawNote: 'Relevant law: the Privacy Act 1988 (Australian Privacy Principles) and the Australian Consumer Law, which give you non-excludable consumer guarantees incl. the right to a refund, repair or replacement for faulty goods.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in Australia and handles personal information in line with the Privacy Act 1988 and the Australian Privacy Principles (APPs).` },
    { h: 'Information We Collect', b: 'We collect personal information you provide (name, email, phone, address, payment information) and information collected automatically (device, IP, usage). We only collect information reasonably necessary for our functions and activities.' },
    { h: 'Why We Collect It', b: 'We collect, use and disclose personal information to process and deliver orders, provide customer support, prevent fraud, and improve the Service. We do not sell your personal information.' },
    { h: 'Overseas Disclosure', b: 'Our payment, shipping and support providers may process data outside Australia. These providers are located in countries including Singapore and others where our processors operate, and we take reasonable steps to ensure your information is treated securely.' },
    { h: 'Access & Correction (APP 12 & 13)', b: 'You may request access to, or correction of, the personal information we hold. Email ' + CONTACT + ' and we will respond within a reasonable time.' },
    { h: 'Privacy Complaints', b: 'If you believe we have breached the Australian Privacy Principles, please contact us first and we will resolve the matter. You may also complain to the Office of the Australian Information Commissioner (OAIC).' },
    { h: 'Data Security & Retention', b: 'We protect personal information with encryption and access controls, and retain it only for as long as necessary, then delete or de-identify it.' },
    { h: 'Contact', b: 'For privacy questions in Australia, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in Australia. Nothing in these terms removes or limits your rights under the Australian Consumer Law, including your non-excludable consumer guarantees.' },
    { h: 'Your Account & Orders', b: 'You are responsible for accurate and secure account details. Placing an order authorises payment and confirms your agreement to the price and terms at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in Australian dollars (A$) with GST where applicable. Payment is processed by certified gateways. We may cancel orders for declined payment or unavailability.' },
    { h: 'Consumer Guarantees', b: 'Our goods come with guarantees that cannot be excluded under the Australian Consumer Law. You are entitled to a replacement or refund for a major failure and to compensation for any other reasonably foreseeable loss or damage.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Contact', b: 'For questions about these Terms, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Your Consumer Guarantees', b: 'Under the Australian Consumer Law, our goods come with automatic guarantees that cannot be excluded. If a product has a major problem, you can choose a full refund or a replacement; for minor problems we must offer a free repair or fix where reasonable.' },
    { h: 'Voluntary 14-Day Returns', b: 'In addition to your legal rights, we offer a voluntary 14-day returns policy for most unused items in original condition. Final-sale and hygiene-sealed or personalised items are excluded.' },
    { h: 'Faulty or Not As Described', b: 'If a product is faulty, or does not match the description, we will honour your consumer guarantees \u2014 including a full refund and we cover reasonable return costs.' },
    { h: 'Refunds Must Not Be Refused', b: 'We do not rely on store policies to refuse the refunds, repairs or replacements you are entitled to under the Australian Consumer Law, and we do not deduct from refunds for normal use of a faulty product.' },
    { h: 'How to Request', b: 'Email ' + CONTACT + ' with your order number and a description of the issue. We respond within 48 hours.' },
    { h: 'Refund Timing', b: 'Approved refunds are issued to your original payment method within 5-10 business days for cards and digital wallets.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship to Australia and worldwide. Delivery times and options are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard Australia delivery typically takes 4-10 business days; express options appear at checkout where offered.' },
    { h: 'Shipping Costs & Duties', b: 'Shipping costs are shown before payment and may be free on qualifying orders. Duties and taxes are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation and you receive a tracking number.' },
    { h: 'Late or Non-Delivery', b: 'If an order does not arrive within the estimated window, contact us and we will investigate and resolve it, consistent with our obligations.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

// ---------------------------------------------------------------------------
// Switzerland
// ---------------------------------------------------------------------------
const switzerland = {
  name: 'Switzerland',
  lawNote: 'Relevant law: the revised Federal Act on Data Protection (revFADP / nFADP) and the Swiss Code of Obligations, which provide a 14-day right of withdrawal for distance purchases.',
  privacy: [
    { h: 'Who We Are', b: `${sharedIntro()} operates the Service for users in Switzerland and processes personal data in accordance with the revised Federal Act on Data Protection (FADP) and, where applicable, the GDPR.` },
    { h: 'Information We Collect', b: 'We collect personal data you provide (name, email, phone, address, payment information) and automatically collected device and usage data (including via cookies with your consent).' },
    { h: 'How We Use It', b: 'We use personal data to provide the Service, process and deliver orders, provide support, prevent fraud and improve the Service. We do not sell personal data and process only to the extent necessary.' },
    { h: 'Legal Bases', b: 'We process data to perform a contract, for our legitimate interests (improvement, security and fraud prevention), based on your consent (withdrawable at any time), and to comply with legal obligations.' },
    { h: 'Your Rights (FADP)', b: 'You have the right to information, rectification, erasure and to object to processing. You may also lodge a complaint with the Federal Data Protection and Information Commissioner (FDPIC). Email ' + CONTACT + ' to exercise your rights.' },
    { h: 'Data Security & Retention', b: 'We apply encryption, access controls and data minimisation. Account data is kept while active; order records for as long as legally required.' },
    { h: 'Contact', b: 'For privacy questions in Switzerland, contact ' + CONTACT + '.' },
  ],
  terms: [
    { h: 'Introduction', b: 'These Terms of Use govern your use of the Weverse Online Shop Service in Switzerland and apply alongside your statutory rights under the Code of Obligations.' },
    { h: 'Your Account & Orders', b: 'You are responsible for accurate and secure account details. Placing an order authorises payment and confirms the price and terms at checkout.' },
    { h: 'Pricing & Payment', b: 'Prices are shown in Swiss francs (CHF) with VAT where applicable. Payment is processed by certified gateways. We may cancel orders for declined payment or unavailability.' },
    { h: 'Right of Withdrawal', b: 'As a distance seller we honour the statutory 14-day right of withdrawal for consumers under the Swiss Code of Obligations. See our Refund Policy.' },
    { h: 'Intellectual Property', b: 'The Weverse name, logo, text and graphics are owned by or licensed to us and may not be used without permission.' },
    { h: 'Contact', b: 'For questions about these Terms, contact ' + CONTACT + '.' },
  ],
  refund: [
    { h: 'Your Right of Withdrawal', b: 'As a consumer purchasing at a distance, you have a statutory right to withdraw within 14 days of receiving the goods, without giving a reason, under the Swiss Code of Obligations.' },
    { h: 'The 14-Day Period', b: 'The period runs for 14 calendar days from the day you (or a person you designate) receive(s) the goods.' },
    { h: 'How to Withdraw', b: 'Email ' + CONTACT + ' with your order number before the period ends. We also accept our online returns form.' },
    { h: 'Returning the Goods', b: 'Return the goods within 14 days of notifying us. You may bear return costs unless we offered free returns or the item was faulty/not as described.' },
    { h: 'Refund Timing', b: 'We refund the amount paid, including standard delivery, within 14 days of being informed of your withdrawal (or of receiving the goods).' },
    { h: 'Faulty Goods', b: 'For faulty or non-conforming goods, your statutory rights under the Code of Obligations provide for repair, replacement or refund.' },
  ],
  shipping: [
    { h: 'Delivery Destinations', b: 'We ship to Switzerland and worldwide. Delivery times and options are shown at checkout.' },
    { h: 'Shipping Methods & Times', b: 'Standard Swiss delivery typically takes 3-7 business days; express options appear at checkout where offered.' },
    { h: 'Shipping Costs & Duties', b: 'Shipping costs are shown before payment and may be free on qualifying orders. Import duties are the buyer\'s responsibility where applicable.' },
    { h: 'Order Processing & Tracking', b: 'Orders are processed within 1-2 business days after payment confirmation and you receive a tracking number.' },
    { h: 'Late or Non-Delivery', b: 'If an order does not arrive within the estimated window, contact us and we will investigate and resolve it.' },
    { h: 'Contact', b: 'For shipping questions, email ' + CONTACT + '.' },
  ],
};

export const POLICY_DATA = {
  usa: usa, uk: uk, eu: eu, germany: germany, france: france,
  japan: japan, canada: canada, australia: australia, switzerland: switzerland,
};

// Helper re-exported for the page renderer / other modules.
export { CONTACT, COMPANY, S };
