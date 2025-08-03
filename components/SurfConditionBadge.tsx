import { getConditionColor, formatSurfCondition } from '@/types'
import type { SurfCondition } from '@/types'

interface SurfConditionBadgeProps {
  condition: {
    key: SurfCondition;
    value: string;
  };
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function SurfConditionBadge({ 
  condition, 
  size = 'md', 
  className = '' 
}: SurfConditionBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const colorClasses = getConditionColor(condition)

  return (
    <span className={`inline-block font-medium rounded-full ${sizeClasses[size]} ${colorClasses} ${className}`}>
      {formatSurfCondition(condition)}
    </span>
  )
}