const STATUS_POINTS = {
  green: 8.33,
  amber: 4.16,
  red: 1.5,   // below benchmark but not zero — a 10% EBITDA is still a real business
  waiting: 0,
};

const fields = [
  "annualRevenue",
  "employees",
  "technicians",
  "grossMargin",
  "ebitdaMargin",
  "recurringRevenue",
  "mrr",
  "supportedUsers",
  "activeClients",
  "endpoints",
  "tickets",
  "logoChurn",
  "servicesPerClient",
  "securityAttach",
];

const categories = [
  {
    id: "profitability",
    name: "Profitability",
    metricIds: ["ebitda", "grossMargin"],
    copy: "Shows whether revenue is translating into sustainable operating profit.",
  },
  {
    id: "revenueQuality",
    name: "Revenue Quality",
    metricIds: ["recurringRevenue", "avgMrrClient"],
    copy: "Measures the predictability and depth of recurring client relationships.",
  },
  {
    id: "commercialEfficiency",
    name: "Pricing & Commercial Efficiency",
    metricIds: ["aisp", "revenueEmployee"],
    copy: "Highlights whether pricing and productivity support scalable growth.",
  },
  {
    id: "operationalEfficiency",
    name: "Operational Efficiency",
    metricIds: ["revenueTechnician", "endpointsTechnician", "ticketsEndpoint"],
    copy: "Looks at how efficiently the service engine supports clients.",
  },
  {
    id: "retentionExpansion",
    name: "Retention & Expansion",
    metricIds: ["logoChurn", "servicesClient"],
    copy: "Shows relationship quality, client fit and expansion maturity.",
  },
  {
    id: "securityMaturity",
    name: "Security Maturity",
    metricIds: ["securityAttach"],
    copy: "Indicates how consistently clients adopt core protective services.",
  },
];

const definitions = {
  ebitda: {
    name: "EBITDA / Net Profit Margin",
    unit: "%",
    formula: "Adjusted EBITDA or net profit divided by annual revenue, multiplied by 100.",
    why:
      "EBITDA or net profit margin is one of the clearest indicators of business quality. It shows whether the MSP is turning revenue into sustainable profit after accounting for delivery costs, tools, overheads, and operating discipline.",
    improve:
      "Review pricing, service gross margin, tool costs, labour utilisation, low-margin customers, and underpriced fixed-fee agreements.",
    recommendation:
      "Review fixed-fee agreements, labour utilisation, gross margin by service line, tool costs, and low-margin customers.",
    strength:
      "An EBITDA margin at this level reflects genuine pricing discipline and delivery control — one of the clearest indicators of a well-run, sustainable MSP.",
  },
  grossMargin: {
    name: "Gross Margin",
    unit: "%",
    formula: "(Revenue minus cost of goods sold) divided by revenue, multiplied by 100. Include service labour and tool costs in COGS where possible.",
    benchmark: "Strong: 42%+ | Developing: 35% to 41.9% | Needs attention: under 35%",
    bands: [
      { status: "green", label: "Top-performing range", range: "42%+" },
      { status: "amber", label: "Middle range", range: "35% to 41.9%" },
      { status: "red", label: "Needs review", range: "Under 35%" },
    ],
    why:
      "Gross margin shows whether services are priced and delivered profitably. It is often a leading indicator of EBITDA performance.",
    improve:
      "Review labour allocation, service packaging, support workload, vendor/tool costs, and contract profitability. Ensure service labour is included in COGS.",
    recommendation:
      "Review delivery labour in COGS, service package margin, support workload and vendor or tool costs.",
    strength:
      "Gross margin at this level provides a strong foundation for sustainable EBITDA and real capacity to invest in growth without margin pressure.",
  },
  recurringRevenue: {
    name: "Recurring Revenue %",
    unit: "%",
    formula: "Annual recurring revenue divided by total annual revenue, multiplied by 100.",
    benchmark: "Strong: 75%+ | Developing: 50% to 74.9% | Needs attention: under 50%",
    bands: [
      { status: "green", label: "Top-performing range", range: "75%+" },
      { status: "amber", label: "Middle range", range: "50% to 74.9%" },
      { status: "red", label: "Needs review", range: "Under 50%" },
    ],
    why:
      "Recurring revenue improves predictability, resilience, valuation quality, and planning confidence.",
    improve:
      "Increase managed service coverage, reduce reliance on one-off projects, standardise recurring packages, and expand recurring security, backup, and compliance services.",
    recommendation:
      "Increase managed service coverage and reduce reliance on one-off project revenue where possible.",
    strength:
      "A recurring revenue base at this level delivers strong planning confidence, resilience through downturns, and better business valuation multiples.",
  },
  revenueEmployee: {
    name: "Revenue per Employee",
    unit: "currency",
    formula: "Annual revenue divided by total employees.",
    benchmark: "Strong: GBP150k+ | Developing: GBP100k to GBP149k | Needs attention: under GBP100k",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP150k+" },
      { status: "amber", label: "Middle range", range: "GBP100k to GBP149k" },
      { status: "red", label: "Needs review", range: "Under GBP100k" },
    ],
    why:
      "Revenue per employee shows overall productivity and scalability. It helps indicate whether the business is growing efficiently or adding headcount faster than revenue.",
    improve:
      "Improve automation, standardise service delivery, review low-value manual work, increase pricing, and improve account expansion.",
    recommendation:
      "Review pricing, manual workload, automation coverage and account expansion to improve revenue productivity.",
    strength:
      "Revenue per employee at this level indicates an efficient, productive team — the business is scaling without adding disproportionate headcount.",
  },
  revenueTechnician: {
    name: "Revenue per Technician",
    unit: "currency",
    formula: "Annual revenue divided by technical service delivery employees.",
    benchmark: "Strong: GBP175k+ | Developing: GBP125k to GBP174k | Needs attention: under GBP125k",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP175k+" },
      { status: "amber", label: "Middle range", range: "GBP125k to GBP174k" },
      { status: "red", label: "Needs review", range: "Under GBP125k" },
    ],
    why:
      "Revenue per technician helps show whether the service team is supporting enough revenue relative to delivery cost.",
    improve:
      "Improve RMM automation, documentation, ticket deflection, self-service, standardisation, and client environment consistency.",
    recommendation:
      "Improve automation, documentation, self-service and client environment consistency across the base.",
    strength:
      "Revenue per technician at this level shows strong service team leverage — each technical role is supporting a healthy share of revenue without over-reliance on headcount.",
  },
  endpointsTechnician: {
    name: "Endpoints per Technician",
    unit: "number",
    formula: "Managed endpoints divided by technical service delivery employees.",
    benchmark: "Strong: 200+ | Developing: 100 to 199 | Needs attention: under 100",
    bands: [
      { status: "green", label: "Top-performing range", range: "200+" },
      { status: "amber", label: "Middle range", range: "100 to 199" },
      { status: "red", label: "Needs review", range: "Under 100" },
    ],
    why:
      "Endpoints per technician is a practical measure of operational efficiency and automation maturity.",
    improve:
      "Standardise client environments, reduce preventable tickets, improve monitoring, automate common fixes, improve documentation, and reduce tool fragmentation.",
    recommendation:
      "Analyse repeat tickets, automate common fixes, standardise environments and improve technical documentation.",
    strength:
      "Managing this many endpoints per technician reflects strong automation maturity and the kind of standardised client environments that keep reactive workload in check.",
  },
  aisp: {
    name: "AISP / PUPM",
    unit: "currency",
    formula: "Monthly recurring revenue divided by supported users or seats.",
    benchmark:
      "Strong: GBP95+ | Developing: GBP65 to GBP94 | Needs attention: under GBP65. GBP40-65 often indicates basic support-led service; GBP95-150 suggests enhanced managed service.",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP95+" },
      { status: "amber", label: "Middle range", range: "GBP65 to GBP94" },
      { status: "red", label: "Needs review", range: "Under GBP65" },
    ],
    why:
      "AISP/PUPM is one of the clearest pricing and packaging indicators. Low PUPM can suggest underpricing, thin service coverage, or limited security and compliance attachment.",
    improve:
      "Review package structure, minimum service standards, security attachment, backup coverage, compliance services, and whether fixed-fee agreements reflect actual delivery effort.",
    recommendation:
      "Review package structure, minimum service standards, security baseline and whether monthly fees reflect delivery effort.",
    strength:
      "An AISP at this level reflects well-packaged services and pricing that captures genuine value — reducing margin pressure and supporting profitable, scalable growth.",
  },
  avgMrrClient: {
    name: "Average MRR per Client",
    unit: "currency",
    formula: "Monthly recurring revenue divided by active clients.",
    why:
      "Average MRR per client indicates client quality, account depth, and whether the MSP is serving enough profitable accounts.",
    improve:
      "Set minimum account thresholds, expand wallet share, improve packaging, target better-fit clients, and review low-value high-noise accounts.",
    recommendation:
      "Review low-value high-noise accounts, minimum account thresholds, wallet share and better-fit client targeting.",
    strength:
      "Average MRR per client at this level indicates well-sized accounts generating meaningful recurring value — the kind of client base worth investing in and retaining.",
  },
  logoChurn: {
    name: "Annual Logo Churn",
    unit: "%",
    formula: "Clients lost over the last 12 months divided by clients at the start of the period, multiplied by 100.",
    benchmark: "Strong: under 5% | Developing: 5% to 12% | Needs attention: over 12%",
    bands: [
      { status: "green", label: "Top-performing range", range: "Under 5%" },
      { status: "amber", label: "Middle range", range: "5% to 12%" },
      { status: "red", label: "Needs review", range: "Over 12%" },
    ],
    why:
      "Client churn weakens revenue quality, increases replacement pressure, and may indicate service, value communication, or fit issues.",
    improve:
      "Introduce structured QBRs, track customer health, improve onboarding, communicate value more clearly, and identify at-risk clients early.",
    recommendation:
      "Introduce customer health tracking, structured QBRs and early intervention for at-risk clients.",
    strength:
      "A churn rate at this level is a strong signal of consistent service delivery and a client base that genuinely values the relationship — a key indicator of long-term business quality.",
  },
  ticketsEndpoint: {
    name: "Tickets per Endpoint per Month",
    unit: "decimal",
    formula: "Monthly ticket volume divided by managed endpoints.",
    benchmark: "Strong: under 0.5 | Developing: 0.5 to 1.0 | Needs attention: over 1.0",
    bands: [
      { status: "green", label: "Top-performing range", range: "Under 0.5" },
      { status: "amber", label: "Middle range", range: "0.5 to 1.0" },
      { status: "red", label: "Needs review", range: "Over 1.0" },
    ],
    why:
      "Ticket volume per endpoint shows how noisy the client base is. High ticket volume may indicate poor standardisation, weak automation, recurring issues, or under-managed environments.",
    improve:
      "Analyse repeat ticket categories, automate common fixes, improve patching, standardise client stacks, improve user education, and address root causes.",
    recommendation:
      "Analyse repeat ticket categories, address root causes, improve patching and automate common fixes.",
    strength:
      "A ticket rate at this level reflects stable, well-managed client environments — freeing your team from reactive noise and giving them capacity for higher-value work.",
  },
  servicesClient: {
    name: "Services per Client",
    unit: "decimal",
    formula: "Total active recurring services across the client base divided by active clients.",
    benchmark: "Strong: 6+ | Developing: 3 to 5 | Needs attention: under 3",
    bands: [
      { status: "green", label: "Top-performing range", range: "6+" },
      { status: "amber", label: "Middle range", range: "3 to 5" },
      { status: "red", label: "Needs review", range: "Under 3" },
    ],
    why:
      "Services per client shows wallet share, client embeddedness, and expansion maturity. More services usually mean stronger relationships, better retention, and higher revenue per client.",
    improve:
      "Map white space across the client base, identify missing core services, create standard service bundles, and use QBRs to align services to client risk and business goals.",
    recommendation:
      "Map white space across each account and identify clients missing core services such as backup, endpoint security, email security, security awareness or vulnerability testing.",
    strength:
      "Services per client at this level indicates strong wallet share and meaningful account embeddedness — both of which support retention and make client relationships harder to lose.",
  },
  securityAttach: {
    name: "Security Attach Rate",
    unit: "%",
    formula: "Clients using one or more managed security services divided by active clients, multiplied by 100.",
    benchmark: "Strong: 85%+ | Developing: 50% to 84% | Needs attention: under 50%",
    bands: [
      { status: "green", label: "Top-performing range", range: "85%+" },
      { status: "amber", label: "Middle range", range: "50% to 84%" },
      { status: "red", label: "Needs review", range: "Under 50%" },
    ],
    why:
      "Security attach rate shows whether clients are adopting core protective services. Low security attach can represent both business risk and missed recurring revenue opportunity.",
    improve:
      "Define a minimum security baseline, review clients without core protection, package security into standard offerings, and educate clients on current cyber, compliance, and insurance expectations.",
    recommendation:
      "Define a minimum security baseline and review clients without core protection in place.",
    strength:
      "A security attach rate at this level shows that protective services are embedded into your standard client offering — a mark of MSP maturity and a solid recurring revenue foundation.",
  },
};

