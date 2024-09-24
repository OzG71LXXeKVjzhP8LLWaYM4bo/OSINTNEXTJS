
import PricingSection from "@/components/ui/pricingsection"
import SearchSection from "@/components/ui/searchsection"
import TrustedByIndustryLeaders from "@/components/ui/trustedbyindustryleaders"
import WhyChoose from "@/components/ui/whychoose"

export default function Component() {
  return (
    <div className="flex-grow flex flex-col">
      <SearchSection />
      <WhyChoose />
      <PricingSection />
      <TrustedByIndustryLeaders />
    </div>
  )
}
