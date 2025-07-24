import { X } from "lucide-react";

interface ExclusionsSectionProps {
  exclusions: string[];
}

export function ExclusionsSection({ exclusions }: ExclusionsSectionProps) {
  if (!exclusions || exclusions.length === 0) {
    return null;
  }

  return (
    <section id="exclusions" className="mb-12">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">What's Not Included</h2>
          <p className="text-muted-foreground">
            Please note these items are not included in the tour package
          </p>
        </div>
        
        <div className="bg-card rounded-lg border p-6">
          <div className="grid gap-4">
            {exclusions.map((exclusion, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                    <X className="w-3 h-3 text-red-600" />
                  </div>
                </div>
                <p className="text-sm leading-relaxed">{exclusion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 