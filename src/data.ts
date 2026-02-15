// ═══════════════════════════════════════════════════════════
// RECOLLECT — Topic Data Module
// All 10 topics with bilingual titles, one-liners, and content
// ═══════════════════════════════════════════════════════════

export interface TopicSection {
  question: string;
  answer: string;
  questionCN?: string;
  answerCN?: string;
}

export interface GlossaryEntry {
  term: string;
  pinyin: string;
  meaning: string;
}

export interface Topic {
  id: string;
  numeral: string;         // Chinese numeral 壹–拾
  numeralEN: string;       // Roman numeral I–X
  titleCN: string;
  titleEN: string;
  subtitleEN: string;
  subtitleCN: string;
  oneLinerEN: string;
  oneLinerCN: string;
  tags: string[];
  tagsCN: string[];
  readTime: string;
  sections: TopicSection[];
  glossary: GlossaryEntry[];
  closingLine: string;
  themeColor?: string;
}

export const topics: Topic[] = [
  {
    id: 'origins',
    numeral: '壹',
    numeralEN: 'I',
    titleCN: '肇始',
    titleEN: 'Origins',
    subtitleEN: 'Where the Year Begins',
    subtitleCN: '年从何起',
    oneLinerEN: 'A beast, a calendar, and the courage to start the count again.',
    oneLinerCN: '一头年兽、一部历法，以及重新开始计数的勇气。',
    tags: ['cosmology', 'calendar', 'mythology'],
    tagsCN: ['宇宙观', '历法', '神话'],
    readTime: '5 min',
    sections: [
      { question: 'What is the Lunar New Year, and when did it begin?', answer: 'The Lunar New Year follows the lunisolar calendar — a system that tracks both the moon\'s phases and the sun\'s position. Its origins stretch back at least 3,500 years to the Shang Dynasty, when oracle bones recorded lunar observations and ritual sacrifices at year\'s end. The festival marks the second new moon after the winter solstice.', questionCN: '什么是农历新年？它起源于何时？', answerCN: '农历新年遵循阴阳历——一种同时追踪月相和太阳位置的系统。其起源至少可追溯到3500年前的商朝，当时甲骨文记录了月相观测和年终祭祀。春节标志着冬至后第二个新月的到来。' },
      { question: 'What is the story of the Nian?', answer: 'The legend tells of a beast called Nián that emerged from the sea or mountains on the last night of the year to devour livestock, grain, and children. Villagers discovered three weaknesses: red color, loud noise, and bright fire. Whether this tale is ancient or relatively recent folklore is debated — but the behavioral DNA of the festival (red decorations, firecrackers, lanterns) maps precisely onto these three defenses.', questionCN: '年兽的故事是什么？', answerCN: '传说中有一头叫做"年"的怪兽，在每年最后一夜从海中或山中出没，吞噬牲畜、粮食和孩童。村民们发现了三个弱点：红色、响声和明火。这个传说究竟古老还是近世民间故事尚有争议——但春节的行为基因（红色装饰、鞭炮、灯笼）恰恰对应这三种防御手段。' },
      { question: 'How does the Chinese calendar work?', answer: 'The Chinese calendar is lunisolar — months follow the moon\'s 29.5-day cycle, but leap months are periodically inserted to keep the year aligned with the solar seasons. This ensures that the Spring Festival always falls between January 21 and February 20 on the Gregorian calendar. The system also incorporates the 12-year animal zodiac and 10 Heavenly Stems, creating a 60-year \"sexagenary\" cycle.', questionCN: '中国历法如何运作？', answerCN: '中国历法是阴阳合历——月份跟随月亮29.5天的周期，但会定期插入闰月以保持与太阳季节的对齐。这确保了春节始终在公历1月21日至2月20日之间。该系统还纳入了十二年动物生肖和十天干，构成六十年一轮的"干支"纪年。' },
      { question: 'What are the Twelve Animals?', answer: 'The twelve zodiac animals — Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig — were likely derived from Jupiter\'s approximately 12-year orbital cycle. Each animal governs a year, a two-hour period of the day, and a compass direction. The system is not merely symbolic — it was a practical timekeeping framework.', questionCN: '十二生肖是什么？', answerCN: '十二生肖——鼠、牛、虎、兔、龙、蛇、马、羊、猴、鸡、狗、猪——可能源自木星约12年的公转周期。每种动物主管一年、一个时辰和一个方位。这个系统不仅是象征——更是一套实用的计时框架。' },
      { question: 'Why does the date change every year?', answer: 'Because the lunisolar calendar is tied to actual astronomical events (new moons, solstices), the Spring Festival\'s Gregorian date shifts annually. The festival always begins on the first new moon after the midpoint between the winter solstice and the spring equinox.', questionCN: '为什么春节日期每年都不同？', answerCN: '因为阴阳历与实际天文事件（新月、至日）绑定，所以春节的公历日期每年都会变化。春节始于冬至与春分之间中点之后的第一个新月。' },
    ],
    glossary: [
      { term: '年', pinyin: 'Nián', meaning: 'Year; also the legendary beast said to fear red and noise' },
      { term: '农历', pinyin: 'Nónglì', meaning: 'The traditional Chinese lunisolar calendar' },
      { term: '生肖', pinyin: 'Shēngxiào', meaning: 'The twelve-animal zodiac cycle' },
      { term: '天干地支', pinyin: 'Tiāngān Dìzhī', meaning: 'Heavenly Stems and Earthly Branches — the 60-year cycle' },
    ],
    closingLine: 'We are honored to share this exploration with you.',
    themeColor: '#C94040', // 正红
  },
  {
    id: 'evolution',
    numeral: '贰',
    numeralEN: 'II',
    titleCN: '沿革',
    titleEN: 'Evolution',
    subtitleEN: 'How a Festival Survived Its Own History',
    subtitleCN: '一个节日如何幸存于自己的历史',
    oneLinerEN: 'Three abolitions, one renaming, and a festival that refused to die.',
    oneLinerCN: '三次废除、一次改名，和一个拒绝消亡的节日。',
    tags: ['politics', 'modernity', 'resilience'],
    tagsCN: ['政治', '现代性', '韧性'],
    readTime: '6 min',
    sections: [
      { question: 'Why is it called "Spring Festival" instead of "New Year"?', answer: 'In 1914, a bureaucrat proposed a compromise. The new Republic of China had adopted the Western calendar, yet hundreds of millions of people refused to abandon the lunar one. January 1st would take the name Yuandan—"First Dawn"—and the lunar celebration would be relabeled Chunjie—"Spring Festival." The people accepted the new name. They did not accept the new time.' , questionCN: '为什么叫"春节"而不是"新年"？', answerCN: '1914年，一位官员提出了折衷方案。新成立的中华民国已采用西历，但数亿人民拒绝放弃农历。1月1日被命名为"元旦"，而农历庆典被重新标注为"春节"。人们接受了新名称，却没有接受新时间。'},
      { question: 'Has anyone ever tried to abolish it?', answer: 'Three times. In 1929, the Nationalists declared the lunar calendar abolished — families celebrated behind closed doors. In 1967, at the height of the Cultural Revolution, the State Council canceled the holiday entirely — people ate dumplings in secret, muffling the sound of chopping meat with blankets. The festival survived because it could not be policed out of living memory.' , questionCN: '有人试图废除春节吗？', answerCN: '三次。1929年，国民党宣布废除农历——家庭在门后悄悄庆祝。1967年，文革期间，国务院彻底取消了这个节日——人们偷偷吃饺子，用毯子捂住剁肉的声音。春节幸存了下来，因为它无法从活生生的记忆中被取缔。'},
      { question: 'What is the Fire Horse Year?', answer: 'The Chinese calendar cycles through sixty combinations of twelve animals and five elements. Every sixty years, the Fire Horse returns. The last was 1966, when the Cultural Revolution began. Before the Cultural Revolution, 1906 saw a crumbling Qing dynasty. 2026 will be the next.' , questionCN: '什么是火马年？', answerCN: '中国历法循环六十种十二动物与五行的组合。每六十年，火马回归。上一个是1966年，文化大革命开始之时。再之前，1906年见证了清朝的崩溃。2026年将是下一个。'},
      { question: 'When did the festival become a television event?', answer: 'In 1983, China Central Television broadcast its first Spring Festival Gala — a live, synchronized countdown. Before the Gala, celebrations were local and asynchronous. Afterward, an entire nation experienced the same stroke of midnight from Beijing. The television replaced the ancestral altar as the focal point of the living room.' , questionCN: '春节何时变成了电视盛事？', answerCN: '1983年，中央电视台播出了首届春节联欢晚会——一场直播同步的倒计时。在春晚之前，庆祝活动是地方性的、不同步的。此后，全国在同一时刻从北京感受了零点钟声。电视取代了祖先牌位，成为客厅的焦点。'},
      { question: 'What about the name — "Chinese" or "Lunar" New Year?', answer: 'The festival\'s calendar, zodiac, and many core traditions originated in what is now China. Yet variants are indigenous to Korea (Seollal), Vietnam (Tết), and other Asian cultures. We use both terms. We do not claim to resolve the tension. We only note that the question exists, and that it matters.' , questionCN: '该叫"中国新年"还是"农历新年"？', answerCN: '这个节日的历法、生肖和许多核心传统起源于今天的中国。然而，韩国、越南和其他亚洲文化都有本土化的变体。我们使用两种称呼。我们不声称解决这个张力。我们只是指出这个问题的存在，以及它的重要性。'},
    ],
    glossary: [
      { term: '春节', pinyin: 'Chūnjié', meaning: 'Spring Festival — the official name since 1914' },
      { term: '元旦', pinyin: 'Yuándàn', meaning: '"First Dawn" — reassigned to January 1st' },
      { term: '丙午', pinyin: 'Bǐngwǔ', meaning: 'Fire Horse — the 43rd year in the sexagenary cycle' },
      { term: '春晚', pinyin: 'Chūnwǎn', meaning: 'The CCTV Spring Festival Gala (since 1983)' },
    ],
    closingLine: 'We are honored to share this exploration with you.',
    themeColor: '#B83A3A', // 深红
  },
  {
    id: 'hktw',
    numeral: '叁',
    numeralEN: 'III',
    titleCN: '港台',
    titleEN: 'HK & Taiwan',
    subtitleEN: 'Shared Roots, Local Lives',
    subtitleCN: '同根异枝',
    oneLinerEN: 'Hong Kong watches fireworks from a distance. Taiwan stands inside the fire.',
    oneLinerCN: '香港隔岸观火。台湾置身火中。',
    tags: ['identity', 'colonial', 'regional'],
    tagsCN: ['身份', '殖民', '地域'],
    readTime: '7 min',
    sections: [
      { question: 'What does it mean to share roots but live different lives?', answer: 'Hong Kong\'s New Year is a celebration of containment — firecrackers banned since 1967, flower markets as managed spectacle, tradition compressed into the smallest apartment. Taiwan\'s New Year is a celebration of release — dangerous festivals like the Yanshui Beehive returned after martial law as assertions of identity. One watches from the shore. The other stands inside the fire.' , questionCN: '同根异枝意味着什么？', answerCN: '香港的新年是一种克制的庆典——鞭炮自1967年起被禁，花市成为被管理的景观，传统被压缩进最小的公寓。台湾的新年是一种释放的庆典——盐水蜂炮等危险活动在解严后回归，成为身份的宣示。一个隔岸观火。另一个置身火中。'},
      { question: 'Why does Hong Kong watch fireworks from a distance?', answer: 'In 1967, improvised explosives were used during leftist riots. The colonial government banned all firecrackers. Now, on the second night, the government sponsors a grand display over Victoria Harbour. It is beautiful. It is safe. But it is distant. The Nian beast is scared away not by your hand, but by the city\'s pyrotechnics.' , questionCN: '为什么香港隔岸观火？', answerCN: '1967年，左派暴动中使用了土制爆炸物。殖民政府禁止了所有鞭炮。如今，在第二个夜晚，政府在维多利亚港上空赞助盛大的烟花表演。它美丽、安全，但遥远。年兽不是被你的手吓跑的，而是被城市的烟火技术。'},
      { question: 'Why does Taiwan stand inside the fire?', answer: 'In Yanshui, massive "beehive" racks shoot thousands of bottle rockets horizontally into crowds. Being hit is a blessing. In Taitung, a bare-chested man is pelted with firecrackers to warm the God of Wealth. Danger is the medium of grace. The festival is not something you watch — it is something you survive.' , questionCN: '为什么台湾置身火中？', answerCN: '在盐水，巨大的"蜂炮"架向人群水平发射数千枚瓶装烟花。被击中是一种祝福。在台东，赤膊男子被鞭炮轰击以温暖财神。危险是恩典的媒介。节日不是你观看的东西——而是你幸存下来的东西。'},
      { question: 'What does a reunion dinner reveal about a society?', answer: 'Hong Kong\'s Poon Choi (Basin Feast) requires no cooking, minimal cleanup — heritage in a box for high-density living. Taiwan\'s Wei Lu ("Surrounding the Stove") centers on a communal hot pot. Hong Kong\'s feast is efficient, portable, individual. Taiwan\'s is laborious, communal, and rooted in place.' , questionCN: '年夜饭揭示了社会的什么？', answerCN: '香港的盆菜不需要烹饪，清理极少——为高密度生活准备的盒装传统。台湾的围炉以共享火锅为中心。香港的盛宴高效、便携、个人化。台湾的则费力、社区化、扎根于土地。'},
    ],
    glossary: [
      { term: '盆菜', pinyin: 'Pún choi', meaning: 'Basin Feast — Hong Kong\'s layered reunion dish' },
      { term: '鹽水蜂炮', pinyin: 'Yánshuǐ fēngpào', meaning: 'Yanshui Beehive Fireworks — rockets fired into crowds' },
      { term: '圍爐', pinyin: 'Wéi lú', meaning: '"Surrounding the Stove" — Taiwan\'s reunion dinner' },
      { term: '本土化', pinyin: 'Běntǔhuà', meaning: 'Indigenization — Taiwan\'s post-martial law cultural reclamation' },
    ],
    closingLine: 'Two strategies of survival — one of containment, one of release.',
    themeColor: '#D4380D', // 朱砂红
  },
  {
    id: 'overseas',
    numeral: '肆',
    numeralEN: 'IV',
    titleCN: '海外',
    titleEN: 'Overseas',
    subtitleEN: 'One Moon, Many New Years',
    subtitleCN: '同月异年',
    oneLinerEN: 'The same moon rises. Five nations see five different festivals.',
    oneLinerCN: '同一轮月亮升起。五个国家看到五个不同的节日。',
    tags: ['diaspora', 'japan', 'korea', 'vietnam'],
    tagsCN: ['离散', '日本', '韩国', '越南'],
    readTime: '7 min',
    sections: [
      { question: 'What does "One Moon, Many New Years" mean?', answer: 'On February 17, 2026, the second new moon after the winter solstice will rise. In China it is Chunjie, in Korea Seollal, in Vietnam Tết, in the Philippines a Chinoy celebration of Tikoy. In Japan, the lunar calendar was abolished in 1873 — the New Year is solar January 1st. One celestial trigger, fractured by history and identity.' , questionCN: '"同月异年"意味着什么？', answerCN: '2026年2月17日，冬至后的第二个新月将升起。在中国它是春节，在韩国是설날，在越南是Tết，在菲律宾是华裔的年糕庆典。在日本，农历于1873年被废除——新年是阳历1月1日。一个天文触发，被历史和身份所分裂。'},
      { question: 'Why did Japan abandon the lunar calendar?', answer: 'In 1872, the Meiji government declared the lunisolar calendar abolished. It was a declaration of modernity — the lunar calendar was "backward," the solar one "scientific" and "Western." The actual Lunar New Year is now called Kyū-Shōgatsu (Old New Year), largely ignored except in Okinawan fishing villages.' , questionCN: '为什么日本放弃了农历？', answerCN: '1872年，明治政府宣布废除阴阳历。这是一个现代性的宣言——农历是"落后的"，阳历是"科学的"和"西方的"。实际的农历新年现在被称为旧正月，除了冲绳的渔村外基本被忽视。'},
      { question: 'What is the Fire Horse superstition in Japan?', answer: 'Japanese folklore holds that women born in a Fire Horse year are dangerously headstrong and destined to ruin their families. In 1966, Japan\'s fertility rate plummeted 25% as parents used contraception and abortion to avoid Fire Horse daughters. In 2026, sociologists are watching: will the superstition hold in the 21st century?' , questionCN: '日本的火马迷信是什么？', answerCN: '日本民间传说认为，火马年出生的女性危险地刚烈，注定会毁掉家庭。1966年，日本的出生率暴跌25%，因为父母使用避孕和堕胎来避免生出火马女儿。2026年，社会学家正在观察：这种迷信在21世纪还会持续吗？'},
      { question: 'Why does Vietnam have a Cat instead of a Rabbit?', answer: 'Vietnam is the only nation to alter the zodiac animals. The Rabbit is replaced by the Cat, the Ox by the Water Buffalo — reflecting the agrarian reality of the rice delta where cats guard grain stores and water buffalo are the primary farming companions.' , questionCN: '为什么越南用猫代替了兔？', answerCN: '越南是唯一改变了生肖动物的国家。兔被猫取代，牛被水牛取代——反映了稻田三角洲的农业现实，那里猫守护谷仓，水牛是主要的农耕伙伴。'},
    ],
    glossary: [
      { term: '설날', pinyin: 'Seollal', meaning: 'Korean Lunar New Year — ancestral rites and age-granting soup' },
      { term: '節元旦', pinyin: 'Tết Nguyên Đán', meaning: 'Vietnamese "Feast of the First Morning"' },
      { term: '丙午', pinyin: 'Hinoe-Uma', meaning: 'Japanese Fire Horse — linked to 1966 birth rate collapse' },
      { term: '鑲嵌', pinyin: 'Xông đất', meaning: 'Vietnamese First-Footing ritual' },
    ],
    closingLine: 'A single moon can mean many things to many peoples.',
    themeColor: '#A83535', // 暗红
  },
  {
    id: 'zodiac',
    numeral: '伍',
    numeralEN: 'V',
    titleCN: '生肖',
    titleEN: 'Zodiac',
    subtitleEN: 'The Mechanics of Destiny',
    subtitleCN: '命运的机制',
    oneLinerEN: 'Twelve animals, five elements, sixty years — and one horse on fire.',
    oneLinerCN: '十二生肖、五行、六十年——以及一匹燃烧的马。',
    tags: ['cosmology', 'wuxing', 'fire-horse'],
    tagsCN: ['宇宙观', '五行', '火马'],
    readTime: '7 min',
    sections: [
      { question: 'What is the Chinese Zodiac?', answer: 'Not merely twelve animals — it is a cosmological machine for measuring time. Its origins stretch to the Shang Dynasty (c. 1600–1050 BC), born from the observation of Jupiter\'s twelve-year orbit. The zodiac is the fossilized remnant of humanity\'s first attempts to map the heavens onto human affairs.' , questionCN: '什么是中国生肖？', answerCN: '不仅仅是十二种动物——它是一台测量时间的宇宙机器。其起源可追溯到商朝（约公元前1600-1050年），源于对木星十二年轨道周期的观测。生肖是人类最初试图将天象映射到人事上的化石遗迹。'},
      { question: 'Why are there sixty years in a full cycle?', answer: 'The twelve animals (Earthly Branches) pair with ten elemental stems (Heavenly Stems). The Five Elements — Wood, Fire, Earth, Metal, Water — each in Yin and Yang polarities. The mathematics require 60 combinations before the cycle repeats. This is why "Fire Horse" occurs only once every sixty years.' , questionCN: '为什么一个完整周期是六十年？', answerCN: '十二动物（地支）与十个元素天干配对。五行——木、火、土、金、水——各有阴阳两极。数学上需要60种组合才能完成一个循环。这就是为什么"火马"每六十年才出现一次。'},
      { question: 'What makes the Fire Horse different?', answer: 'The Horse is intrinsically Fire — it governs the Noon hour, the South direction, and summer. When the Heavenly Stem is also Fire (Bing), you have "Double Fire": Yang Fire sitting atop the Horse of Fire. This is the most intense version — pure solar energy, maximum visibility, transformative power.' , questionCN: '火马有什么特别之处？', answerCN: '马本质上属火——它主管午时、南方和夏季。当天干也是火（丙）时，就形成了"双火"：阳火坐于火马之上。这是最强烈的版本——纯粹的太阳能量、最大的可见度、变革的力量。'},
      { question: 'Why is the Fire Horse feared in Japan but celebrated in China?', answer: 'In China, the Fire Horse is noble — "Dragon-Horse Spirit" means boundless energy. In Japan, it carries the dark legacy of Yaoya Oshichi, a Fire Horse girl who burned down Edo in 1666. In 1966, Japan\'s birth rate dropped 25%. Two cultures, one zodiac, opposing readings.' , questionCN: '为什么火马在日本被恐惧而在中国被庆祝？', answerCN: '在中国，火马是高贵的——"龙马精神"意味着无穷的能量。在日本，它承载着八百屋阿七的黑暗传说，一个1666年烧毁江户的火马女孩。1966年，日本出生率下降了25%。两种文化，一个生肖，相反的解读。'},
    ],
    glossary: [
      { term: '生肖', pinyin: 'Shēngxiào', meaning: 'The Chinese Zodiac — "birth resemblance"' },
      { term: '干支', pinyin: 'Gānzhī', meaning: 'Stem-Branch system — foundation of the 60-year cycle' },
      { term: '丙午', pinyin: 'Bǐngwǔ', meaning: 'Fire Horse year (1966, 2026, 2086)' },
      { term: '五行', pinyin: 'Wǔxíng', meaning: 'Five Phases — Wood, Fire, Earth, Metal, Water' },
    ],
    closingLine: 'The mechanics of the cosmos shape human time.',
    themeColor: '#C94040', // 正红
  },
  {
    id: 'customs',
    numeral: '陆',
    numeralEN: 'VI',
    titleCN: '俗礼',
    titleEN: 'Customs',
    subtitleEN: 'The Warmth of Rules',
    subtitleCN: '规矩的温情',
    oneLinerEN: 'Kowtows, red envelopes, taboos. Behind the complexity is a reverence for order.',
    oneLinerCN: '磕头、红包、禁忌。繁琐背后，是对秩序的敬畏。',
    tags: ['ritual', 'family', 'etiquette'],
    tagsCN: ['礼制', '家庭', '礼仪'],
    readTime: '6 min',
    sections: [
      { question: 'What happens before New Year\'s Day begins?', answer: 'On the 23rd or 24th of the twelfth lunar month, the Kitchen God departs for heaven to report on the family\'s conduct. Families offer malt sugar candies — to bribe the deity into speaking well, or to stick his teeth shut. It is a pragmatic negotiation with the divine bureaucracy.', questionCN: '除夕之前发生了什么？', answerCN: '在腊月二十三或二十四，灶王爷升天向玉帝报告一家的品行。家庭供奉麦芽糖——贿赂神明说好话，或者粘住他的牙齿。这是与天庭官僚体系的务实谈判。' },
      { question: 'Why do we sweep before the New Year?', answer: 'Sao Chen — homophonous with "sweeping away bad luck." In the North, a battle against coal soot. In the South, the body is washed with pomelo leaves to strip away the spiritual residue of the previous year.' , questionCN: '为什么要在新年前扫尘？', answerCN: '扫尘——与"扫除坏运气"谐音。在北方，是对煤灰的战斗。在南方，用柚子叶洗澡，剥离上一年的精神残留。'},
      { question: 'Why is the Reunion Dinner so important?', answer: 'The Reunion Dinner (Nian Ye Fan) is the gravitational center — the primary driver of Chunyun, the great migration. North: dumplings shaped like silver ingots. South: Niangao and whole fish. East: Eight Treasure Rice. West: hot pot. A meal that repairs the fragmentation of modern life.' , questionCN: '为什么年夜饭如此重要？', answerCN: '年夜饭是引力中心——春运大迁徙的首要驱动力。北方：元宝形的饺子。南方：年糕和整条鱼。东方：八宝饭。西方：火锅。一顿修复现代生活碎片化的晚餐。'},
      { question: 'Why do red and noise keep returning?', answer: 'Red and noise are not aesthetic preference — they are energetic necessity. Yang (active, hot, bright) energy counteracts the Yin of winter. Red is the elemental color of Fire. The acoustic landscape — firecrackers, drums, gongs — is artificial thunder that jumpstarts the agricultural cycle.' , questionCN: '为什么红色和响声不断回归？', answerCN: '红色和响声不是审美偏好——而是能量的必需。阳（活跃、炽热、明亮）的能量抵消冬天的阴。红色是火的元素色彩。声学景观——鞭炮、鼓、锣——是人工雷声，启动农业周期。'},
    ],
    glossary: [
      { term: '年夜饭', pinyin: 'Nián Yè Fàn', meaning: 'The Reunion Dinner — ritual center of the festival' },
      { term: '守岁', pinyin: 'Shǒu Suì', meaning: 'Staying awake on New Year\'s Eve to prolong parents\' lives' },
      { term: '红包', pinyin: 'Hóngbāo', meaning: 'Red envelope — a transfer of protection and blessing' },
      { term: '拱手', pinyin: 'Gǒng Shǒu', meaning: 'Cupped-hand salute — left-over-right for men' },
    ],
    closingLine: 'We wear red to remind the winter that the fire of the horse still burns within the blood.',
    themeColor: '#B83A3A', // 深红
  },
  {
    id: 'goods',
    numeral: '柒',
    numeralEN: 'VII',
    titleCN: '年货',
    titleEN: 'Goods',
    subtitleEN: 'The Inventory of Desire',
    subtitleCN: '欲望的清单',
    oneLinerEN: 'From narcissus flowers to electronics, what are we buying?',
    oneLinerCN: '从水仙花到电子产品，我们在买什么？',
    tags: ['consumerism', 'tradition', 'gifting'],
    tagsCN: ['消费', '传统', '馈赠'],
    readTime: '7 min',
    sections: [
      { question: 'What are "Nianhuo" and why do they matter?', answer: 'Nianhuo — New Year goods — are not ordinary groceries. Each item is selected for its symbolic resonance, its ability to speak the language of blessing. In the Chinese moral economy, a gift received creates a debt of reciprocity that must be repaid. Consumption becomes communication.' , questionCN: '"年货"是什么，为什么重要？', answerCN: '年货不是普通的杂货。每件物品都因其象征共鸣和表达祝福的能力而被选中。在中国的道德经济中，收到的礼物创造了必须偿还的互惠债务。消费变成了沟通。'},
      { question: 'Why are fruits never just fruits?', answer: 'Apple (Ping Guo) sounds like "peace." Mandarin orange sounds like "luck" and looks like gold. Pomelo sounds like "to have." Pineapple in Hokkien sounds like "prosperity arrives." When you gift a basket of these fruits, you are speaking a complete sentence of blessing.' , questionCN: '为什么水果不只是水果？', answerCN: '苹果（苹果）谐音"平安"。橘子谐音"吉"且形似金子。柚子谐音"有"。闽南语中菠萝谐音"旺来"。当你送出一篮这样的水果，你在说一句完整的祝福话语。'},
      { question: 'What is the difference between Northern and Southern New Year foods?', answer: 'China splits at the Qinling-Huaihe Line: wheat country to the north, rice country to the south. North: dumplings, wheat pastries, braised meats for warmth. South: sticky rice cake, dried seafood, the Tray of Togetherness. West: cured meat smoked over cypress, hot pot for vitality.' , questionCN: '南北年货有什么区别？', answerCN: '中国以秦岭-淮河线为界：北方是麦区，南方是稻区。北方：饺子、面点、炖肉取暖。南方：年糕、海味、全盒。西方：柏木熏腊肉、火锅提振精神。'},
      { question: 'How has the New Year market changed?', answer: 'The Guochao ("National Trend") movement integrates heritage with modern design — AR-enabled Palace Museum gift boxes. Packaging has become theater: hidden compartments, dramatic reveals. Pre-made dishes now let young hosts serve traditional banquets without traditional skills. The red envelope has migrated to WeChat.' , questionCN: '年货市场如何变化？', answerCN: '"国潮"运动将传统与现代设计结合——故宫AR礼盒。包装成为剧场：暗格、戏剧性的揭幕。预制菜让年轻主人无需传统技能即可端上传统宴席。红包已迁移到微信。'},
    ],
    glossary: [
      { term: '年货', pinyin: 'Niánhuò', meaning: 'New Year goods — ritual purchases for Spring Festival' },
      { term: '关系', pinyin: 'Guānxì', meaning: 'Social connections — the web maintained through exchange' },
      { term: '京八件', pinyin: 'Jīng Bā Jiàn', meaning: '"Capital Eight Pieces" — Beijing pastries in blessing shapes' },
      { term: '国潮', pinyin: 'Guócháo', meaning: '"National Trend" — heritage meets modern design' },
    ],
    closingLine: 'The New Year market is not merely moving goods — it is moving hearts.',
    themeColor: '#D4380D', // 朱砂红
  },
  {
    id: 'homebound',
    numeral: '捌',
    numeralEN: 'VIII',
    titleCN: '归途',
    titleEN: 'Homebound',
    subtitleEN: 'The Ethics of Return',
    subtitleCN: '回家的伦理',
    oneLinerEN: 'Nine billion journeys. One question: who waits for me at home?',
    oneLinerCN: '九十亿次旅程。一个问题：谁在家等我？',
    tags: ['migration', 'hukou', 'family'],
    tagsCN: ['迁徙', '户口', '家庭'],
    readTime: '6 min',
    sections: [
      { question: 'What is Chunyun?', answer: 'The Spring Festival travel rush — the largest annual human migration on Earth. Over 9 billion trips in 40 days. It is the physical manifestation of a nation negotiating between economic aspiration and the Confucian imperative of filial piety. For the "floating population," the annual return is a reclamation of identity.' , questionCN: '什么是春运？', answerCN: '春运——地球上最大的年度人口迁徙。40天内超过90亿次出行。它是一个国家在经济抱负与儒家孝道之间博弈的物理表现。对于"流动人口"来说，年度回归是身份的重新确认。'},
      { question: 'Why must people return?', answer: 'The Hukou system ties every citizen to a birthplace for public services. "Home" remains the rural village even after decades of city life. The annual return maintains registration, validates family status, manages land rights. Without Hukou barriers, the seasonal pulse of Chunyun would dissolve into permanent urbanization.' , questionCN: '为什么人们必须回去？', answerCN: '户口制度将每个公民与出生地的公共服务绑定。即使在城市生活了几十年，"家"仍然是农村老家。年度回归维持户籍登记、确认家庭地位、管理土地权益。没有户口壁垒，春运的季节性脉搏将溶解为永久城市化。'},
      { question: 'How do nine billion people move?', answer: 'Road travel: 80-90% of volume. Rail: 513 million passengers, with high-speed G-trains for the affluent and slow K-trains for migrant workers. When seats sell out, "standing tickets" mean 20, 30, even 40 hours on your feet. The standing ticket is a symbol of determination — physical sacrifice for reunion.' , questionCN: '九十亿人如何移动？', answerCN: '公路出行：占80-90%的运量。铁路：5.13亿乘客，富裕者乘高铁G列车，农民工乘慢车K列车。有座售罄时，"站票"意味着20、30甚至40小时站着。站票是决心的象征——为团圆而做的身体牺牲。'},
      { question: 'Who is left behind while others return?', answer: 'Over 60 million "left-behind children" remain in villages while parents work in distant cities. "Satellite babies" are sent back to grandparents and later "reclaimed." And the invisible workers — delivery drivers, security guards, caregivers — sacrifice reunion so others may celebrate it.' , questionCN: '当其他人回家时，谁留下了？', answerCN: '超过6000万"留守儿童"留在村庄，而父母在遥远的城市工作。"卫星宝宝"被送回祖父母身边，之后再被"认领"。还有那些看不见的劳动者——外卖骑手、保安、护工——他们牺牲团圆，让其他人得以庆祝。'},
    ],
    glossary: [
      { term: '春运', pinyin: 'Chūnyùn', meaning: 'Spring Festival travel rush — world\'s largest human migration' },
      { term: '户口', pinyin: 'Hùkǒu', meaning: 'Household registration — ties citizens to birthplace' },
      { term: '流动人口', pinyin: 'Liúdòng rénkǒu', meaning: '"Floating population" — migrants living where not registered' },
      { term: '站票', pinyin: 'Zhànpiào', meaning: 'Standing ticket — boarding without a seat for 20+ hours' },
    ],
    closingLine: 'Nine billion journeys answer a single question: Who waits for me at home?',
    themeColor: '#A83535', // 暗红
  },
  {
    id: 'commerce',
    numeral: '玖',
    numeralEN: 'IX',
    titleCN: '货殖',
    titleEN: 'Commerce',
    subtitleEN: 'The Abacus of Homecoming',
    subtitleCN: '归乡的算盘',
    oneLinerEN: 'Trillions of yuan spent. The ledger clears not debt, but distance.',
    oneLinerCN: '万亿元支出。清的不是账，而是距离。',
    tags: ['economy', 'hongbao', 'logistics'],
    tagsCN: ['经济', '红包', '物流'],
    readTime: '6 min',
    sections: [
      { question: 'What is the "Spring Festival Economy"?', answer: 'More accurately a ritual economy — a vast circulation of wealth whose primary function is not material exchange but social repair. Every yuan carries symbolic weight. For the Fire Horse year, spending becomes protective — a "Red Shield" against zodiacal volatility.' , questionCN: '什么是"春节经济"？', answerCN: '更准确地说是一种仪式经济——财富的巨大流通，其主要功能不是物质交换而是社会修复。每一元都承载象征重量。在火马年，消费变成了保护性的——抵御生肖波动的"红色盾牌"。'},
      { question: 'Where does the money flow?', answer: 'Mobility: the cost of return flows from coastal cities to rural peripheries. The Ritual Table: pre-made dishes surge 45%, democratizing luxury. The Red Shield: protection spending on Ben Ming Nian essentials. Digital Blessings: WeChat and Alipay process billions of Hongbao at midnight — high-frequency social currency.' , questionCN: '钱流向哪里？', answerCN: '流动性：回乡成本从沿海城市流向农村外围。仪式餐桌：预制菜激增45%，使奢华平民化。红色盾牌：本命年必需品的保护性消费。数字祝福：微信和支付宝在午夜处理数十亿红包——高频社交货币。'},
      { question: 'What happens behind the scenes?', answer: 'China\'s industrial chain undergoes total paralysis then reboot. Factories taper 2-4 weeks before as workers journey home. Chilean cherries rely on precise cold chain across hemispheres. Liuyang — global capital of fireworks — halts production weeks before the festival. Municipal drone swarms are replacing personal firecrackers.' , questionCN: '幕后发生了什么？', answerCN: '中国的产业链经历全面瘫痪后重启。工厂在工人回家前2-4周逐渐减产。智利樱桃依赖跨半球的精确冷链。浏阳——全球烟花之都——在节前数周停产。市政无人机群正在取代个人鞭炮。'},
      { question: 'What does all this spending accomplish?', answer: 'The circular exchange of Hongbao often nets zero — but it refreshes the social contract. The pre-made dishes preserve ritual without exhaustion. The standing ticket purchases determination with discomfort. When the sun rises on the Fire Horse, the ledger is balanced, not of debt, but of distance.' , questionCN: '所有这些消费达成了什么？', answerCN: '红包的循环交换通常净值为零——但它刷新了社会契约。预制菜保留了仪式而不至于精疲力竭。站票用不适换来了决心。当太阳在火马年升起时，账本结清的不是债务，而是距离。'},
    ],
    glossary: [
      { term: '红包', pinyin: 'Hóngbāo', meaning: 'Red packets — originally spirit-suppressing coins, now digital currency' },
      { term: '本命年', pinyin: 'Běn Mìng Nián', meaning: 'Zodiac Birth Year — requiring red protection' },
      { term: '太岁', pinyin: 'Tài Suì', meaning: 'Grand Duke Jupiter — deity governing yearly fortune' },
      { term: '预制菜', pinyin: 'Yùzhìcài', meaning: 'Pre-made dishes — controversial convenience revolution' },
    ],
    closingLine: 'When the festival ends, the ledger is clear — not of debt, but of distance.',
    themeColor: '#C94040', // 正红
  },
  {
    id: 'vision',
    numeral: '拾',
    numeralEN: 'X',
    titleCN: '今古',
    titleEN: 'Meaning',
    subtitleEN: 'The Dialectics of Beginning',
    subtitleCN: '开端的辩证法',
    oneLinerEN: 'We begin again not because time demands it, but because meaning requires it.',
    oneLinerCN: '我们重新开始，不是因为时间要求，而是因为意义需要。',
    tags: ['philosophy', 'time', 'liu-bai'],
    tagsCN: ['哲学', '时间', '留白'],
    readTime: '6 min',
    sections: [
      { question: 'What does "Guo Nian" actually mean?', answer: 'Guo Nian — "passing the year" or "surviving the Nian." The etymology reveals the festival\'s origins in precarious agrarian existence. To "pass" the year is not merely to celebrate it. It is to survive it — a ritual of collective survival against the darkness of winter.' , questionCN: '"过年"到底意味着什么？', answerCN: '过年——"度过这一年"或"幸存年兽"。词源揭示了节日起源于朝不保夕的农耕存在。"过"年不仅仅是庆祝它。而是幸存下来——一种对抗冬日黑暗的集体生存仪式。'},
      { question: 'What is "Liu Bai" and why does it matter?', answer: 'Liu Bai — "leaving blank space" — the intentional emptiness that gives form to what is present. The mountain exists because of the white mist around it. The New Year is not merely a time to do more — it is a time to do less. The Great Industrial Pause is philosophical alignment with the need for rest and renewal.' , questionCN: '"留白"是什么，为什么重要？', answerCN: '留白——"留出空白"——赋予存在之物以形态的刻意空无。山因周围的白雾而存在。新年不仅是做更多事的时刻——更是做更少事的时刻。大工业停摆是与休息和更新需求的哲学对齐。'},
      { question: 'How do cyclical and linear time conflict?', answer: 'Cyclical time: each year ends where it began, renewal through ritual, patience. Linear time: each moment moves irreversibly forward, renewal through break, urgency. The modern Spring Festival holds both in tension. We perform ancient rituals while refreshing our phones. We honor ancestors while streaming digital content.' , questionCN: '循环时间与线性时间如何冲突？', answerCN: '循环时间：每一年在起始处结束，通过仪式更新，耐心。线性时间：每一刻不可逆地向前推进，通过断裂更新，紧迫。现代春节将两者保持在张力中。我们一边执行古老仪式，一边刷新手机。我们一边敬祖，一边播放数字内容。'},
      { question: 'What is "Jin Gu"?', answer: 'Jin Gu — "Now-Ancient" — the coexistence of the contemporary and the traditional. Ancient: 60-year zodiac cycle, Nian beast mythology, red protection. Modern: digital Hongbao, pre-made dinners, drone fireworks. Timeless: the return home, the reunion dinner, the balance of relationships. It is the capacity to hold both.' , questionCN: '"今古"是什么？', answerCN: '今古——"当下-古老"——当代与传统的共存。古老：六十年生肖周期、年兽神话、红色保护。现代：数字红包、预制年夜饭、无人机烟花。永恒：回家、团圆饭、关系的平衡。这是同时持有两者的能力。'},
    ],
    glossary: [
      { term: '过年', pinyin: 'Guò Nián', meaning: '"Passing the Year" — surviving/celebrating the New Year' },
      { term: '留白', pinyin: 'Liú Bái', meaning: '"Leaving blank" — philosophy of intentional emptiness' },
      { term: '今古', pinyin: 'Jīn Gǔ', meaning: '"Now-Ancient" — coexistence of modern and traditional' },
      { term: '守岁', pinyin: 'Shǒu Suì', meaning: '"Guarding the Year" — all-night vigil' },
    ],
    closingLine: 'We begin again not because time demands it, but because meaning requires it.',
    themeColor: '#B83A3A', // 深红
  },
];
