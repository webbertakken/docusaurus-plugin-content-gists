import { describe, expect, it } from 'vitest'

import { slugify } from './slugify'

describe('slugify', () => {
  it('lowercases the input', () => {
    expect(slugify('Hello')).toBe('hello')
  })

  it('replaces whitespace with a single hyphen', () => {
    expect(slugify('hello world')).toBe('hello-world')
  })

  it('collapses runs of whitespace and underscores into one hyphen', () => {
    expect(slugify('hello   world__foo  bar')).toBe('hello-world-foo-bar')
  })

  it('replaces underscores with hyphens', () => {
    expect(slugify('snake_case_name')).toBe('snake-case-name')
  })

  it('URL-encodes non-ASCII characters', () => {
    expect(slugify('café au lait')).toBe('caf%C3%A9-au-lait')
  })

  it('handles an empty string', () => {
    expect(slugify('')).toBe('')
  })

  it('preserves hyphens already in the input', () => {
    expect(slugify('already-slugified')).toBe('already-slugified')
  })
})
