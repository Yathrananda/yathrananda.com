"use client"
import { motion } from "framer-motion"
import { Phone, MessageCircle, Mail } from "lucide-react"
import type { ContactInfo } from "@/types/package-detail"

interface ContactSectionProps {
  contact: ContactInfo
}

export function ContactSection({ contact }: ContactSectionProps) {

  return (
    <motion.section
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Contact Us</h2>

      <div className="bg-card border border-border rounded-xl p-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Phone</p>
              <a
                href={`tel:${contact.phone}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">WhatsApp</p>
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-green-600 transition-colors"
              >
                {contact.whatsapp}
              </a>
            </div>
          </div>

          {/* Email */}
          {contact.email && (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-muted-foreground hover:text-blue-600 transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}
