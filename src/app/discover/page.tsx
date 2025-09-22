'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useTheme } from '@/contexts/ThemeContext'
import HealthDashboard from '@/components/HealthDashboard'

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
    const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY
    if (!apiKey || apiKey === 'demo') {
      return generateFallbackArticles(query)
    }
    
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&page=${page}&language=en&apiKey=${apiKey}`
    )
    
    if (!response.ok) {
      return generateFallbackArticles(query)
    }
    
    const data = await response.json()
    return data.articles || generateFallbackArticles(query)
  } catch (error) {
    console.error('Failed to fetch news:', error)
    return generateFallbackArticles(query)
  }
}

const fetchFullArticleContent = async (url: string): Promise<string> => {
  try {
    const response = await fetch(`/api/scrape-article`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch full content')
    }
    
    const data = await response.json()
    return data.content || 'Full content not available'
  } catch (error) {
    console.error('Error fetching full content:', error)
    return 'Full content not available. Please visit the original article.'
  }
}

const generateContextualContent = (title: string, category: string): string => {
  const templates = {
    research: [
      "This groundbreaking research represents a paradigm shift in medical science, offering new hope for patients and healthcare providers worldwide. The implications extend far beyond the immediate findings, potentially revolutionizing how we approach diagnosis, treatment, and prevention strategies.",
      "The comprehensive study methodology involved multi-phase clinical trials across diverse patient populations, ensuring robust data collection and statistical significance. Researchers employed cutting-edge analytical techniques and maintained strict adherence to international research standards throughout the investigation process.",
      "Leading medical institutions and healthcare professionals are actively reviewing these findings to determine implementation strategies within existing treatment protocols. The research has already sparked collaborative efforts among specialists to develop practical applications for patient care.",
      "The long-term implications of this research could fundamentally change medical education curricula and clinical practice guidelines. Healthcare systems are beginning to allocate resources for training programs and infrastructure updates to accommodate these new approaches.",
      "Patient advocacy groups have expressed optimism about the potential benefits, while regulatory agencies are fast-tracking review processes to ensure safe and effective implementation. The research timeline suggests that practical applications could be available within the next 2-3 years.",
      "International medical conferences are featuring these findings prominently, with experts from around the world contributing additional research and validation studies. The collaborative nature of this work demonstrates the global commitment to advancing healthcare outcomes."
    ],
    wellness: [
      "Wellness practitioners and healthcare experts are emphasizing the transformative potential of integrating these evidence-based findings into comprehensive lifestyle approaches. The holistic nature of these insights addresses multiple aspects of human health simultaneously.",
      "The scientific validation of traditional wellness practices through rigorous research methodologies is bridging the gap between conventional medicine and alternative health approaches. This integration is creating more personalized and effective treatment options for patients.",
      "Lifestyle medicine specialists are developing structured programs that incorporate these findings into practical, sustainable daily routines. The focus on prevention rather than treatment is proving to be both cost-effective and beneficial for long-term health outcomes.",
      "Corporate wellness programs are beginning to adopt these evidence-based strategies, recognizing the significant impact on employee health, productivity, and healthcare costs. Major employers are investing in comprehensive wellness initiatives based on these scientific insights.",
      "The psychological and social benefits of these wellness approaches extend beyond individual health improvements, contributing to stronger communities and reduced healthcare system burden. Public health officials are exploring policy implications and population-level implementation strategies.",
      "Technology integration is making these wellness approaches more accessible and measurable, with digital health platforms providing personalized recommendations and progress tracking. The combination of scientific evidence and technological innovation is democratizing access to optimal health strategies."
    ],
    nutrition: [
      "Nutritional genomics and personalized medicine are converging to create unprecedented opportunities for individualized dietary interventions. These advances are moving beyond one-size-fits-all recommendations to precision nutrition strategies tailored to genetic profiles and metabolic characteristics.",
      "The emerging understanding of the gut microbiome's role in overall health is revolutionizing how we approach nutrition and disease prevention. Researchers are identifying specific bacterial strains and their interactions with various nutrients, leading to targeted probiotic and prebiotic recommendations.",
      "Food as medicine initiatives are gaining momentum in healthcare systems worldwide, with physicians increasingly prescribing specific dietary interventions alongside traditional treatments. Medical schools are expanding nutrition education requirements to better prepare future healthcare providers.",
      "Agricultural and food technology innovations are enabling the development of functional foods with enhanced nutritional profiles and therapeutic properties. These advances are creating new categories of foods designed specifically for health optimization and disease management.",
      "Public health nutrition policies are evolving to reflect these scientific advances, with governments implementing evidence-based dietary guidelines and food labeling requirements. The focus is shifting toward preventing diet-related diseases through proactive nutritional interventions.",
      "The economic impact of improved nutrition on healthcare costs is driving investment in nutrition research and intervention programs. Healthcare insurers are beginning to cover nutritional counseling and specialized dietary programs as preventive care measures."
    ],
    mental: [
      "The digital revolution in mental healthcare is creating unprecedented opportunities for accessible, personalized treatment options. Artificial intelligence and machine learning algorithms are being developed to provide real-time mental health support and early intervention strategies.",
      "Neuroplasticity research is revealing the brain's remarkable capacity for healing and adaptation throughout life, challenging previous assumptions about mental health treatment limitations. These findings are inspiring new therapeutic approaches that harness the brain's natural recovery mechanisms.",
      "The integration of traditional psychotherapy with innovative technologies such as virtual reality, biofeedback, and neurostimulation is expanding treatment possibilities for previously treatment-resistant conditions. These hybrid approaches are showing promising results in clinical trials.",
      "Workplace mental health initiatives are evolving beyond basic employee assistance programs to comprehensive mental wellness ecosystems. Organizations are recognizing the direct correlation between employee mental health and productivity, innovation, and retention rates.",
      "The destigmatization of mental health conditions is accelerating through public awareness campaigns, celebrity advocacy, and improved media representation. This cultural shift is encouraging more individuals to seek help and participate in mental health research studies.",
      "Preventive mental health strategies are being implemented in educational systems, with social-emotional learning curricula and mindfulness programs becoming standard components of student development. Early intervention approaches are showing significant promise in reducing the prevalence of mental health disorders."
    ],
    fitness: [
      "Exercise prescription is evolving into a precise science, with healthcare providers developing individualized fitness protocols based on genetic markers, biomarkers, and comprehensive health assessments. This personalized approach is maximizing therapeutic benefits while minimizing injury risks.",
      "The molecular mechanisms underlying exercise-induced health benefits are being mapped in unprecedented detail, revealing how physical activity influences gene expression, cellular repair processes, and systemic inflammation. These insights are informing more targeted exercise interventions.",
      "Wearable technology and artificial intelligence are revolutionizing fitness monitoring and optimization, providing real-time feedback on exercise intensity, recovery needs, and performance metrics. This data-driven approach is enabling more effective and safer training protocols.",
      "The connection between physical fitness and cognitive function is being extensively studied, with researchers identifying specific exercise modalities that enhance memory, attention, and executive function. These findings are influencing educational and workplace wellness programs.",
      "Age-specific fitness research is challenging conventional assumptions about exercise limitations in older adults, revealing that appropriately designed programs can reverse age-related decline and improve quality of life significantly. Geriatric fitness is becoming a specialized field within healthcare.",
      "The role of exercise in disease prevention and management is being quantified with increasing precision, leading to evidence-based exercise prescriptions for conditions ranging from diabetes and cardiovascular disease to depression and cognitive decline. Healthcare systems are integrating fitness professionals into multidisciplinary treatment teams."
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

export default function DiscoverPage() {
  const { theme } = useTheme()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [fullContent, setFullContent] = useState<string>('')
  const [loadingContent, setLoadingContent] = useState(false)
  const [categoryIndex, setCategoryIndex] = useState(0)
  const [showDashboard, setShowDashboard] = useState(false)

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return
    
    setLoading(true)
    
    try {
      if (selectedCategory === 'all') {
        // For 'all' category, cycle through categories starting with wellness for engaging content
        const availableCategories = [categories[2], categories[3], categories[4], categories[5], categories[1]] // Start with wellness, nutrition, mental, fitness, then research
        const currentCategory = availableCategories[categoryIndex % availableCategories.length]
        const articles = await fetchHealthNews(currentCategory.query, Math.floor(page / availableCategories.length) + 1)
        
        if (articles.length === 0) {
          setCategoryIndex(prev => prev + 1)
          if (categoryIndex >= availableCategories.length * 3) { // Limit cycles
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
          )) // Prevent duplicates by URL and title
        
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
        // For specific categories
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
          )) // Prevent duplicates by URL and title
        
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
      setFullContent(selectedPost.content)
      setLoadingContent(false)
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
    <div className="h-screen flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-md border-b border-slate-200/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>Discover Health & Wellness</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-64 pl-10 pr-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
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

      <main className="flex-1 overflow-y-auto">
        {selectedPost ? (
          <div className="max-w-4xl mx-auto px-6 py-8">
            <button
              onClick={() => setSelectedPost(null)}
              className={`mb-6 flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <i className="fas fa-arrow-left"></i>
              Back to articles
            </button>
            
            <article className={`rounded-2xl overflow-hidden shadow-xl ${
              theme === 'dark' ? 'bg-slate-800' : 'bg-white'
            }`}>
              <div className="relative h-64 md:h-80">
                <Image
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                    {selectedPost.category}
                  </span>
                </div>
              </div>
              
              <div className="p-8">
                <h1 className={`text-3xl md:text-4xl font-bold mb-6 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium ${
                    theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {selectedPost.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      {selectedPost.author}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                    }`}>
                      {selectedPost.date} • {selectedPost.readTime}
                    </p>
                  </div>
                </div>
                
                <div className={`max-w-none ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {/* Article Lead */}
                  <div className={`p-6 rounded-xl mb-8 border-l-4 border-blue-500 ${
                    theme === 'dark' ? 'bg-slate-700/30' : 'bg-blue-50'
                  }`}>
                    <p className={`text-lg leading-relaxed font-medium italic ${
                      theme === 'dark' ? 'text-slate-200' : 'text-slate-800'
                    }`}>
                      {selectedPost.excerpt}
                    </p>
                  </div>
                  
                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none space-y-6">
                    {selectedPost.content.split('\n\n').map((paragraph, index) => {
                      const isFirstParagraph = index === 0
                      return (
                        <div key={index} className="mb-6">
                          {isFirstParagraph && (
                            <h2 className={`text-xl font-semibold mb-4 ${
                              theme === 'dark' ? 'text-white' : 'text-slate-900'
                            }`}>
                              Key Insights
                            </h2>
                          )}
                          <p className={`text-base leading-8 text-justify ${
                            theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                          } ${isFirstParagraph ? 'first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left first-letter:leading-none' : ''}`}>
                            {paragraph}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Article Footer */}
                  <div className={`mt-12 p-6 rounded-xl border ${
                    theme === 'dark' 
                      ? 'bg-slate-700/20 border-slate-600' 
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${
                        theme === 'dark' ? 'bg-slate-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        {selectedPost.author.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <h3 className={`font-semibold text-lg ${
                          theme === 'dark' ? 'text-white' : 'text-slate-900'
                        }`}>
                          About the Author
                        </h3>
                        <p className={`text-base ${
                          theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                        }`}>
                          {selectedPost.author}
                        </p>
                        <p className={`text-sm ${
                          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                          Published on {selectedPost.date} • {selectedPost.readTime}
                        </p>
                      </div>
                    </div>
                    <div className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      <p>This article provides educational information about health and wellness topics. Always consult with healthcare professionals for personalized medical advice.</p>
                    </div>
                  </div>
                </div>
                  
                  {/* <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                    <a 
                      href={selectedPost.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Original Source
                      <i className="fas fa-external-link-alt text-sm"></i>
                    </a>
                  </div> */}
              </div>
            </article>
          </div>
        ) : (
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
        )}
      </main>
      
      <HealthDashboard 
        isOpen={showDashboard} 
        onClose={() => setShowDashboard(false)} 
      />
    </div>
  )
}