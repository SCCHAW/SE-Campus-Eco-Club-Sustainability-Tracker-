import { useNavigate } from 'react-router-dom'
import { Leaf, Recycle, Award, Users } from 'lucide-react'

function Welcome() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-4 rounded-full">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-3">Campus Eco-Club</h1>
          <p className="text-xl text-gray-600">Sustainability Tracker</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Recycle className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track Recycling</h3>
            <p className="text-gray-600 text-sm">Log your recycling activities and contribute to campus sustainability goals</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Earn Eco Points</h3>
            <p className="text-gray-600 text-sm">Participate in events and earn rewards for your environmental efforts</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Join Events</h3>
            <p className="text-gray-600 text-sm">Connect with fellow eco-warriors in clean-up drives and awareness campaigns</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
          <button
            onClick={() => navigate('/login')}
            className="flex-1 bg-green-600 text-white py-4 px-8 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="flex-1 bg-white text-green-600 py-4 px-8 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg border-2 border-green-600"
          >
            Create Account
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">500+</div>
            <div className="text-gray-600 text-sm">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">2.5T</div>
            <div className="text-gray-600 text-sm">Waste Recycled</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-1">120</div>
            <div className="text-gray-600 text-sm">Events Hosted</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome