const rect = thisLayer.sourceRectAtTime(time);

const padding = 20;

const right = 240;
const bottom = 30;

[thisComp.width - rect.width + 0.5 - (padding + right), thisComp.height - rect.height + 5 - padding - bottom];