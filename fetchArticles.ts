import Parser from 'rss-parser'

export interface Article {
  id: string
  title: string
  seoTitle: string
  source: string
  sourceUrl: string
  originalLink: string
  publishedAt: string
  category: string
  tags: string[]
  whatHappened: string
  whyItMatters: string
  whatToExpect: string
  readTime: number
}

// ─── RSS FEEDS (AI + Tech niche) ─────────────────────────────────────────────
const FEEDS = [
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', category: 'Tech News' },
  { url: 'https://feeds.feedburner.com/venturebeat/SZYF', source: 'VentureBeat', category: 'AI Tools' },
  { url: 'https://hnrss.org/frontpage', source: 'Hacker News', category: 'Tech News' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge', category: 'Tech News' },
  { url: 'https://techcrunch.com/category/artificial-intelligence/feed/', source: 'TechCrunch AI', category: 'AI Tools' },
]

// ─── KEYWORDS to filter relevant articles ────────────────────────────────────
const KEYWORDS = [
  'ai', 'artificial intelligence', 'chatgpt', 'gpt', 'llm', 'openai',
  'anthropic', 'claude', 'gemini', 'startup', 'tool', 'launch', 'funding',
  'automation', 'software', 'app', 'model', 'tech', 'robot', 'agent'
]

// ─── INSIGHT TEMPLATES — auto-format without AI API calls ────────────────────
// Each template fills in the "Why it matters" and "What to expect" sections
// based on detected category/keywords. This IS the insight layer.

function detectCategory(title: string, summary: string): string {
  const text = (title + ' ' + summary).toLowerCase()
  if (text.includes('funding') || text.includes('raises') || text.includes('million') || text.includes('billion')) return 'Funding'
  if (text.includes('launch') || text.includes('release') || text.includes('announce')) return 'Product Launch'
  if (text.includes('gpt') || text.includes('llm') || text.includes('model') || text.includes('claude') || text.includes('gemini')) return 'AI Models'
  if (text.includes('job') || text.includes('hire') || text.includes('layoff')) return 'Jobs & Industry'
  if (text.includes('regulation') || text.includes('law') || text.includes('congress') || text.includes('policy')) return 'Policy & Regulation'
  if (text.includes('tool') || text.includes('app') || text.includes('software') || text.includes('platform')) return 'AI Tools'
  return 'Tech News'
}

function generateInsights(title: string, summary: string, category: string, source: string) {
  const text = (title + ' ' + summary).toLowerCase()

  // "What Happened" — clean up and trim the summary
  const whatHappened = summary
    .replace(/<[^>]+>/g, '') // strip HTML tags
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 300) + (summary.length > 300 ? '...' : '')

  // "Why It Matters" — category-specific insight templates
  const whyTemplates: Record<string, string[]> = {
    'Funding': [
      `This signals strong investor confidence in the space. When serious capital moves into a company, it typically means the product has proven demand — and a well-funded competitor changes the landscape for everyone in the industry.`,
      `Follow the money: venture capital flows to where returns are expected. This round suggests investors see a large addressable market and believe this team can capture it. Competitors should pay attention.`,
    ],
    'Product Launch': [
      `New tools reshape how people work. If this product delivers on its promise, it could reduce time spent on repetitive tasks — meaning teams can focus on higher-value work. Early adopters gain a real edge.`,
      `The pace of new product releases in this space is accelerating. Each launch raises the bar for what users expect, and the companies that ship fastest tend to define the category.`,
    ],
    'AI Models': [
      `Model improvements have a compounding effect — better base models mean every product built on top of them gets smarter too. This development will ripple through dozens of applications you already use.`,
      `The AI model race is intensifying. Gains in capability directly translate to better products for end users. Pay attention to benchmarks, but the real test is real-world usefulness.`,
    ],
    'Policy & Regulation': [
      `Regulation shapes the rules of the game. What gets decided now will determine how AI products can be built and sold for the next decade. Businesses need to start thinking about compliance today, not after laws pass.`,
      `When governments move on tech policy, the companies that engaged early tend to fare better. This signals the industry is maturing — and that the "move fast and break things" era has a shorter runway.`,
    ],
    'AI Tools': [
      `The best AI tools multiply what individuals and small teams can accomplish. If this does what it claims, it's the kind of product that quietly becomes essential — and the people who adopt it early gain a compounding advantage.`,
      `Tool adoption follows a pattern: early adopters gain efficiency, then the efficiency becomes table stakes. Getting familiar with the category now puts you ahead of the curve.`,
    ],
    'Jobs & Industry': [
      `Hiring and layoff patterns are leading indicators of where the industry is heading. This move reveals strategic priorities — where companies see growth, and where they're cutting costs.`,
    ],
    'Tech News': [
      `This development is worth tracking because it reflects a broader shift in how the tech industry is evolving. Staying informed on these signals helps you anticipate changes before they affect your work or business.`,
      `Every major trend starts as a small signal. This story is part of a larger pattern that will become obvious in hindsight — the question is whether you spot it early enough to act on it.`,
    ],
  }

  const whyOptions = whyTemplates[category] || whyTemplates['Tech News']
  const whyItMatters = whyOptions[Math.floor(Math.random() * whyOptions.length)]

  // "What to Expect" — forward-looking sentences
  const expectTemplates: Record<string, string[]> = {
    'Funding': [
      `Expect the funded company to accelerate hiring and product development. Watch for a major feature release or market expansion announcement within 6–12 months.`,
      `The next 12 months will likely bring rapid product iteration and possible acquisitions as the newly funded team moves to capture market share.`,
    ],
    'Product Launch': [
      `Expect early adopter reviews in the coming weeks — those will be the real signal. If the product gains traction, expect competitors to respond with similar features within months.`,
      `Watch for the pricing model to evolve as the product matures. Most new tools launch with generous free tiers to build user base, then shift when they have leverage.`,
    ],
    'AI Models': [
      `Expect this to be integrated into third-party products quickly. Model releases are rarely standalone — the ecosystem builds around them fast, and new use cases emerge that even the developers didn't anticipate.`,
      `Competing labs will respond. Model releases tend to compress the timeline for rivals to ship their next version. Expect announcements from competitors in the coming weeks.`,
    ],
    'Policy & Regulation': [
      `This is likely the start of a longer process, not the end. Expect lobbying, public comment periods, and revisions. The final rules may look very different from what's proposed today.`,
      `Watch how major tech companies respond publicly — their statements will signal how they plan to navigate compliance and whether they see this as a threat or an opportunity.`,
    ],
    'AI Tools': [
      `If the tool gains adoption, expect rapid iteration based on user feedback. The most successful AI products ship fast and update frequently. Bookmark it and check back in 30 days.`,
      `Competitors will take note. If this proves popular, expect similar features to appear in established platforms within 3–6 months.`,
    ],
    'Jobs & Industry': [
      `Watch this company's job postings over the next quarter — they'll reveal strategic direction better than any press release. Candidates with the right skills will find this opens doors.`,
    ],
    'Tech News': [
      `Keep an eye on how this develops over the next quarter. Major trends rarely announce themselves clearly at first — following the thread from this point forward will give you an advantage.`,
      `The follow-up story will be more important than this one. Watch for how industry players respond and whether the pattern repeats with other companies.`,
    ],
  }

  const expectOptions = expectTemplates[category] || expectTemplates['Tech News']
  const whatToExpect = expectOptions[Math.floor(Math.random() * expectOptions.length)]

  return { whatHappened, whyItMatters, whatToExpect }
}

