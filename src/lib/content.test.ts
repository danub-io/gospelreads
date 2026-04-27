import { test, mock } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import { getPostBySlug, getAuthorBySlug } from './content.ts';

test('getPostBySlug returns null if file does not exist', () => {
  const existsSyncMock = mock.method(fs, 'existsSync', (path: string) => {
    return false;
  });

  const result = getPostBySlug('non-existent');
  assert.strictEqual(result, null);

  existsSyncMock.mock.restore();
});

test('getPostBySlug returns post if file exists', () => {
  const existsSyncMock = mock.method(fs, 'existsSync', (path: string) => {
    return true;
  });
  const readFileSyncMock = mock.method(fs, 'readFileSync', (path: string, encoding: string) => {
    return '---\ntitle: Test\n---\ncontent';
  });

  const result = getPostBySlug('existent');
  assert.notStrictEqual(result, null);
  assert.strictEqual(result?.slug, 'existent');
  assert.strictEqual(result?.meta.title, 'Test');
  assert.strictEqual(result?.content, 'content');

  existsSyncMock.mock.restore();
  readFileSyncMock.mock.restore();
});

test('getAuthorBySlug returns null if file does not exist', () => {
  const existsSyncMock = mock.method(fs, 'existsSync', (path: string) => {
    return false;
  });

  const result = getAuthorBySlug('non-existent');
  assert.strictEqual(result, null);

  existsSyncMock.mock.restore();
});

test('getAuthorBySlug returns author if file exists', () => {
  const existsSyncMock = mock.method(fs, 'existsSync', (path: string) => {
    return true;
  });
  const readFileSyncMock = mock.method(fs, 'readFileSync', (path: string, encoding: string) => {
    return '---\ntitle: Test\n---\ncontent';
  });

  const result = getAuthorBySlug('existent');
  assert.notStrictEqual(result, null);
  assert.strictEqual(result?.slug, 'existent');
  assert.strictEqual(result?.meta.title, 'Test');
  assert.strictEqual(result?.content, 'content');

  existsSyncMock.mock.restore();
  readFileSyncMock.mock.restore();
});
