import Hero from "@/components/Hero";
import CoreCapabilities from "@/components/CoreCapabilities";
import CallToAction from "@/components/CallToAction";
import GithubProfile from "@/components/GithubProfile";

export default function Home() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Hero />
      <CoreCapabilities />
      <GithubProfile />
      <CallToAction />
    </div>
  );
}