function generateSeoTitle(title: string, category: string): string {
  // Make title more SEO friendly — add value words
  const prefixes: Record<string, string[]> = {
    'AI Tools': ['How ', 'Why ', 'What '],
    'Funding': ['', '', ''],
    'Product Launch': ['', 'New: ', ''],
    'AI Models': ['', '', ''],
    'Tech News': ['', '', ''],
    'Policy & Regulation': ['', '', ''],
    'Jobs & Industry': ['', '', ''],
  }
  // Keep original title if it's already good (under 65 chars)
  if (title.length <= 65) return title
  return title.slice(0, 62) + '...'
}

function generateTags(title: string, summary: string, category: string): string[] {
  const text = (title + ' ' + summary).toLowerCase()
  const tags = [category]
  if (text.includes('openai') || text.includes('chatgpt')) tags.push('OpenAI')
  if (text.includes('google') || text.includes('gemini')) tags.push('Google AI')
  if (text.includes('anthropic') || text.includes('claude')) tags.push('Anthropic')
  if (text.includes('funding') || text.includes('raises')) tags.push('Funding')
  if (text.includes('startup')) tags.push('Startup')
  if (text.includes('llm') || text.includes('model')) tags.push('LLMs')
  tags.push('AI', 'Tech')
  return [...new Set(tags)].slice(0, 6)
}

function isRelevant(title: string, summary: string): boolean {
  const text = (title + ' ' + summary).toLowerCase()
  return KEYWORDS.some(k => text.includes(k))
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 60)
}

// ─── MAIN FETCH FUNCTION ──────────────────────────────────────────────────────
export async function fetchArticles(): Promise<Article[]> {
  const parser = new Parser({
    timeout: 8000,
    headers: { 'User-Agent': 'AI-Insight-Blog/1.0' },
  })

  const articles: Article[] = []
  const seen = new Set<string>()

  for (const feed of FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url)
      for (const item of (parsed.items || []).slice(0, 8)) {
        const title = item.title || ''
        const summary = item.contentSnippet || item.content || item.summary || ''
        const link = item.link || ''

        if (!title || !link || seen.has(link)) continue
        if (!isRelevant(title, summary)) continue

        seen.add(link)

        const category = detectCategory(title, summary)
        const { whatHappened, whyItMatters, whatToExpect } = generateInsights(title, summary, category, feed.source)

        articles.push({
          id: slugify(title),
          title,
          seoTitle: generateSeoTitle(title, category),
          source: feed.source,
          sourceUrl: feed.url,
          originalLink: link,
          publishedAt: item.pubDate || item.isoDate || new Date().toISOString(),
          category,
          tags: generateTags(title, summary, category),
          whatHappened,
          whyItMatters,
          whatToExpect,
          readTime: Math.max(2, Math.ceil((whatHappened + whyItMatters + whatToExpect).split(' ').length / 200)),
        })
      }
    } catch (e) {
      console.error(`Failed to fetch ${feed.source}:`, e)
    }
  }

  // Sort newest first
  return articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}
