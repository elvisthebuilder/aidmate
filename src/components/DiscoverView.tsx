'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'

interface NewsArticle {
  title: string
  description: string
  content: string
  url: string
  urlToImage: string
  publishedAt: string
  source: { name: string }
  author: string
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  date: string
  readTime: string
  category: string
  url: string
}

const categories = [
  { name: 'All', key: 'all', query: 'health wellness fitness nutrition mental breakthrough' },
  { name: 'Research', key: 'research', query: 'medical research clinical trial' },
  { name: 'Wellness', key: 'wellness', query: 'wellness health lifestyle' },
  { name: 'Nutrition', key: 'nutrition', query: 'nutrition diet food health' },
  { name: 'Mental Health', key: 'mental', query: 'mental health psychology' },
  { name: 'Fitness', key: 'fitness', query: 'fitness exercise workout health' }
]

const generateFallbackArticles = (category: string): NewsArticle[] => {
  const articles = [
    {
      title: "Revolutionary Breakthrough in Personalized Medicine Shows Promise",
      description: "Scientists have developed a new approach to personalized medicine that could transform how we treat chronic diseases.",
      content: "This groundbreaking research represents a significant advancement in medical science...",
      url: "https://example.com/article1",
      urlToImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop",
      publishedAt: new Date().toISOString(),
      source: { name: "Health Research Journal" },
      author: "Dr. Sarah Johnson"
    },
    {
      title: "New Study Reveals the Power of Mindful Eating for Weight Management",
      description: "Research shows that mindful eating practices can significantly improve weight management and overall health outcomes.",
      content: "A comprehensive study involving over 1,000 participants has demonstrated...",
      url: "https://example.com/article2",
      urlToImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      source: { name: "Nutrition Science Today" },
      author: "Dr. Michael Chen"
    },
    {
      title: "Mental Health Apps Show Significant Impact on Anxiety Reduction",
      description: "Clinical trials demonstrate that digital mental health interventions can be as effective as traditional therapy.",
      content: "A landmark study published in the Journal of Digital Health...",
      url: "https://example.com/article3",
      urlToImage: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800&h=400&fit=crop",
      publishedAt: new Date(Date.now() - 172800000).toISOString(),
      source: { name: "Mental Health Research" },
      author: "Dr. Emily Rodriguez"
    }
  ]
  return articles
}

const fetchHealthNews = async (query: string, page: number = 1): Promise<NewsArticle[]> => {
  try {
    const response = await fetch(
      `https://content.guardianapis.com/search?q=${encodeURIComponent(query)}&page=${page}&page-size=20&show-fields=headline,byline,thumbnail,bodyText,trailText&api-key=test`
    )
    
    if (!response.ok) {
      return generateFallbackArticles(query)
    }
    
    const data = await response.json()
    const articles = data.response?.results || []
    
    return articles.map((article: any) => ({
      title: article.fields?.headline || article.webTitle,
      description: article.fields?.trailText || 'Health and wellness insights.',
      content: article.fields?.bodyText || article.fields?.trailText || '',
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
      publishedAt: article.webPublicationDate,
      source: { name: 'The Guardian' },
      author: article.fields?.byline || 'The Guardian'
    }))
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return generateFallbackArticles(query)
  }
}

const generateContextualContent = (title: string, category: string): string => {
  const templates = {
    research: [
      "This groundbreaking research represents a paradigm shift in medical science, offering new hope for patients and healthcare providers worldwide.",
    ],
    wellness: [
      "Wellness practitioners and healthcare experts are emphasizing the transformative potential of integrating these evidence-based findings into comprehensive lifestyle approaches.",
    ],
    nutrition: [
      "Nutritional genomics and personalized medicine are converging to create unprecedented opportunities for individualized dietary interventions.",
    ],
    mental: [
      "The digital revolution in mental healthcare is creating unprecedented opportunities for accessible, personalized treatment options.",
    ],
    fitness: [
      "Exercise prescription is evolving into a precise science, with healthcare providers developing individualized fitness protocols based on genetic markers.",
    ]
  }

  const categoryTemplates = templates[category as keyof typeof templates] || templates.research
  return categoryTemplates.join('\n\n')
}

const convertToBlogPost = (article: NewsArticle, category: string): BlogPost => {
  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(' ').length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }

  const generateFullContent = (article: NewsArticle, category: string) => {
    const baseContent = article.content || article.description || ''
    const cleanBase = baseContent.replace(/\[\+\d+ chars\]$/, '').trim()
    const contextualContent = generateContextualContent(article.title, category)
    
    return `${article.description}\n\n${cleanBase}\n\n${contextualContent}`
  }

  const fullContent = generateFullContent(article, category)

  return {
    id: article.url.replace(/[^a-zA-Z0-9]/g, '-'),
    title: article.title,
    excerpt: article.description || 'No description available.',
    content: fullContent,
    image: article.urlToImage || 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop',
    author: article.author || article.source.name,
    date: new Date(article.publishedAt).toLocaleDateString(),
    readTime: `${estimateReadTime(fullContent)} min read`,
    category,
    url: article.url
  }
}

