import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Mail, Phone, Award, ArrowLeft, Save, Briefcase, Users } from "lucide-react";

function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Detect user role from location state or default to 'student'
  const [userRole] = useState(location.state?.role || 'student');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
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
    emergencyContactName: ''
  });

  const [errors, setErrors] = useState({});

  // Initialize form data based on user role
  useEffect(() => {
    if (userRole === 'student') {
      setFormData({
        name: 'Sweeney',
        email: 'sweeney@student.edu',
        phone: '+1 234 567 8900',
        address: '123 Campus Drive, University City',
        studentId: 'STU2026001',
        major: 'Environmental Science',
        year: 'Junior',
        skills: 'Environmental Conservation, Community Outreach',
        bio: 'Passionate about environmental conservation and sustainability.',
        emergencyContact: '+1 234 567 8901',
        emergencyContactName: 'Parent/Guardian'
      });
    } else if (userRole === 'organizer') {
      setFormData({
        name: 'Event Organizer1',
        email: 'admin@ecoclub.edu',
        phone: '+1 234 567 8900',
        address: '456 Admin Building, University City',
        organization: 'Campus Eco-Club',
        position: 'Event Coordinator',
        department: 'Student Affairs',
        skills: 'Event Management, Community Engagement, Environmental Planning',
        bio: 'Dedicated to organizing impactful environmental events and fostering community engagement.',
        emergencyContact: '+1 234 567 8901',
        emergencyContactName: 'Emergency Contact'
      });
    } else {
      // Volunteer
      setFormData({
        name: 'John Volunteer',
        email: 'john@volunteer.org',
        phone: '+1 234 567 8900',
        address: '123 Green Street, Eco City',
        skills: 'Environmental Conservation, Community Outreach',
        bio: 'Passionate about environmental conservation and community service.',
        emergencyContact: '+1 234 567 8901',
        emergencyContactName: 'Jane Volunteer'
      });
    }
  }, [userRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
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
      alert('Profile updated successfully!');
      navigate(-1); // Go back to previous page
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getRoleColor = () => {
    switch(userRole) {
      case 'student': return 'green';
      case 'organizer': return 'blue';
      default: return 'purple';
    }
  };

  const color = getRoleColor();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h1>
          <p className="text-gray-600">
            Update your personal information
            {userRole === 'student' && ' (Student)'}
            {userRole === 'organizer' && ' (Event Organizer)'}
            {userRole === 'volunteer' && ' (Volunteer)'}
          </p>
        </div>

        {/* Profile Picture */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex flex-col items-center">
            <div className={`w-32 h-32 bg-${color}-600 rounded-full flex items-center justify-center mb-4`}>
              <User className="w-16 h-16 text-white" />
            </div>
            <button className={`text-${color}-600 hover:text-${color}-700 font-medium text-sm`}>
              Change Profile Picture
            </button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <User className={`w-5 h-5 mr-2 text-${color}-600`} />
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
                    } focus:border-${color}-600 focus:outline-none`}
                    placeholder="Enter your full name"
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
                      } focus:border-${color}-600 focus:outline-none`}
                      placeholder="your.email@example.com"
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
                      } focus:border-${color}-600 focus:outline-none`}
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
                    className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-${color}-600 focus:outline-none`}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
            </div>

            {/* Student Specific Information */}
            {userRole === 'student' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-green-600" />
                  Student Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Student ID
                    </label>
                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-green-600 focus:outline-none"
                      placeholder="Enter your student ID"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Major/Program
                    </label>
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
                    <label className="block text-gray-700 font-medium mb-2">
                      Year Level
                    </label>
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
            {userRole === 'organizer' && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                  Organization Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Organization/Club
                    </label>
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
                    <label className="block text-gray-700 font-medium mb-2">
                      Position/Role
                    </label>
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
                    <label className="block text-gray-700 font-medium mb-2">
                      Department
                    </label>
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

            {/* Volunteer Information Section (Common for all or Volunteer specific) */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                {userRole === 'student' ? (
                  <Users className="w-5 h-5 mr-2 text-green-600" />
                ) : (
                  <Award className={`w-5 h-5 mr-2 text-${color}-600`} />
                )}
                {userRole === 'student' && 'Interests & Skills'}
                {userRole === 'organizer' && 'Skills & Expertise'}
                {userRole === 'volunteer' && 'Volunteer Information'}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Skills & Interests
                  </label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-${color}-600 focus:outline-none`}
                    placeholder="e.g., Environmental Conservation, Community Outreach, Teaching"
                  />
                  <p className="text-gray-500 text-sm mt-1">
                    Separate multiple skills with commas
                  </p>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-${color}-600 focus:outline-none`}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Emergency Contact
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Emergency Contact Name
                  </label>
                  <input
                    type="text"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-${color}-600 focus:outline-none`}
                    placeholder="Enter emergency contact name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Emergency Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 border-gray-300 focus:border-${color}-600 focus:outline-none`}
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
              className={`flex-1 flex items-center justify-center space-x-2 bg-${color}-600 text-white py-3 rounded-lg hover:bg-${color}-700 transition font-semibold`}
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;