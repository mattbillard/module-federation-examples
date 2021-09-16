import * as React from 'react';
import { useEffect } from 'react';
import './button.css';

export const ButtonApp1 = () => {
  useEffect(() => {
    console.log('....Hooks are working, proving React is shared between micro apps: ButtonApp1');
  }, []);

  return <button className="button-app1">Button - App1</button>;
};

export default ButtonApp1;
