import { useMemo } from 'react';
import type { AnimationConfig } from './types';

export function useAnimation(initial?: AnimationConfig, animate?: AnimationConfig) {
  return useMemo(() => ({
    opacity: initial?.opacity ?? 1,
    transform: `translateY(${initial?.y ?? 0}px)`,
  }), [initial?.opacity, initial?.y]);
}