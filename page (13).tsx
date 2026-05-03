import { fetchArticles } from '@/lib/fetchArticles'
import { formatDistanceToNow } from 'date-fns'
import styles from './page.module.css'

export const revalidate = 3600

const CATEGORY_COLORS: Record<string, string> = {
  'AI Tools': '#4ade80',
  'AI Models': '#a78bfa',
  'Funding': '#60a5fa',
  'Product Launch': '#fb923c',
  'Tech News': '#e8d5a3',
  'Policy & Regulation': '#f87171',
  'Jobs & Industry': '#94a3b8',
}

export default async function Home() {
  const articles = await fetchArticles()

  const categories = ['All', ...Array.from(new Set(articles.map(a => a.category)))]

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>◆</span>
            <span className={styles.logoText}>AI Insight</span>
          </div>
          <p className={styles.tagline}>Daily intelligence on AI & tech — what happened, why it matters, what comes next</p>
        </div>
        <div className={styles.headerMeta}>
          <span className={styles.liveTag}>
            <span className={styles.liveDot}></span>
            {articles.length} stories today
          </span>
          <span className={styles.updateTime}>Updated hourly</span>
        </div>
      </header>

      {/* Category filter (visual only — JS progressive enhancement) */}
      <div className={styles.filters}>
        {categories.map(cat => (
          <span key={cat} className={styles.filterTag} style={cat !== 'All' ? { borderColor: CATEGORY_COLORS[cat] || '#fff', color: CATEGORY_COLORS[cat] || '#fff' } : {}}>
            {cat}
          </span>
        ))}
      </div>

      {/* Article grid */}
      <main className={styles.main}>
        {articles.length === 0 ? (
          <div className={styles.empty}>
            <p>No articles loaded. Check your internet connection or RSS feeds.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {articles.map((article, i) => {
              const catColor = CATEGORY_COLORS[article.category] || '#e8d5a3'
              const timeAgo = (() => {
                try { return formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true }) }
                catch { return 'recently' }
              })()

              return (
                <article key={article.id + i} className={styles.card + (i === 0 ? ' ' + styles.cardFeatured : '')}>
                  <div className={styles.cardTop}>
                    <span className={styles.catBadge} style={{ color: catColor, borderColor: catColor + '40' }}>
                      {article.category}
                    </span>
                    <span className={styles.source}>{article.source}</span>
                    <span className={styles.time}>{timeAgo}</span>
                  </div>

                  <h2 className={styles.cardTitle}>{article.seoTitle}</h2>

                  <div className={styles.insights}>
                    <div className={styles.insightBlock}>
                      <span className={styles.insightLabel} style={{ color: catColor }}>What happened</span>
                      <p className={styles.insightText}>{article.whatHappened}</p>
                    </div>
                    <div className={styles.insightBlock}>
                      <span className={styles.insightLabel} style={{ color: '#60a5fa' }}>Why it matters</span>
                      <p className={styles.insightText}>{article.whyItMatters}</p>
                    </div>
                    <div className={styles.insightBlock}>
                      <span className={styles.insightLabel} style={{ color: '#a78bfa' }}>What to expect</span>
                      <p className={styles.insightText}>{article.whatToExpect}</p>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.tags}>
                      {article.tags.slice(0, 4).map(tag => (
                        <span key={tag} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    <a
                      href={article.originalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.sourceLink}
                    >
                      Read original →
                    </a>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>AI Insight — Curated daily. No spam, no noise.</p>
        <p className={styles.footerSub}>Articles sourced from TechCrunch, VentureBeat, The Verge & Hacker News</p>
      </footer>
    </div>
  )
}
