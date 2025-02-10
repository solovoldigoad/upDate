"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Rocket, Building } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    icon: Briefcase,
    price: "₹1,999",
    features: ["Professional Resume Making Services", "Free 3 Guaranteed interview 100%", "3 Time Free Modification facility of your Resume" ],
    color: "from-red-400 to-red-600",
  },
  {
    name: "Growth",
    icon: Rocket,
    price: "₹1999+(₹777 Top-up)=₹2778 ",
    features: [
      "If you are selected and work for 99 Days, you will get 100% Amount of Service Charge Refunded",
      "Professional Resume Making Services",
      "Free 3 Guaranteed Interview 100%",
      "3 Time Free Modification facility of your Resume",
    ],
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Enterprise",
    icon: Building,
    price: "Custom",
    features: [
      "100% Service Fee Refund if you're hired and work for 99 days!",
      "Invest in your future, risk-free",
      "and get 100% refund if you're not satisfied with the service",
      "Custom based Resume",
    ],
    color: "from-black to-black",
  },
]

export function PricingDetails() {
  const [hoveredTier, setHoveredTier] = useState<string | null>(null)

  return (
    <div className="p-4 md:p-6 bg-gray-100 rounded-lg overflow-y-auto max-h-[80vh]">
      <h2 className="text-lg md:text-2xl font-bold text-center mb-4 md:mb-6 text-gray-800">
        Choose Your Hiring Power
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            className={`bg-gradient-to-br ${tier.color} rounded-lg shadow-lg p-4 md:p-5 text-white relative overflow-hidden`}
            whileHover={{ scale: 1.02 }}
            onHoverStart={() => setHoveredTier(tier.name)}
            onHoverEnd={() => setHoveredTier(null)}
          >
            <div className="hidden md:block absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full" />
            <tier.icon className="w-8 h-8 md:w-10 md:h-10 mb-3" />
            <h3 className="text-xl md:text-2xl font-bold mb-2">{tier.name}</h3>
            <p className="text-2xl md:text-3xl font-bold mb-4">{tier.price}</p>
            
            <ul className="space-y-2 text-sm md:text-base">
              {tier.features.map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 flex-shrink-0 fill-current" viewBox="0 0 20 20">
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                  <span className="leading-tight">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              className="mt-4 md:mt-6 w-full bg-white text-blue-600 font-bold py-2 px-4 rounded text-sm md:text-base hover:bg-blue-100 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>

            {hoveredTier === tier.name && (
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

