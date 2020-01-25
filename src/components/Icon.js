import React from 'react';

const Icon = ({ className, color, icon, size = 24, ...rest }) => {
  return {
    stackoverflow: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 120 120">
        <path d="M84.4 93.8V70.6h7.7v30.9H22.6V70.6h7.7v23.2z" />
        <path d="M38.8 68.4l37.8 7.9 1.6-7.6-37.8-7.9-1.6 7.6zm5-18l35 16.3 3.2-7-35-16.4-3.2 7.1zm9.7-17.2l29.7 24.7 4.9-5.9-29.7-24.7-4.9 5.9zm19.2-18.3l-6.2 4.6 23 31 6.2-4.6-23-31zM38 86h38.6v-7.7H38V86z" />
      </svg>
    ),
    dribbble: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M16.42 18.42C16 16.5 15.5 14.73 15 13.17c.5-.07 1-.11 1.58-.11h.02c.93 0 1.95.12 3.06.37-.38 2.07-1.58 3.84-3.24 4.99M12 19.8c-1.74 0-3.34-.57-4.64-1.54.28-.45.87-1.32 1.82-2.22.96-.93 2.32-1.89 4.05-2.46.59 1.67 1.13 3.57 1.54 5.71-.86.33-1.77.51-2.77.51M4.2 12v-.11c.22.01.51.01.85.01h.01c1.56-.01 4.3-.14 7.08-1.01.15.33.3.67.45 1.03-1.86.62-3.32 1.61-4.4 2.58-1.03.96-1.74 1.89-2.15 2.5-1.14-1.34-1.84-3.09-1.84-5m4.35-7c.55.65 1.63 2.06 2.79 4.25-2.34.71-4.73.87-6.16.87h-.13c-.24 0-.45 0-.62-.01C5 7.87 6.5 6 8.55 5M12 4.2c1.84 0 3.53.64 4.86 1.71C15.84 7.14 14.5 8 13.03 8.65 12 6.67 11 5.25 10.34 4.38c.54-.11 1.09-.18 1.66-.18m6.13 2.98c.97 1.24 1.58 2.78 1.66 4.45-1.13-.24-2.19-.35-3.19-.35h-.01c-.8 0-1.55.07-2.26.19-.17-.42-.33-.82-.52-1.21 1.58-.69 3.09-1.68 4.32-3.08M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2z" />
      </svg>
    ),
    github: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
      </svg>
    ),
    email: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-1.11-.9-2-2-2z" />
      </svg>
    ),
    menu: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M2 13h16v-2H2zm0 7h20v-2H2zM2 6h20V4H2z" />
      </svg>
    ),
    arrowRight: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M3 11h14.17l-3.58-3.59L15 6l6 6-6 6-1.41-1.41L17.17 13H3z" />
      </svg>
    ),
    chevronRight: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
      </svg>
    ),
    close: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
      </svg>
    ),
    send: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
      </svg>
    ),
    slideRight: () => (
      <svg className={className} fill={color} width="18" height="42" viewBox="0 0 18 42">
        <path d="M-.03 1.375L1.53.125l16.5 20.625-16.5 20.625-1.562-1.25 15.5-19.375z" />
      </svg>
    ),
    slideLeft: () => (
      <svg className={className} fill={color} width="18" height="42" viewBox="0 0 18 42">
        <path d="M18.03 1.375L16.47.125-.031 20.75l16.5 20.625 1.562-1.25L2.53 20.75z" />
      </svg>
    ),
    play: () => (
      <svg className={className} fill={color} width={size} height={size} viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    ),
    pause: () => (
      <svg className={className} width={size} height={size} viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    ),
  }[icon]();
};

export default Icon;
