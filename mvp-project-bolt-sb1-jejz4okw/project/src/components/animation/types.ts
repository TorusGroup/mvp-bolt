import { ReactNode } from 'react';

export interface AnimationConfig {
  opacity?: number;
  y?: number;
}

export interface AnimationProps {
  children: ReactNode;
  initial?: AnimationConfig;
  animate?: AnimationConfig;
  className?: string;
}