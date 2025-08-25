import React from 'react';
import { Box } from '@mui/material';

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  tabIndex?: number;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler;
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = '',
  style = {},
  tabIndex = 0,
  ariaLabel,
  onClick,
}) => (
  <Box
    component="li"
    tabIndex={tabIndex}
    aria-label={ariaLabel}
    className={`card-container ${className}`.trim()}
    style={style}
    onClick={onClick}
  >
    {children}
  </Box>
);

export default CardContainer;
