import { Check } from "lucide-react";

interface InclusionsSectionProps {
  inclusions: string[];
}

export function InclusionsSection({ inclusions }: InclusionsSectionProps) {
  if (!inclusions || inclusions.length === 0) {
    return null;
  }

  return (
    <section id="inclusions" className="mb-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">What's Included</h2>
          <p className="text-muted-foreground">
            Here's everything that's included in your tour package
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="grid gap-4">
            {inclusions.map((inclusion, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{inclusion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 