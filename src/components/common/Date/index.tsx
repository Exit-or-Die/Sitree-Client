'use client';

import { formatToDate } from '@/utils/date';
import { useEffect, useState } from 'react';

export const FormattedDate = ({ isoString }: { isoString: string }) => {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(formatToDate(isoString));
  }, [isoString]);

  return <p>{formattedDate}</p>;
};
