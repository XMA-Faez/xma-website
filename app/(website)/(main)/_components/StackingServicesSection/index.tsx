import { services } from "./servicesData";
import ServiceCard from "./ServiceCard";
import Section from "@/components/ui/section";

const ServicesSection = () => {
  return (
    <Section id="services" padding="md" size="xl">
      <div className="text-center mb-12 md:mb-16">
        <span className="text-sm uppercase tracking-wider text-blue-500 font-semibold mb-2 block">
          Our Services
        </span>
        <h2 className="heading-section text-white">
          Everything You Need to Scale
        </h2>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>
    </Section>
  );
};

export default ServicesSection;
