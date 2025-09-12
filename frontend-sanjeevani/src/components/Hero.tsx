export default function Hero() {
  return (
    <section className="hero-section">
      <div className="relative px-6 py-20 sm:px-10 lg:px-14 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-sm font-medium mb-6">
              🩸 <span>Be a Blood Warrior</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Save Lives.<br />
              <span className="text-primary-200">Be Someone's</span><br />
              <span className="text-gradient bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">Hero Today.</span>
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Join thousands of blood warriors making a difference. Track donations, predict availability, 
              and help save lives with our intelligent blood donation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <a href="/donation" className="btn btn-secondary bg-white text-primary-600 hover:bg-primary-50 px-8 py-4 text-lg font-semibold">
                🩸 Donate Blood Now
              </a>
              <a href="/donors" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold">
                Find Blood Warriors
              </a>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold text-white">1,000+</div>
                <div className="text-primary-200 text-sm font-medium">Lives Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-primary-200 text-sm font-medium">Blood Warriors</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-primary-200 text-sm font-medium">Emergency Ready</div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-elevated">
              <h3 className="text-2xl font-bold text-white mb-6">Emergency Blood Request</h3>
              <div className="space-y-4">
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Blood Type: O-</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">URGENT</span>
                  </div>
                  <div className="text-sm text-primary-100 mt-1">Needed for emergency surgery</div>
                </div>
                <div className="bg-white/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Location: Mumbai</span>
                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">2 units</span>
                  </div>
                  <div className="text-sm text-primary-100 mt-1">Apollo Hospital</div>
                </div>
                <div className="bg-success-500/20 border border-success-400/30 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-success-400 rounded-full"></div>
                    <span className="font-semibold text-success-100">3 Blood Warriors nearby</span>
                  </div>
                  <div className="text-sm text-success-200 mt-1">Response time: 15 minutes</div>
                </div>
              </div>
              <button className="w-full mt-6 bg-success-500 hover:bg-success-600 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
                🚨 Respond to Emergency
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}