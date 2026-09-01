import HeroSlider from "./components/HeroSlider.jsx";
import Navbar from "./components/Navbar";
import ExceptionalDesignSection from "./components/ExceptionalDesignSection";
import { api_base_url } from "@/lib/utils";
import OurProcess from "./components/home/OurProcess";
import BringYourVision from "./components/home/BringYourVision";
import ExceptionalBuilds from "./components/home/ExceptionalBuilds";
import JourneySection from "./components/home/JourneySection";
import ApproachSection from "./components/home/ApproachSection";
import ContactConversation from "./components/home/ContactConversation";
import HomeCTA from "./components/home/HomeCTA";
import { Metadata } from "next";
import { getSeoData } from "@/lib/utils/getSeo";

export async function generateMetadata(): Promise<Metadata> {
  const currentSlug = '/home';
  const seo = await getSeoData(currentSlug);
  if (!seo) {
    return {
      title: "Barugzai Motors | Luxury VIP Vans Dubai",
      description: "Default premium car customization description.",
    };
  }

  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords || undefined,
    alternates: {
      canonical: seo.canonical_url,
    },
    robots: seo.robots, openGraph: {
      title: seo.og_title || seo.meta_title,
      description: seo.og_description || seo.meta_description,
      type: seo.og_type || 'website',
      url: seo.canonical_url,
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
    },
  };
}

async function getBanners() {
  try {
    const res = await fetch(
      `${api_base_url}/api/v1/banners`,
    )
    if (!res.ok) {
      console.error("Banner API failed:", res.status)
      return []
    }
    const data = await res.json()
    return data || []
  } catch (error) {
    console.error("Banner fetch error:", error)
    return []
  }
}

export default async function Home() {
  const seo = await getSeoData('/custom-luxury-mercedes-v-class-dubai');
  const banners = await getBanners()
  return (
    <>
      {seo?.schema_markup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(seo.schema_markup) }}
        />
      )}
      <Navbar />
      <HeroSlider banners={banners} />
      <ExceptionalDesignSection />
      <OurProcess />
      <BringYourVision />
      <ExceptionalBuilds />
      <JourneySection />
      <ApproachSection />
      <ContactConversation />
      <HomeCTA
        bg="/images/bg-t4r3453.webp"
        mobBg="/images/v-class-2.png"
        title={`<h3 class="text-2xl md:text-5xl font-light uppercase leading-tight">
              YOUR LEGACY <span class="text-[#c5a059]">STARTS <br> HERE</span></h3>`}
        SubTitle={`Every build is a reflection of who you are. Tell us your vision — we'll bring it to life.`}
      />
    </>
  );
}