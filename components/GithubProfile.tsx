import React from 'react';
import GithubHeatmap from './GithubHeatmap';
import { BookOpen, Star, GitFork, Users, Building, MapPin, Mail, Link as LinkIcon, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';

const GithubProfile = () => {
  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen py-8 font-sans font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        
        {/* Tabs */}
        <div className="border-b border-[#30363d] flex gap-6 px-4 mb-8 text-sm hidden md:flex">
          <div className="pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer flex items-center gap-2">
            <BookOpen size={16} /> Overview
          </div>
          <div className="pb-3 border-b-2 border-[#f78166] text-white font-semibold cursor-pointer flex items-center gap-2">
            <BookOpen size={16} /> Repositories
            <span className="bg-[#30363d] text-xs px-2 py-0.5 rounded-full">39</span>
          </div>
          <div className="pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer flex items-center gap-2">
            Projects
          </div>
          <div className="pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer flex items-center gap-2">
            Packages
          </div>
          <div className="pb-3 border-b-2 border-transparent hover:border-[#8b949e] cursor-pointer flex items-center gap-2">
            <Star size={16} /> Stars
            <span className="bg-[#30363d] text-xs px-2 py-0.5 rounded-full">12</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="w-full aspect-square bg-[#30363d] rounded-full mb-4 border border-[#30363d] overflow-hidden relative">
               <img src="https://github.com/coded-devs.png" alt="Profile" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://avatars.githubusercontent.com/u/9919?s=280&v=4' }} />
            </div>
            
            <h1 className="text-2xl font-bold text-white mb-1">AMEEN</h1>
            <h2 className="text-xl text-[#8b949e] font-light mb-4">@coded-devs</h2>
            
            <button className="w-full bg-[#21262d] hover:bg-[#30363d] border border-[#363b42] text-[#c9d1d9] font-semibold py-1.5 rounded-md text-sm mb-4 transition-colors">
              Follow
            </button>
            
            <p className="mb-4 text-[#8b949e]">
              Building the future.
            </p>
            
            <div className="flex items-center text-sm mb-6 text-[#8b949e]">
              <Users size={16} className="mr-2" />
              <span className="text-white font-semibold mr-1">8</span> followers
              <span className="mx-1">·</span>
              <span className="text-white font-semibold mr-1">40</span> following
            </div>
            
            <ul className="text-sm space-y-2 mb-6">
              <li className="flex items-center gap-2"><Building size={16} className="text-[#8b949e]" /> @coded-devs</li>
              <li className="flex items-center gap-2"><MapPin size={16} className="text-[#8b949e]" /> Africa</li>
              <li className="flex items-center gap-2"><Mail size={16} className="text-[#8b949e]" /> <a href="mailto:abdulkareemalameen75@gmail.com" className="hover:text-blue-400 hover:underline">abdulkareemalameen75@gmail.com</a></li>
              <li className="flex items-center gap-2"><LinkIcon size={16} className="text-[#8b949e]" /> <a href="https://onerandomdevv.pxxl.click" className="hover:text-blue-400 hover:underline">https://onerandomdevv.pxxl.click</a></li>
              <li className="flex items-center gap-2"><Twitter size={16} className="text-[#8b949e]" /> @onerandomdevv</li>
              <li className="flex items-center gap-2"><Linkedin size={16} className="text-[#8b949e]" /> in/onerandomdevv</li>
              <li className="flex items-center gap-2"><Youtube size={16} className="text-[#8b949e]" /> @onerandomdevv</li>
              <li className="flex items-center gap-2"><Instagram size={16} className="text-[#8b949e]" /> onerandomdevv</li>
            </ul>

            <div className="border-t border-[#30363d] pt-4 mb-4">
              <h3 className="font-semibold text-white mb-3 text-sm">Achievements</h3>
              <div className="flex gap-2">
                 {/* Mock badges */}
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center relative shadow-lg">🦈 <span className="absolute -bottom-1 -right-1 text-[10px] bg-[#30363d] px-1 rounded-full border border-[#0d1117]">x3</span></div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-600 to-orange-400 flex items-center justify-center shadow-lg">🤠</div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-lime-300 flex items-center justify-center shadow-lg">🫛</div>
                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg text-[10px] font-bold text-white">YOLO</div>
              </div>
            </div>

            <div className="border-t border-[#30363d] pt-4 mb-4">
              <h3 className="font-semibold text-white mb-3 text-sm">Highlights</h3>
              <div className="inline-flex items-center text-xs text-[#a371f7] border border-[#a371f7]/30 rounded-full px-2 py-0.5">
                <Star size={12} className="mr-1" /> PRO
              </div>
            </div>
            
            <div className="border-t border-[#30363d] pt-4">
              <h3 className="font-semibold text-white mb-3 text-sm">Organizations</h3>
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center">
                 <img src="https://github.com/coded-devs.png" alt="Org" className="w-7 h-7" onError={(e) => { e.currentTarget.style.display = 'none' }} />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-6">
            
            {/* Profile README */}
            <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117]">
              <div className="text-xs text-[#8b949e] mb-4 font-mono">onerandomdevv / README.md</div>
              
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#30363d] pb-2">Tech Stack:</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" className="h-6" />
                <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" className="h-6" />
                <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" className="h-6" />
                <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" className="h-6" />
                <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" className="h-6" />
                <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" className="h-6" />
                <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" className="h-6" />
                <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" className="h-6" />
                <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" className="h-6" />
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#30363d] pb-2 flex items-center gap-2"><LinkIcon size={18} /> Tools</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" className="h-6" />
                <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" className="h-6" />
                <img src="https://img.shields.io/badge/Neon-00E599?style=for-the-badge&logo=neon&logoColor=black" alt="Neon" className="h-6" />
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#30363d] pb-2">AI Tools:</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                <img src="https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=anthropic&logoColor=white" alt="Claude" className="h-6" />
                <img src="https://img.shields.io/badge/Codex-5C5C5C?style=for-the-badge&logo=openai&logoColor=white" alt="Codex" className="h-6" />
                <img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" alt="OpenAI" className="h-6" />
                <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Google Gemini" className="h-6" />
              </div>
              
              <h2 className="text-xl font-semibold text-white mb-4 border-b border-[#30363d] pb-2">Current Projects</h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-[#e6edf3]">
                <li>💬 <strong>DialAI</strong> - Offline-first AI assistant you can access via phone (USSD, SMS, voice). Built for low-connectivity environments</li>
                <li>💂 <strong>LineageGuard</strong> - A deterministic impact analysis tool that predicts the downstream "blast radius" of schema changes by automatically walking your <a href="#" className="text-blue-400 hover:underline">OpenMetadata</a> lineage graph</li>
                <li>🎓 <strong>FindMyCenter</strong> - Web/mobile app helping Nigerian JAMB students locate exam centers on slow networks</li>
                <li>📰 <strong>ArticlesOnX</strong> - Download Twitter articles, convert to PDF, and save to your phone</li>
              </ul>
            </div>

            {/* GitHub Activity Stats Card */}
            <div className="bg-[#0d1117]">
              <h3 className="mb-4 text-lg">GitHub Activity</h3>
              <div className="border border-[#30363d] rounded-md p-6 bg-[#0d1117] relative flex flex-col md:flex-row gap-6">
                 {/* Rechart will go here. For now a placeholder mimicking the line graph */}
                 <div className="flex-1 border-r border-[#30363d] pr-6">
                    <h4 className="text-center text-[#39d353] text-sm mb-4 font-semibold">AMEEN's Contribution Graph</h4>
                    <div className="h-[200px] w-full flex items-end bg-[#0d1117] border-l border-b border-[#30363d] relative">
                       {/* Y axis labels */}
                       <div className="absolute -left-6 bottom-0 top-0 flex flex-col justify-between text-[10px] text-[#39d353] h-full py-2">
                         <span>14</span><span>12</span><span>10</span><span>8</span><span>6</span><span>4</span><span>2</span><span>0</span>
                       </div>
                       {/* X axis labels */}
                       <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[10px] text-white">
                         <span>7</span><span>14</span><span>21</span><span>28</span><span>7</span>
                       </div>
                       
                       {/* Dummy SVG line chart */}
                       <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <polyline 
                            fill="none" 
                            stroke="#39d353" 
                            strokeWidth="2" 
                            points="0,100 10,100 20,100 30,100 40,80 50,20 60,70 70,10 80,80 90,40 100,100" 
                          />
                          <circle cx="50" cy="20" r="2" fill="#fff" stroke="#39d353" strokeWidth="1" />
                          <circle cx="70" cy="10" r="2" fill="#fff" stroke="#39d353" strokeWidth="1" />
                          {/* Grid lines */}
                          <line x1="0" y1="20" x2="100" y2="20" stroke="#30363d" strokeWidth="0.5" strokeDasharray="2" />
                          <line x1="0" y1="40" x2="100" y2="40" stroke="#30363d" strokeWidth="0.5" strokeDasharray="2" />
                          <line x1="0" y1="60" x2="100" y2="60" stroke="#30363d" strokeWidth="0.5" strokeDasharray="2" />
                          <line x1="0" y1="80" x2="100" y2="80" stroke="#30363d" strokeWidth="0.5" strokeDasharray="2" />
                       </svg>
                    </div>
                    
                    <div className="flex mt-8 justify-between text-center border-t border-[#30363d] pt-6">
                       <div className="flex-1">
                         <div className="text-2xl font-bold text-white mb-1">1,179</div>
                         <div className="text-xs text-[#8b949e]">Total Contributions</div>
                         <div className="text-[10px] text-[#8b949e] mt-2">Sep 11, 2025 - Present</div>
                       </div>
                       <div className="flex-1 border-x border-[#30363d] px-2 flex flex-col items-center">
                         <div className="w-16 h-16 rounded-full border-4 border-[#39d353] flex items-center justify-center text-xl font-bold text-white relative mb-1">
                            6
                            <span className="absolute -top-3 text-[#39d353]">🔥</span>
                         </div>
                         <div className="text-[#39d353] text-xs font-semibold">Current Streak</div>
                         <div className="text-[10px] text-[#8b949e] mt-1">May 1 - May 6</div>
                       </div>
                       <div className="flex-1">
                         <div className="text-2xl font-bold text-white mb-1">18</div>
                         <div className="text-xs text-[#8b949e]">Longest Streak</div>
                         <div className="text-[10px] text-[#8b949e] mt-2">Feb 13 - Mar 2</div>
                       </div>
                    </div>
                 </div>

                 <div className="w-64 pt-6">
                    <h4 className="text-[#39d353] text-sm mb-4 font-semibold">My Programming Languages</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span>TypeScript</span><span>62.06%</span></div>
                        <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: '62.06%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span>JavaScript</span><span>21.19%</span></div>
                        <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-400" style={{ width: '21.19%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span>CSS</span><span>9.01%</span></div>
                        <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500" style={{ width: '9.01%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1"><span>HTML</span><span>7.74%</span></div>
                        <div className="h-1.5 bg-[#30363d] rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500" style={{ width: '7.74%' }}></div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Badges and Pinned */}
            <div className="flex justify-center gap-2 my-8">
               <img src="https://komarev.com/ghpvc/?username=coded-devs&color=green" alt="Profile views" className="h-5" />
               <img src="https://img.shields.io/badge/Portfolio-238636?style=flat&logo=Web&logoColor=white" alt="Portfolio" className="h-5" />
               <img src="https://img.shields.io/badge/X_(Twitter)-1DA1F2?style=flat&logo=X&logoColor=white" alt="Twitter" className="h-5" />
               <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=LinkedIn&logoColor=white" alt="LinkedIn" className="h-5" />
               <img src="https://img.shields.io/badge/Email-D14836?style=flat&logo=Gmail&logoColor=white" alt="Email" className="h-5" />
            </div>

            <h3 className="mb-4 text-sm">Pinned</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Repo 1 */}
              <div className="border border-[#30363d] p-4 rounded-md bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-[#8b949e]" />
                    <a href="#" className="text-[#58a6ff] font-semibold hover:underline">coded-devs/find-my-center</a>
                    <span className="border border-[#30363d] text-xs px-2 py-0.5 rounded-full text-[#8b949e]">Public</span>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-4">Platform for discovering important locations and services nearby.</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> TypeScript
                </div>
              </div>

              {/* Repo 2 */}
              <div className="border border-[#30363d] p-4 rounded-md bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-[#8b949e]" />
                    <a href="#" className="text-[#58a6ff] font-semibold hover:underline">ameenfolio</a>
                    <span className="border border-[#30363d] text-xs px-2 py-0.5 rounded-full text-[#8b949e]">Public</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e] mt-4">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> TypeScript
                </div>
              </div>

              {/* Repo 3 */}
              <div className="border border-[#30363d] p-4 rounded-md bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-[#8b949e]" />
                    <a href="#" className="text-[#58a6ff] font-semibold hover:underline">articlesonx</a>
                    <span className="border border-[#30363d] text-xs px-2 py-0.5 rounded-full text-[#8b949e]">Public</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e] mt-4">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> TypeScript
                </div>
              </div>

              {/* Repo 4 */}
              <div className="border border-[#30363d] p-4 rounded-md bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen size={16} className="text-[#8b949e]" />
                    <a href="#" className="text-[#58a6ff] font-semibold hover:underline">creatorshub</a>
                    <span className="border border-[#30363d] text-xs px-2 py-0.5 rounded-full text-[#8b949e]">Public</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e] mt-4">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span> TypeScript
                </div>
              </div>
            </div>

            {/* Heatmap Section */}
            <div className="mb-8 relative flex gap-4">
              <div className="flex-1">
                <div className="mb-2 text-sm">1,296 contributions in the last year</div>
                <GithubHeatmap />
              </div>
              <div className="hidden md:flex flex-col gap-2 w-24">
                 <button className="bg-[#1f6feb] text-white text-xs rounded-md py-1.5 font-semibold w-full">2026</button>
                 <button className="text-[#58a6ff] hover:bg-[#30363d] text-xs rounded-md py-1.5 w-full">2025</button>
              </div>
            </div>

            {/* Contribution Activity */}
            <div>
              <h3 className="mb-4 text-sm font-semibold">Contribution activity</h3>
              <div className="border-b border-[#30363d] mb-4">
                 <button className="bg-[#0d1117] border border-[#30363d] text-xs px-3 py-1.5 rounded-md -mb-px border-b-[#0d1117] relative z-10 font-semibold">May 2026</button>
              </div>

              <div className="relative border-l border-[#30363d] ml-2 pb-8 pl-6">
                <div className="absolute w-8 h-8 rounded-full bg-[#238636] flex items-center justify-center -left-4 top-0 border-[6px] border-[#0d1117]">
                  <GitFork size={14} className="text-white" />
                </div>
                
                <h4 className="text-white font-semibold mb-2 text-sm pt-1">Created 39 commits in 3 repositories</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center group">
                    <div>
                      <a href="#" className="text-[#58a6ff] hover:underline">coded-devs/website</a> <span className="text-[#8b949e] text-xs">31 commits</span>
                    </div>
                    <div className="w-32 h-2 bg-[#161b22] rounded overflow-hidden">
                      <div className="w-full h-full bg-[#238636]"></div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center group">
                    <div>
                      <a href="#" className="text-[#58a6ff] hover:underline">coded-devs.github</a> <span className="text-[#8b949e] text-xs">6 commits</span>
                    </div>
                    <div className="w-32 h-2 bg-[#161b22] rounded overflow-hidden">
                      <div className="w-1/4 h-full bg-[#238636]"></div>
                    </div>
                  </li>
                  <li className="flex justify-between items-center group">
                    <div>
                      <a href="#" className="text-[#58a6ff] hover:underline">onerandomdevv/onerandomdevv</a> <span className="text-[#8b949e] text-xs">2 commits</span>
                    </div>
                    <div className="w-32 h-2 bg-[#161b22] rounded overflow-hidden">
                      <div className="w-1/12 h-full bg-[#238636]"></div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative border-l border-[#30363d] ml-2 pb-8 pl-6">
                <div className="absolute w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center -left-4 top-0 border-[6px] border-[#0d1117]">
                  <GitFork size={14} className="text-[#8b949e]" />
                </div>
                
                <div className="flex justify-between items-center mb-2 pt-1">
                  <h4 className="text-white font-semibold text-sm">Created a pull request in <a href="#" className="text-white hover:underline underline">coded-devs/website</a> that received 23 comments</h4>
                  <span className="text-xs text-[#8b949e]">May 2</span>
                </div>
                
                <div className="border border-[#30363d] rounded-md p-4 bg-[#0d1117]">
                  <div className="flex items-center gap-2 mb-2">
                    <GitFork size={16} className="text-[#a371f7]" />
                    <a href="#" className="text-white font-semibold hover:text-blue-400">Feature/backend setup</a>
                  </div>
                  <p className="text-xs text-[#8b949e] mb-2 line-clamp-2">Summary by CodeRabbit New Features "Projects" renamed to "Products" site-wide; blog posts now require a category. Public and admin pages/compon...</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[#39d353]">+1,270</span>
                    <span className="text-[#f85149]">-317</span>
                    <div className="flex gap-0.5">
                      <div className="w-2 h-2 bg-[#39d353]"></div>
                      <div className="w-2 h-2 bg-[#39d353]"></div>
                      <div className="w-2 h-2 bg-[#39d353]"></div>
                      <div className="w-2 h-2 bg-[#39d353]"></div>
                      <div className="w-2 h-2 bg-[#f85149]"></div>
                    </div>
                    <span className="text-[#8b949e] ml-2">lines changed • 23 comments</span>
                  </div>
                </div>
              </div>
              
              <div className="relative border-l border-[#30363d] ml-2 pb-8 pl-6">
                <div className="absolute w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center -left-4 top-0 border-[6px] border-[#0d1117]">
                  <GitFork size={14} className="text-[#8b949e]" />
                </div>
                
                <div className="flex justify-between items-center mb-2 pt-1">
                  <h4 className="text-white font-semibold text-sm">Opened 5 other pull requests in 1 repository</h4>
                </div>
                <div className="flex justify-between items-center group">
                    <div>
                      <a href="#" className="text-white hover:underline">coded-devs/website</a>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                      <div className="w-5 h-5 rounded-full bg-[#8250df] text-white flex items-center justify-center text-[10px]">5</div>
                      merged
                    </div>
                  </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubProfile;
