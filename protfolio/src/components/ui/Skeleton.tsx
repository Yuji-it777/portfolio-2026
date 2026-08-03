import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className = '',
  variant = 'rectangular',
  width = '100%',
  height,
  animation = 'wave',
}: SkeletonProps) {
  const baseStyles = 'skeleton';
  const animationClass = animation === 'wave' ? 'animate-shimmer' : animation === 'pulse' ? 'animate-pulse' : '';

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    card: 'rounded-xl',
  };

  const style: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${baseStyles} ${variantStyles[variant]} ${animationClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/3] border border-white/5 rounded-sm overflow-hidden mb-3 bg-white/[0.02]">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <Skeleton variant="text" width="60px" height="10px" />
          <Skeleton variant="text" width="120px" height="20px" className="mt-2" />
        </div>
        <Skeleton variant="circular" width="24px" height="24px" />
      </div>
    </div>
  );
}

export function SectionSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-8">
      <Skeleton variant="text" width="100px" />
      <Skeleton variant="text" width="60%" height="3rem" />
      <Skeleton variant="text" width="80%" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} variant="circular" width="80px" height="32px" />
        ))}
      </div>
    </div>
  );
}