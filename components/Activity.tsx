
import React from 'react';
import { Activity as ActivityIcon } from 'lucide-react';

const Activity: React.FC<{ className?: string }> = ({ className }) => {
  return <ActivityIcon className={className} />;
};

export default Activity;
