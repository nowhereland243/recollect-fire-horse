// Parse all Layer B markdown files and generate TypeScript data
const fs = require('fs');
const path = require('path');

const baseDir = '/Users/nolanfeng/Project/CNY 2026/Research & Copy';

const topicDirs = [
  'Topic_1_肇始_Origins',
  'Topic_2_沿革_Evolution',
  'Topic_3_港台_HK_Taiwan',
  'Topic_4_海外_Overseas',
  'Topic_5_生肖_Zodiac',
  'Topic_6_俗礼_Customs',
  'Topic_7_年货_Goods',
  'Topic_8_归途_Homebound',
  'Topic_9_货殖_Commerce',
  'Topic_10_今古_Meaning',
];

const topicIds = [
  'origins', 'evolution', 'hk-taiwan', 'overseas', 'zodiac',
  'customs', 'goods', 'homebound', 'commerce', 'meaning'
];

function parseLayerB(content) {
  const sections = [];
  // Split by --- dividers
  const parts = content.split(/\n---\n/);
  
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    
    // Look for ### headings
    const headingMatch = trimmed.match(/^###\s+(.+)/m);
    if (!headingMatch) {
      // Skip the file header (# Layer B, ## Topic) or other non-section content
      // But check if it has substantial prose (more than just headers)
      const lines = trimmed.split('\n').filter(l => !l.startsWith('#') && l.trim());
      if (lines.length > 0 && !trimmed.startsWith('# Layer')) {
        // Prose without a heading — could be intro
        sections.push({
          title: '',
          body: lines.join('\n\n')
        });
      }
      continue;
    }
    
    const title = headingMatch[1].trim();
    // Get everything after the heading
    const bodyStart = trimmed.indexOf('\n', trimmed.indexOf(headingMatch[0]));
    const body = bodyStart >= 0 ? trimmed.substring(bodyStart).trim() : '';
    
    if (body) {
      // Split into paragraphs and clean
      const paragraphs = body.split('\n\n').map(p => p.trim()).filter(Boolean);
      sections.push({
        title,
        body: paragraphs.join('</p><p>')
      });
    }
  }
  
  return sections;
}

const output = {};

for (let i = 0; i < topicDirs.length; i++) {
  const dir = topicDirs[i];
  const id = topicIds[i];
  const num = i + 1;
  
  const enFile = path.join(baseDir, dir, `CNY_T${num}_LayerB_EN.md`);
  const cnFile = path.join(baseDir, dir, `CNY_T${num}_LayerB_CN.md`);
  
  let enSections = [];
  let cnSections = [];
  
  if (fs.existsSync(enFile)) {
    const content = fs.readFileSync(enFile, 'utf8');
    enSections = parseLayerB(content);
  }
  
  if (fs.existsSync(cnFile)) {
    const content = fs.readFileSync(cnFile, 'utf8');
    cnSections = parseLayerB(content);
  }
  
  output[id] = { narrative: enSections, narrativeCN: cnSections };
}

// Output as JSON for inspection
console.log(JSON.stringify(output, null, 2));
