/* global describe, test, expect */
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { generateToken } = require('../utils/auth-token-gen')

describe('JWT Generation', () => {
  test('generateToken returns a valid JWT for a user', () => {
    // Arrange
    const mockUser = { user_id: 1, username: 'testuser1' }
    // Act
    const token = generateToken(mockUser)
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // Assert
    expect(token).toBeDefined()
    expect(typeof token).toBe('string')
    // verify the token's payload
    expect(decoded).toHaveProperty('user_id', mockUser.user_id)
    expect(decoded).toHaveProperty('username', mockUser.username)
    // token expires in roughly 1 hour
    expect(decoded.exp - decoded.iat).toBeCloseTo(3600)
  })
})
