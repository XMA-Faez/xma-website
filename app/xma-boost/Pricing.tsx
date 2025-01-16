import { FaCheck } from "react-icons/fa";

const tiers = [
  {
    name: "Hobby",
    id: "tier-hobby",
    href: "#",
    priceMonthly: "$29",
    description:
      "The perfect plan if you're just getting started with our product.",
    features: [
      "Business Setup & Integration",
      "CRM & Pipeline",
      "Website Builder",
      "Course Builder",
      "Automation Builder",
      "All-In-One Conversations",
      "Task Management",
      "Calendar Management",
      "24/7 Live Chat & Zoom Support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    priceMonthly: "$59",
    description: "Everything you need to take your business to the next level.",
    features: [
      "Everything in Essentials",
      "Unlimited Seats & Contacts",
      "Ai-Automation Integration",
      "Lead Intake Automations",
      "Sales & Marketing Automations",
      "Website Integration & Hosting",
      "WhatsApp & Slack Integration",
      "Automatic SEO Optimization Tool",
      "Affiliate Program & Management",
      "Memberships & Community Builder",
    ],
    featured: false,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$99",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Everything In Professional",
      "Agency Automations",
      "Agency Sales & Marketing Drips",
      "Agency Lead Intake & Distribution",
      "Agency Qualifying Forms",
      "Agency Qualifying Surveys",
      "Agency Calendar Setup",
      "Elite Founders Community Access",
      "Access To Resellers License",
    ],
    featured: true,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Pricing = () => (
  <div className="relative isolate">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
    >
      <div
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
        className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
      />
    </div>
    <div className="mx-auto max-w-4xl text-center">
      <h2 className="text-base font-semibold text-indigo-600">Pricing</h2>
      <p className="mt-2 text-5xl font-semibold tracking-tight text-gray-100 sm:text-6xl">
        Choose the right plan for you
      </p>
    </div>
    <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-gray-300 sm:text-xl">
      Choose an affordable plan that’s packed with the best features for
      engaging your audience, creating customer loyalty, and driving sales.
    </p>
    <div className="mx-auto mt-16 grid gap-x-md max-w-lg grid-cols-1 gap-y-6 sm:mt-20 lg:max-w-4xl lg:grid-cols-3">
      {tiers.map((tier, tierIdx) => (
        <div
          key={tier.id}
          className={classNames(
            tier.featured
              ? "relative bg-zinc-950 shadow-indigo-900 shadow-lg border border-indigo-900"
              : "bg-zinc-950",
            tier.featured
              ? ""
              : tierIdx === 0
                ? "rounded-t-3xl lg:rounded-bl-3xl"
                : "lg:rounded-tr-3xl",
            "rounded-3xl p-8 ring-1 ring-gray-900/10",
          )}
        >
          <h3
            id={tier.id}
            className={classNames(
              tier.featured ? "text-indigo-700" : "text-indigo-300",
              "text-base font-semibold",
            )}
          >
            {tier.name}
          </h3>
          <p className="mt-4 flex items-baseline gap-x-2">
            <span
              className={classNames(
                tier.featured ? "text-white" : "text-gray-100",
                "text-5xl font-semibold",
              )}
            >
              {tier.priceMonthly}
            </span>
            <span
              className={classNames(
                tier.featured ? "text-gray-400" : "text-gray-500",
                "text-base",
              )}
            >
              /month
            </span>
          </p>
          <p className="mt-6 text-base text-gray-300">{tier.description}</p>
          <ul className="mt-8 space-y-3 text-sm text-gray-300">
            {tier.features.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <FaCheck
                  aria-hidden="true"
                  className={classNames(
                    tier.featured ? "text-indigo-400" : "text-indigo-600",
                    "h-6 w-5",
                  )}
                />
                {feature}
              </li>
            ))}
          </ul>
          <a
            href={tier.href}
            aria-describedby={tier.id}
            className={classNames(
              tier.featured
                ? "bg-indigo-500 text-white hover:bg-indigo-400 focus:outline-indigo-500"
                : "text-indigo-600 ring-1 ring-indigo-200 hover:ring-indigo-300 focus:outline-indigo-600",
              "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold",
            )}
          >
            Get started today
          </a>
        </div>
      ))}
    </div>
  </div>
);

export default Pricing;
