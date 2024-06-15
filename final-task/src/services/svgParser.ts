function parseSVG(svgCode: string) {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgCode, 'image/svg+xml');
  const svgElement = svgDoc.documentElement;
  return svgElement;
}

export default parseSVG;
