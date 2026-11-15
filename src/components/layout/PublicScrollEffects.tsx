import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PublicScrollEffects = () => {
  const location = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Reset scroll position when navigating between pages.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Back to Top visibility.
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll animations.
  useEffect(() => {
    const context = gsap.context(() => {
      // Hero entrance.
      gsap.utils.toArray<HTMLElement>(".hero-content").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 55, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.2,
          },
        );
      });

      // Fade upward.
      gsap.utils.toArray<HTMLElement>(".scroll-reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 65, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Slide from left.
      gsap.utils
        .toArray<HTMLElement>(".scroll-reveal-left")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
              },
            },
          );
        });

      // Slide from right.
      gsap.utils
        .toArray<HTMLElement>(".scroll-reveal-right")
        .forEach((element) => {
          gsap.fromTo(
            element,
            { x: 80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                once: true,
              },
            },
          );
        });

      // Scale reveal.
      gsap.utils.toArray<HTMLElement>(".scroll-scale").forEach((element) => {
        gsap.fromTo(
          element,
          { scale: 0.88, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // Staggered cards.
      gsap.utils
        .toArray<HTMLElement>(".scroll-stagger")
        .forEach((container) => {
          gsap.fromTo(
            container.children,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: container,
                start: "top 82%",
                once: true,
              },
            },
          );
        });

      // Hero parallax.
      gsap.utils.toArray<HTMLElement>(".parallax-image").forEach((image) => {
        gsap.to(image, {
          yPercent: 18,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: image.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    });

    return () => context.revert();
  }, [location.pathname]);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`fixed bottom-7 right-7 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white shadow-xl shadow-forest/20 transition-all duration-300 hover:-translate-y-1 hover:bg-forest-dark ${
        showBackToTop
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      <ArrowUp size={21} strokeWidth={2.2} />
    </button>
  );
};

export default PublicScrollEffects;
