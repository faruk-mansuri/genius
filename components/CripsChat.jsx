'use client';
import { Crisp } from 'crisp-sdk-web';
import { useEffect } from 'react';

const CripsChat = () => {
  useEffect(() => {
    Crisp.configure('89fcd1e1-a270-4241-af68-9764080f943a');
  }, []);

  return null;
};

export default CripsChat;
