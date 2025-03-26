
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface Slide {
  id: number;
  bgImage?: string;
  bgColor?: string;
  content?: React.ReactNode;
}

const slides: Slide[] = [
  {
    id: 1,
    bgImage: "/lovable-uploads/bf75f3e8-beab-45d6-9369-6f68f8b09c3b.png",
    content: (
      <div className="relative w-full h-full flex items-center">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center w-full">
          <Link to="/play-mega-millions">
            <Button className="bg-white text-lottery-pink hover:bg-white/90 font-bold text-lg rounded-full px-8 py-6 mt-60 md:mt-48 shadow-lg">
              JOGAR AGORA!
            </Button>
          </Link>
        </div>
      </div>
    )
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
    // Move to the next slide when the current slide is clicked
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    // Reset autoplay timer
    setIsAutoPlay(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    // Restart autoplay after manual navigation
    setIsAutoPlay(true);
  };

  return (
    <div className="hero-slider w-full overflow-hidden rounded-xl shadow-lg relative h-[400px] md:h-[450px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`slide ${
            index === currentSlide ? "active" : ""
          } ${slide.bgColor || ""} cursor-pointer h-full`}
          onClick={handleSlideClick}
          role="button"
          tabIndex={0}
          aria-label={`Slide ${index + 1}, click to advance`}
          style={slide.bgImage ? { 
            backgroundImage: `url(${slide.bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          } : {}}
        >
          {slide.content}
        </div>
      ))}
      
      <div className="slide-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`slide-dot ${index === currentSlide ? "active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentSlide(index);
              setIsAutoPlay(false);
              if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
              }
              setIsAutoPlay(true);
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
