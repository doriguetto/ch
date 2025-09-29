import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import YoutubeSVG from '../../assets/youtube.svg?react';

import coolImage from "../../assets/cool_image.png";
import './app.scss';

const App = () => (
    <div className="app">IT WORKED!!!!
        <span>
            <YoutubeSVG/>
        </span>
        <span>
            <img src={coolImage} alt="logo" />
        </span>
    </div>
);

export default async function decorate(block: HTMLDivElement) {
  createRoot(block).render(<App />);
}
