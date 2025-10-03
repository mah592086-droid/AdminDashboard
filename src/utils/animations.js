export const fadeUp = (delay = 0) => ({ 
  initial: { opacity: 0, y: 12 }, 
  animate: { opacity: 1, y: 0 }, 
  transition: { delay, duration: 0.4 } 
});

export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.3 }
});

export const slideIn = (direction = 'left', delay = 0) => ({
  initial: { 
    opacity: 0, 
    x: direction === 'left' ? -20 : direction === 'right' ? 20 : 0,
    y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0
  },
  animate: { 
    opacity: 1, 
    x: 0, 
    y: 0 
  },
  transition: { delay, duration: 0.4 }
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay, duration: 0.3 }
});
