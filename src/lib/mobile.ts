// Mobile utilities for enhanced user experience
export const vibrate = (pattern: number | number[] = 10) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern);
  }
};

export const isIOS = () => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = () => {
  return /Android/.test(navigator.userAgent);
};

export const isMobileDevice = () => {
  return isIOS() || isAndroid() || window.innerWidth < 768;
};

export const getDeviceInfo = () => {
  return {
    isIOS: isIOS(),
    isAndroid: isAndroid(),
    isMobile: isMobileDevice(),
    userAgent: navigator.userAgent,
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    pixelRatio: window.devicePixelRatio || 1
  };
};
