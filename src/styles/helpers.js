export function borderRadius(radius) {
  if (!radius) {
    return '';
  } else if (!Array.isArray(radius)) {
    const r = radius / 2;

    return `
      overflow: hidden;
      border-radius: ${r}px;
      border-top-left-radius: ${r}px;
      border-top-right-radius: ${r}px;
      border-bottom-left-radius: ${r}px;
      border-bottom-right-radius: ${r}px;
    `;
  }

  return `
    overflow: hidden;
    border-top-left-radius: ${radius[0] / 2}px;
    border-top-right-radius: ${radius[1] / 2}px;
    border-bottom-left-radius: ${radius[2] / 2}px;
    border-bottom-right-radius: ${radius[3] / 2}px;
  `;
}
