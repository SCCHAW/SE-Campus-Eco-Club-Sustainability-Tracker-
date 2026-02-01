import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Bell, User, Leaf, Plus, Edit, Send } from "lucide-react";

function OrganizerDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const [username] = useState('Event Organizer1');
  
  const [events] = useState([
    { 
      id: 1, 
      title: 'Beach Cleanup Drive', 
      date: 'Feb 5, 2026', 
      location: 'Sunset Beach',
      participants: 45,
      status: 'Upcoming',
      points: 50 
    },
    { 
      id: 2, 
      title: 'Tree Planting Event', 
      date: 'Feb 12, 2026', 
      location: 'Central Park',
      participants: 62,
      status: 'Upcoming',
      points: 75 
    },
    { 
      id: 3, 
      title: 'Recycling Workshop', 
      date: 'Jan 20, 2026', 
      location: 'Community Center',
      participants: 38,
      status: 'Completed',
      points: 30 
    }
  ]);

  const [notifications] = useState([
    { id: 1, message: '15 new registrations for Beach Cleanup Drive', time: '1 hour ago' },
    { id: 2, message: 'Event "Tree Planting" reaches 60 participants', time: '3 hours ago' },
    { id: 3, message: 'New event approval request pending', time: '1 day ago' }
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    points: '',
    participantsNeeded: ''
  });

  const [eventNotification, setEventNotification] = useState({
    eventId: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateEvent = () => {
    alert(`Event "${newEvent.title}" created successfully!`);
    setNewEvent({ title: '', date: '', location: '', description: '', points: '', participantsNeeded: '' });
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setEventNotification(prev => ({ ...prev, [name]: value }));
  };

  const handleSendNotification = () => {
    const selectedEvent = events.find(e => e.id === parseInt(eventNotification.eventId));
    if (selectedEvent && eventNotification.message) {
      alert(`Notification sent to ${selectedEvent.participants} participants of "${selectedEvent.title}"!`);
      setEventNotification({ eventId: '', message: '' });
    } else {
      alert('Please select an event and enter a message.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-full">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Campus Eco-Club Sustainability Tracker</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">{username}</span>
              <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">'{username.toUpperCase()}' DASHBOARD</h2>
        <p className="text-gray-600">Event Organizer Dashboard</p>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-2 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'events'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>EVENTS</span>
            </button>
            
            <button
              onClick={() => setActiveTab('create-event')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'create-event'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Plus className="w-5 h-5" />
              <span>CREATE EVENT</span>
            </button>
            
            <button
              onClick={() => setActiveTab('update-status')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'update-status'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Edit className="w-5 h-5" />
              <span>UPDATE STATUS</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notification')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'notification'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>NOTIFICATION</span>
            </button>
            
            <button
              onClick={() => setActiveTab('send-notification')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'send-notification'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>NOTIFY USER</span>
            </button>
            
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <User className="w-5 h-5" />
              <span>PROFILE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === 'events' && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-800">All Events</h3>
              <div className="text-sm text-gray-600">Total Events: {events.length}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-green-600" />
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.status === 'Completed' 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold">Date:</span> {event.date}</p>
                    <p><span className="font-semibold">Location:</span> {event.location}</p>
                    <p><span className="font-semibold">Participants:</span> {event.participants}</p>
                    <p><span className="font-semibold">Points:</span> {event.points}</p>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'create-event' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Event</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Event Title</label>
                <input 
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none" 
                  placeholder="Enter event title"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Event Date</label>
                <input 
                  type="date"
                  name="date"
                  value={newEvent.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none" 
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Location</label>
                <input 
                  type="text"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none" 
                  placeholder="Enter event location"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Eco-Points</label>
                <input 
                  type="number"
                  name="points"
                  value={newEvent.points}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none" 
                  placeholder="Enter points for this event"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Participants Needed</label>
                <input 
                  type="number"
                  name="participantsNeeded"
                  value={newEvent.participantsNeeded}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none" 
                  placeholder="Enter number of participants needed"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Description</label>
                <textarea 
                  rows={4}
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                  placeholder="Enter event description"
                ></textarea>
              </div>
              <button 
                onClick={handleCreateEvent}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Create Event
              </button>
            </div>
          </div>
        )}

        {activeTab === 'update-status' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Update Event Status</h3>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      event.status === 'Completed' 
                        ? 'bg-gray-100 text-gray-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <select className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none">
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                      Update
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'notification' && (
          <div className="bg-white rounded-lg shadow-md divide-y">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Notifications</h3>
            </div>
            {notifications.map((notif) => (
              <div key={notif.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Bell className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium">{notif.message}</p>
                    <p className="text-gray-500 text-sm mt-1">{notif.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{username}</h3>
              <p className="text-gray-600">Event Organizer</p>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Email</p>
                <p className="text-gray-800 font-medium">admin@ecoclub.edu</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Total Events Organized</p>
                <p className="text-gray-800 font-medium">{events.length} events</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Total Participants</p>
                <p className="text-gray-800 font-medium">{events.reduce((sum, e) => sum + e.participants, 0)} participants</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-gray-600 text-sm">Role</p>
                <p className="text-gray-800 font-medium">Event Organizer</p>
              </div>
              <button 
                onClick={() => navigate("/edit-profile", { state: { role: 'organizer' } })}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold mt-6"
              >
                Edit Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === 'send-notification' && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Notification to Event Participants</h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Select Event</label>
                <select 
                  name="eventId"
                  value={eventNotification.eventId}
                  onChange={handleNotificationChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                >
                  <option value="">Choose an event...</option>
                  {events.map((event) => (
                    <option key={event.id} value={event.id}>
                      {event.title} - {event.participants} participants
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">Notification Message</label>
                <textarea 
                  rows={6}
                  name="message"
                  value={eventNotification.message}
                  onChange={handleNotificationChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                  placeholder="Enter notification message for event participants..."
                ></textarea>
              </div>
              <button 
                onClick={handleSendNotification}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Notification
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Back to Home */}
      <div className="text-center pb-8">
        <button
          onClick={() => navigate("/home")}
          className="text-gray-600 hover:text-gray-800 text-sm font-medium"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrganizerDashboard;