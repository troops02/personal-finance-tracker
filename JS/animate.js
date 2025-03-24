const txnAnimation = [
  { transform: 'translateX(100px)', opacity: 0 },
  { transform: 'translateX(0px)', opacity: 1 },
];

const txnTiming = {
  duration: 800,
  easing: 'ease-in-out',
  fill: 'forwards',
};

export { txnAnimation, txnTiming };
