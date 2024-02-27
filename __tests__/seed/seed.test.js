/* global describe, beforeAll, afterAll, test, expect */
const db = require('../../db')
const seed = require('../../db/seed') // Adjust the path as necessary
const data = require('../../db/data/test-data')

beforeAll(() => seed(data))
afterAll(() => db.end())

describe('seed', () => {
  describe('users table', () => {
    test('users table exists', () => {
      return db
        .query(
          `SELECT EXISTS (
                    SELECT FROM 
                        information_schema.tables 
                    WHERE 
                        table_name = 'users'
                    );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true)
        })
    })
    test('users table has user_id column as serial primary key', () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('user_id')
          expect(column.data_type).toBe('integer')
          expect(column.column_default).toBe(
            "nextval('users_user_id_seq'::regclass)"
          )
        })
    })
    test('users table has username column', () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                    FROM information_schema.columns
                    WHERE table_name = 'users'
                    AND column_name = 'username'`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('username')
        })
    })
    test('users table has password_hash column', () => {
      return db
        .query(
          `SELECT column_name
                      FROM information_schema.columns
                      WHERE table_name = 'users'
                      AND column_name = 'password_hash';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('password_hash')
        })
    })
    test('users table has created_at column', () => {
      return db
        .query(
          `SELECT column_name
                      FROM information_schema.columns
                      WHERE table_name = 'users'
                      AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('created_at')
        })
    })
    test('users table has updated_at column', () => {
      return db
        .query(
          `SELECT column_name
                        FROM information_schema.columns
                        WHERE table_name = 'users'
                        AND column_name = 'updated_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('updated_at')
        })
    })
  })
  describe('photos table', () => {
    test('photos table exists', () => {
      return db
        .query(
          `SELECT EXISTS (
                      SELECT FROM 
                          information_schema.tables 
                      WHERE 
                          table_name = 'photos'
                      );`
        )
        .then(({ rows: [{ exists }] }) => {
          expect(exists).toBe(true)
        })
    })
    test('photos table has photo_id column as serial primary key', () => {
      return db
        .query(
          `SELECT column_name, data_type, column_default
                      FROM information_schema.columns
                      WHERE table_name = 'photos'
                      AND column_name = 'photo_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('photo_id')
          expect(column.data_type).toBe('integer')
          expect(column.column_default).toBe(
            "nextval('photos_photo_id_seq'::regclass)"
          )
        })
    })
    test('photos table has user_id column as integer', () => {
      return db
        .query(
          `SELECT column_name, data_type
                        FROM information_schema.columns
                        WHERE table_name = 'photos'
                        AND column_name = 'user_id';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('user_id')
          expect(column.data_type).toBe('integer')
        })
    })
    test('photos table has url column', () => {
      return db
        .query(
          `SELECT column_name
                        FROM information_schema.columns
                        WHERE table_name = 'photos'
                        AND column_name = 'url';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('url')
        })
    })
    test('photos table has description column', () => {
      return db
        .query(
          `SELECT column_name
                          FROM information_schema.columns
                          WHERE table_name = 'photos'
                          AND column_name = 'description';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('description')
        })
    })
    test('photos table has created_at column', () => {
      return db
        .query(
          `SELECT column_name
                            FROM information_schema.columns
                            WHERE table_name = 'photos'
                            AND column_name = 'created_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('created_at')
        })
    })
    test('photos table has updated_at column', () => {
      return db
        .query(
            `SELECT column_name
                              FROM information_schema.columns
                              WHERE table_name = 'photos'
                              AND column_name = 'updated_at';`
        )
        .then(({ rows: [column] }) => {
          expect(column.column_name).toBe('updated_at')
        })
    })
  })

  describe('data insertion', () => {
    test('users data has been inserted correctly', () => {
      return db.query('SELECT * FROM users;').then(({ rows: users }) => {
        expect(users).toHaveLength(2)
        users.forEach((user) => {
          expect(user).toHaveProperty('user_id')
          expect(user).toHaveProperty('username')
          expect(user).toHaveProperty('password_hash')
          expect(user).toHaveProperty('created_at')
          expect(user).toHaveProperty('updated_at')
        })
      })
    })
    test('photos data has been inserted correctly', () => {
      return db.query('SELECT * FROM photos;').then(({ rows: photos }) => {
        expect(photos).toHaveLength(2)
        photos.forEach((photo) => {
          expect(photo).toHaveProperty('photo_id')
          expect(photo).toHaveProperty('user_id')
          expect(photo).toHaveProperty('url')
          expect(photo).toHaveProperty('description')
          expect(photo).toHaveProperty('created_at')
          expect(photo).toHaveProperty('updated_at')
        })
      })
    })
  })
})
