"use client";
import { motion } from "framer-motion";
import { CreditCard, MessageCircle, AlertTriangle } from "lucide-react";
import type {
  BookingInfo,
  ContactInfo,
  CancellationPolicy,
} from "@/types/package-detail";

interface Props {
  bookingInfo: BookingInfo;
  cancellationPolicy: CancellationPolicy;
  contact: ContactInfo;
  packageTitle: string;
}

export function BookingAndCancellationSection({
  bookingInfo,
  cancellationPolicy,
  contact,
  packageTitle,
}: Props) {
  const handleBookNow = () => {
    const message = encodeURIComponent(
      `Hi! I would like to book the ${packageTitle} package. Please provide booking details.`
    );
    window.open(
      `https://wa.me/${contact.whatsapp.replace(
        /[^0-9]/g,
        ""
      )}?text=${message}`,
      "_blank"
    );
  };

  return (
    <motion.section
      id="booking"
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
        Booking & Cancellation
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Info Box */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Payment Details
          </h3>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Advance Payment:</span>
              <span className="text-sm text-primary font-semibold">
                ₹.{bookingInfo.advancePayment}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span className="text-sm font-medium">Balance Payment:</span>
              <span className="text-sm text-primary font-semibold">
                ₹.{bookingInfo.balancePayment}
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">Booking Rules:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {bookingInfo.bookingRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 mt-6">
            <motion.button
              onClick={handleBookNow}
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-4 rounded-lg font-semibold transition-all duration-200 hover:bg-primary-hover shadow-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CreditCard className="w-5 h-5" />
              Book Now
            </motion.button>
          </div>
        </div>

        {/* Cancellation Policy Box */}
        <motion.div
          className="bg-card border border-border rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Refund Rules
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please read our cancellation policy carefully before booking.
              </p>
            </div>
          </div>

          <ul className="space-y-2">
            {cancellationPolicy.rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.section>
  );
}
