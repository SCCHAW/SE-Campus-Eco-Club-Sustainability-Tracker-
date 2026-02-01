import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Phone, Award, ArrowLeft, Save, Briefcase, Users, Shield } from "lucide-react";

function AdminEditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user data passed from AdminDashboard
  const userData = location.state?.user;
  
  const [selectedRole, setSelectedRole] = useState(userData?.role?.toLowerCase() || 'student');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: 'student',
    status: 'Active',
    // Student specific fields
    studentId: '',
    major: '',
    year: '',
    // Organizer specific fields
    organization: '',
    position: '',
    department: '',
    // Common fields
    skills: '',
    bio: '',
    emergencyContact: '',
    emergencyContactName: '',
    points: 0
  });

  const [errors, setErrors] = useState({});

  // Initialize form data
  useEffect(() => {
    if (userData) {
      // Load existing user data
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '+1 234 567 8900',
        address: userData.address || '',
        role: userData.role?.toLowerCase() || 'student',
        status: userData.status || 'Active',
        studentId: userData.studentId || '',
        major: userData.major || '',
        year: userData.year || '',
        organization: userData.organization || '',
        position: userData.position || '',
        department: userData.department || '',
        skills: userData.skills || '',
        bio: userData.bio || '',
        emergencyContact: userData.emergencyContact || '',
        emergencyContactName: userData.emergencyContactName || '',
        points: userData.points || 0
      });
      setSelectedRole(userData.role?.toLowerCase() || 'student');
    } else {
      // New user - set defaults
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        role: 'student',
        status: 'Active',
        points: 0
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    setFormData(prev => ({ ...prev, role: newRole }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      const action = userData ? 'updated' : 'created';
      alert(`User account ${action} successfully!`);
      navigate('/admin-dashboard', { state: { activeTab: 'manage-users' } });
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard', { state: { activeTab: 'manage-users' } });
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user account? This action cannot be undone.')) {
      alert(`User account for ${formData.name} has been deleted.`);
      navigate('/admin-dashboard', { state: { activeTab: 'manage-users' } });
    }
  };

  const getRoleColor = () => {
    switch(selectedRole) {
      case 'student': return 'green';
      case 'organizer': return 'blue';
      case 'admin': return 'red';
      default: return 'purple';
    }
  };

  const color = getRoleColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Admin Dashboard</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              {userData ? 'Edit User Account' : 'Create New User'}
            </h1>
          </div>
          <p className="text-gray-600">Admin Panel - Manage user information and permissions</p>
        </div>

        {/* Profile Picture & Role */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex flex-col items-center">
              <div className={`w-32 h-32 bg-${color}-600 rounded-full flex items-center justify-center mb-4`}>
                <User className="w-16 h-16 text-white" />
              </div>
              <button className={`text-${color}-600 hover:text-${color}-700 font-medium text-sm`}>
                Change Profile Picture
              </button>
            </div>
            
            <div className="flex-1 w-full space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  User Role <span className="text-red-500">*</span>
                </label>
                <select
                  name="role"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                >
                  <option value="student">Student</option>
                  <option value="organizer">Event Organizer</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="admin">Administrator</option>
                </select>
                <p className="text-gray-500 text-sm mt-1">
                  This determines the user's permissions and dashboard access
                </p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Account Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Eco-Points Balance
                </label>
                <input
                  type="number"
                  name="points"
                  value={formData.points}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-red-600" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:border-red-600 focus:outline-none`}
                    placeholder="Enter full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      } focus:border-red-600 focus:outline-none`}
                      placeholder="user@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      } focus:border-red-600 focus:outline-none`}
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </div>

            {/* Student Specific Information */}
            {selectedRole === 'student' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Student Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Student ID</label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                      placeholder="Enter student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Major/Program</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                      placeholder="e.g., Environmental Science"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Year Level</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                    >
                      <option value="">Select year level</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Organizer Specific Information */}
            {selectedRole === 'organizer' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Organization Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Organization/Club</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                      placeholder="e.g., Campus Eco-Club"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Position/Role</label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                      placeholder="e.g., Event Coordinator"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none"
                      placeholder="e.g., Student Affairs"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Common Information Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-purple-600" />
                Additional Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Skills & Interests</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                    placeholder="e.g., Environmental Conservation, Community Outreach, Teaching"
                  />
                  <p className="text-gray-500 text-sm mt-1">Separate multiple skills with commas</p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                    placeholder="Tell us about this user..."
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Emergency Contact</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                    placeholder="Enter emergency contact name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Emergency Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-red-600 focus:outline-none"
                      placeholder="+1 234 567 8901"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              <Save className="w-5 h-5" />
              <span>{userData ? 'Update User' : 'Create User'}</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
            {userData && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-6 bg-red-100 text-red-700 py-3 rounded-lg hover:bg-red-200 transition font-semibold"
              >
                Delete User
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminEditUser;