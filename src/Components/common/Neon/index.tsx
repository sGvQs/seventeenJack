import React from 'react';
import { StyledNeon } from './styled';

type NeonProps = {
  label: string;
};

export const Neon: React.FC<NeonProps> = ({ label }) => {
  return <StyledNeon>{label}</StyledNeon>;
};
