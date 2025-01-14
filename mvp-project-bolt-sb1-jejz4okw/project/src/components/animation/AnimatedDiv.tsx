import React, { forwardRef } from 'react';
import type { AnimationProps } from './types';
import { useAnimation } from './useAnimation';

export const AnimatedDiv = forwardRef<HTMLDivElement, AnimationProps>(
  ({ children, initial, animate, className = '' }, ref) => {
    const animationStyle = useAnimation(initial, animate);
    
    return (
      <div
        ref={ref}
        className={`${className} animate-fade-in`}
        style={animationStyle}
      >
        {children}
      </div>
    );
  }
);

AnimatedDiv.displayName = 'AnimatedDiv';