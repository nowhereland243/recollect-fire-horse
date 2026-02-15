// Generate narrative-data.ts directly
const fs = require('fs');
const path = require('path');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'layerb_data.json'), 'utf8'));

function filterSections(sections) {
  return sections.filter(s => {
    const body = s.body.trim();
    if (body.startsWith('**Word Count:') || body.startsWith('**字数:')) return false;
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

function bodyToHtml(body) {
  if (body.includes('</p><p>')) {
    return '<p>' + body + '</p>';
  }
  const paragraphs = body.split('\n\n').map(p => p.trim()).filter(Boolean);
  if (paragraphs.length === 1) return '<p>' + paragraphs[0] + '</p>';
  return paragraphs.map(p => '<p>' + p + '</p>').join('');
}

// Build the full TS file
let ts = `// ═══════════════════════════════════════════════════════════
// RECOLLECT — Layer B Narrative Data
// Auto-generated from Layer B markdown files
// ═══════════════════════════════════════════════════════════

export interface NarrativeSection {
  title: string;
  body: string;  // HTML content
}

export interface TopicNarrative {
  narrative: NarrativeSection[];
  narrativeCN: NarrativeSection[];
}

export const narrativeData: Record<string, TopicNarrative> = {\n`;

for (const [topicId, topicData] of Object.entries(data)) {
  const enSections = filterSections(topicData.narrative);
  const cnSections = filterSections(topicData.narrativeCN);
  
  ts += `  '${topicId}': {\n`;
  ts += `    narrative: [\n`;
  for (const s of enSections) {
    const html = bodyToHtml(s.body);
    // Use template literal for body to handle quotes easily
    ts += `      { title: ${JSON.stringify(s.title)}, body: ${JSON.stringify(html)} },\n`;
  }
  ts += `    ],\n`;
  
  ts += `    narrativeCN: [\n`;
  for (const s of cnSections) {
    const html = bodyToHtml(s.body);
    ts += `      { title: ${JSON.stringify(s.title)}, body: ${JSON.stringify(html)} },\n`;
  }
  ts += `    ],\n`;
  ts += `  },\n`;
}

ts += `};\n`;

const outPath = path.join(__dirname, '..', 'src', 'narrative-data.ts');
fs.writeFileSync(outPath, ts, 'utf8');
console.log(`Written to ${outPath}`);
console.log(`File size: ${(Buffer.byteLength(ts, 'utf8') / 1024).toFixed(1)} KB`);
