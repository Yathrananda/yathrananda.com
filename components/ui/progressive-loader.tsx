"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

// Hook for detecting mobile devices
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  return isMobile;
};

// Hook for detecting slow connections
export const useIsSlowConnection = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  
  useEffect(() => {
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      const checkConnection = () => {
        setIsSlowConnection(
          connection.effectiveType === 'slow-2g' || 
          connection.effectiveType === '2g' ||
          connection.downlink < 1.5
        );
      };
      
      checkConnection();
      connection.addEventListener('change', checkConnection);
      return () => connection.removeEventListener('change', checkConnection);
    }
  }, []);
  
  return isSlowConnection;
};

// Progressive loader for heavy components
interface ProgressiveLoaderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  skipOnMobile?: boolean;
  loadOnInteraction?: boolean;
}

export const ProgressiveLoader: React.FC<ProgressiveLoaderProps> = ({
  children,
  fallback = null,
  delay = 0,
  skipOnMobile = false,
  loadOnInteraction = false,
}) => {
  const [shouldLoad, setShouldLoad] = useState(!loadOnInteraction && delay === 0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = useIsMobile();
  const isSlowConnection = useIsSlowConnection();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip loading on mobile if specified
    if (skipOnMobile && isMobile) {
      return;
    }

    // Skip loading on slow connections
    if (isSlowConnection) {
      return;
    }

    // Load with delay
    if (delay > 0 && !loadOnInteraction) {
      const timer = setTimeout(() => setShouldLoad(true), delay);
      return () => clearTimeout(timer);
    }

    // Load on intersection if no interaction required
    if (!loadOnInteraction) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }
  }, [delay, loadOnInteraction, isMobile, isSlowConnection, skipOnMobile]);

  const handleInteraction = () => {
    if (loadOnInteraction && !hasInteracted) {
      setHasInteracted(true);
      setShouldLoad(true);
    }
  };

  const shouldSkip = (skipOnMobile && isMobile) || isSlowConnection;

  return (
    <div
      ref={ref}
      onClick={handleInteraction}
      onMouseEnter={handleInteraction}
      onFocus={handleInteraction}
    >
      {shouldSkip ? (
        fallback || <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />
      ) : shouldLoad ? (
        children
      ) : (
        fallback || <div className="w-full h-32 bg-gray-100 animate-pulse rounded" />
      )}
    </div>
  );
};

// Lazy load heavy sections
export const LazySection = dynamic(() => 
  Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
  {
    loading: () => <div className="w-full h-64 bg-gray-100 animate-pulse rounded" />,
    ssr: false,
  }
);

// Critical content loader - loads immediately on mobile, deferred otherwise
interface CriticalContentProps {
  children: React.ReactNode;
  mobilePriority?: boolean;
}

export const CriticalContent: React.FC<CriticalContentProps> = ({
  children,
  mobilePriority = true,
}) => {
  const isMobile = useIsMobile();
  const [shouldLoad, setShouldLoad] = useState(mobilePriority);

  useEffect(() => {
    if (!mobilePriority || !isMobile) {
      // Defer loading slightly on desktop
      const timer = setTimeout(() => setShouldLoad(true), 100);
      return () => clearTimeout(timer);
    }
  }, [mobilePriority, isMobile]);

  return shouldLoad ? <>{children}</> : null;
};

// Intersection-based loader
interface IntersectionLoaderProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: React.ReactNode;
}

export const IntersectionLoader: React.FC<IntersectionLoaderProps> = ({
  children,
  threshold = 0.1,
  rootMargin = "100px",
  fallback,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div ref={ref}>
      {isVisible ? children : (fallback || <div className="w-full h-48 bg-gray-50" />)}
    </div>
  );
};

// Performance metrics tracker
export const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<{
    lcp?: number;
    fid?: number;
    cls?: number;
  }>({});

  useEffect(() => {
    // Track LCP
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });

    // Track CLS
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
      setMetrics(prev => ({ ...prev, cls: clsValue }));
    });

    clsObserver.observe({ entryTypes: ['layout-shift'] });

    return () => {
      observer.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  return metrics;
};
