import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from '../Assets/EvenzaLogo.png';
import {
  Calendar,
  Users,
  Shield,
  PieChart,
  Plus,
  Search,
  Bell,
  LogOut,
  ChevronDown,
  CheckCircle,
  User,
  ClipboardList,
  X,
  Check
} from "lucide-react";

const AdminDashboard = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notificationCount] = useState(3);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [events, setEvents] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminErrors, setAdminErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [registrationCount, setRegistrationCount] = useState(0);
  const [editingAdmin, setEditingAdmin] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Event form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    location: "",
    startTime: "",
    endTime: ""
  });

  // Admin creation form state
  const [adminForm, setAdminForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    role: "admin",
    agreedToTerms: true
  });

  // Get auth token from localStorage
  const token = localStorage.getItem("token");
  const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:7169/api').replace(/\/+$/, '');

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };

  // Fetch all users with role=user
  const fetchAllUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users?role=user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };
  
  // Fetch admin users from API with role=admin
  const fetchAdminUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users?role=admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdminUsers(res.data);
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
    }
  };
  
  // Fetch registrations from API
  const fetchRegistrations = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/registrations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegistrations(res.data);
      setRegistrationCount(res.data.length);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    }
  };

  // Initial fetches
  useEffect(() => {
    fetchEvents();
    fetchAllUsers();
    fetchAdminUsers();
    fetchRegistrations();
  }, []);

  // Fetch users based on active tab
  useEffect(() => {
    if (activeTab === "users") {
      fetchAdminUsers();
    } else if (activeTab === "all-users") {
      fetchAllUsers();
    } else if (activeTab === "registrations") {
      fetchRegistrations();
    }
  }, [activeTab]);
  
  // Handle event form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle admin form input changes
  const handleAdminChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  // Convert local datetime-local to ISO string
  const toISOStringWithTimezone = (dateTimeLocal) => {
    if (!dateTimeLocal) return '';
    const date = new Date(dateTimeLocal);
    return date.toISOString();
  };

  // Reset event form
  const resetForm = () => {
    setForm({
      id: null,
      name: "",
      location: "",
      startTime: "",
      endTime: ""
    });
    setEditing(false);
    setSelectedEvent(null);
  };

  // Submit event create/update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      startTime: toISOStringWithTimezone(form.startTime),
      endTime: toISOStringWithTimezone(form.endTime)
    };

    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (editing) {
        await axios.put(`${API_BASE_URL}/events/${form.id}`, payload, axiosConfig);
      } else {
        await axios.post(`${API_BASE_URL}/events`, payload, axiosConfig);
      }

      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please check console for details.');
    }
  };

  // Edit event - populate form and enable editing
  const handleEdit = (event) => {
    setForm({
      id: event.id,
      name: event.name,
      location: event.location,
      startTime: event.startTime ? event.startTime.slice(0, 16) : '',
      endTime: event.endTime ? event.endTime.slice(0, 16) : ''
    });
    setEditing(true);
    setActiveTab('events');
  };

  // Delete event with confirmation
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEvents();
      resetForm();
    } catch (error) {
      console.error('Failed to delete event:', error);
      alert('Failed to delete event');
    }
  };

  // Delete admin with confirmation
  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdminUsers();
      alert('Admin deleted successfully');
    } catch (error) {
      console.error('Failed to delete admin:', error);
      alert('Failed to delete admin');
    }
  };

  // Edit admin - populate form and enable editing
  const handleEditAdmin = (admin) => {
    setSelectedAdmin(admin);
    setEditingAdmin(true);
    setAdminForm({
      email: admin.email,
      firstName: admin.firstName,
      lastName: admin.lastName,
      phoneNumber: admin.phoneNumber || '',
      password: '',
      confirmPassword: '',
      role: 'admin',
      agreedToTerms: true
    });
  };

  // Admin creation/update submit handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
  
    const errors = {};
    if (!adminForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(adminForm.email)) errors.email = "Invalid email format";
  
    if (!adminForm.firstName) errors.firstName = "First name is required";
    if (!adminForm.lastName) errors.lastName = "Last name is required";
  
    if (!editingAdmin) {
      if (!adminForm.password) errors.password = "Password is required";
      else if (adminForm.password.length < 6) errors.password = "Password must be at least 6 characters";
  
      if (adminForm.password !== adminForm.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }
  
    if (Object.keys(errors).length > 0) {
      setAdminErrors(errors);
      return;
    }

    try {
      setAdminErrors({});
    
      const payload = {
        email: adminForm.email.trim(),
        firstName: adminForm.firstName.trim(),
        lastName: adminForm.lastName.trim(),
        phoneNumber: adminForm.phoneNumber ? adminForm.phoneNumber.trim() : "",
        role: "admin"
      };

      // Only include password fields if creating new admin or changing password
      if (!editingAdmin || adminForm.password) {
        payload.password = adminForm.password;
        if (!editingAdmin) {
          payload.confirmPassword = adminForm.confirmPassword;
        }
      }

      let response;
      if (editingAdmin) {
        response = await axios.put(`${API_BASE_URL}/users/${selectedAdmin.id}`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      } else {
        response = await axios.post(`${API_BASE_URL}/Auth/register-admin`, payload, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
        });
      }

      if (response.data.success || response.status === 200 || response.status === 201) {
        alert(`Admin ${editingAdmin ? 'updated' : 'created'} successfully!`);
        
        setAdminForm({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          phoneNumber: '',
          role: 'admin',
          agreedToTerms: true
        });
        
        setEditingAdmin(false);
        setSelectedAdmin(null);
        await fetchAdminUsers();
      } else {
        alert(response.data.message || `Failed to ${editingAdmin ? 'update' : 'create'} admin`);
      }
    } catch (error) {
      console.error(`Error ${editingAdmin ? 'updating' : 'creating'} admin:`, error.response?.data || error.message);
      alert(`Error ${editingAdmin ? 'updating' : 'creating'} admin account. Check console.`);
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    window.location.href = '/';
  };

  // Sample recent activity data
  const recentActivity = [
    { id: 1, action: events[0]?.name ? `Event '${events[0].name}' was updated` : "Event was updated", time: "2 hours ago", user: "Admin" },
    { id: 2, action: "New user registration", time: "3 hours ago", user: "System" },
    { id: 3, action: events[1]?.name ? `Event '${events[1].name}' was created` : "Event was created", time: "1 day ago", user: "Admin" },
    { id: 4, action: "User permissions updated", time: "2 days ago", user: "Admin" },
  ];

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? "w-20" : "w-64"} bg-indigo-900 text-white transition-all duration-300 flex flex-col`}>
    {/* Logo */}
     <div className="flex items-center">
            <div
              id="logo"
              // onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
              className="text-white mt-[11px] ml-[60px] text-4xl font-bold flex items-center m-0 pl-4 lg:static max-sm:ml-[-20px]"
            >
              <img
                src={Logo}
                alt="Logo"
                className="pl-[20px] h-[38px] object-contain"
              />
            </div></div>

        {/* Navigation Links */}
        <div className="flex-1 py-4">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "dashboard" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <PieChart size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Dashboard</span>}
          </button>

          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "events" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Calendar size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Events</span>}
          </button>

          <button
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "registrations" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <ClipboardList size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Registrations</span>}
          </button>

          <button
            onClick={() => setActiveTab("all-users")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "all-users" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Users size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">All Users</span>}
          </button>

          <button
            onClick={() => setActiveTab("admins")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "admins" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <User size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Administrators</span>}
          </button>
        </div>

        {/* Collapse sidebar button */}
        <div className="p-4 border-t border-indigo-800">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full p-2 rounded flex items-center justify-center bg-indigo-800 hover:bg-indigo-700"
          >
            <ChevronDown className={`transform ${sidebarCollapsed ? "rotate-90" : "-rotate-90"}`} size={18} />
            {!sidebarCollapsed && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex justify-between items-center px-6 py-3">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {activeTab === "dashboard" && "Dashboard Overview"}
                {activeTab === "events" && "Event Management"}
                {activeTab === "admins" && "Administrator Management"}
                {activeTab === "all-users" && "All Users"}
                {activeTab === "registrations" && "Registrations Management"}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <Search size={20} className="text-gray-600" />
                </button>
              </div>

              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-100 relative">
                  <Bell size={20} className="text-gray-600" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notificationCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-9 w-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                  {localStorage.getItem('username')?.charAt(0) || 'A'}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{localStorage.getItem('username') || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{localStorage.getItem('email') || 'admin@evenza.com'}</p>
                </div>
              </div>

              <button
                className="p-2 rounded-full hover:bg-gray-100 text-red-500"
                onClick={handleLogout}
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* Tab line */}
          {activeTab === "events" && (
            <div className="flex px-6">
              <button className="py-3 px-4 border-b-2 border-pink-500 text-pink-500 font-medium">
                All Events
              </button>
            </div>
          )}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Events</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{events.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-pink-100 flex items-center justify-center">
                      <Calendar size={24} className="text-pink-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-500 text-xs font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Updated now</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Users</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{allUsers.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center">
                      <Users size={24} className="text-indigo-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-500 text-xs font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>12% increase</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Admins</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{adminUsers.length}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center">
                      <Shield size={24} className="text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-yellow-500 text-xs font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V5z" clipRule="evenodd" />
                      </svg>
                      <span>Last updated today</span>
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Registrations</p>
                      <p className="text-2xl font-bold mt-1 text-gray-800">{registrationCount}</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
                      <ClipboardList size={24} className="text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <span className="text-green-500 text-xs font-medium flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Updated now</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Events Table & Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Events Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Events</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 border-b border-gray-100">Event Name</th>
                          <th className="px-6 py-3 border-b border-gray-100">Location</th>
                          <th className="px-6 py-3 border-b border-gray-100">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {events.length > 0 ? (
                          events.map((event) => (
                            <tr key={event.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEdit(event)}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-800">{event.name}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.location}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {event.startTime ? new Date(event.startTime).toLocaleDateString() : "N/A"}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                              No events found. Create your first event!
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="px-6 py-3 flex justify-center">
                    <button
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      onClick={() => setActiveTab("events")}
                    >
                      View All Events
                    </button>
                  </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Recent Activity</h2>
                  </div>
                  <div className="p-6">
                    <div className="flow-root">
                      <ul className="divide-y divide-gray-100">
                        {recentActivity.map((activity) => (
                          <li key={activity.id} className="py-3">
                            <div className="relative">
                              <div className="flex items-start">
                                <div className="flex-shrink-0">
                                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle size={16} className="text-green-600" />
                                  </div>
                                </div>
                                <div className="ml-3 flex-1">
                                  <p className="text-sm text-gray-700">{activity.action}</p>
                                  <div className="mt-1 flex items-center text-xs text-gray-500">
                                    <span>{activity.time}</span>
                                    <span className="mx-1">•</span>
                                    <span>{activity.user}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 text-center">
                      <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                        View All Activity
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Latest Registrations */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Latest Registrations</h2>
                </div>
                <div className="p-6">
                  {registrations.slice(0, 5).map((registration) => {
                    const event = events.find(e => e.id === registration.eventId);
                    const user = allUsers.find(u => u.id === registration.userId);
                    
                    return (
                      <div key={registration.id} className="mb-4 last:mb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">
                              {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
                            </p>
                            <p className="text-sm text-gray-600">
                              Registered for {event ? event.name : 'Unknown Event'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {registration.registrationDate ? new Date(registration.registrationDate).toLocaleString() : 'N/A'}
                        </div>
                      </div>
                    );
                  })}
                  {registrations.length === 0 && (
                    <p className="text-sm text-gray-500">No recent registrations</p>
                  )}
                  <div className="mt-4 text-center">
                    <button 
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                      onClick={() => setActiveTab("registrations")}
                    >
                      View All Registrations
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Registrations View */}
          {activeTab === "registrations" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Registration Management</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search registrations..."
                      className="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="all">All Events</option>
                    {events.map(event => (
                      <option key={event.id} value={event.id}>{event.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">User</th>
                      <th className="px-6 py-3">Event</th>
                      <th className="px-6 py-3">Registration Date</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {registrations.length > 0 ? (
                      registrations.map((registration) => {
                        // Find the event name for this registration
                        const event = events.find(e => e.id === registration.eventId);
                        // Find the user for this registration
                        const user = allUsers.find(u => u.id === registration.userId);
                        
                        return (
                          <tr key={registration.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                              {user ? `${user.firstName} ${user.lastName}` : 'Unknown User'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {event ? event.name : 'Unknown Event'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {registration.registrationDate ? new Date(registration.registrationDate).toLocaleDateString() : 'N/A'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button 
                                  className="text-indigo-600 hover:text-indigo-900"
                                  onClick={() => setSelectedRegistration(registration)}
                                >
                                  View
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                          No registrations found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{registrations.length}</span> of{" "}
                  <span className="font-medium">{registrations.length}</span> results
                </div>
                <nav className="flex justify-center space-x-1">
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Previous</button>
                  <button className="px-3 py-1 rounded-md bg-pink-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Next</button>
                </nav>
              </div>
              
              {/* Registration Detail Modal */}
              {selectedRegistration && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-8 max-w-2xl w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Registration Details</h3>
                      <button 
                        onClick={() => setSelectedRegistration(null)} 
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Attendee</p>
                        <p className="font-medium">
                          {selectedRegistration.userName || 
                            (allUsers.find(u => u.id === selectedRegistration.userId) 
                              ? `${allUsers.find(u => u.id === selectedRegistration.userId).firstName} ${allUsers.find(u => u.id === selectedRegistration.userId).lastName}`
                                                            : 'Unknown')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">
                          {selectedRegistration.userEmail || 
                            (allUsers.find(u => u.id === selectedRegistration.userId) 
                              ? allUsers.find(u => u.id === selectedRegistration.userId).email
                              : 'N/A')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Event</p>
                        <p className="font-medium">
                          {selectedRegistration.eventName || 
                            (events.find(e => e.id === selectedRegistration.eventId) 
                              ? events.find(e => e.id === selectedRegistration.eventId).name
                              : 'Unknown')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Registration Date</p>
                        <p className="font-medium">
                          {selectedRegistration.registrationDate ? new Date(selectedRegistration.registrationDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-medium mb-2">Additional Information</h4>
                      <p className="text-sm text-gray-600">
                        {selectedRegistration.additionalInfo || 'No additional information provided.'}
                      </p>
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <button 
                        onClick={() => setSelectedRegistration(null)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Events View */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Events List */}
              <div className="bg-white rounded-xl shadow-sm lg:col-span-2">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <h2 className="font-semibold text-gray-800">All Events</h2>
                  <button
                    onClick={() => {
                      resetForm();
                      setSelectedEvent(null);
                    }}
                    className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
                  >
                    <Plus size={18} className="mr-1" />
                    New Event
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3 border-b border-gray-100">Event Name</th>
                        <th className="px-6 py-3 border-b border-gray-100">Location</th>
                        <th className="px-6 py-3 border-b border-gray-100">Date</th>
                        <th className="px-6 py-3 border-b border-gray-100">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {events.length > 0 ? (
                        events.map((event) => (
                          <tr key={event.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div 
                                className="font-medium text-gray-800 cursor-pointer" 
                                onClick={() => {
                                  setSelectedEvent(event);
                                  handleEdit(event);
                                }}
                              >
                                {event.name}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{event.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {event.startTime ? new Date(event.startTime).toLocaleDateString() : "N/A"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => {
                                  setSelectedEvent(event);
                                  handleEdit(event);
                                }}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(event.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                            No events found. Create your first event!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Event Form */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {editing ? "Edit Event" : "Create New Event"}
                </h2>
                {(selectedEvent || !editing) ? (
                  <>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Event Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={form.location}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          id="startTime"
                          name="startTime"
                          value={form.startTime}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                          End Date & Time
                        </label>
                        <input
                          type="datetime-local"
                          id="endTime"
                          name="endTime"
                          value={form.endTime}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                      </div>

                      <div className="flex space-x-4">
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          {editing ? "Update Event" : "Create Event"}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setSelectedEvent(null);
                          }}
                          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          Cancel
                        </button>
                        {editing && (
                          <button
                            type="button"
                            onClick={() => handleDelete(form.id)}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-gray-500 text-center py-20">
                    Select an event from the list to edit or click "New Event" to create a new one.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Users View */}
          {activeTab === "all-users" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">All Users</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500">
                    <option value="all">All Users</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Registered</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {allUsers.length > 0 ? (
                      allUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phoneNumber || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-indigo-600 hover:text-indigo-900">View</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{allUsers.length}</span> of{" "}
                  <span className="font-medium">{allUsers.length}</span> results
                </div>
                <nav className="flex justify-center space-x-1">
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Previous</button>
                  <button className="px-3 py-1 rounded-md bg-pink-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Next</button>
                </nav>
              </div>
            </div>
          )}

          {/* All Admins View */}
          {activeTab === "users" && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">All Administrators</h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search admins..."
                      className="px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <Search size={18} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Phone</th>
                      <th className="px-6 py-3">Registered</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {adminUsers.length > 0 ? (
                      adminUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {user.firstName} {user.lastName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.phoneNumber || 'N/A'}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditAdmin(user)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No admin users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">{adminUsers.length}</span> of{" "}
                  <span className="font-medium">{adminUsers.length}</span> results
                </div>
                <nav className="flex justify-center space-x-1">
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Previous</button>
                  <button className="px-3 py-1 rounded-md bg-pink-600 text-white">1</button>
                  <button className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Next</button>
                </nav>
              </div>
            </div>
          )}

          {/* Admin Management View */}
          {activeTab === "admins" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Admin List */}
              <div className="bg-white rounded-xl shadow-sm lg:col-span-2">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-800">Administrators</h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <th className="px-6 py-3 border-b border-gray-100">Name</th>
                        <th className="px-6 py-3 border-b border-gray-100">Email</th>
                        <th className="px-6 py-3 border-b border-gray-100">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {adminUsers.length > 0 ? (
                        adminUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-800">
                                {user.firstName} {user.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleEditAdmin(user)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteAdmin(user.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500">
                            No administrators found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Admin Creation Form */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">
                  {editingAdmin ? "Edit Administrator" : "Create New Administrator"}
                </h2>
                <form onSubmit={handleAdminSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={adminForm.firstName}
                      onChange={handleAdminChange}
                      required
                      className={`w-full px-3 py-2 border ${
                        adminErrors.firstName ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                    {adminErrors.firstName && (
                      <p className="mt-1 text-sm text-red-600">{adminErrors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={adminForm.lastName}
                      onChange={handleAdminChange}
                      required
                      className={`w-full px-3 py-2 border ${
                        adminErrors.lastName ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                    {adminErrors.lastName && (
                      <p className="mt-1 text-sm text-red-600">{adminErrors.lastName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={adminForm.email}
                      onChange={handleAdminChange}
                      required
                      className={`w-full px-3 py-2 border ${
                        adminErrors.email ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                    {adminErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{adminErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={adminForm.phoneNumber}
                      onChange={handleAdminChange}
                      className={`w-full px-3 py-2 border ${
                        adminErrors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                    />
                    {adminErrors.phoneNumber && (
                      <p className="mt-1 text-sm text-red-600">{adminErrors.phoneNumber}</p>
                    )}
                  </div>

                  {/* Only show password fields when creating new admin */}
                  {!editingAdmin && (
                    <>
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={adminForm.password}
                          onChange={handleAdminChange}
                          required={!editingAdmin}
                          className={`w-full px-3 py-2 border ${
                            adminErrors.password ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        />
                        {adminErrors.password && (
                          <p className="mt-1 text-sm text-red-600">{adminErrors.password}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={adminForm.confirmPassword}
                          onChange={handleAdminChange}
                          required={!editingAdmin}
                          className={`w-full px-3 py-2 border ${
                            adminErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          } rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                        />
                        {adminErrors.confirmPassword && (
                          <p className="mt-1 text-sm text-red-600">{adminErrors.confirmPassword}</p>
                        )}
                      </div>
                    </>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="agreedToTerms"
                      name="agreedToTerms"
                      checked={adminForm.agreedToTerms}
                      onChange={(e) => setAdminForm({ ...adminForm, agreedToTerms: e.target.checked })}
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label htmlFor="agreedToTerms" className="ml-2 block text-sm text-gray-700">
                      I agree to the terms and conditions
                    </label>
                  </div>

                  <div className="pt-2 flex space-x-4">
                    <button
                      type="submit"
                      className="flex-1 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      {editingAdmin ? "Update Administrator" : "Create Administrator"}
                    </button>
                    {editingAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAdmin(false);
                          setSelectedAdmin(null);
                          setAdminForm({
                            email: '',
                            password: '',
                            confirmPassword: '',
                            firstName: '',
                            lastName: '',
                            phoneNumber: '',
                            role: 'admin',
                            agreedToTerms: true
                          });
                        }}
                        className="flex-1 justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;