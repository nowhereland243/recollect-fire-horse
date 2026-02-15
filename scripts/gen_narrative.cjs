// Generate TypeScript narrative data from parsed JSON
// Reads layerb_data.json and outputs TypeScript interface + data for data.ts
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'layerb_data.json'), 'utf8'));

// Filter out metadata sections (word count, RECOLLECT attribution, etc.)
function filterSections(sections) {
  return sections.filter(s => {
    const body = s.body.trim();
    // Skip word count sections
    if (body.startsWith('**Word Count:') || body.startsWith('**字数:')) return false;
    // Skip "RECOLLECT: The Year of the Fire Horse" attribution sections
    if (body.includes('*RECOLLECT: The Year of the Fire Horse*') || 
        body.includes('*RECOLLECT: 火马之年*') ||
        body.includes('*Prepared for RECOLLECT') ||
        body.includes('*为「追忆') ||
        body.includes('*本文是「追忆') ||
        body.includes('*Target Range:') ||
        body.includes('**目标范围:') ||
        body.includes('*This story is part of') ||
        body.includes('*这是我们探索中国新年之旅') ||
        body.includes('This is the first chapter in our exploration') ||
        body.includes('*Chelsea Salon Series') ||
        body.includes('*Opening:') ||
        body.includes('*开幕:') ||
        body.includes('*研究日期') ||
        body.includes('*Research Date')) return false;
    return true;
  });
}

// Convert body text to proper HTML paragraphs
function bodyToHtml(body) {
  // If already has </p><p> tags from parser, wrap in <p>...</p>
  if (body.includes('</p><p>')) {
    return '<p>' + body + '</p>';
  }
  // Otherwise split by double newlines and wrap each in <p>
  const paragraphs = body.split('\n\n').map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 1) return '<p>' + paragraphs[0] + '</p>';
  return paragraphs.map(p => '<p>' + p + '</p>').join('');
}

// Escape for TypeScript string
function escapeTs(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n');
}

let output = '';

for (const [topicId, topicData] of Object.entries(data)) {
  const enSections = filterSections(topicData.narrative);
  const cnSections = filterSections(topicData.narrativeCN);
  
  output += `\n// === ${topicId} narrative ===\n`;
  output += `    narrative: [\n`;
  for (const s of enSections) {
    const html = bodyToHtml(s.body);
    output += `      { title: '${escapeTs(s.title)}', body: '${escapeTs(html)}' },\n`;
  }
  output += `    ],\n`;
  
  output += `    narrativeCN: [\n`;
  for (const s of cnSections) {
    const html = bodyToHtml(s.body);
    output += `      { title: '${escapeTs(s.title)}', body: '${escapeTs(html)}' },\n`;
  }
  output += `    ],\n`;
}

fs.writeFileSync(path.join(__dirname, 'narrative_ts.txt'), output);
console.log('Generated narrative_ts.txt');
console.log(`Topics: ${Object.keys(data).length}`);
for (const [id, d] of Object.entries(data)) {
  const enFiltered = filterSections(d.narrative);
  const cnFiltered = filterSections(d.narrativeCN);
  console.log(`  ${id}: ${enFiltered.length} EN / ${cnFiltered.length} CN sections`);
}