const FIELD_HINTS = {
  grossMargin: {
    metricId: "grossMargin",
    staticLabel: "UK MSP benchmark: 42%+ strong · 35–42% developing",
  },
  ebitdaMargin: {
    metricId: "ebitda",
    getDynamicLabel: (band) => ebitdaThresholds(band).benchmark,
  },
  recurringRevenue: {
    metricId: "recurringRevenue",
    getDynamicLabel: (band) => recurringRevenueThresholds(band).benchmark,
  },
  logoChurn: {
    metricId: "logoChurn",
    getDynamicLabel: (band) => logoChurnThresholds(band).benchmark,
  },
  servicesPerClient: {
    metricId: "servicesClient",
    getDynamicLabel: (band) => servicesClientThresholds(band).benchmark,
  },
  securityAttach: {
    metricId: "securityAttach",
    getDynamicLabel: (band) => securityAttachThresholds(band).benchmark,
  },
};

const METRIC_FEEDBACK = {
  ebitda: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your EBITDA margin of ${formattedValue} is above the benchmark for ${bandLabel} MSP — a strong sign of pricing discipline and delivery efficiency. Protect this as you scale by keeping gross margin under review and managing headcount relative to revenue.`;
    if (status === "amber") return `Your EBITDA margin of ${formattedValue} is in the developing range for ${bandLabel} MSP. This typically reflects serviceable but improvable gross margin, or overhead that has grown slightly ahead of revenue — both areas with practical headroom.`;
    return `Your EBITDA margin of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. This often reflects a combination of pricing headroom, delivery costs, and overhead structure — areas that can be addressed incrementally and tend to have a meaningful effect on margin.`;
  },
  grossMargin: ({ formattedValue, status }) => {
    if (status === "green") return `Your gross margin of ${formattedValue} is above benchmark — a strong foundation for sustainable EBITDA and operating leverage.`;
    if (status === "amber") return `Your gross margin of ${formattedValue} is in the developing range. This often reflects delivery costs that have edged up, tool costs that could be tightened, or contracts priced before costs increased — all workable.`;
    return `Your gross margin of ${formattedValue} is currently below the benchmark threshold. This is one of the most common pressure points in MSP businesses — it is worth checking that all service labour is captured in COGS, as excluding it can overstate gross margin by 10–20 points.`;
  },
  recurringRevenue: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your recurring revenue of ${formattedValue} is strong for ${bandLabel} MSP — a predictable, high-quality base that supports both planning confidence and business valuation.`;
    if (status === "amber") return `Your recurring revenue mix of ${formattedValue} is in the developing range. Shifting more revenue to recurring contracts improves predictability and typically increases valuation multiples significantly.`;
    return `Your recurring revenue of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. A lower recurring base can increase revenue volatility and typically reduces valuation multiples — building this up is one of the higher-leverage moves available.`;
  },
  revenueEmployee: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your revenue per employee of ${formattedValue} is strong for ${bandLabel} MSP — your team is generating healthy revenue relative to headcount.`;
    if (status === "amber") return `Your revenue per employee of ${formattedValue} is in the developing range. This may reflect headcount growing slightly ahead of revenue, or pricing that has not fully kept pace with rising delivery costs.`;
    return `Your revenue per employee of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. This often reflects headcount growing ahead of revenue, pricing with room to move, or accounts with expansion potential — worth reviewing alongside gross margin.`;
  },
  revenueTechnician: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your revenue per technician of ${formattedValue} is strong for ${bandLabel} MSP. Your service team is supporting a healthy level of revenue relative to its size.`;
    if (status === "amber") return `Your revenue per technician of ${formattedValue} is in the developing range for ${bandLabel} MSP. Improvement here usually comes from reducing reactive workload, improving automation, and tightening documentation.`;
    return `Your revenue per technician of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. This often reflects a high proportion of reactive work, varied client environments, or time spent on tasks that could be automated or streamlined over time.`;
  },
  endpointsTechnician: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your endpoints per technician ratio of ${formattedValue} is strong for ${bandLabel} MSP — indicating good automation maturity and client environment standardisation.`;
    if (status === "amber") return `Your endpoints per technician ratio of ${formattedValue} is in the developing range for ${bandLabel} MSP. Closing the gap typically means reducing preventable tickets and automating common fixes.`;
    return `Your endpoints per technician ratio of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. At this level, a high proportion of time is likely going to reactive work. Analysing repeat ticket categories is usually the fastest way to find what can be automated or prevented.`;
  },
  aisp: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your AISP of ${formattedValue} per user per month is strong for ${bandLabel} MSP — your pricing reflects well-packaged, value-added service delivery.`;
    if (status === "amber") return `Your AISP of ${formattedValue} per user per month is in the developing range for ${bandLabel} MSP. There is likely pricing headroom available, particularly through security, backup, or compliance add-ons.`;
    return `Your AISP of ${formattedValue} per user per month is currently below the benchmark for ${bandLabel} MSP. This level often reflects support-led service with room to deepen the stack — a clear indicator that packaging or pricing has headroom to develop.`;
  },
  avgMrrClient: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your average MRR per client of ${formattedValue} is strong for ${bandLabel} MSP — you are working with well-sized accounts that generate meaningful recurring value.`;
    if (status === "amber") return `Your average MRR per client of ${formattedValue} is in the developing range. This may reflect a mix of account sizes, with some smaller accounts pulling the average down.`;
    return `Your average MRR per client of ${formattedValue} suggests a smaller-account client mix — this may be intentional, but it typically requires strong standardisation and tight service boundaries to remain profitable at scale. Consider whether your pricing, service scope, or minimum client size could be adjusted over time.`;
  },
  logoChurn: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your annual logo churn of ${formattedValue} is low for ${bandLabel} MSP — strong retention is one of the clearest signs of consistent client value delivery.`;
    if (status === "amber") return `Your annual logo churn of ${formattedValue} is in the developing range for ${bandLabel} MSP. This level is common and manageable — structured QBRs and proactive client health tracking tend to have the most direct impact.`;
    return `Your annual logo churn of ${formattedValue} is currently above the benchmark for ${bandLabel} MSP. This is often a signal to look more closely at proactive engagement, client fit, and how value is communicated. Early intervention tends to make a meaningful difference — each retained client removes the pressure to replace that revenue elsewhere.`;
  },
  ticketsEndpoint: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your ticket rate of ${formattedValue} per endpoint per month is low — this reflects well-managed, stable client environments with effective prevention and automation in place.`;
    if (status === "amber") return `Your ticket rate of ${formattedValue} per endpoint per month is in the developing range for ${bandLabel} MSP. Patterns in your ticket data likely point to recurring issues that could be resolved at source rather than fixed reactively.`;
    return `Your ticket rate of ${formattedValue} per endpoint per month is currently above the benchmark for ${bandLabel} MSP. High ticket volume relative to endpoints often points to environment inconsistency, patching gaps, or issues being handled reactively — all areas with practical, addressable root causes.`;
  },
  servicesClient: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your average of ${formattedValue} services per client is strong for ${bandLabel} MSP — good wallet share and client embeddedness, which typically supports stronger retention.`;
    if (status === "amber") return `Your average of ${formattedValue} services per client is in the developing range for ${bandLabel} MSP. There is likely white space across your accounts — services clients need but are currently sourcing elsewhere or not yet using.`;
    return `Your average of ${formattedValue} services per client is currently below the benchmark for ${bandLabel} MSP. This suggests untapped wallet share across the base — each account likely has services they need but are not yet getting from you, which represents a concrete revenue and retention opportunity.`;
  },
  securityAttach: ({ formattedValue, status, bandLabel }) => {
    if (status === "green") return `Your security attach rate of ${formattedValue} is strong for ${bandLabel} MSP — your clients are well covered with managed protective services.`;
    if (status === "amber") return `Your security attach rate of ${formattedValue} is in the developing range for ${bandLabel} MSP. Clients without managed security represent both a protection gap and a recurring revenue opportunity worth addressing.`;
    return `Your security attach rate of ${formattedValue} is currently below the benchmark for ${bandLabel} MSP. A meaningful proportion of your client base does not yet have managed security in place — worth addressing both for client protection and as a recurring revenue opportunity.`;
  },
};

