import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Calendar,
  Users,
  Shield,
  PieChart,
  Plus,
  Search,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  CheckCircle
} from "lucide-react";

const AdminDashboard = () => {
  // State variables
  const [activeTab, setActiveTab] = useState("dashboard");
  const [notificationCount] = useState(3);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [adminUsers, setAdminUsers] = useState([]);
  const [adminErrors, setAdminErrors] = useState({});
  const [editing, setEditing] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  // Event form state
  const [form, setForm] = useState({
    id: null,
    name: "",
    location: "",
    startTime: "",
    endTime: "",
    status: "upcoming"
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

  // Initial fetches
  useEffect(() => {
    fetchEvents();
    fetchAllUsers();
    fetchAdminUsers();
  }, []);

  // Fetch users based on active tab
  useEffect(() => {
    if (activeTab === "users") {
      fetchAdminUsers();
    } else if (activeTab === "all-users") {
      fetchAllUsers();
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
      endTime: "",
      status: "upcoming"
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
      endTime: event.endTime ? event.endTime.slice(0, 16) : '',
      status: event.status || "upcoming"
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

  // Admin creation submit handler
  const handleAdminSubmit = async (e) => {
    e.preventDefault();
  
    const errors = {};
    if (!adminForm.email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(adminForm.email)) errors.email = "Invalid email format";
  
    if (!adminForm.password) errors.password = "Password is required";
    else if (adminForm.password.length < 6) errors.password = "Password must be at least 6 characters";
  
    if (adminForm.password !== adminForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  
    if (!adminForm.firstName) errors.firstName = "First name is required";
    if (!adminForm.lastName) errors.lastName = "Last name is required";
  
    if (!adminForm.phoneNumber) {
      errors.phoneNumber = "Invalid phone number";
    }
  
    if (Object.keys(errors).length > 0) {
      setAdminErrors(errors);
      return;
    }
    try {
      setAdminErrors({});
    
      const payload = {
        email: adminForm.email.trim(),
        password: adminForm.password,
        confirmPassword: adminForm.confirmPassword,
        firstName: adminForm.firstName.trim(),
        lastName: adminForm.lastName.trim(),
        phoneNumber: adminForm.phoneNumber ? adminForm.phoneNumber.trim() : "",
        role: "admin",
        agreedToTerms: true,
      };
    
      const response = await axios.post(`${API_BASE_URL}/Auth/register-admin`, payload, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
    
      if (response.data.success || response.status === 201) {
        alert(`Admin ${payload.firstName} ${payload.lastName} created successfully!`);
    
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
    
        await fetchAdminUsers();
      } else {
        alert(response.data.message || "Failed to create admin");
      }
    } catch (error) {
      console.error("Error creating admin:", error.response?.data || error.message);
      alert("Error creating admin account. Check console.");
    }
  };

  // Get color class for event status
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
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
        <div className="p-4 flex items-center justify-center">
          {sidebarCollapsed ? (
            <div className="text-2xl font-bold text-white">EV</div>
          ) : (
            <div className="text-2xl font-bold flex items-center">
              <svg viewBox="0 0 24 24" className="h-8 w-8 mr-2 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <span className="text-white">
                EV<span className="text-pink-500">ENZA</span>
              </span>
            </div>
          )}
        </div>

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
            onClick={() => setActiveTab("all-users")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "all-users" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Users size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">All Users</span>}
          </button>

          <button
            onClick={() => setActiveTab("users")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "users" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Users size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">All Admins</span>}
          </button>

          <button
            onClick={() => setActiveTab("admins")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "admins" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Shield size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Administrators</span>}
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center w-full px-4 py-3 ${
              activeTab === "settings" ? "bg-indigo-800 border-l-4 border-pink-500" : "hover:bg-indigo-800"
            }`}
          >
            <Settings size={20} className="min-w-5" />
            {!sidebarCollapsed && <span className="ml-3">Settings</span>}
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
                {activeTab === "users" && "All Administrators"}
                {activeTab === "admins" && "Administrator Management"}
                {activeTab === "settings" && "Platform Settings"}
                {activeTab === "all-users" && "All Users"}
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
                  A
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">Admin User</p>
                  <p className="text-xs text-gray-500">admin@evenza.com</p>
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

          {/* Tab line (optional tabs within main tabs, you can add more) */}
          <div className="flex px-6">
            {activeTab === "dashboard" && (
              <>
                <button className="py-3 px-4 border-b-2 border-pink-500 text-pink-500 font-medium">
                  Overview
                </button>
                <button className="py-3 px-4 text-gray-500 hover:text-gray-700">Analytics</button>
                <button className="py-3 px-4 text-gray-500 hover:text-gray-700">Reports</button>
              </>
            )}

            {activeTab === "events" && (
              <>
                <button className="py-3 px-4 border-b-2 border-pink-500 text-pink-500 font-medium">
                  All Events
                </button>
                <button className="py-3 px-4 text-gray-500 hover:text-gray-700">Active</button>
                <button className="py-3 px-4 text-gray-500 hover:text-gray-700">Upcoming</button>
                <button className="py-3 px-4 text-gray-500 hover:text-gray-700">Completed</button>
              </>
            )}
          </div>
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
              </div>

              {/* Events Table & Activity Feed */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Events Table */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-semibold text-gray-800">Upcoming Events</h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          <th className="px-6 py-3 border-b border-gray-100">Event Name</th>
                          <th className="px-6 py-3 border-b border-gray-100">Location</th>
                          <th className="px-6 py-3 border-b border-gray-100">Date</th>
                          <th className="px-6 py-3 border-b border-gray-100">Status</th>
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
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)} text-white`}>
                                  {event.status?.charAt(0).toUpperCase() + event.status?.slice(1) || 'Unknown'}
                                </span>
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

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Create New Event</h3>
                    <div className="p-2 rounded-lg bg-pink-100">
                      <Calendar size={20} className="text-pink-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Quickly create a new event with essential details. You can edit more settings later.
                  </p>
                  <button
                    onClick={() => {
                      resetForm();
                      setActiveTab("events");
                    }}
                    className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg flex items-center justify-center"
                  >
                    <Plus size={18} className="mr-2" />
                    <span>Create Event</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Events Management View */}
          {activeTab === "events" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left sidebar - events list */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-medium text-gray-700">All Events</h3>
                    <button
                      className="h-8 w-8 rounded-full flex items-center justify-center bg-pink-100 text-pink-600 hover:bg-pink-200"
                      onClick={() => resetForm()}
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {events.length > 0 ? (
                      events.map((event) => (
                        <button
                          key={event.id}
                          onClick={() => {
                            handleEdit(event);
                            setActiveTab("events");
                          }}
                          className={`w-full px-4 py-3 flex items-center hover:bg-gray-50 ${
                            selectedEvent?.id === event.id ? "bg-indigo-50 border-l-4 border-indigo-500" : ""
                          }`}
                        >
                          <div className="flex flex-col text-left">
                            <span className="text-sm font-semibold text-gray-800">{event.name}</span>
                            <span className="text-xs text-gray-500">
                              {event.startTime ? new Date(event.startTime).toLocaleDateString() : "N/A"}
                            </span>
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">No events available.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right content - event form */}
              <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                {(selectedEvent || editing) ? (
                  <>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {editing ? "Edit Event" : "Create New Event"}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                          type="text"
                          name="location"
                          id="location"
                          value={form.location}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                        <input
                          type="datetime-local"
                          name="startTime"
                          id="startTime"
                          value={form.startTime}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                        <input
                          type="datetime-local"
                          name="endTime"
                          id="endTime"
                          value={form.endTime}
                          onChange={handleChange}
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                        <select
                          name="status"
                          id="status"
                          value={form.status}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                        >
                          <option value="upcoming">Upcoming</option>
                          <option value="active">Active</option>
                          <option value="completed">Completed</option>
                        </select>
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
                          onClick={() => resetForm()}
                          className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(form.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-gray-500 text-center py-20">
                    Select an event from the list to view or edit details.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* All Admins List (Users tab) */}
          {activeTab === "users" && (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">All Admins</h2>
              {adminUsers.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{user.firstName} {user.lastName}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No administrators found.</p>
              )}
            </div>
          )}

          {/* All Users List (All Users tab) */}
          {activeTab === "all-users" && (
            <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">All Users</h2>
              {allUsers.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Phone Number</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{user.firstName} {user.lastName}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.phoneNumber || "-"}</td>
                        <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500">No users found.</p>
              )}
            </div>
          )}

          {/* Admin Creation Form (Admins tab) */}
          {activeTab === "admins" && (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Add New Administrator</h2>
              <form onSubmit={handleAdminSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={adminForm.firstName}
                      onChange={handleAdminChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    {adminErrors.firstName && <p className="text-red-500 text-xs mt-1">{adminErrors.firstName}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={adminForm.lastName}
                      onChange={handleAdminChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    {adminErrors.lastName && <p className="text-red-500 text-xs mt-1">{adminErrors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={adminForm.email}
                    onChange={handleAdminChange}
                    required
                    className={`w-full px-3 py-2 border ${adminErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {adminErrors.email && <p className="text-red-500 text-xs mt-1">{adminErrors.email}</p>}
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={adminForm.phoneNumber}
                    onChange={handleAdminChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="+212 6 1234 5678"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={adminForm.password}
                    onChange={handleAdminChange}
                    required
                    className={`w-full px-3 py-2 border ${adminErrors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {adminErrors.password && <p className="text-red-500 text-xs mt-1">{adminErrors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={adminForm.confirmPassword}
                    onChange={handleAdminChange}
                    required
                    className={`w-full px-3 py-2 border ${adminErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500`}
                  />
                  {adminErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{adminErrors.confirmPassword}</p>}
                </div>

                <input type="hidden" name="role" value="admin" />

                <button
                  type="submit"
                  className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg font-semibold transition"
                >
                  Create Administrator
                </button>
              </form>
            </div>
          )}

          {/* Settings view */}
          {activeTab === "settings" && (
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-6 text-center">Settings</h2>
              <p className="text-center text-gray-500">Settings page content goes here.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
