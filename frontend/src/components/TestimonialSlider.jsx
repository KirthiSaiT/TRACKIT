import React, { useEffect, useRef } from "react";
import { Star, Shield } from "lucide-react";

const TestimonialSlider = () => {
  const scrollRef = useRef(null);
  
  const reviews = [
    {
      text: "This app has given me so much peace of mind. I can always check where my kids are, especially when they're out with friends. It's a lifesaver!",
      author: "Sarah Johnson",
      company: "Parent of two teenagers",
      rating: 5
    },
    {
      text: "As a busy mom, I love how easy it is to use this app. I can see my family's locations at a glance, and the real-time updates are incredibly reliable.",
      author: "Emily Carter",
      company: "Working mother",
      rating: 5
    },
    {
      text: "I travel a lot for work, and this app helps me stay connected with my family. Knowing they're safe makes being away from home so much easier.",
      author: "David Martinez",
      company: "Frequent traveler",
      rating: 5
    },
    {
      text: "The app is so intuitive and user-friendly. Even my elderly parents can use it without any issues. It's great for keeping track of everyone in the family.",
      author: "Linda Thompson",
      company: "Daughter and caregiver",
      rating: 5
    },
    {
      text: "We recently went on a family vacation, and this app made everything so much easier. We could track each other in crowded places, and the app’s battery-saving mode was a lifesaver. It’s the perfect tool for families who want to stay connected!",
      author: "David Kim",
      company: "Father of three",
      rating: 5
    }
  ];
  const allReviews = [...reviews, ...reviews];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const animateScroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(animateScroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-black py-10 md:py-16"> {/* Added consistent padding */}
      <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
        <Shield className="w-8 h-8 text-emerald-500" />
        <h2 className="text-white text-xl md:text-3xl font-bold tracking-wide">CLIENT TESTIMONIALS</h2>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 px-4"
          style={{
            width: "max-content",
            animation: "scroll 60s linear infinite"
          }}
        >
          {allReviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-gradient-to-b from-[#111111] to-[#0A0A0A] rounded-3xl p-6 md:p-8 w-64 sm:w-80 md:w-96 h-[300px] flex-shrink-0"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 text-[#FFD700] fill-[#FFD700]"
                  />
                ))}
              </div>
              <div className="h-[160px] overflow-hidden">
                <p className="text-[#8A8A8E] text-sm md:text-lg leading-relaxed font-light">"{review.text}"</p>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="w-10 h-10 rounded-full bg-[#1A1A1A] overflow-hidden">
                  <img 
                    src="/api/placeholder/40/40" 
                    alt="profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium text-sm italic">{review.author}</p>
                  <p className="text-[#8A8A8E] text-xs italic">{review.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialSlider;
