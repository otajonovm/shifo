
// Add React import for React.ReactNode
import React from 'react';

export enum UserRole {
  ADMIN = 'Admin',
  DOCTOR = 'Doctor'
}

export interface GuideSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  roles: UserRole[];
  content: string;
  subsections?: { title: string; content: string }[];
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}
