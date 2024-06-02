// SceneScreen.tsx

import React from 'react';
import ThreeScene from '../treeComp/treescene';

const SceneScreen: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen max-w-120 max-h-full">
      <ThreeScene />
    </div>
  );
};

export default SceneScreen;

