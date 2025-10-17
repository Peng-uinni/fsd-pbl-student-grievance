import type React from "react"
import { useState, useMemo } from "react"
import { AlertCircle, Users, Shield, FileText, X, Upload } from "lucide-react"

// --- Dummy UI Components for Vite/Tailwind Setup ---

// To replace @/components/ui/button
type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  type?: "button" | "submit" | "reset"
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  type = "button",
}) => {
  let baseClasses =
    "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  let sizeClasses = "px-4 py-2 text-sm"

  if (size === "lg") sizeClasses = "px-6 py-3 text-base"
  if (size === "sm") sizeClasses = "px-3 py-1 text-xs"

  let variantClasses
  switch (variant) {
    case "outline":
      variantClasses = "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400"
      break
    case "ghost":
      variantClasses = "text-gray-700 hover:bg-gray-100 focus:ring-gray-400"
      break
    case "default":
    default:
      variantClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
      break
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  )
}

// To replace @/components/ui/card
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-gray-200 ${className}`}>{children}</div>
)
const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)
const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
)
const CardDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <p className={`text-sm text-gray-500 ${className}`}>{children}</p>
)
const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
)

// --- End of Dummy UI Components ---

// --- Data Types ---

type Grievance = {
  id: number
  title: string
  category: string
  status: "Pending" | "In Progress" | "Resolved"
  date: string
  description: string
  isAnonymous: boolean
  images: string[]
  student?: string // For Admin View
}

// --- Status Utility ---

const getStatusColor = (status: Grievance["status"] | string) => {
  switch (status) {
    case "Resolved":
      return "bg-green-100 text-green-800"
    case "In Progress":
      return "bg-blue-100 text-blue-800"
    case "Pending":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// --- Student Dashboard Components ---

function StudentDashboard() {
  const [activeTab, setActiveTab] = useState<"view" | "create">("view")
  const [selectedGrievance, setSelectedGrievance] = useState<number | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  // State for the student's grievances
  const [grievances, setGrievances] = useState<Grievance[]>([
    {
      id: 1,
      title: "Classroom AC not working",
      category: "Infrastructure",
      status: "In Progress",
      date: "2024-10-15",
      description: "AC in room 301 has been broken for 3 days",
      isAnonymous: false,
      images: [],
    },
    {
      id: 2,
      title: "Assignment deadline issue",
      category: "Academic",
      status: "Resolved",
      date: "2024-10-10",
      description: "Extension requested for project submission",
      isAnonymous: true,
      images: [],
    },
  ])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Basic implementation for file upload preview (using DataURL)
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setUploadedImages((prev) => [...prev, event.target?.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreateGrievance = (e: React.FormEvent) => {
    e.preventDefault()
    const newGrievance: Grievance = {
      id: grievances.length + 1,
      title,
      category,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      description,
      isAnonymous,
      images: uploadedImages,
    }
    setGrievances([newGrievance, ...grievances])
    // Reset form
    setTitle("")
    setDescription("")
    setCategory("")
    setIsAnonymous(false)
    setUploadedImages([])
    setActiveTab("view")
  }

  const stats = useMemo(
    () => [
      { label: "Total Grievances", value: grievances.length, color: "bg-blue-100 text-blue-800" },
      {
        label: "Pending",
        value: grievances.filter((g) => g.status === "Pending").length,
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        label: "In Progress",
        value: grievances.filter((g) => g.status === "In Progress").length,
        color: "bg-purple-100 text-purple-800",
      },
      {
        label: "Resolved",
        value: grievances.filter((g) => g.status === "Resolved").length,
        color: "bg-green-100 text-green-800",
      },
    ],
    [grievances]
  )

  // Grievance Details View
  if (selectedGrievance !== null) {
    const grievance = grievances.find((g) => g.id === selectedGrievance)
    if (grievance) {
      return (
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Grievance Details</h1>
              </div>
              <Button variant="outline">Logout</Button>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-6 py-8">
            <Button variant="outline" onClick={() => setSelectedGrievance(null)} className="mb-6">
              ← Back to Dashboard
            </Button>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{grievance.title}</CardTitle>
                    <CardDescription className="mt-2">
                      {grievance.isAnonymous ? "Submitted Anonymously" : "Submitted by You"}
                    </CardDescription>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(grievance.status)}`}>
                    {grievance.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Category</p>
                    <p className="font-semibold text-gray-900">{grievance.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date Submitted</p>
                    <p className="font-semibold text-gray-900">{grievance.date}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Description</p>
                  <p className="text-gray-900 leading-relaxed">{grievance.description}</p>
                </div>

                {grievance.images.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Attached Images</p>
                    <div className="grid grid-cols-3 gap-4">
                      {grievance.images.map((image, idx) => (
                        // Use a fallback for the image src if necessary
                        <img
                          key={idx}
                          src={image || "/placeholder.svg"}
                          alt={`Grievance attachment ${idx + 1}`}
                          className="w-full h-40 object-cover rounded-lg border border-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> You will receive updates about this grievance via email. Please check your
                    inbox regularly.
                  </p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      )
    }
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          </div>
          {/* A dummy logout button for demonstration */}
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <Button
            onClick={() => setActiveTab("view")}
            className={activeTab === "view" ? "bg-blue-600 hover:bg-blue-700" : ""}
            variant={activeTab === "view" ? "default" : "outline"}
          >
            View Grievances
          </Button>
          <Button
            onClick={() => setActiveTab("create")}
            className={activeTab === "create" ? "bg-blue-600 hover:bg-blue-700" : ""}
            variant={activeTab === "create" ? "default" : "outline"}
          >
            Create Grievance
          </Button>
        </div>

        {/* View Grievances Tab */}
        {activeTab === "view" && (
          <div className="space-y-6">
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${stat.color}`}>
                      {stat.value}
                    </div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Grievances</h2>
              {grievances.map((grievance) => (
                <Card
                  key={grievance.id}
                  className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setSelectedGrievance(grievance.id)}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{grievance.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{grievance.description.substring(0, 70)}...</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grievance.status)}`}
                      >
                        {grievance.status}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600">
                      <span>Category: {grievance.category}</span>
                      <span>Date: {grievance.date}</span>
                      {grievance.isAnonymous && <span className="text-blue-600 font-medium">Anonymous</span>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create Grievance Tab */}
        {activeTab === "create" && (
          <div className="max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Create New Grievance</CardTitle>
                <CardDescription>Submit a new complaint to the administration</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateGrievance} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief title of your grievance"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Academic">Academic</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Hostel">Hostel</option>
                      <option value="Canteen">Canteen</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Describe your grievance in detail"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-md">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="anonymous" className="text-sm font-medium text-gray-700 cursor-pointer">
                      Submit this grievance anonymously
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Images (Optional)</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">Drag and drop images here or click to browse</p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="text-blue-600 hover:underline cursor-pointer text-sm font-medium"
                      >
                        Choose files
                      </label>
                    </div>
                  </div>

                  {uploadedImages.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-3">Uploaded Images ({uploadedImages.length})</p>
                      <div className="grid grid-cols-3 gap-3">
                        {uploadedImages.map((image, idx) => (
                          <div key={idx} className="relative">
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`Upload preview ${idx + 1}`}
                              className="w-full h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(idx)}
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Submit Grievance
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setActiveTab("view")}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}

// --- Admin Dashboard Components ---

function AdminDashboard() {
  const [filterCategory, setFilterCategory] = useState("All")
  const [filterStatus, setFilterStatus] = useState("All")

  const [grievances] = useState<Grievance[]>([
    {
      id: 1,
      title: "Classroom AC not working",
      category: "Infrastructure",
      status: "In Progress",
      date: "2024-10-15",
      student: "John Doe",
      description: "AC in room 301 has been broken for 3 days",
      isAnonymous: false,
      images: [],
    },
    {
      id: 2,
      title: "Assignment deadline issue",
      category: "Academic",
      status: "Resolved",
      date: "2024-10-10",
      student: "Jane Smith",
      description: "Extension requested for project submission",
      isAnonymous: true,
      images: [],
    },
    {
      id: 3,
      title: "Hostel WiFi down",
      category: "Infrastructure",
      status: "Pending",
      date: "2024-10-16",
      student: "Mike Johnson",
      description: "WiFi in block A has been disconnected",
      isAnonymous: false,
      images: [],
    },
    {
      id: 4,
      title: "Canteen food quality",
      category: "Canteen",
      status: "Pending",
      date: "2024-10-16",
      student: "Sarah Williams",
      description: "Food quality has deteriorated recently",
      isAnonymous: false,
      images: [],
    },
  ])

  const filteredGrievances = grievances.filter((g) => {
    const categoryMatch = filterCategory === "All" || g.category === filterCategory
    const statusMatch = filterStatus === "All" || g.status === filterStatus
    return categoryMatch && statusMatch
  })

  const stats = useMemo(
    () => [
      { label: "Total Grievances", value: grievances.length, color: "bg-blue-100 text-blue-800" },
      {
        label: "Pending",
        value: grievances.filter((g) => g.status === "Pending").length,
        color: "bg-yellow-100 text-yellow-800",
      },
      {
        label: "In Progress",
        value: grievances.filter((g) => g.status === "In Progress").length,
        color: "bg-purple-100 text-purple-800",
      },
      {
        label: "Resolved",
        value: grievances.filter((g) => g.status === "Resolved").length,
        color: "bg-green-100 text-green-800",
      },
    ],
    [grievances]
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          {/* A dummy logout button for demonstration */}
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <Card key={idx}>
              <CardContent className="pt-6">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${stat.color}`}>
                  {stat.value}
                </div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Academic">Academic</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Canteen">Canteen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="All">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">All Grievances ({filteredGrievances.length})</h2>
          {filteredGrievances.map((grievance) => (
            <Card key={grievance.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{grievance.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{grievance.description.substring(0, 70)}...</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Student: {grievance.isAnonymous ? "Anonymous" : grievance.student}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(grievance.status)}`}>
                    {grievance.status}
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-gray-600 mb-4">
                  <span>Category: {grievance.category}</span>
                  <span>Date: {grievance.date}</span>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    Update Status
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

// --- Authentication Components ---

function StudentAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [rollNo, setRollNo] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dummy authentication logic
    setAuthenticated(true)
  }

  if (authenticated) {
    return <StudentDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Student Login" : "Student Sign Up"}</CardTitle>
          <CardDescription>{isLogin ? "Access your grievances" : "Create your student account"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={rollNo}
                    onChange={(e) => setRollNo(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2024001"
                    required
                  />
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="student@college.edu"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:underline font-medium">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [authenticated, setAuthenticated] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Dummy authentication logic
    setAuthenticated(true)
  }

  if (authenticated) {
    return <AdminDashboard />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle>{isLogin ? "Admin Login" : "Admin Sign Up"}</CardTitle>
          <CardDescription>{isLogin ? "Manage grievances" : "Create admin account"}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Admin Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="academic">Academic</option>
                    <option value="infrastructure">Infrastructure</option>
                    <option value="hostel">Hostel</option>
                    <option value="general">General</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="admin@college.edu"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-purple-600 hover:underline font-medium">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// --- Main App Component ---

export default function Home() {
  const [userType, setUserType] = useState<"student" | "admin" | null>(null)

  if (userType === "student") {
    return <StudentAuth />
  }

  if (userType === "admin") {
    return <AdminAuth />
  }

  // Role Selection Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <AlertCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Grievance Redressal</CardTitle>
          <CardDescription>Select your role to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            onClick={() => setUserType("student")}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 flex"
            size="lg"
          >
            <Users className="w-4 h-4 mr-2" />
            <div className="w-full">
              Student Login
            </div>
          </Button>
          <Button onClick={() => setUserType("admin")} variant="outline" className="w-full h-12 flex" size="lg">
            <Shield className="w-4 h-4 mr-2" />
            <div className="w-full">
              Admin Login
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}