const currencyFormatter = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 1,
});

let userOverrodeSize = false;
let latestState = null;

const form = document.getElementById("benchmarkForm");
const sizeBand = document.getElementById("sizeBand");

function getInput(id) {
  return document.getElementById(id);
}

function readNumber(id) {
  const raw = getInput(id).value;
  if (raw === "") return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

function isFilled(id) {
  return getInput(id).value !== "";
}

function safeDivide(numerator, denominator) {
  if (numerator === null || denominator === null || denominator <= 0) return null;
  return numerator / denominator;
}

function statusLabel(status) {
  if (status === "green") return "Strong";
  if (status === "amber") return "Developing";
  if (status === "red") return "Below benchmark";
  return "Waiting for input";
}

function statusColor(status) {
  if (status === "green") return "#2E7D5B";
  if (status === "amber") return "#C9822B";
  if (status === "red") return "#B85C5C";
  return "#7B8797";
}

function scoreHigher(value, greenMin, amberMin) {
  if (value === null) return "waiting";
  if (value >= greenMin) return "green";
  if (value >= amberMin) return "amber";
  return "red";
}

function scoreLower(value, greenMax, amberMax) {
  if (value === null) return "waiting";
  if (value < greenMax) return "green";
  if (value <= amberMax) return "amber";
  return "red";
}

function ebitdaThresholds(band) {
  if (band === "small") {
    return {
      green: 15,
      amber: 8,
      benchmark: "Small MSP: Strong 15%+ | Developing 8% to 14.9% | Needs attention under 8%",
      bands: [
        { status: "green", label: "Top-performing range", range: "15%+" },
        { status: "amber", label: "Middle range", range: "8% to 14.9%" },
        { status: "red", label: "Needs review", range: "Under 8%" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 20,
      amber: 15,
      benchmark: "Larger MSP: Strong 20%+ | Developing 15% to 19.9% | Needs attention under 15%",
      bands: [
        { status: "green", label: "Top-performing range", range: "20%+" },
        { status: "amber", label: "Middle range", range: "15% to 19.9%" },
        { status: "red", label: "Needs review", range: "Under 15%" },
      ],
    };
  }
  return {
    green: 18,
    amber: 12,
    benchmark: "Mid-sized MSP: Strong 18%+ | Developing 12% to 17.9% | Needs attention under 12%",
    bands: [
      { status: "green", label: "Top-performing range", range: "18%+" },
      { status: "amber", label: "Middle range", range: "12% to 17.9%" },
      { status: "red", label: "Needs review", range: "Under 12%" },
    ],
  };
}

function avgMrrThresholds(band) {
  if (band === "small") {
    return {
      green: 2500,
      amber: 1250,
      benchmark: "Small MSP: Strong GBP2,500+ | Developing GBP1,250 to GBP2,499 | Needs attention under GBP1,250",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP2,500+" },
        { status: "amber", label: "Middle range", range: "GBP1,250 to GBP2,499" },
        { status: "red", label: "Needs review", range: "Under GBP1,250" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 10000,
      amber: 5000,
      benchmark: "Larger MSP: Strong GBP10,000+ | Developing GBP5,000 to GBP9,999 | Needs attention under GBP5,000",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP10,000+" },
        { status: "amber", label: "Middle range", range: "GBP5,000 to GBP9,999" },
        { status: "red", label: "Needs review", range: "Under GBP5,000" },
      ],
    };
  }
  return {
    green: 5000,
    amber: 2500,
    benchmark: "Mid-sized MSP: Strong GBP5,000+ | Developing GBP2,500 to GBP4,999 | Needs attention under GBP2,500",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP5,000+" },
      { status: "amber", label: "Middle range", range: "GBP2,500 to GBP4,999" },
      { status: "red", label: "Needs review", range: "Under GBP2,500" },
    ],
  };
}

function aispThresholds(band) {
  if (band === "small") {
    return {
      green: 75, amber: 50,
      benchmark: "Small MSP: Strong GBP75+ | Developing GBP50 to GBP74 | Needs attention under GBP50",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP75+" },
        { status: "amber", label: "Middle range", range: "GBP50 to GBP74" },
        { status: "red", label: "Needs review", range: "Under GBP50" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 120, amber: 85,
      benchmark: "Larger MSP: Strong GBP120+ | Developing GBP85 to GBP119 | Needs attention under GBP85",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP120+" },
        { status: "amber", label: "Middle range", range: "GBP85 to GBP119" },
        { status: "red", label: "Needs review", range: "Under GBP85" },
      ],
    };
  }
  return {
    green: 95, amber: 65,
    benchmark: "Mid-sized MSP: Strong GBP95+ | Developing GBP65 to GBP94 | Needs attention under GBP65",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP95+" },
      { status: "amber", label: "Middle range", range: "GBP65 to GBP94" },
      { status: "red", label: "Needs review", range: "Under GBP65" },
    ],
  };
}

function recurringRevenueThresholds(band) {
  if (band === "small") {
    return {
      green: 60, amber: 40,
      benchmark: "Small MSP: Strong 60%+ | Developing 40% to 59.9% | Needs attention under 40%",
      bands: [
        { status: "green", label: "Top-performing range", range: "60%+" },
        { status: "amber", label: "Middle range", range: "40% to 59.9%" },
        { status: "red", label: "Needs review", range: "Under 40%" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 80, amber: 70,
      benchmark: "Larger MSP: Strong 80%+ | Developing 70% to 79.9% | Needs attention under 70%",
      bands: [
        { status: "green", label: "Top-performing range", range: "80%+" },
        { status: "amber", label: "Middle range", range: "70% to 79.9%" },
        { status: "red", label: "Needs review", range: "Under 70%" },
      ],
    };
  }
  return {
    green: 75, amber: 60,
    benchmark: "Mid-sized MSP: Strong 75%+ | Developing 60% to 74.9% | Needs attention under 60%",
    bands: [
      { status: "green", label: "Top-performing range", range: "75%+" },
      { status: "amber", label: "Middle range", range: "60% to 74.9%" },
      { status: "red", label: "Needs review", range: "Under 60%" },
    ],
  };
}

function revenueEmployeeThresholds(band) {
  if (band === "small") {
    return {
      green: 100000, amber: 80000,
      benchmark: "Small MSP: Strong GBP100k+ | Developing GBP80k to GBP99k | Needs attention under GBP80k",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP100k+" },
        { status: "amber", label: "Middle range", range: "GBP80k to GBP99k" },
        { status: "red", label: "Needs review", range: "Under GBP80k" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 160000, amber: 125000,
      benchmark: "Larger MSP: Strong GBP160k+ | Developing GBP125k to GBP159k | Needs attention under GBP125k",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP160k+" },
        { status: "amber", label: "Middle range", range: "GBP125k to GBP159k" },
        { status: "red", label: "Needs review", range: "Under GBP125k" },
      ],
    };
  }
  return {
    green: 130000, amber: 100000,
    benchmark: "Mid-sized MSP: Strong GBP130k+ | Developing GBP100k to GBP129k | Needs attention under GBP100k",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP130k+" },
      { status: "amber", label: "Middle range", range: "GBP100k to GBP129k" },
      { status: "red", label: "Needs review", range: "Under GBP100k" },
    ],
  };
}

function revenueTechnicianThresholds(band) {
  if (band === "small") {
    return {
      green: 130000, amber: 100000,
      benchmark: "Small MSP: Strong GBP130k+ | Developing GBP100k to GBP129k | Needs attention under GBP100k",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP130k+" },
        { status: "amber", label: "Middle range", range: "GBP100k to GBP129k" },
        { status: "red", label: "Needs review", range: "Under GBP100k" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 195000, amber: 150000,
      benchmark: "Larger MSP: Strong GBP195k+ | Developing GBP150k to GBP194k | Needs attention under GBP150k",
      bands: [
        { status: "green", label: "Top-performing range", range: "GBP195k+" },
        { status: "amber", label: "Middle range", range: "GBP150k to GBP194k" },
        { status: "red", label: "Needs review", range: "Under GBP150k" },
      ],
    };
  }
  return {
    green: 160000, amber: 125000,
    benchmark: "Mid-sized MSP: Strong GBP160k+ | Developing GBP125k to GBP159k | Needs attention under GBP125k",
    bands: [
      { status: "green", label: "Top-performing range", range: "GBP160k+" },
      { status: "amber", label: "Middle range", range: "GBP125k to GBP159k" },
      { status: "red", label: "Needs review", range: "Under GBP125k" },
    ],
  };
}

function endpointsTechThresholds(band) {
  if (band === "small") {
    return {
      green: 100, amber: 60,
      benchmark: "Small MSP: Strong 100+ | Developing 60 to 99 | Needs attention under 60",
      bands: [
        { status: "green", label: "Top-performing range", range: "100+" },
        { status: "amber", label: "Middle range", range: "60 to 99" },
        { status: "red", label: "Needs review", range: "Under 60" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 250, amber: 175,
      benchmark: "Larger MSP: Strong 250+ | Developing 175 to 249 | Needs attention under 175",
      bands: [
        { status: "green", label: "Top-performing range", range: "250+" },
        { status: "amber", label: "Middle range", range: "175 to 249" },
        { status: "red", label: "Needs review", range: "Under 175" },
      ],
    };
  }
  return {
    green: 175, amber: 100,
    benchmark: "Mid-sized MSP: Strong 175+ | Developing 100 to 174 | Needs attention under 100",
    bands: [
      { status: "green", label: "Top-performing range", range: "175+" },
      { status: "amber", label: "Middle range", range: "100 to 174" },
      { status: "red", label: "Needs review", range: "Under 100" },
    ],
  };
}

function logoChurnThresholds(band) {
  if (band === "small") {
    return {
      green: 10, amber: 20,
      benchmark: "Small MSP: Strong under 10% | Developing 10% to 20% | Needs attention over 20%",
      bands: [
        { status: "green", label: "Top-performing range", range: "Under 10%" },
        { status: "amber", label: "Middle range", range: "10% to 20%" },
        { status: "red", label: "Needs review", range: "Over 20%" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 5, amber: 10,
      benchmark: "Larger MSP: Strong under 5% | Developing 5% to 10% | Needs attention over 10%",
      bands: [
        { status: "green", label: "Top-performing range", range: "Under 5%" },
        { status: "amber", label: "Middle range", range: "5% to 10%" },
        { status: "red", label: "Needs review", range: "Over 10%" },
      ],
    };
  }
  return {
    green: 7, amber: 15,
    benchmark: "Mid-sized MSP: Strong under 7% | Developing 7% to 15% | Needs attention over 15%",
    bands: [
      { status: "green", label: "Top-performing range", range: "Under 7%" },
      { status: "amber", label: "Middle range", range: "7% to 15%" },
      { status: "red", label: "Needs review", range: "Over 15%" },
    ],
  };
}

function ticketsEndpointThresholds(band) {
  if (band === "small") {
    return {
      green: 0.75, amber: 1.25,
      benchmark: "Small MSP: Strong under 0.75 | Developing 0.75 to 1.25 | Needs attention over 1.25",
      bands: [
        { status: "green", label: "Top-performing range", range: "Under 0.75" },
        { status: "amber", label: "Middle range", range: "0.75 to 1.25" },
        { status: "red", label: "Needs review", range: "Over 1.25" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 0.25, amber: 0.5,
      benchmark: "Larger MSP: Strong under 0.25 | Developing 0.25 to 0.5 | Needs attention over 0.5",
      bands: [
        { status: "green", label: "Top-performing range", range: "Under 0.25" },
        { status: "amber", label: "Middle range", range: "0.25 to 0.5" },
        { status: "red", label: "Needs review", range: "Over 0.5" },
      ],
    };
  }
  return {
    green: 0.5, amber: 1.0,
    benchmark: "Mid-sized MSP: Strong under 0.5 | Developing 0.5 to 1.0 | Needs attention over 1.0",
    bands: [
      { status: "green", label: "Top-performing range", range: "Under 0.5" },
      { status: "amber", label: "Middle range", range: "0.5 to 1.0" },
      { status: "red", label: "Needs review", range: "Over 1.0" },
    ],
  };
}

function servicesClientThresholds(band) {
  if (band === "small") {
    return {
      green: 4, amber: 2,
      benchmark: "Small MSP: Strong 4+ | Developing 2 to 3 | Needs attention under 2",
      bands: [
        { status: "green", label: "Top-performing range", range: "4+" },
        { status: "amber", label: "Middle range", range: "2 to 3" },
        { status: "red", label: "Needs review", range: "Under 2" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 7, amber: 4,
      benchmark: "Larger MSP: Strong 7+ | Developing 4 to 6 | Needs attention under 4",
      bands: [
        { status: "green", label: "Top-performing range", range: "7+" },
        { status: "amber", label: "Middle range", range: "4 to 6" },
        { status: "red", label: "Needs review", range: "Under 4" },
      ],
    };
  }
  return {
    green: 5, amber: 3,
    benchmark: "Mid-sized MSP: Strong 5+ | Developing 3 to 4 | Needs attention under 3",
    bands: [
      { status: "green", label: "Top-performing range", range: "5+" },
      { status: "amber", label: "Middle range", range: "3 to 4" },
      { status: "red", label: "Needs review", range: "Under 3" },
    ],
  };
}

function securityAttachThresholds(band) {
  if (band === "small") {
    return {
      green: 70, amber: 40,
      benchmark: "Small MSP: Strong 70%+ | Developing 40% to 69% | Needs attention under 40%",
      bands: [
        { status: "green", label: "Top-performing range", range: "70%+" },
        { status: "amber", label: "Middle range", range: "40% to 69%" },
        { status: "red", label: "Needs review", range: "Under 40%" },
      ],
    };
  }
  if (band === "large") {
    return {
      green: 90, amber: 65,
      benchmark: "Larger MSP: Strong 90%+ | Developing 65% to 89% | Needs attention under 65%",
      bands: [
        { status: "green", label: "Top-performing range", range: "90%+" },
        { status: "amber", label: "Middle range", range: "65% to 89%" },
        { status: "red", label: "Needs review", range: "Under 65%" },
      ],
    };
  }
  return {
    green: 80, amber: 50,
    benchmark: "Mid-sized MSP: Strong 80%+ | Developing 50% to 79% | Needs attention under 50%",
    bands: [
      { status: "green", label: "Top-performing range", range: "80%+" },
      { status: "amber", label: "Middle range", range: "50% to 79%" },
      { status: "red", label: "Needs review", range: "Under 50%" },
    ],
  };
}

function formatValue(value, unit) {
  if (value === null || Number.isNaN(value)) return "Waiting";
  if (unit === "%") return `${numberFormatter.format(value)}%`;
  if (unit === "currency") return currencyFormatter.format(value);
  if (unit === "decimal") return numberFormatter.format(value);
  return numberFormatter.format(value);
}

function statusRank(status) {
  if (status === "green") return 3;
  if (status === "amber") return 2;
  if (status === "red") return 1;
  return 0;
}

function inferSizeBand(revenue) {
  if (revenue === null) return sizeBand.value;
  if (revenue < 2000000) return "small";
  if (revenue < 10000000) return "mid";
  return "large";
}

function updateSizeBandFromRevenue() {
  if (userOverrodeSize) return;
  const revenue = readNumber("annualRevenue");
  sizeBand.value = inferSizeBand(revenue);
}

function buildState() {
  const annualRevenue = readNumber("annualRevenue");
  const employees = readNumber("employees");
  const technicians = readNumber("technicians");
  const grossMargin = readNumber("grossMargin");
  const ebitdaMargin = readNumber("ebitdaMargin");
  const recurringRevenue = readNumber("recurringRevenue");
  const mrr = readNumber("mrr");
  const supportedUsers = readNumber("supportedUsers");
  const activeClients = readNumber("activeClients");
  const endpoints = readNumber("endpoints");
  const tickets = readNumber("tickets");
  const logoChurn = readNumber("logoChurn");
  const servicesPerClient = readNumber("servicesPerClient");
  const securityAttach = readNumber("securityAttach");
  const band = sizeBand.value;

  const revenueEmployee = safeDivide(annualRevenue, employees);
  const revenueTechnician = safeDivide(annualRevenue, technicians);
  const aisp = safeDivide(mrr, supportedUsers);
  const avgMrrClient = safeDivide(mrr, activeClients);
  const endpointsTechnician = safeDivide(endpoints, technicians);
  const ticketsEndpoint = safeDivide(tickets, endpoints);
  const ebitdaBench = ebitdaThresholds(band);
  const avgMrrBench = avgMrrThresholds(band);
  const aispBench = aispThresholds(band);
  const recurringRevBench = recurringRevenueThresholds(band);
  const revenueEmployeeBench = revenueEmployeeThresholds(band);
  const revenueTechBench = revenueTechnicianThresholds(band);
  const endpointsTechBench = endpointsTechThresholds(band);
  const logoChurnBench = logoChurnThresholds(band);
  const ticketsEndpointBench = ticketsEndpointThresholds(band);
  const servicesClientBench = servicesClientThresholds(band);
  const securityAttachBench = securityAttachThresholds(band);

  const metrics = [
    {
      id: "ebitda",
      value: validPercentOrNull(ebitdaMargin),
      status: scoreHigher(validPercentOrNull(ebitdaMargin), ebitdaBench.green, ebitdaBench.amber),
      benchmark: ebitdaBench.benchmark,
      bands: ebitdaBench.bands,
    },
    {
      id: "grossMargin",
      value: validPercentOrNull(grossMargin),
      status: scoreHigher(validPercentOrNull(grossMargin), 42, 35),
    },
    {
      id: "recurringRevenue",
      value: validPercentOrNull(recurringRevenue),
      status: scoreHigher(validPercentOrNull(recurringRevenue), recurringRevBench.green, recurringRevBench.amber),
      benchmark: recurringRevBench.benchmark,
      bands: recurringRevBench.bands,
    },
    {
      id: "revenueEmployee",
      value: positiveOrNull(revenueEmployee),
      status: scoreHigher(positiveOrNull(revenueEmployee), revenueEmployeeBench.green, revenueEmployeeBench.amber),
      benchmark: revenueEmployeeBench.benchmark,
      bands: revenueEmployeeBench.bands,
    },
    {
      id: "revenueTechnician",
      value: positiveOrNull(revenueTechnician),
      status: scoreHigher(positiveOrNull(revenueTechnician), revenueTechBench.green, revenueTechBench.amber),
      benchmark: revenueTechBench.benchmark,
      bands: revenueTechBench.bands,
    },
    {
      id: "endpointsTechnician",
      value: positiveOrNull(endpointsTechnician),
      status: scoreHigher(positiveOrNull(endpointsTechnician), endpointsTechBench.green, endpointsTechBench.amber),
      benchmark: endpointsTechBench.benchmark,
      bands: endpointsTechBench.bands,
      labelMap: { green: "High leverage", amber: "Moderate leverage", red: "Capacity pressure", waiting: "Waiting for input" },
    },
    {
      id: "aisp",
      value: positiveOrNull(aisp),
      status: scoreHigher(positiveOrNull(aisp), aispBench.green, aispBench.amber),
      benchmark: aispBench.benchmark,
      bands: aispBench.bands,
    },
    {
      id: "avgMrrClient",
      value: positiveOrNull(avgMrrClient),
      status: scoreHigher(positiveOrNull(avgMrrClient), avgMrrBench.green, avgMrrBench.amber),
      benchmark: avgMrrBench.benchmark,
      bands: avgMrrBench.bands,
    },
    {
      id: "logoChurn",
      value: validPercentOrNull(logoChurn),
      status: scoreLower(validPercentOrNull(logoChurn), logoChurnBench.green, logoChurnBench.amber),
      benchmark: logoChurnBench.benchmark,
      bands: logoChurnBench.bands,
    },
    {
      id: "ticketsEndpoint",
      value: positiveOrZeroOrNull(ticketsEndpoint),
      status: scoreLower(positiveOrZeroOrNull(ticketsEndpoint), ticketsEndpointBench.green, ticketsEndpointBench.amber),
      benchmark: ticketsEndpointBench.benchmark,
      bands: ticketsEndpointBench.bands,
      caveat: "Note: this metric is most meaningful where ticket logging is consistent. MSPs that log every alert, automation, and proactive task will naturally show a higher rate than those with lighter logging discipline — compare directionally rather than literally.",
    },
    {
      id: "servicesClient",
      value: positiveOrZeroOrNull(servicesPerClient),
      status: scoreHigher(positiveOrZeroOrNull(servicesPerClient), servicesClientBench.green, servicesClientBench.amber),
      benchmark: servicesClientBench.benchmark,
      bands: servicesClientBench.bands,
    },
    {
      id: "securityAttach",
      value: validPercentOrNull(securityAttach),
      status: scoreHigher(validPercentOrNull(securityAttach), securityAttachBench.green, securityAttachBench.amber),
      benchmark: securityAttachBench.benchmark,
      bands: securityAttachBench.bands,
    },
  ].map((metric) => ({
    ...definitions[metric.id],
    ...metric,
    points: STATUS_POINTS[metric.status],
  }));

  const categoryScores = categories.map((category) => {
    const categoryMetrics = category.metricIds.map((id) => metrics.find((metric) => metric.id === id));
    const completed = categoryMetrics.filter((metric) => metric.status !== "waiting");
    const score = completed.length
      ? Math.round((completed.reduce((total, metric) => total + metric.points, 0) / (completed.length * 8.33)) * 100)
      : null;
    return {
      ...category,
      metrics: categoryMetrics,
      score,
    };
  });

  const completedMetrics = metrics.filter((metric) => metric.status !== "waiting").length;
  const totalScore = Math.min(100, Math.round(metrics.reduce((total, metric) => total + metric.points, 0)));

  return {
    inputs: {
      annualRevenue,
      employees,
      technicians,
      grossMargin,
      ebitdaMargin,
      recurringRevenue,
      mrr,
      supportedUsers,
      activeClients,
      endpoints,
      tickets,
      logoChurn,
      servicesPerClient,
      securityAttach,
    },
    band,
    derived: {
      revenueEmployee,
      revenueTechnician,
      aisp,
      avgMrrClient,
      endpointsTechnician,
      ticketsEndpoint,
    },
    metrics,
    categoryScores,
    completedMetrics,
    totalScore,
  };
}

function validPercentOrNull(value) {
  if (value === null || value < 0 || value > 100) return null;
  return value;
}

function positiveOrNull(value) {
  if (value === null || value <= 0) return null;
  return value;
}

function positiveOrZeroOrNull(value) {
  if (value === null || value < 0) return null;
  return value;
}

function scoreInterpretation(score, completed) {
  if (!completed) return "Enter your metrics to build a benchmark view.";
  if (score >= 80) return "Strong performer. Your current inputs align with many top-quartile benchmark characteristics.";
  if (score >= 60) return "Solid foundation with improvement opportunities. Several areas appear healthy, with targeted room to improve.";
  if (score >= 40) return "A number of areas are below benchmark. The results point to practical opportunities to strengthen profitability, pricing, or delivery efficiency.";
  return "There is clear headroom to build on here. The results point to several areas — pricing, efficiency, retention, and revenue quality — where practical improvements could make a meaningful difference.";
}

function categoryInterpretation(score) {
  if (score === null) return "Waiting for enough input to calculate this category.";
  if (score >= 80) return "This area appears strongly aligned with benchmark expectations.";
  if (score >= 50) return "This area has a reasonable base, with some room to improve.";
  return "This area may benefit from closer review and practical improvement planning.";
}

function renderDerived(state) {
  document.getElementById("derivedAisp").textContent = formatValue(state.derived.aisp, "currency");
  document.getElementById("derivedMrrClient").textContent = formatValue(state.derived.avgMrrClient, "currency");
  document.getElementById("derivedRevenueEmployee").textContent = formatValue(state.derived.revenueEmployee, "currency");
  document.getElementById("derivedRevenueTech").textContent = formatValue(state.derived.revenueTechnician, "currency");
  document.getElementById("derivedEndpointsTech").textContent = formatValue(state.derived.endpointsTechnician, "number");
  document.getElementById("derivedTicketsEndpoint").textContent = formatValue(state.derived.ticketsEndpoint, "decimal");
}

function renderProgress(state) {
  const filled = fields.filter(isFilled).length;
  const percent = Math.round((filled / fields.length) * 100);
  document.body.classList.toggle("scorecard-started", filled > 0);
  document.getElementById("progressLabel").textContent = `${filled} of ${fields.length} inputs`;
  document.getElementById("progressBar").style.width = `${percent}%`;

  const scoreText = `${state.totalScore} / 100`;
  document.getElementById("heroScore").textContent = scoreText;
  document.getElementById("stickyScore").textContent = scoreText;
  document.getElementById("overallScore").textContent = scoreText;
  document.getElementById("stickyInterpretation").textContent = scoreInterpretation(state.totalScore, state.completedMetrics);
  document.getElementById("overallInterpretation").textContent = scoreInterpretation(state.totalScore, state.completedMetrics);
  document.getElementById("scoreMeterFill").style.width = `${state.totalScore}%`;
}

function renderWarnings(state) {
  const warnings = [];
  const percentIds = ["grossMargin", "ebitdaMargin", "recurringRevenue", "logoChurn", "securityAttach"];
  percentIds.forEach((id) => {
    const value = state.inputs[id];
    if (value !== null && (value < 0 || value > 100)) {
      warnings.push("Percentages should usually sit between 0 and 100. You can continue, but you may want to check the input.");
    }
  });
  if (state.inputs.technicians !== null && state.inputs.employees !== null && state.inputs.technicians > state.inputs.employees) {
    warnings.push("Technical service delivery employees are higher than total employees. You can continue, but this may need checking.");
  }
  if (
    state.inputs.mrr !== null &&
    state.inputs.annualRevenue !== null &&
    state.inputs.mrr * 12 > state.inputs.annualRevenue * 1.1
  ) {
    warnings.push("Monthly recurring revenue annualised appears higher than annual revenue. That may be correct, but it is worth checking.");
  }
  ["annualRevenue", "employees", "technicians", "mrr", "supportedUsers", "activeClients", "endpoints"].forEach((id) => {
    const value = state.inputs[id];
    if (value !== null && value < 0) warnings.push("Some figures are negative. You can continue, but revenue, counts and volumes should usually be positive.");
  });

  const uniqueWarnings = [...new Set(warnings)];
  document.getElementById("warnings").innerHTML = uniqueWarnings
    .map((warning) => `<div class="warning-item">${warning}</div>`)
    .join("");
}

function categoryBadgeStatus(score) {
  if (score === null) return "waiting";
  if (score >= 70) return "green";
  if (score >= 40) return "amber";
  return "red";
}

function categoryBadgeLabel(score) {
  if (score === null) return "Waiting";
  if (score >= 70) return "Strong";
  if (score >= 40) return "Developing";
  return "Needs attention";
}

function renderCategories(state) {
  const categoryGrid = document.getElementById("categoryGrid");
  categoryGrid.innerHTML = state.categoryScores
    .map((category) => {
      const badgeStatus = categoryBadgeStatus(category.score);
      const badgeLabel = categoryBadgeLabel(category.score);
      const bars = category.metrics
        .map((metric) => {
          const width = metric.status === "waiting" ? 12 : Math.max(8, Math.round((metric.points / 8.33) * 100));
          return `
            <div class="category-bar">
              <small>${metric.name}</small>
              <div class="bar-track"><span style="--width: ${width}%; --bar-color: ${statusColor(metric.status)}"></span></div>
            </div>
          `;
        })
        .join("");
      return `
        <article class="category-card">
          <header>
            <div>
              <h3>${category.name}</h3>
              <p>${category.copy}</p>
            </div>
            <span class="badge ${badgeStatus}">${badgeLabel}</span>
          </header>
          <p>${categoryInterpretation(category.score)}</p>
          <div class="category-bars">${bars}</div>
        </article>
      `;
    })
    .join("");
}

function renderMetrics(state) {
  const metricGrid = document.getElementById("metricGrid");
  const bandLabels = { small: "a small", mid: "a mid-sized", large: "a larger" };
  const bandLabel = bandLabels[state.band] || "your";
  metricGrid.innerHTML = state.metrics
    .map((metric) => {
      const benchmark = metric.benchmark || definitions[metric.id].benchmark;
      const feedbackFn = METRIC_FEEDBACK[metric.id];
      const feedbackHtml =
        feedbackFn && metric.status !== "waiting"
          ? `<p class="metric-feedback metric-feedback--${metric.status}"><strong>Your position:</strong> ${feedbackFn({ formattedValue: formatValue(metric.value, metric.unit), status: metric.status, bandLabel })}</p>`
          : "";
      return `
        <article class="metric-card">
          <header>
            <div>
              <div class="metric-title-row">
                <h3>${metric.name}</h3>
                ${renderMetricInfo(metric)}
              </div>
              <div class="metric-result">${formatValue(metric.value, metric.unit)}</div>
            </div>
            <span class="badge ${metric.status}">${(metric.labelMap && metric.labelMap[metric.status]) || statusLabel(metric.status)}</span>
          </header>
          <p class="metric-benchmark"><strong>Benchmark:</strong> ${benchmark}</p>
          ${metric.caveat ? `<p class="metric-caveat">${metric.caveat}</p>` : ""}
          <details>
            <summary>View guidance</summary>
            <div>
              ${feedbackHtml}
              <p><strong>Why it matters:</strong> ${metric.why}</p>
              <p><strong>How to improve:</strong> ${metric.improve}</p>
            </div>
          </details>
        </article>
      `;
    })
    .join("");
}

function renderMetricInfo(metric) {
  const bands = metric.bands || [];
  return `
    <span class="metric-info">
      <button class="info-button" type="button" aria-label="How to calculate ${metric.name}">i</button>
      <span class="info-popover" role="tooltip">
        <strong>How to calculate</strong>
        <span>${metric.formula}</span>
        <strong>Benchmark bands</strong>
        <span class="info-bands">
          ${bands
            .map(
              (band) => `
                <span class="info-band ${band.status}">
                  <span>${band.label}</span>
                  <strong>${band.range}</strong>
                </span>
              `,
            )
            .join("")}
        </span>
      </span>
    </span>
  `;
}

function renderInsights(state) {
  const completeMetrics = state.metrics.filter((metric) => metric.status !== "waiting");
  const strengths = [...completeMetrics]
    .sort((a, b) => statusRank(b.status) - statusRank(a.status) || b.points - a.points)
    .slice(0, 3);
  const improvements = [...completeMetrics]
    .filter((metric) => metric.status !== "green")
    .sort((a, b) => statusRank(a.status) - statusRank(b.status) || a.points - b.points)
    .slice(0, 3);

  document.getElementById("strengthsList").innerHTML = strengths.length
    ? strengths.map((metric) => `<li><strong>${metric.name}</strong> — ${statusLabel(metric.status)}. ${metric.strength || ""}</li>`).join("")
    : "<li>Waiting for enough inputs to identify strengths.</li>";

  document.getElementById("improvementsList").innerHTML = improvements.length
    ? improvements.map((metric) => `<li><strong>${metric.name}</strong> - ${metric.recommendation}</li>`).join("")
    : "<li>No clear improvement areas yet. Complete more inputs to build the view.</li>";
}

function renderRadar(state) {
  const svg = document.getElementById("radarChart");
  const center = 130;
  const maxRadius = 96;
  const count = state.categoryScores.length;
  const rings = [0.25, 0.5, 0.75, 1];
  const minPlot = 0.07; // minimum radius so no dot ever collapses to the centre

  function point(index, value) {
    const angle = -Math.PI / 2 + (index / count) * Math.PI * 2;
    return {
      x: center + Math.cos(angle) * maxRadius * value,
      y: center + Math.sin(angle) * maxRadius * value,
    };
  }

  function categoryColor(score) {
    if (score === null) return "#9CA3AF"; // grey — waiting for input
    if (score >= 70) return "#2E7D5B";   // green
    if (score >= 40) return "#C9822B";   // amber
    return "#B85C5C";                    // red
  }

  const ringPolys = rings
    .map((ring) => {
      const points = state.categoryScores.map((_, index) => point(index, ring));
      return `<polygon points="${points.map((p) => `${p.x},${p.y}`).join(" ")}" fill="none" stroke="#E1E7EF" stroke-width="1" />`;
    })
    .join("");

  const axes = state.categoryScores
    .map((category, index) => {
      const outer = point(index, 1.13);
      const end = point(index, 1);
      const color = categoryColor(category.score);
      return `
        <line x1="${center}" y1="${center}" x2="${end.x}" y2="${end.y}" stroke="#E1E7EF" stroke-width="1" />
        <text x="${outer.x}" y="${outer.y}" text-anchor="middle" dominant-baseline="middle" fill="${color}" font-size="8" font-weight="700">${shortCategoryName(category.name)}</text>
      `;
    })
    .join("");

  const scorePoints = state.categoryScores.map((category, index) => {
    const raw = category.score === null ? 0 : category.score / 100;
    const normalized = Math.max(minPlot, raw);
    return { ...point(index, normalized), score: category.score };
  });

  const polygon = `<polygon points="${scorePoints.map((p) => `${p.x},${p.y}`).join(" ")}" fill="rgba(31, 78, 121, 0.09)" stroke="#1F4E79" stroke-width="1.5" />`;
  const dots = scorePoints
    .map((p) => `<circle cx="${p.x}" cy="${p.y}" r="5" fill="${categoryColor(p.score)}" stroke="#ffffff" stroke-width="2" />`)
    .join("");

  svg.innerHTML = `${ringPolys}${axes}${polygon}${dots}`;
}

function shortCategoryName(name) {
  return name
    .replace("Pricing & Commercial Efficiency", "Pricing")
    .replace("Operational Efficiency", "Ops")
    .replace("Retention & Expansion", "Retention")
    .replace("Security Maturity", "Security")
    .replace("Revenue Quality", "Revenue");
}

function renderHints(state) {
  Object.entries(FIELD_HINTS).forEach(([fieldId, hint]) => {
    const el = document.getElementById(`hint-${fieldId}`);
    if (!el) return;
    const metric = state.metrics.find((m) => m.id === hint.metricId);
    const label = hint.getDynamicLabel ? hint.getDynamicLabel(state.band) : hint.staticLabel;
    if (!metric || metric.status === "waiting") {
      el.innerHTML = `<span class="hint-range">${label}</span>`;
    } else {
      el.innerHTML = `<span class="hint-status ${metric.status}">${(metric.labelMap && metric.labelMap[metric.status]) || statusLabel(metric.status)}</span><span class="hint-range">${label}</span>`;
    }
  });
}

function update() {
  updateSizeBandFromRevenue();
  const state = buildState();
  latestState = state;
  renderDerived(state);
  renderProgress(state);
  renderWarnings(state);
  renderHints(state);
  renderCategories(state);
  renderMetrics(state);
  renderInsights(state);
  renderRadar(state);
}

function buildSummaryText(state) {
  const strengths = [...state.metrics]
    .filter((metric) => metric.status !== "waiting")
    .sort((a, b) => statusRank(b.status) - statusRank(a.status))
    .slice(0, 3)
    .map((metric) => metric.name);
  const improvements = [...state.metrics]
    .filter((metric) => metric.status === "red" || metric.status === "amber")
    .sort((a, b) => statusRank(a.status) - statusRank(b.status))
    .slice(0, 3)
    .map((metric) => metric.name);

  return [
    `MSP Benchmark Scorecard: ${state.totalScore} / 100`,
    scoreInterpretation(state.totalScore, state.completedMetrics),
    "",
    `Top strengths: ${strengths.length ? strengths.join(", ") : "Waiting for more inputs"}`,
    `Improvement areas: ${improvements.length ? improvements.join(", ") : "Waiting for more inputs"}`,
  ].join("\n");
}

async function copySummary() {
  const text = buildSummaryText(latestState);
  try {
    await navigator.clipboard.writeText(text);
    temporaryButtonText("copySummary", "Copied");
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    temporaryButtonText("copySummary", "Copied");
  }
}

function temporaryButtonText(id, text) {
  const button = document.getElementById(id);
  const original = button.textContent;
  button.textContent = text;
  setTimeout(() => {
    button.textContent = original;
  }, 1500);
}

async function generateReportPdf() {
  const state = latestState;
  if (!window.jspdf) {
    alert("PDF library is still loading — please try again in a moment.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  const PW = 210, PH = 297, ML = 14, MR = 196, CW = MR - ML;

  const C = {
    navy: "#1F4E79", white: "#FFFFFF", text: "#172033", muted: "#5B6475",
    line: "#E1E7EF", bg: "#F7F9FC", scoreBg: "#EEF3F8",
    green: "#2E7D5B", greenBg: "#E7F3EE",
    amber: "#C9822B", amberBg: "#FBF0DF",
    red:   "#B85C5C", redBg:   "#F8E8E8",
  };

  function sC(s)  { return s==="green"?C.green  : s==="amber"?C.amber  : s==="red"?C.red  : C.muted; }
  function sBg(s) { return s==="green"?C.greenBg: s==="amber"?C.amberBg: s==="red"?C.redBg: "#EEEEEE"; }
  function sForN(n) { return n===null?"waiting": n>=70?"green": n>=40?"amber": "red"; }
  function lForN(n) { return n===null?"Waiting": n>=70?"Strong": n>=40?"Developing": "Below benchmark"; }

  function rect(x, y, w, h, c)     { doc.setFillColor(c); doc.rect(x, y, w, h, "F"); }
  function rrect(x, y, w, h, r, c) { doc.setFillColor(c); doc.roundedRect(x, y, w, h, r, r, "F"); }
  function hline(y)                 { doc.setDrawColor(C.line); doc.setLineWidth(0.3); doc.line(ML, y, MR, y); }

  function hBar(x, y, w, h, pct, c) {
    rrect(x, y, w, h, h / 2, C.line);
    if (pct > 0) rrect(x, y, Math.max(h, w * Math.min(pct, 100) / 100), h, h / 2, c);
  }

  function badge(label, cx, y, status) {
    const bw = 32, bh = 5.5;
    rrect(cx - bw / 2, y - 4, bw, bh, 1.5, sBg(status));
    doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(sC(status));
    doc.text(label, cx, y, { align: "center" });
  }

  function drawHeader(sub) {
    rect(0, 0, PW, 18, C.navy);
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(C.white);
    doc.text("MSP BENCHMARK SCORECARD", ML, 11);
    doc.setFont("helvetica", "normal"); doc.setFontSize(8);
    doc.text(sub, MR, 11, { align: "right" });
  }

  function drawFooter(n, total) {
    rect(0, PH - 12, PW, 12, C.bg);
    doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(C.muted);
    doc.text("lorcan.feighery@kaseya.com  ·  MSP Benchmark Scorecard", ML, PH - 4.5);
    doc.text(`Page ${n} of ${total}`, MR, PH - 4.5, { align: "right" });
  }

  // Capture radar chart SVG as PNG
  let radarImg = null;
  try {
    const svgEl = document.getElementById("radarChart");
    if (svgEl && svgEl.children.length > 0) {
      radarImg = await svgToDataUrl(svgEl, 260, 260);
    }
  } catch (_) { /* skip if capture fails */ }

  // ── PAGE 1: Executive Summary ─────────────────────────────────────────
  drawHeader("Executive Summary");
  let y = 26;

  // Score block
  const score = state.totalScore;
  const scoreStatus = sForN(score);
  const scoreColor  = sC(scoreStatus);
  const scoreLabel  = score >= 70 ? "Strong overall performance"
                    : score >= 40 ? "Developing — clear room to grow"
                    : "Below benchmark — meaningful opportunities ahead";

  doc.setFont("helvetica", "bold"); doc.setFontSize(38); doc.setTextColor(C.navy);
  doc.text(String(score), ML, y + 11);
  const numW = doc.getTextWidth(String(score));

  doc.setFont("helvetica", "normal"); doc.setFontSize(16); doc.setTextColor(C.muted);
  doc.text("/ 100", ML + numW + 3, y + 9);

  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(scoreColor);
  doc.text(scoreLabel, ML + numW + 3, y + 17);

  hBar(ML, y + 20, CW, 4, score, scoreColor);
  y += 29;

  doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(C.muted);
  const interp = doc.splitTextToSize(scoreInterpretation(score, state.completedMetrics), CW);
  doc.text(interp, ML, y);
  y += interp.length * 3.6 + 8;

  hline(y); y += 8;

  // Two-column: category score bars (left) + radar chart (right)
  const colLw = 97, colRx = ML + colLw + 9, colRw = CW - colLw - 9;
  const secY = y;

  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(C.navy);
  doc.text("Category Scores", ML, y);
  y += 7;

  state.categoryScores.forEach((cat) => {
    const cs  = cat.score;
    const cst = sForN(cs);
    const cc  = sC(cst);
    const catName = cat.name.replace("Pricing & Commercial Efficiency", "Pricing & Efficiency");

    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(C.text);
    doc.text(catName, ML, y + 2);

    hBar(ML, y + 4, colLw - 28, 3, cs === null ? 0 : cs, cc);

    doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(cc);
    doc.text(cs === null ? "—" : `${cs}%`, ML + colLw - 26, y + 3);

    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); doc.setTextColor(cc);
    doc.text(lForN(cs), ML + colLw - 26, y + 6.5);

    y += 13;
  });

  // Radar chart on the right column
  if (radarImg) {
    doc.addImage(radarImg, "PNG", colRx, secY - 4, colRw, colRw);
  }
  y = Math.max(y, secY - 4 + colRw) + 6;

  hline(y); y += 8;

  // Strengths / Improvements two-column
  const hw = CW / 2 - 4;
  const strengths = [...state.metrics]
    .filter((m) => m.status !== "waiting")
    .sort((a, b) => statusRank(b.status) - statusRank(a.status))
    .slice(0, 3);
  const improv = [...state.metrics]
    .filter((m) => m.status === "red" || m.status === "amber")
    .sort((a, b) => statusRank(a.status) - statusRank(b.status))
    .slice(0, 3);

  doc.setFont("helvetica", "bold"); doc.setFontSize(10); doc.setTextColor(C.navy);
  doc.text("Top 3 Strengths", ML, y);
  doc.text("Top 3 Areas to Develop", ML + hw + 8, y);
  y += 6;

  for (let i = 0; i < Math.max(strengths.length || 1, improv.length || 1); i++) {
    const rh = 16;
    if (strengths[i]) {
      const m = strengths[i];
      rect(ML, y - 2, 2, rh, C.green);
      rrect(ML + 2, y - 2, hw - 2, rh, 1, C.greenBg);
      doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(C.text);
      doc.text(m.name, ML + 5, y + 2.5);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(C.green);
      doc.text(formatValue(m.value, m.unit), ML + 5, y + 8);
    }
    if (improv[i]) {
      const m = improv[i];
      const x2 = ML + hw + 8;
      rect(x2, y - 2, 2, rh, sC(m.status));
      rrect(x2 + 2, y - 2, hw - 2, rh, 1, sBg(m.status));
      doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(C.text);
      doc.text(m.name, x2 + 5, y + 2.5);
      doc.setFont("helvetica", "normal"); doc.setFontSize(7.5); doc.setTextColor(sC(m.status));
      doc.text(statusLabel(m.status), x2 + 5, y + 8);
    }
    y += rh + 3;
  }

  // ── PAGE 2: Metric Detail ─────────────────────────────────────────────
  doc.addPage();
  drawHeader("Metric Results");
  y = 26;

  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(C.navy);
  doc.text("Metric Results & Benchmark Comparison", ML, y);
  y += 8;

  // Table header row
  rect(ML, y - 4.5, CW, 7, C.navy);
  doc.setFont("helvetica", "bold"); doc.setFontSize(7.5); doc.setTextColor(C.white);
  doc.text("Metric", ML + 3, y);
  doc.text("Your value", ML + 68, y);
  doc.text("Status", ML + 108, y, { align: "center" });
  doc.text("Benchmark target", ML + 130, y);
  y += 6;

  let alt = false;
  for (const metric of state.metrics) {
    if (metric.status === "waiting") continue;

    const gLines = doc.splitTextToSize(sanitisePdfText(metric.improve || ""), 58);
    const shown  = gLines.slice(0, 2);
    const rh     = 10 + shown.length * 3.4 + 3;

    if (y + rh > PH - 20) {
      doc.addPage();
      drawHeader("Metric Results (continued)");
      y = 26; alt = false;
    }

    if (alt) rect(ML, y - 3, CW, rh, C.bg);
    rect(ML, y - 3, 2.5, rh, sC(metric.status));

    doc.setFont("helvetica", "bold"); doc.setFontSize(8); doc.setTextColor(C.text);
    doc.text(metric.name, ML + 5, y + 1.5);

    doc.setFont("helvetica", "normal"); doc.setFontSize(6.5); doc.setTextColor(C.muted);
    doc.text(shown, ML + 5, y + 6);

    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(C.text);
    doc.text(formatValue(metric.value, metric.unit), ML + 68, y + 1.5);

    badge(statusLabel(metric.status), ML + 108, y + 4, metric.status);

    doc.setFont("helvetica", "normal"); doc.setFontSize(7); doc.setTextColor(C.muted);
    const bmk   = sanitisePdfText(metric.benchmark || definitions[metric.id].benchmark || "");
    const bmkLn = doc.splitTextToSize(bmk, 52);
    doc.text(bmkLn.slice(0, 2), ML + 130, y + 1.5);

    y += rh + 1;
    alt = !alt;
  }

  // ── Next Steps — new page if tight, otherwise continue ───────────────
  const disclaimerText = "Benchmark guidance is directional. Some source ranges are global, self-reported, or proxy-based where UK and Ireland MSP-specific data is limited. Results should be treated as a consultative discussion aid rather than a formal valuation or audit.";
  const dLines = doc.splitTextToSize(disclaimerText, CW);
  const needH  = 20 + 46 + 15 + dLines.length * 3.4;

  if (y + needH > PH - 20) { doc.addPage(); drawHeader("Next Steps"); y = 26; }
  else { y += 10; hline(y); y += 10; }

  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(C.navy);
  doc.text("Next Steps", ML, y);
  y += 8;

  // CTA box
  rrect(ML, y, CW, 46, 3, C.scoreBg);
  rect(ML, y, 3, 46, C.navy);
  doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(C.navy);
  doc.text("Want to discuss your results?", ML + 8, y + 10);
  doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.setTextColor(C.text);
  const ctaBody  = "Schedule a short benchmark review with Lorcan to identify where your MSP can improve profitability, service efficiency, client value, and recurring revenue quality.";
  const ctaLines = doc.splitTextToSize(ctaBody, CW - 16);
  doc.text(ctaLines, ML + 8, y + 18);
  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(C.navy);
  doc.text("Book: calendly.com/lorcan-feighery-kaseya/30min", ML + 8, y + 38);
  y += 56;

  doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(C.text);
  doc.text("Methodology note", ML, y);
  y += 5;
  doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(C.muted);
  doc.text(dLines, ML, y);

  // Add footers to every page
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) { doc.setPage(p); drawFooter(p, totalPages); }

  doc.save("MSP-Benchmark-Scorecard-Report.pdf");
}

/* Converts an inline SVG element to a PNG data URL via canvas */
function svgToDataUrl(svgEl, w, h) {
  return new Promise((resolve, reject) => {
    const s = new XMLSerializer();
    let str = s.serializeToString(svgEl);
    if (!str.includes("xmlns=")) str = str.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg"');
    str = str.replace(/<svg([^>]*)>/, (_, attrs) => {
      const clean = attrs.replace(/\s*(width|height)="[^"]*"/g, "");
      return `<svg${clean} width="${w}" height="${h}">`;
    });
    const blob = new Blob([str], { type: "image/svg+xml;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const img  = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = w * 2; canvas.height = h * 2;
      const ctx = canvas.getContext("2d");
      ctx.scale(2, 2);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = url;
  });
}

function sanitisePdfText(text) {
  return text
    .replace(/–|—/g, "-")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/'/g, "'")
    .replace(/"|"/g, '"');
}

document.querySelectorAll(".section-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const section = button.closest(".input-section");
    const isCollapsed = section.classList.toggle("is-collapsed");
    button.setAttribute("aria-expanded", String(!isCollapsed));
  });
});

fields.forEach((id) => {
  getInput(id).addEventListener("input", update);
});

sizeBand.addEventListener("change", () => {
  userOverrodeSize = true;
  update();
});

function startScorecardProgress(event) {
  if (event.target.closest("input, select, label")) {
    document.body.classList.add("scorecard-started");
  }
}

form.addEventListener("click", startScorecardProgress);
form.addEventListener("focusin", startScorecardProgress);
form.addEventListener("pointerdown", startScorecardProgress);

const SAMPLE_MSP = {
  annualRevenue: 1600000,   // Small MSP — under £2m
  employees: 14,
  technicians: 7,
  grossMargin: 48,          // Strong (≥42%)
  ebitdaMargin: 16,         // Strong (≥15%)
  recurringRevenue: 68,     // Strong (≥60%)
  mrr: 92000,
  supportedUsers: 950,
  activeClients: 26,
  endpoints: 560,           // Endpoints/tech = 80 → Developing
  tickets: 490,             // Tickets/endpoint = 0.875 → Developing
  logoChurn: 7,             // Strong (<10%)
  servicesPerClient: 3.2,   // Developing (2–3.9)
  securityAttach: 32,       // Below benchmark (<40%) — clear improvement area
};

function loadSampleMsp() {
  userOverrodeSize = false;
  Object.entries(SAMPLE_MSP).forEach(([id, value]) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
  });
  update();
}

function clearAllValues() {
  userOverrodeSize = false;
  fields.forEach((id) => { document.getElementById(id).value = ""; });
  update();
}

document.getElementById("loadSample").addEventListener("click", loadSampleMsp);
document.getElementById("clearAll").addEventListener("click", clearAllValues);
document.getElementById("downloadPdf").addEventListener("click", async function() {
  const btn = this;
  const original = btn.textContent;
  btn.textContent = "Generating…";
  btn.disabled = true;
  try {
    await generateReportPdf();
  } finally {
    btn.textContent = original;
    btn.disabled = false;
  }
});

/* ── Lead-capture modal ───────────────────────────────────────────────── */
(function () {
  const FORMSPREE_ID = "xredlnly";
  const PDF_PATH = "assets/msp-metrics-playbook.pdf";

  const overlay  = document.getElementById("playbookModal");
  const closeBtn = document.getElementById("modalClose");
  const form     = document.getElementById("playbookForm");
  const submitBtn = document.getElementById("playbookSubmit");
  const errorBox = document.getElementById("modalError");
  const formWrap = document.getElementById("modalFormWrap");
  const successEl = document.getElementById("modalSuccess");

  const nameField    = document.getElementById("playbookName");
  const emailField   = document.getElementById("playbookEmail");
  const companyField = document.getElementById("playbookCompany");

  function checkFields() {
    const allFilled =
      nameField.value.trim() !== "" &&
      emailField.value.trim() !== "" &&
      companyField.value.trim() !== "";
    submitBtn.disabled = !allFilled;
  }

  [nameField, emailField, companyField].forEach((el) =>
    el.addEventListener("input", checkFields)
  );

  function openModal() {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    // reset to form view each time it opens
    formWrap.hidden = false;
    successEl.hidden = true;
    errorBox.hidden = true;
    submitBtn.textContent = "Download now";
    checkFields(); // re-evaluate based on current field values
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  // Intercept all links that point at the playbook PDF
  document.querySelectorAll('a[href*="msp-metrics-playbook.pdf"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openModal();
    });
  });

  closeBtn.addEventListener("click", closeModal);

  // Close on backdrop click
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) closeModal();
  });

  // Close on Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
  });

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = PDF_PATH;
    a.download = "MSP-Metrics-Playbook.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    errorBox.hidden = true;

    const name    = document.getElementById("playbookName").value.trim();
    const email   = document.getElementById("playbookEmail").value.trim();
    const company = document.getElementById("playbookCompany").value.trim();

    if (!name || !email || !company) return; // browser validation handles empty fields

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending…";

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company,
          _subject: "MSP Metrics Playbook download request" }),
      });

      if (res.ok) {
        // Show success, trigger PDF download
        formWrap.hidden = true;
        successEl.hidden = false;
        triggerDownload();
        // Auto-close after 4 s
        setTimeout(closeModal, 4000);
      } else {
        throw new Error("non-ok response");
      }
    } catch (_) {
      submitBtn.textContent = "Download now";
      checkFields(); // re-enable only if fields still filled
      errorBox.hidden = false;
    }
  });
})();

update();
