import { describe, expect, it } from 'vitest'

import { replaceAll } from './replaceAll'

describe('replaceAll', () => {
  it('replaces every occurrence of a literal substring', () => {
    expect(replaceAll('a-b-c', '-', '_')).toBe('a_b_c')
  })

  it('replaces every occurrence matching a regex', () => {
    expect(replaceAll('foo123bar456', /\d+/, '#')).toBe('foo#bar#')
  })

  it('returns the input untouched when there is no match', () => {
    expect(replaceAll('hello', 'x', 'y')).toBe('hello')
  })

  it('respects the optional split limit', () => {
    expect(replaceAll('a-b-c-d', '-', '_', 2)).toBe('a_b')
  })

  it('handles an empty input', () => {
    expect(replaceAll('', '-', '_')).toBe('')
  })

  it('handles consecutive matches via regex with the global modifier', () => {
    expect(replaceAll('aXXbXXc', /X+/, '-')).toBe('a-b-c')
  })
})
