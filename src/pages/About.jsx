function About() {
  return (
    <div className="pt-24 px-6 pb-12">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="text-gray-400 text-center mb-12">Get to know me better</p>

        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
              👤
            </div>
            <h2 className="text-3xl font-bold">Your Name</h2>
            <p className="text-gray-400">Content Creator · Developer · Gamer</p>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Who I Am</h3>
              <p className="text-gray-300 leading-relaxed">
                Hello! I'm a passionate content creator who loves sharing my experiences through vlogs, 
                capturing moments through photography, and creating engaging games. I believe in the 
                power of storytelling and interactive media to connect with people.
              </p>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">What I Do</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <span className="text-4xl mb-2 block">🎬</span>
                  <h4 className="font-bold">Vlogs</h4>
                  <p className="text-sm text-gray-400 mt-2">Sharing life experiences and adventures</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <span className="text-4xl mb-2 block">📸</span>
                  <h4 className="font-bold">Photos</h4>
                  <p className="text-sm text-gray-400 mt-2">Capturing beautiful moments</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 text-center">
                  <span className="text-4xl mb-2 block">🎮</span>
                  <h4 className="font-bold">Games</h4>
                  <p className="text-sm text-gray-400 mt-2">Creating fun interactive experiences</p>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-4 text-red-400">Get In Touch</h3>
              <p className="text-gray-300 mb-4">
                I'd love to hear from you! Feel free to reach out through any of these platforms:
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
                  Twitter
                </a>
                <a href="#" className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-full transition-colors">
                  Instagram
                </a>
                <a href="#" className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-full transition-colors">
                  YouTube
                </a>
                <a href="#" className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-full transition-colors">
                  Email
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
