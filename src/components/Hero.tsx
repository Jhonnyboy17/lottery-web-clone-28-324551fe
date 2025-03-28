import { useState, useEffect, useRef } from 'react';

interface Slide {
  id: number;
  bgImage?: string;
  bgColor?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: "/lovable-uploads/3c5452ba-fd70-4412-a4d4-aff0abe67a0a.png",
  },
  {
    id: 2,
    bgImage: "/lovable-uploads/f5fa6c1e-b6ee-49c3-a80c-83267aa804a9.png",
  },
  {
    id: 3,
    bgImage: "/lovable-uploads/93d1d5a1-a64a-4dbf-8a04-183eb624bf25.png",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const startAutoSlide = () => {
    if (!isAutoPlay) return;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
  };

  useEffect(() => {
    if (isAutoPlay) {
      startAutoSlide();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isAutoPlay]);

  const handleSlideClick = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setIsAutoPlay(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsAutoPlay(true);
  };

  return (
    <div className="hero-slider w-full overflow-hidden mt-20 relative">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${
            index === currentSlide ? "active" : ""
          } ${slide.bgColor || ""} rounded-xl shadow-lg h-full cursor-pointer`}
          onClick={handleSlideClick}
          role="button"
          tabIndex={0}
          aria-label={`Slide ${index + 1}, click to advance`}
          style={slide.bgImage ? { 
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        />
      ))}
    </div>
  );
};

export default Hero;
