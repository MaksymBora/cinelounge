export const formatDate = (
  date: string,
  monthType: 'short' | 'long' = 'long'
) => {
  return new Date(date).toLocaleString('en-US', {
    day: 'numeric',
    year: 'numeric',
    month: monthType,
  });
};

export function colorPercentage(pct: number) {
  const percentColors = [
    { pct: 0.45, color: { r: 0xff, g: 0, b: 0 } },
    { pct: 0.68, color: { r: 255, g: 0xff, b: 0 } },
    { pct: 0.9, color: { r: 0, g: 255, b: 180 } },
  ];

  // eslint-disable-next-line no-var, vars-on-top
  for (var i = 1; i < percentColors.length - 1; i += 1) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  // eslint-disable-next-line block-scoped-var
  const lower = percentColors[i - 1];
  // eslint-disable-next-line block-scoped-var
  const upper = percentColors[i];
  const range = upper.pct - lower.pct;
  const rangePct = (pct - lower.pct) / range;
  const pctLower = 1 - rangePct;
  const pctUpper = rangePct;
  const color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return `rgb(${[color.r, color.g, color.b].join(',')})`;
}
