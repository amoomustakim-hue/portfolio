import Hero from "@/components/Hero";
import CoreCapabilities from "@/components/CoreCapabilities";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Hero />
      <CoreCapabilities />
      <CallToAction />
    </div>
  );
}
