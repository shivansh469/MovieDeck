// Mock authentication service
// In a real application, this would connect to your backend API

interface LoginCredentials {
  email: string
  password: string
}

interface SignupCredentials {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface User {
  id: string
  email: string
  name: string
}

interface AuthResponse {
  user: User
  token: string
}

// Mock users database (in a real app, this would be handled by your backend)
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    email: 'demo@moviedeck.com',
    name: 'Demo User',
    password: 'password123',
  },
]

// Utility function to generate mock JWT token
const generateMockToken = (userId: string): string => {
  return `mock_token_${userId}_${Date.now()}`
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await delay(1000) // Simulate API call delay

    const user = mockUsers.find(
      u => u.email === credentials.email && u.password === credentials.password
    )

    if (!user) {
      throw new Error('Invalid email or password')
    }

    const { password, ...userWithoutPassword } = user
    const token = generateMockToken(user.id)

    return {
      user: userWithoutPassword,
      token,
    }
  },

  signup: async (credentials: SignupCredentials): Promise<AuthResponse> => {
    await delay(1000) // Simulate API call delay

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === credentials.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
    }

    // Validate password confirmation
    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      email: credentials.email,
      name: credentials.name,
      password: credentials.password,
    }

    mockUsers.push(newUser)

    const { password, ...userWithoutPassword } = newUser
    const token = generateMockToken(newUser.id)

    return {
      user: userWithoutPassword,
      token,
    }
  },

  validateToken: async (token: string): Promise<User> => {
    await delay(500) // Simulate API call delay

    // In a real app, you would validate the token with your backend
    if (!token || !token.startsWith('mock_token_')) {
      throw new Error('Invalid token')
    }

    // Extract user ID from mock token
    const userId = token.split('_')[2]
    const user = mockUsers.find(u => u.id === userId)

    if (!user) {
      throw new Error('User not found')
    }

    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }
}