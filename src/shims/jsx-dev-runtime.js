import React from 'react';

export const Fragment = React.Fragment;

export function jsxDEV(type, props, key) {
  return React.createElement(type, { ...props, key });
}
