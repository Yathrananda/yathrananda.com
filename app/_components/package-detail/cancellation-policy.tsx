"use client"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"
import type { CancellationPolicy } from "@/types/package-detail"

interface CancellationPolicyProps {
  cancellationPolicy: CancellationPolicy
}

export function CancellationPolicySection({ cancellationPolicy }: CancellationPolicyProps) {
  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Cancellation Policy</h2>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Refund Rules</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Please read our cancellation policy carefully before booking.
            </p>
          </div>
        </div>

        <ul className="space-y-2">
          {cancellationPolicy.rules.map((rule, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  )
}
