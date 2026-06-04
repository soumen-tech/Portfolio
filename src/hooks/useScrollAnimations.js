import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal animation for sections.
 * Elements with data-scroll="fade-up", data-scroll="fade-left", etc. animate in.
 * Uses fromTo for reliable initial state handling.
 */
export function useScrollReveal(containerRef) {
  useEffect(() => {
    if (!containerRef?.current) return;

    // Small delay to let DOM fully render
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Fade Up elements
        gsap.utils.toArray('[data-scroll="fade-up"]').forEach((el) => {
          gsap.fromTo(el,
            { y: 60, opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 60%',
                toggleActions: 'play none none none',
              },
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
            }
          );
        });

        // Fade Left elements
        gsap.utils.toArray('[data-scroll="fade-left"]').forEach((el) => {
          gsap.fromTo(el,
            { x: -80, opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
            }
          );
        });

        // Fade Right elements
        gsap.utils.toArray('[data-scroll="fade-right"]').forEach((el) => {
          gsap.fromTo(el,
            { x: 80, opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
            }
          );
        });

        // Scale In elements
        gsap.utils.toArray('[data-scroll="scale-in"]').forEach((el) => {
          gsap.fromTo(el,
            { scale: 0.8, opacity: 0 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
              scale: 1,
              opacity: 1,
              duration: 0.8,
              ease: 'back.out(1.7)',
            }
          );
        });

        // Rotate In 3D elements
        gsap.utils.toArray('[data-scroll="rotate-in"]').forEach((el) => {
          gsap.fromTo(el,
            { rotateX: 15, rotateY: -10, y: 50, opacity: 0, transformPerspective: 1000 },
            {
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                toggleActions: 'play none none none',
              },
              rotateX: 0,
              rotateY: 0,
              y: 0,
              opacity: 1,
              duration: 1,
              ease: 'power3.out',
              transformPerspective: 1000,
            }
          );
        });

        // Stagger children
        gsap.utils.toArray('[data-scroll="stagger"]').forEach((parent) => {
          const children = parent.children;
          if (children.length === 0) return;
          gsap.fromTo(children,
            { y: 40, opacity: 0 },
            {
              scrollTrigger: {
                trigger: parent,
                start: 'top 92%',
                toggleActions: 'play none none none',
              },
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
        });

        // Parallax elements
        gsap.utils.toArray('[data-scroll="parallax"]').forEach((el) => {
          const speed = el.dataset.speed || 0.3;
          gsap.to(el, {
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
            y: () => -100 * speed,
            ease: 'none',
          });
        });

        // Refresh ScrollTrigger after setup
        ScrollTrigger.refresh();

      }, containerRef);

      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef]);
}

/**
 * 3D tilt effect on mouse move for cards.
 */
export function useTilt3D(ref, intensity = 10) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      gsap.to(el, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1000,
        transformOrigin: 'center center',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, intensity]);
}

/**
 * Magnetic cursor effect for buttons and interactive elements.
 */
export function useMagneticEffect(ref, strength = 0.3) {
  useEffect(() => {
    const el = ref?.current;
    if (!el) return;

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
}
