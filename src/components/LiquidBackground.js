import React, { useRef, useEffect, useState } from 'react';

const LiquidBackground = () => {
  const canvasRef = useRef(null);
  const [showSparkles, setShowSparkles] = useState(true);
  const [particleCount, setParticleCount] = useState(150);
  const particlesRef = useRef([]);
  const animationFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const colors = [
      'rgba(102, 126, 234, 0.6)', // Indigo
      'rgba(118, 75, 162, 0.6)',  // Purple
      'rgba(240, 147, 251, 0.6)', // Pink
      'rgba(245, 87, 108, 0.6)',  // Red
      'rgba(79, 172, 254, 0.6)'   // Blue
    ];

    const initializeParticles = (count = 150) => {
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 20 + 10,
          color: colors[Math.floor(Math.random() * colors.length)],
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * 2 - 1,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: Math.random() * 0.02 - 0.01
        });
      }
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initializeParticles(particleCount);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const noise = (x, y, t) => {
      return Math.sin(x * 0.01 + y * 0.01 + t * 0.001) * 0.5 + 0.5;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(102, 126, 234, 0.1)');
      gradient.addColorStop(0.5, 'rgba(118, 75, 162, 0.1)');
      gradient.addColorStop(1, 'rgba(79, 172, 254, 0.1)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001;
      
      particlesRef.current.forEach(particle => {
        const n = noise(particle.x, particle.y, time);
        particle.x += particle.speedX + Math.sin(time + particle.x * 0.01) * 0.5;
        particle.y += particle.speedY + Math.cos(time + particle.y * 0.01) * 0.5;
        particle.angle += particle.angleSpeed;

        if (particle.x < -particle.radius) particle.x = canvas.width + particle.radius;
        if (particle.x > canvas.width + particle.radius) particle.x = -particle.radius;
        if (particle.y < -particle.radius) particle.y = canvas.height + particle.radius;
        if (particle.y > canvas.height + particle.radius) particle.y = -particle.radius;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        gradient.addColorStop(0, particle.color.replace('0.6', '0.3'));
        gradient.addColorStop(1, 'transparent');
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.restore();
      });

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }


      if (showSparkles) {
        for (let i = 0; i < 30; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 1;
          const opacity = Math.sin(time * 2 + i) * 0.5 + 0.5;
          
          ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameIdRef.current = requestAnimationFrame(draw);
    };

    initializeParticles(particleCount);
    draw();

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showSparkles, particleCount]);

  const increaseParticles = () => {
    const newCount = Math.min(particleCount + 50, 500);
    setParticleCount(newCount);
  };

  const decreaseParticles = () => {
    const newCount = Math.max(particleCount - 50, 50);
    setParticleCount(newCount);
  };

  const toggleSparkles = () => {
    setShowSparkles(!showSparkles);
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />
      
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 p-3 bg-black bg-opacity-20 backdrop-blur-sm rounded-lg border border-white border-opacity-20">
        <button
          onClick={increaseParticles}
          className="px-3 py-1 text-white text-sm bg-blue-600 bg-opacity-50 hover:bg-opacity-70 rounded transition-colors"
          title="More Particles"
        >
          + Particles
        </button>
        <button
          onClick={decreaseParticles}
          className="px-3 py-1 text-white text-sm bg-purple-600 bg-opacity-50 hover:bg-opacity-70 rounded transition-colors"
          title="Fewer Particles"
        >
          - Particles
        </button>
        <button
          onClick={toggleSparkles}
          className="px-3 py-1 text-white text-sm bg-pink-600 bg-opacity-50 hover:bg-opacity-70 rounded transition-colors"
          title="Toggle Sparkles"
        >
          {showSparkles ? 'Hide Sparkles' : 'Show Sparkles'}
        </button>
      </div>
    </>
  );
};

export default LiquidBackground;