export default function DiscoverView() {
  const { theme } = useTheme()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [categoryIndex, setCategoryIndex] = useState(0)

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    try {
      if (selectedCategory === 'all') {
        const availableCategories = [categories[2], categories[3], categories[4], categories[5], categories[1]]
        const currentCategory = availableCategories[categoryIndex % availableCategories.length]
        const articles = await fetchHealthNews(currentCategory.query, Math.floor(page / availableCategories.length) + 1)
        
        if (articles.length === 0) {
          setCategoryIndex(prev => prev + 1)
          if (categoryIndex >= availableCategories.length * 3) {
            setHasMore(false)
          }
          setLoading(false)
          return
        }
        
        const newPosts = articles
          .filter(article => article.title && article.description && article.urlToImage)
          .map(article => convertToBlogPost(article, currentCategory.key))
          .filter(newPost => !posts.some(existingPost => 
            existingPost.url === newPost.url || 
            existingPost.title.toLowerCase() === newPost.title.toLowerCase()
          ))
        
        if (newPosts.length > 0) {
          setPosts(prev => {
            const existingIds = new Set(prev.map(p => p.id))
            const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id))
            return [...prev, ...uniqueNewPosts]
          })
        }
        
        setCategoryIndex(prev => prev + 1)
        setPage(prev => prev + 1)
      } else {
        const category = categories.find(cat => cat.key === selectedCategory) || categories[0]
        const articles = await fetchHealthNews(category.query, page + 1)
        
        if (articles.length === 0) {
          setHasMore(false)
          setLoading(false)
          return
        }
        
        const newPosts = articles
          .filter(article => article.title && article.description && article.urlToImage)
          .map(article => convertToBlogPost(article, category.key))
          .filter(newPost => !posts.some(existingPost => 
            existingPost.url === newPost.url || 
            existingPost.title.toLowerCase() === newPost.title.toLowerCase()
          ))
        
        if (newPosts.length > 0) {
          setPosts(prev => {
            const existingIds = new Set(prev.map(p => p.id))
            const uniqueNewPosts = newPosts.filter(p => !existingIds.has(p.id))
            return [...prev, ...uniqueNewPosts]
          })
          setPage(prev => prev + 1)
        }
        
        if (articles.length < 20) {
          setHasMore(false)
        }
      }
    } catch (error) {
      console.error('Error loading posts:', error)
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }, [loading, hasMore, page, selectedCategory, categoryIndex, posts])

  useEffect(() => {
    setPosts([])
    setPage(0)
    setHasMore(true)
    setCategoryIndex(0)
  }, [selectedCategory])

  useEffect(() => {
    if (posts.length === 0 && hasMore) {
      loadMorePosts()
    }
  }, [posts.length, hasMore, loadMorePosts])

  useEffect(() => {
    if (posts.length === 0) {
      loadMorePosts()
    }
  }, [])

  useEffect(() => {
    if (selectedPost) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedPost])

  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 1000) {
        loadMorePosts()
      }
    }

    const mainElement = document.querySelector('main')
    if (mainElement) {
      mainElement.addEventListener('scroll', handleScroll)
      return () => mainElement.removeEventListener('scroll', handleScroll)
    }
  }, [loadMorePosts])

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="h-full flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-200/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>Discover Health & Wellness</h1>
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full md:w-64 pl-10 pr-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-600 text-white placeholder-slate-400' 
                      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-500'
                  }`}
                />
                <i className={`fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                }`}></i>
              </div>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === category.key
                      ? 'bg-blue-600 text-white'
                      : theme === 'dark'
                        ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main 
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: theme === 'dark' ? '#475569 transparent' : '#cbd5e1 transparent'
        }}
      >
        <style jsx>{`
          main::-webkit-scrollbar {
            width: 6px;
          }
          main::-webkit-scrollbar-track {
            background: transparent;
          }
          main::-webkit-scrollbar-thumb {
            background-color: ${theme === 'dark' ? '#475569' : '#cbd5e1'};
            border-radius: 3px;
          }
          main::-webkit-scrollbar-thumb:hover {
            background-color: ${theme === 'dark' ? '#334155' : '#94a3b8'};
          }
        `}</style>
        
        <div className="max-w-6xl mx-auto px-6 py-8">
          {filteredPosts.length > 0 && (
            <article className={`mb-12 rounded-2xl overflow-hidden shadow-xl ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            }`}>
              <div className="md:flex">
                <div className="md:w-1/2 relative h-64 md:h-auto">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 p-8">
                  <h2 className={`text-2xl font-bold mb-4 ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {filteredPosts[0].title}
                  </h2>
                  <p className={`text-lg leading-relaxed mb-6 ${
                    theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {filteredPosts[0].excerpt}
                  </p>
                  <button 
                    onClick={() => setSelectedPost(filteredPosts[0])}
                    className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </article>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <article
                key={`${post.id}-${index}`}
                onClick={() => setSelectedPost(post)}
                className={`group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                  theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className={`text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    {post.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                      theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {post.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium truncate ${
                        theme === 'dark' ? 'text-white' : 'text-slate-900'
                      }`}>
                        {post.author}
                      </p>
                      <p className={`text-xs ${
                        theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {post.date} • {post.readTime}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {loading && (
            <div className="flex justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className={`text-lg ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                  Loading more articles...
                </span>
              </div>
            </div>
          )}

          {!hasMore && posts.length > 0 && (
            <div className="text-center py-12">
              <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                You've reached the end of our health blog. Check back soon for more articles!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}