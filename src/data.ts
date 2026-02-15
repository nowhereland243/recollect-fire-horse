// ═══════════════════════════════════════════════════════════
// RECOLLECT — Topic Data Module
// All 10 topics with bilingual titles, one-liners, and content
// ═══════════════════════════════════════════════════════════

export interface TopicSection {
  question: string;
  answer: string;
}

export interface GlossaryEntry {
  term: string;
  pinyin: string;
  meaning: string;
}

export interface Topic {
  id: number;
  numeral: string;         // Chinese numeral 壹–拾
  numeralEN: string;       // Roman numeral I–X
  titleCN: string;
  titleEN: string;
  subtitleEN: string;
  subtitleCN: string;
  oneLinerEN: string;
  oneLinerCN: string;
  tags: string[];
  readTime: string;
  sections: TopicSection[];
  glossary: GlossaryEntry[];
  closingLine: string;
}

export const topics: Topic[] = [
  {
    id: 1,
    numeral: '壹',
    numeralEN: 'I',
    titleCN: '肇始',
    titleEN: 'Origins',
    subtitleEN: 'Where the Year Begins',
    subtitleCN: '年从何起',
    oneLinerEN: 'A beast, a calendar, and the courage to start the count again.',
    oneLinerCN: '一头年兽、一部历法，以及重新开始计数的勇气。',
    tags: ['cosmology', 'calendar', 'mythology'],
    readTime: '5 min',
    sections: [
      { question: 'What is the Lunar New Year, and when did it begin?', answer: 'The Lunar New Year follows the lunisolar calendar — a system that tracks both the moon\'s phases and the sun\'s position. Its origins stretch back at least 3,500 years to the Shang Dynasty, when oracle bones recorded lunar observations and ritual sacrifices at year\'s end. The festival marks the second new moon after the winter solstice.' },
      { question: 'What is the story of the Nian?', answer: 'The legend tells of a beast called Nián that emerged from the sea or mountains on the last night of the year to devour livestock, grain, and children. Villagers discovered three weaknesses: red color, loud noise, and bright fire. Whether this tale is ancient or relatively recent folklore is debated — but the behavioral DNA of the festival (red decorations, firecrackers, lanterns) maps precisely onto these three defenses.' },
      { question: 'How does the Chinese calendar work?', answer: 'The Chinese calendar is lunisolar — months follow the moon\'s 29.5-day cycle, but leap months are periodically inserted to keep the year aligned with the solar seasons. This ensures that the Spring Festival always falls between January 21 and February 20 on the Gregorian calendar. The system also incorporates the 12-year animal zodiac and 10 Heavenly Stems, creating a 60-year "sexagenary" cycle.' },
      { question: 'What are the Twelve Animals?', answer: 'The twelve zodiac animals — Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig — were likely derived from Jupiter\'s approximately 12-year orbital cycle. Each animal governs a year, a two-hour period of the day, and a compass direction. The system is not merely symbolic — it was a practical timekeeping framework.' },
      { question: 'Why does the date change every year?', answer: 'Because the lunisolar calendar is tied to actual astronomical events (new moons, solstices), the Spring Festival\'s Gregorian date shifts annually. The festival always begins on the first new moon after the midpoint between the winter solstice and the spring equinox.' },
    ],
    glossary: [
      { term: '年', pinyin: 'Nián', meaning: 'Year; also the legendary beast said to fear red and noise' },
      { term: '农历', pinyin: 'Nónglì', meaning: 'The traditional Chinese lunisolar calendar' },
      { term: '生肖', pinyin: 'Shēngxiào', meaning: 'The twelve-animal zodiac cycle' },
      { term: '天干地支', pinyin: 'Tiāngān Dìzhī', meaning: 'Heavenly Stems and Earthly Branches — the 60-year cycle' },
    ],
    closingLine: 'We are honored to share this exploration with you.',
  },
  {
    id: 2,
    numeral: '贰',
    numeralEN: 'II',
    titleCN: '沿革',
    titleEN: 'Evolution',
    subtitleEN: 'How a Festival Survived Its Own History',
    subtitleCN: '一个节日如何幸存于自己的历史',
    oneLinerEN: 'Three abolitions, one renaming, and a festival that refused to die.',
    oneLinerCN: '三次废除、一次改名，和一个拒绝消亡的节日。',
    tags: ['politics', 'modernity', 'resilience'],
    readTime: '6 min',
    sections: [
      { question: 'Why is it called "Spring Festival" instead of "New Year"?', answer: 'In 1914, a bureaucrat proposed a compromise. The new Republic of China had adopted the Western calendar, yet hundreds of millions of people refused to abandon the lunar one. January 1st would take the name Yuandan—"First Dawn"—and the lunar celebration would be relabeled Chunjie—"Spring Festival." The people accepted the new name. They did not accept the new time.' },
      { question: 'Has anyone ever tried to abolish it?', answer: 'Three times. In 1929, the Nationalists declared the lunar calendar abolished — families celebrated behind closed doors. In 1967, at the height of the Cultural Revolution, the State Council canceled the holiday entirely — people ate dumplings in secret, muffling the sound of chopping meat with blankets. The festival survived because it could not be policed out of living memory.' },
      { question: 'What is the Fire Horse Year?', answer: 'The Chinese calendar cycles through sixty combinations of twelve animals and five elements. Every sixty years, the Fire Horse returns. The last was 1966, when the Cultural Revolution began. Before that, 1906 saw a crumbling Qing dynasty. 2026 will be the next.' },
      { question: 'When did the festival become a television event?', answer: 'In 1983, China Central Television broadcast its first Spring Festival Gala — a live, synchronized countdown. Before the Gala, celebrations were local and asynchronous. Afterward, an entire nation experienced the same stroke of midnight from Beijing. The television replaced the ancestral altar as the focal point of the living room.' },
      { question: 'What about the name — "Chinese" or "Lunar" New Year?', answer: 'The festival\'s calendar, zodiac, and many core traditions originated in what is now China. Yet variants are indigenous to Korea (Seollal), Vietnam (Tết), and other Asian cultures. We use both terms. We do not claim to resolve the tension. We only note that the question exists, and that it matters.' },
    ],
    glossary: [
      { term: '春节', pinyin: 'Chūnjié', meaning: 'Spring Festival — the official name since 1914' },
      { term: '元旦', pinyin: 'Yuándàn', meaning: '"First Dawn" — reassigned to January 1st' },
      { term: '丙午', pinyin: 'Bǐngwǔ', meaning: 'Fire Horse — the 43rd year in the sexagenary cycle' },
      { term: '春晚', pinyin: 'Chūnwǎn', meaning: 'The CCTV Spring Festival Gala (since 1983)' },
    ],
    closingLine: 'We are honored to share this exploration with you.',
  },
  {
    id: 3,
    numeral: '叁',
    numeralEN: 'III',
    titleCN: '港台',
    titleEN: 'HK & Taiwan',
    subtitleEN: 'Shared Roots, Local Lives',
    subtitleCN: '同根异枝',
    oneLinerEN: 'Hong Kong watches fireworks from a distance. Taiwan stands inside the fire.',
    oneLinerCN: '香港隔岸观火。台湾置身火中。',
    tags: ['identity', 'colonial', 'regional'],
    readTime: '7 min',
    sections: [
      { question: 'What does it mean to share roots but live different lives?', answer: 'Hong Kong\'s New Year is a celebration of containment — firecrackers banned since 1967, flower markets as managed spectacle, tradition compressed into the smallest apartment. Taiwan\'s New Year is a celebration of release — dangerous festivals like the Yanshui Beehive returned after martial law as assertions of identity. One watches from the shore. The other stands inside the fire.' },
      { question: 'Why does Hong Kong watch fireworks from a distance?', answer: 'In 1967, improvised explosives were used during leftist riots. The colonial government banned all firecrackers. Now, on the second night, the government sponsors a grand display over Victoria Harbour. It is beautiful. It is safe. But it is distant. The Nian beast is scared away not by your hand, but by the city\'s pyrotechnics.' },
      { question: 'Why does Taiwan stand inside the fire?', answer: 'In Yanshui, massive "beehive" racks shoot thousands of bottle rockets horizontally into crowds. Being hit is a blessing. In Taitung, a bare-chested man is pelted with firecrackers to warm the God of Wealth. Danger is the medium of grace. The festival is not something you watch — it is something you survive.' },
      { question: 'What does a reunion dinner reveal about a society?', answer: 'Hong Kong\'s Poon Choi (Basin Feast) requires no cooking, minimal cleanup — heritage in a box for high-density living. Taiwan\'s Wei Lu ("Surrounding the Stove") centers on a communal hot pot. Hong Kong\'s feast is efficient, portable, individual. Taiwan\'s is laborious, communal, and rooted in place.' },
    ],
    glossary: [
      { term: '盆菜', pinyin: 'Pún choi', meaning: 'Basin Feast — Hong Kong\'s layered reunion dish' },
      { term: '鹽水蜂炮', pinyin: 'Yánshuǐ fēngpào', meaning: 'Yanshui Beehive Fireworks — rockets fired into crowds' },
      { term: '圍爐', pinyin: 'Wéi lú', meaning: '"Surrounding the Stove" — Taiwan\'s reunion dinner' },
      { term: '本土化', pinyin: 'Běntǔhuà', meaning: 'Indigenization — Taiwan\'s post-martial law cultural reclamation' },
    ],
    closingLine: 'Two strategies of survival — one of containment, one of release.',
  },
  {
    id: 4,
    numeral: '肆',
    numeralEN: 'IV',
    titleCN: '海外',
    titleEN: 'Overseas',
    subtitleEN: 'One Moon, Many New Years',
    subtitleCN: '同月异年',
    oneLinerEN: 'The same moon rises. Five nations see five different festivals.',
    oneLinerCN: '同一轮月亮升起。五个国家看到五个不同的节日。',
    tags: ['diaspora', 'japan', 'korea', 'vietnam'],
    readTime: '7 min',
    sections: [
      { question: 'What does "One Moon, Many New Years" mean?', answer: 'On February 17, 2026, the second new moon after the winter solstice will rise. In China it is Chunjie, in Korea Seollal, in Vietnam Tết, in the Philippines a Chinoy celebration of Tikoy. In Japan, the lunar calendar was abolished in 1873 — the New Year is solar January 1st. One celestial trigger, fractured by history and identity.' },
      { question: 'Why did Japan abandon the lunar calendar?', answer: 'In 1872, the Meiji government declared the lunisolar calendar abolished. It was a declaration of modernity — the lunar calendar was "backward," the solar one "scientific" and "Western." The actual Lunar New Year is now called Kyū-Shōgatsu (Old New Year), largely ignored except in Okinawan fishing villages.' },
      { question: 'What is the Fire Horse superstition in Japan?', answer: 'Japanese folklore holds that women born in a Fire Horse year are dangerously headstrong and destined to ruin their families. In 1966, Japan\'s fertility rate plummeted 25% as parents used contraception and abortion to avoid Fire Horse daughters. In 2026, sociologists are watching: will the superstition hold in the 21st century?' },
      { question: 'Why does Vietnam have a Cat instead of a Rabbit?', answer: 'Vietnam is the only nation to alter the zodiac animals. The Rabbit is replaced by the Cat, the Ox by the Water Buffalo — reflecting the agrarian reality of the rice delta where cats guard grain stores and water buffalo are the primary farming companions.' },
    ],
    glossary: [
      { term: '설날', pinyin: 'Seollal', meaning: 'Korean Lunar New Year — ancestral rites and age-granting soup' },
      { term: '節元旦', pinyin: 'Tết Nguyên Đán', meaning: 'Vietnamese "Feast of the First Morning"' },
      { term: '丙午', pinyin: 'Hinoe-Uma', meaning: 'Japanese Fire Horse — linked to 1966 birth rate collapse' },
      { term: '鑲嵌', pinyin: 'Xông đất', meaning: 'Vietnamese First-Footing ritual' },
    ],
    closingLine: 'A single moon can mean many things to many peoples.',
  },
  {
    id: 5,
    numeral: '伍',
    numeralEN: 'V',
    titleCN: '生肖',
    titleEN: 'Zodiac',
    subtitleEN: 'The Mechanics of Destiny',
    subtitleCN: '命运的机制',
    oneLinerEN: 'Twelve animals, five elements, sixty years — and one horse on fire.',
    oneLinerCN: '十二生肖、五行、六十年——以及一匹燃烧的马。',
    tags: ['cosmology', 'wuxing', 'fire-horse'],
    readTime: '7 min',
    sections: [
      { question: 'What is the Chinese Zodiac?', answer: 'Not merely twelve animals — it is a cosmological machine for measuring time. Its origins stretch to the Shang Dynasty (c. 1600–1050 BC), born from the observation of Jupiter\'s twelve-year orbit. The zodiac is the fossilized remnant of humanity\'s first attempts to map the heavens onto human affairs.' },
      { question: 'Why are there sixty years in a full cycle?', answer: 'The twelve animals (Earthly Branches) pair with ten elemental stems (Heavenly Stems). The Five Elements — Wood, Fire, Earth, Metal, Water — each in Yin and Yang polarities. The mathematics require 60 combinations before the cycle repeats. This is why "Fire Horse" occurs only once every sixty years.' },
      { question: 'What makes the Fire Horse different?', answer: 'The Horse is intrinsically Fire — it governs the Noon hour, the South direction, and summer. When the Heavenly Stem is also Fire (Bing), you have "Double Fire": Yang Fire sitting atop the Horse of Fire. This is the most intense version — pure solar energy, maximum visibility, transformative power.' },
      { question: 'Why is the Fire Horse feared in Japan but celebrated in China?', answer: 'In China, the Fire Horse is noble — "Dragon-Horse Spirit" means boundless energy. In Japan, it carries the dark legacy of Yaoya Oshichi, a Fire Horse girl who burned down Edo in 1666. In 1966, Japan\'s birth rate dropped 25%. Two cultures, one zodiac, opposing readings.' },
    ],
    glossary: [
      { term: '生肖', pinyin: 'Shēngxiào', meaning: 'The Chinese Zodiac — "birth resemblance"' },
      { term: '干支', pinyin: 'Gānzhī', meaning: 'Stem-Branch system — foundation of the 60-year cycle' },
      { term: '丙午', pinyin: 'Bǐngwǔ', meaning: 'Fire Horse year (1966, 2026, 2086)' },
      { term: '五行', pinyin: 'Wǔxíng', meaning: 'Five Phases — Wood, Fire, Earth, Metal, Water' },
    ],
    closingLine: 'The mechanics of the cosmos shape human time.',
  },
  {
    id: 6,
    numeral: '陆',
    numeralEN: 'VI',
    titleCN: '俗礼',
    titleEN: 'Customs',
    subtitleEN: 'The Architecture of Ritual',
    subtitleCN: '仪式的建筑',
    oneLinerEN: 'We sweep the dust to clear a path for the new.',
    oneLinerCN: '扫去旧尘，为新铺路。',
    tags: ['ritual', 'taboo', 'food'],
    readTime: '6 min',
    sections: [
      { question: 'What happens before New Year\'s Day begins?', answer: 'On the 23rd or 24th of the twelfth lunar month, the Kitchen God departs for heaven to report on the family\'s conduct. Families offer malt sugar candies — to bribe the deity into speaking well, or to stick his teeth shut. It is a pragmatic negotiation with the divine bureaucracy.' },
      { question: 'Why do we sweep before the New Year?', answer: 'Sao Chen — homophonous with "sweeping away bad luck." In the North, a battle against coal soot. In the South, the body is washed with pomelo leaves to strip away the spiritual residue of the previous year.' },
      { question: 'Why is the Reunion Dinner so important?', answer: 'The Reunion Dinner (Nian Ye Fan) is the gravitational center — the primary driver of Chunyun, the great migration. North: dumplings shaped like silver ingots. South: Niangao and whole fish. East: Eight Treasure Rice. West: hot pot. A meal that repairs the fragmentation of modern life.' },
      { question: 'Why do red and noise keep returning?', answer: 'Red and noise are not aesthetic preference — they are energetic necessity. Yang (active, hot, bright) energy counteracts the Yin of winter. Red is the elemental color of Fire. The acoustic landscape — firecrackers, drums, gongs — is artificial thunder that jumpstarts the agricultural cycle.' },
    ],
    glossary: [
      { term: '年夜饭', pinyin: 'Nián Yè Fàn', meaning: 'The Reunion Dinner — ritual center of the festival' },
      { term: '守岁', pinyin: 'Shǒu Suì', meaning: 'Staying awake on New Year\'s Eve to prolong parents\' lives' },
      { term: '红包', pinyin: 'Hóngbāo', meaning: 'Red envelope — a transfer of protection and blessing' },
      { term: '拱手', pinyin: 'Gǒng Shǒu', meaning: 'Cupped-hand salute — left-over-right for men' },
    ],
    closingLine: 'We wear red to remind the winter that the fire of the horse still burns within the blood.',
  },
  {
    id: 7,
    numeral: '柒',
    numeralEN: 'VII',
    titleCN: '年货',
    titleEN: 'Goods',
    subtitleEN: 'The Material Language of the New Year',
    subtitleCN: '新年的物质语言',
    oneLinerEN: 'Every fruit is a sentence. Every gift is a contract.',
    oneLinerCN: '每一颗水果都是一句话。每一件礼物都是一份契约。',
    tags: ['commerce', 'food', 'semiotics'],
    readTime: '7 min',
    sections: [
      { question: 'What are "Nianhuo" and why do they matter?', answer: 'Nianhuo — New Year goods — are not ordinary groceries. Each item is selected for its symbolic resonance, its ability to speak the language of blessing. In the Chinese moral economy, a gift received creates a debt of reciprocity that must be repaid. Consumption becomes communication.' },
      { question: 'Why are fruits never just fruits?', answer: 'Apple (Ping Guo) sounds like "peace." Mandarin orange sounds like "luck" and looks like gold. Pomelo sounds like "to have." Pineapple in Hokkien sounds like "prosperity arrives." When you gift a basket of these fruits, you are speaking a complete sentence of blessing.' },
      { question: 'What is the difference between Northern and Southern New Year foods?', answer: 'China splits at the Qinling-Huaihe Line: wheat country to the north, rice country to the south. North: dumplings, wheat pastries, braised meats for warmth. South: sticky rice cake, dried seafood, the Tray of Togetherness. West: cured meat smoked over cypress, hot pot for vitality.' },
      { question: 'How has the New Year market changed?', answer: 'The Guochao ("National Trend") movement integrates heritage with modern design — AR-enabled Palace Museum gift boxes. Packaging has become theater: hidden compartments, dramatic reveals. Pre-made dishes now let young hosts serve traditional banquets without traditional skills. The red envelope has migrated to WeChat.' },
    ],
    glossary: [
      { term: '年货', pinyin: 'Niánhuò', meaning: 'New Year goods — ritual purchases for Spring Festival' },
      { term: '关系', pinyin: 'Guānxì', meaning: 'Social connections — the web maintained through exchange' },
      { term: '京八件', pinyin: 'Jīng Bā Jiàn', meaning: '"Capital Eight Pieces" — Beijing pastries in blessing shapes' },
      { term: '国潮', pinyin: 'Guócháo', meaning: '"National Trend" — heritage meets modern design' },
    ],
    closingLine: 'The New Year market is not merely moving goods — it is moving hearts.',
  },
  {
    id: 8,
    numeral: '捌',
    numeralEN: 'VIII',
    titleCN: '归途',
    titleEN: 'Homebound',
    subtitleEN: 'The Ethics of Return',
    subtitleCN: '回家的伦理',
    oneLinerEN: 'Nine billion journeys. One question: who waits for me at home?',
    oneLinerCN: '九十亿次旅程。一个问题：谁在家等我？',
    tags: ['migration', 'hukou', 'family'],
    readTime: '6 min',
    sections: [
      { question: 'What is Chunyun?', answer: 'The Spring Festival travel rush — the largest annual human migration on Earth. Over 9 billion trips in 40 days. It is the physical manifestation of a nation negotiating between economic aspiration and the Confucian imperative of filial piety. For the "floating population," the annual return is a reclamation of identity.' },
      { question: 'Why must people return?', answer: 'The Hukou system ties every citizen to a birthplace for public services. "Home" remains the rural village even after decades of city life. The annual return maintains registration, validates family status, manages land rights. Without Hukou barriers, the seasonal pulse of Chunyun would dissolve into permanent urbanization.' },
      { question: 'How do nine billion people move?', answer: 'Road travel: 80-90% of volume. Rail: 513 million passengers, with high-speed G-trains for the affluent and slow K-trains for migrant workers. When seats sell out, "standing tickets" mean 20, 30, even 40 hours on your feet. The standing ticket is a symbol of determination — physical sacrifice for reunion.' },
      { question: 'Who is left behind while others return?', answer: 'Over 60 million "left-behind children" remain in villages while parents work in distant cities. "Satellite babies" are sent back to grandparents and later "reclaimed." And the invisible workers — delivery drivers, security guards, caregivers — sacrifice reunion so others may celebrate it.' },
    ],
    glossary: [
      { term: '春运', pinyin: 'Chūnyùn', meaning: 'Spring Festival travel rush — world\'s largest human migration' },
      { term: '户口', pinyin: 'Hùkǒu', meaning: 'Household registration — ties citizens to birthplace' },
      { term: '流动人口', pinyin: 'Liúdòng rénkǒu', meaning: '"Floating population" — migrants living where not registered' },
      { term: '站票', pinyin: 'Zhànpiào', meaning: 'Standing ticket — boarding without a seat for 20+ hours' },
    ],
    closingLine: 'Nine billion journeys answer a single question: Who waits for me at home?',
  },
  {
    id: 9,
    numeral: '玖',
    numeralEN: 'IX',
    titleCN: '货殖',
    titleEN: 'Commerce',
    subtitleEN: 'The Abacus of Homecoming',
    subtitleCN: '归乡的算盘',
    oneLinerEN: 'Trillions of yuan spent. The ledger clears not debt, but distance.',
    oneLinerCN: '万亿元支出。清的不是账，而是距离。',
    tags: ['economy', 'hongbao', 'logistics'],
    readTime: '6 min',
    sections: [
      { question: 'What is the "Spring Festival Economy"?', answer: 'More accurately a ritual economy — a vast circulation of wealth whose primary function is not material exchange but social repair. Every yuan carries symbolic weight. For the Fire Horse year, spending becomes protective — a "Red Shield" against zodiacal volatility.' },
      { question: 'Where does the money flow?', answer: 'Mobility: the cost of return flows from coastal cities to rural peripheries. The Ritual Table: pre-made dishes surge 45%, democratizing luxury. The Red Shield: protection spending on Ben Ming Nian essentials. Digital Blessings: WeChat and Alipay process billions of Hongbao at midnight — high-frequency social currency.' },
      { question: 'What happens behind the scenes?', answer: 'China\'s industrial chain undergoes total paralysis then reboot. Factories taper 2-4 weeks before as workers journey home. Chilean cherries rely on precise cold chain across hemispheres. Liuyang — global capital of fireworks — halts production weeks before the festival. Municipal drone swarms are replacing personal firecrackers.' },
      { question: 'What does all this spending accomplish?', answer: 'The circular exchange of Hongbao often nets zero — but it refreshes the social contract. The pre-made dishes preserve ritual without exhaustion. The standing ticket purchases determination with discomfort. When the sun rises on the Fire Horse, the ledger is balanced, not of debt, but of distance.' },
    ],
    glossary: [
      { term: '红包', pinyin: 'Hóngbāo', meaning: 'Red packets — originally spirit-suppressing coins, now digital currency' },
      { term: '本命年', pinyin: 'Běn Mìng Nián', meaning: 'Zodiac Birth Year — requiring red protection' },
      { term: '太岁', pinyin: 'Tài Suì', meaning: 'Grand Duke Jupiter — deity governing yearly fortune' },
      { term: '预制菜', pinyin: 'Yùzhìcài', meaning: 'Pre-made dishes — controversial convenience revolution' },
    ],
    closingLine: 'When the festival ends, the ledger is clear — not of debt, but of distance.',
  },
  {
    id: 10,
    numeral: '拾',
    numeralEN: 'X',
    titleCN: '今古',
    titleEN: 'Meaning',
    subtitleEN: 'The Dialectics of Beginning',
    subtitleCN: '开端的辩证法',
    oneLinerEN: 'We begin again not because time demands it, but because meaning requires it.',
    oneLinerCN: '我们重新开始，不是因为时间要求，而是因为意义需要。',
    tags: ['philosophy', 'time', 'liu-bai'],
    readTime: '6 min',
    sections: [
      { question: 'What does "Guo Nian" actually mean?', answer: 'Guo Nian — "passing the year" or "surviving the Nian." The etymology reveals the festival\'s origins in precarious agrarian existence. To "pass" the year is not merely to celebrate it. It is to survive it — a ritual of collective survival against the darkness of winter.' },
      { question: 'What is "Liu Bai" and why does it matter?', answer: 'Liu Bai — "leaving blank space" — the intentional emptiness that gives form to what is present. The mountain exists because of the white mist around it. The New Year is not merely a time to do more — it is a time to do less. The Great Industrial Pause is philosophical alignment with the need for rest and renewal.' },
      { question: 'How do cyclical and linear time conflict?', answer: 'Cyclical time: each year ends where it began, renewal through ritual, patience. Linear time: each moment moves irreversibly forward, renewal through break, urgency. The modern Spring Festival holds both in tension. We perform ancient rituals while refreshing our phones. We honor ancestors while streaming digital content.' },
      { question: 'What is "Jin Gu"?', answer: 'Jin Gu — "Now-Ancient" — the coexistence of the contemporary and the traditional. Ancient: 60-year zodiac cycle, Nian beast mythology, red protection. Modern: digital Hongbao, pre-made dinners, drone fireworks. Timeless: the return home, the reunion dinner, the balance of relationships. It is the capacity to hold both.' },
    ],
    glossary: [
      { term: '过年', pinyin: 'Guò Nián', meaning: '"Passing the Year" — surviving/celebrating the New Year' },
      { term: '留白', pinyin: 'Liú Bái', meaning: '"Leaving blank" — philosophy of intentional emptiness' },
      { term: '今古', pinyin: 'Jīn Gǔ', meaning: '"Now-Ancient" — coexistence of modern and traditional' },
      { term: '守岁', pinyin: 'Shǒu Suì', meaning: '"Guarding the Year" — all-night vigil' },
    ],
    closingLine: 'We begin again not because time demands it, but because meaning requires it.',
  },
];
