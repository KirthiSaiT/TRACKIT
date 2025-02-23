// import React, { useState } from "react";
// import { Shield, Lock, Network, Globe2, Bell, AlertTriangle, CheckCircle, ToggleLeft, ToggleRight } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";

// const GlobalSecurity = () => {
//   const securityFeatures = [
//     {
//       icon: Shield,
//       title: "Global Coverage",
//       description: "Our tracking system works across borders with seamless connectivity in over 190+ countries, ensuring your loved ones are protected wherever they go."
//     },
//     {
//       icon: Lock,
//       title: "End-to-End Encryption",
//       description: "Military-grade encryption protects all location data and communications, ensuring only authorized users can access sensitive information."
//     },
//     {
//       icon: Network,
//       title: "International Response Network",
//       description: "Connected with local authorities and emergency services worldwide for rapid response in any situation."
//     },
//     {
//       icon: Globe2,
//       title: "24/7 Global Monitoring",
//       description: "Our centers across multiple time zones provide round-the-clock monitoring and support in multiple languages."
//     }
//   ];

//   const [securityStatus, setSecurityStatus] = useState("Secure");
//   const [alertsEnabled, setAlertsEnabled] = useState(true);
//   const [riskLevel, setRiskLevel] = useState("Low");

//   return (
//     <div className="w-full min-h-screen bg-black py-16 px-4 md:px-8 flex">
//       <div className="max-w-4xl w-2/3">
//         <div className="space-y-6">
//           {securityFeatures.map((feature, index) => (
//             <div key={index} className="bg-zinc-900/80 rounded-lg p-6 border border-zinc-800">
//               <div className="flex items-start gap-4">
//                 <div className="p-2 bg-green-900/20 rounded-lg">
//                   <feature.icon className="w-6 h-6 text-green-500" />
//                 </div>
//                 <div>
//                   <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
//                   <p className="text-gray-400 text-lg leading-relaxed">{feature.description}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Interactive Security Module */}
//       <div className="w-1/3 ml-8">
//         <Card className="bg-zinc-900 border border-zinc-800 rounded-lg p-6">
//           <CardContent>
//             <h2 className="text-white text-xl font-semibold mb-4">Security Status</h2>
//             <div className="flex items-center gap-4 mb-4">
//               {securityStatus === "Secure" ? (
//                 <CheckCircle className="text-green-500 w-6 h-6" />
//               ) : (
//                 <AlertTriangle className="text-red-500 w-6 h-6" />
//               )}
//               <span className={`text-lg font-medium ${securityStatus === "Secure" ? "text-green-400" : "text-red-400"}`}>
//                 {securityStatus}
//               </span>
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-300">Risk Level:</span>
//               <span className={`text-lg font-semibold ${riskLevel === "Low" ? "text-green-400" : riskLevel === "Medium" ? "text-yellow-400" : "text-red-400"}`}>{riskLevel}</span>
//             </div>

//             <div className="flex items-center justify-between mb-4">
//               <span className="text-gray-300">Alerts:</span>
//               <button onClick={() => setAlertsEnabled(!alertsEnabled)} className="flex items-center gap-2">
//                 {alertsEnabled ? <ToggleRight className="text-green-500 w-6 h-6" /> : <ToggleLeft className="text-gray-500 w-6 h-6" />}
//                 <span className={alertsEnabled ? "text-green-400" : "text-gray-400"}>{alertsEnabled ? "Enabled" : "Disabled"}</span>
//               </button>
//             </div>

//             <button
//               onClick={() => {
//                 setSecurityStatus(securityStatus === "Secure" ? "At Risk" : "Secure");
//                 setRiskLevel(riskLevel === "Low" ? "High" : "Low");
//               }}
//               className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-lg"
//             >
//               Toggle Security Status
//             </button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default GlobalSecurity;



import React, { useEffect, useRef } from "react";
import { Shield, Lock, Network, Globe2, ShieldCheck } from "lucide-react";

const GlobalSecurity = () => {
  const scrollRef = useRef(null);
  
  const securityFeatures = [
    {
      icon: Shield,
      title: "Global Coverage",
      description: "Our tracking system works across borders with seamless connectivity in over 190+ countries, ensuring your loved ones are protected wherever they go."
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "Military-grade encryption protects all location data and communications, ensuring only authorized users can access sensitive information."
    },
    {
      icon: Network,
      title: "International Response Network",
      description: "Connected with local authorities and emergency services worldwide for rapid response in any situation."
    },
    {
      icon: Globe2,
      title: "24/7 Global Monitoring",
      description: "Our centers across multiple time zones provide round-the-clock monitoring and support in multiple languages."
    }
  ];

  const allFeatures = [...securityFeatures, ...securityFeatures];

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

    const intervalId = setInterval(animateScroll, 20);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-black py-10 md:py-16"> {/* Removed min-h-screen */}
      <div className="px-4 mb-6 md:mb-8">
        <div className="flex items-center justify-center gap-3 md:gap-4">
          <div className="p-2 rounded-lg">
            <ShieldCheck className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
          </div>
          <h2 className="text-white text-xl md:text-3xl font-bold tracking-wider text-center">GLOBAL SECURITY OVERVIEW</h2>
        </div>
      </div>
      
      <div className="relative w-full overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex space-x-4 md:space-x-6 px-4"
          style={{ width: "max-content", animation: "scroll 60s linear infinite" }}
        >
          {allFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-[#111111] rounded-xl p-5 md:p-8 w-64 sm:w-80 md:w-96 flex-shrink-0"
            >
              <div className="mb-4 md:mb-6">
                <feature.icon className="w-6 h-6 md:w-8 md:h-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-white text-lg md:text-2xl font-semibold mb-2 md:mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm md:text-lg leading-relaxed">{feature.description}</p>
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

export default GlobalSecurity;
