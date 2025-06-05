'use client';

import dynamic from 'next/dynamic';

const DraggableList = dynamic(() => import('./DraggableList'), {
  ssr: false,
});

export default DraggableList;
