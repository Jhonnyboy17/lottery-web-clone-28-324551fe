
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  const handlePlayNowClick = () => {
    navigate('/#lottery-games');
  };

  return (
    <div className="hero-banner w-full overflow-hidden mt-20 relative rounded-xl shadow-lg">
      <div 
        className="w-full h-[400px] cursor-pointer relative"
        style={{ 
          backgroundImage: `url('/lovable-uploads/7db28a77-4bc9-4206-af67-d426c6710c51.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start md:pl-16 z-10">
          <div className="text-center md:text-left">
            <div className="bg-white dark:bg-lottery-dark-card bg-opacity-90 dark:bg-opacity-90 rounded-full px-6 py-2 mb-4 inline-block">
              <p className="text-lottery-pink font-bold text-lg">10% off na primeira compra!</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
              Jogue em Real<br />
              Ganhe em Dolar
            </h1>
            <button 
              onClick={handlePlayNowClick}
              className="bg-lottery-pink hover:bg-lottery-pink/90 text-white font-bold px-8 py-3 rounded-full transition-all duration-300"
            >
              JOGAR AGORA!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
