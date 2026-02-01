import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileCheck,
  Users,
  BarChart3,
  Settings,
  Calendar,
  Bell,
  User,
  Leaf,
  Send,
} from "lucide-react";
import { authAPI } from "../services/api";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("verify-logs");
  const [username] = useState("Admin");

  const [recyclingLogs] = useState([
    {
      id: 1,
      user: "Alice Wong",
      event: "Beach Cleanup",
      type: "Plastic",
      weight: "5kg",
      date: "Feb 1, 2026",
      status: "Pending",
    },
    {
      id: 2,
      user: "Bob Chen",
      event: "Tree Planting",
      type: "Paper",
      weight: "3kg",
      date: "Feb 2, 2026",
      status: "Pending",
    },
    {
      id: 3,
      user: "Sweeney",
      event: "Recycling Workshop",
      type: "Glass",
      weight: "4kg",
      date: "Jan 28, 2026",
      status: "Verified",
    },
  ]);

  const [users] = useState([
    {
      id: 1,
      name: "Alice Wong",
      email: "alice@student.edu",
      role: "Student",
      points: 850,
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Chen",
      email: "bob@student.edu",
      role: "Student",
      points: 720,
      status: "Active",
    },
    {
      id: 3,
      name: "Diana Lee",
      email: "diana@student.edu",
      role: "Organizer",
      points: 550,
      status: "Active",
    },
    {
      id: 4,
      name: "Eric Tan",
      email: "eric@student.edu",
      role: "Student",
      points: 490,
      status: "Inactive",
    },
  ]);

  const [events] = useState([
    {
      id: 1,
      title: "Beach Cleanup Drive",
      date: "Feb 5, 2026",
      organizer: "Diana Lee",
      participants: 45,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Tree Planting Event",
      date: "Feb 12, 2026",
      organizer: "Eric Tan",
      participants: 62,
      status: "Upcoming",
    },
    {
      id: 3,
      title: "Recycling Workshop",
      date: "Jan 20, 2026",
      organizer: "Diana Lee",
      participants: 38,
      status: "Completed",
    },
  ]);

  const [announcement, setAnnouncement] = useState({
    title: "",
    message: "",
    priority: "normal",
  });

  const handleAnnouncementChange = (e) => {
    const { name, value } = e.target;
    setAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendAnnouncement = () => {
    alert(`Announcement "${announcement.title}" sent to all users!`);
    setAnnouncement({ title: "", message: "", priority: "normal" });
  };

  const handleVerifyLog = (logId) => {
    alert(`Recycling log #${logId} has been verified!`);
  };

  const handleRejectLog = (logId) => {
    alert(`Recycling log #${logId} has been rejected!`);
  };

  const generateReport = () => {
    alert("Generating comprehensive waste collection report...");
  };

  const handleLogout = async ()=> {
    try {
      const response = authAPI.logout();
      console.log('response', response);
      alert(`Thank you!, ${'Account logged successfully'}!`);
      navigate('/');
    } catch (error) {
      const message = error.message;
      alert(`Error Please Try Again, ${message}!`);
    }
  }

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
              <h1 className="text-2xl font-bold text-gray-800">
                Campus Eco-Club Sustainability Tracker
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button onClick={handleLogout}>
                <span className="text-gray-700 font-medium">{"Logout"}</span>
              </button>
              <span className="text-gray-700 font-medium">{username}</span>
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Title */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          '{username.toUpperCase()}' DASHBOARD
        </h2>
        <p className="text-gray-600">System Administrator</p>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-2 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
            <button
              onClick={() => setActiveTab("verify-logs")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "verify-logs"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FileCheck className="w-5 h-5" />
              <span>VERIFY LOGS</span>
            </button>

            <button
              onClick={() => setActiveTab("manage-users")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "manage-users"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>USERS</span>
            </button>

            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "reports"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>REPORTS</span>
            </button>

            <button
              onClick={() => setActiveTab("system")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "system"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>SYSTEM</span>
            </button>

            <button
              onClick={() => setActiveTab("manage-events")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "manage-events"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>EVENTS</span>
            </button>

            <button
              onClick={() => setActiveTab("announcements")}
              className={`flex items-center justify-center space-x-2 px-3 py-3 rounded-lg font-semibold transition text-sm ${
                activeTab === "announcements"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>ANNOUNCE</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {activeTab === "verify-logs" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">
                Verify Recycling Logs
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Review and approve student recycling submissions
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Weight
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recyclingLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {log.user}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {log.event}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {log.type}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {log.weight}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {log.date}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            log.status === "Verified"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {log.status === "Pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleVerifyLog(log.id)}
                              className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => handleRejectLog(log.id)}
                              className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "manage-users" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Manage User Accounts
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    View and manage all system users
                  </p>
                </div>
                <button
                  onClick={() => navigate("/admin-edit-user")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  + Add New User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Points
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">
                        {user.points}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            navigate("/admin-edit-user", {
                              state: { user: user },
                            })
                          }
                          className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition mr-2"
                        >
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition">
                          {user.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Generate Waste Collection Reports
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-green-50 rounded-lg p-6 text-center">
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Total Waste Collected</p>
                  <p className="text-3xl font-bold text-green-600">245 kg</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-6 text-center">
                  <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Active Users</p>
                  <p className="text-3xl font-bold text-blue-600">127</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-6 text-center">
                  <Calendar className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Events This Month</p>
                  <p className="text-3xl font-bold text-purple-600">8</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-800 font-semibold mb-2">
                    Report Type
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none">
                    <option>Monthly Waste Collection Summary</option>
                    <option>User Activity Report</option>
                    <option>Event Participation Report</option>
                    <option>Recycling Type Breakdown</option>
                    <option>Eco-Points Distribution Report</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-800 font-semibold mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  onClick={generateReport}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "system" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              System Maintenance & Settings
            </h3>

            <div className="space-y-6">
              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  System Health
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Server Status</p>
                    <p className="text-xl font-bold text-green-600">Online</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Database</p>
                    <p className="text-xl font-bold text-green-600">Healthy</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Last Backup</p>
                    <p className="text-xl font-bold text-gray-800">
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-b pb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  System Actions
                </h4>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    Run System Backup
                  </button>
                  <button className="w-full bg-yellow-600 text-white py-3 rounded-lg hover:bg-yellow-700 transition font-semibold">
                    Clear Cache
                  </button>
                  <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition font-semibold">
                    Export All Data
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  System Configuration
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">
                      Auto-approve Recycling Logs
                    </span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">Maintenance Mode</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "manage-events" && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">
                Manage All Events
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                Oversee and approve all campus events
              </p>
            </div>
            <div className="p-6 space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="border rounded-lg p-6 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {event.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Organized by: {event.organizer} • {event.date}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        event.status === "Completed"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">
                        {event.participants} participants
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition">
                      View Details
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition">
                      Cancel Event
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Send System Announcement
            </h3>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Announcement Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={announcement.title}
                  onChange={handleAnnouncementChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Priority Level
                </label>
                <select
                  name="priority"
                  value={announcement.priority}
                  onChange={handleAnnouncementChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-800 font-semibold mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  name="message"
                  value={announcement.message}
                  onChange={handleAnnouncementChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                  placeholder="Enter announcement message"
                ></textarea>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSendAnnouncement}
                  className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Send to All Users
                </button>
                <button className="px-6 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold">
                  Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Back to Home */}
    </div>
  );
}

export default AdminDashboard;
