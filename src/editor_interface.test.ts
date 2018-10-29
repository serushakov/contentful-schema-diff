import test from 'ava'
import { writeEditorInterfaceChange } from './editor_interface'
import { IEditorInterface } from './model'

const from: { [id: string]: IEditorInterface } = {
  'menu': {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: {
        sys: {
          id: '7yx6ovlj39n5',
          type: 'Link',
          linkType: 'Space',
        },
      },
      version: 14,
      createdAt: '2018-03-27T18:04:12.981Z',
      createdBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      updatedAt: '2018-04-06T20:02:28.673Z',
      updatedBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      contentType: {
        sys: {
          id: 'menu',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    controls: [
      {
        fieldId: 'name',
        widgetId: 'singleLine',
      },
      {
        fieldId: 'topButton',
        widgetId: 'entryLinkEditor',
      },
      {
        fieldId: 'items',
        widgetId: 'entryLinksEditor',
      },
    ],
  },
  'section-video-highlight': {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: {
        sys: {
          id: '7yx6ovlj39n5',
          type: 'Link',
          linkType: 'Space',
        },
      },
      version: 4,
      createdAt: '2018-03-29T21:49:59.179Z',
      createdBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      updatedAt: '2018-03-29T21:51:13.861Z',
      updatedBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      contentType: {
        sys: {
          id: 'section-video-highlight',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    controls: [
      {
        fieldId: 'tag',
        settings: {
          helpText: 'This will be displayed in small text above the video title',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'title',
        widgetId: 'singleLine',
      },
      {
        fieldId: 'subtext',
        settings: {
          helpText: 'This text will be subdued beneath the title',
        },
        widgetId: 'multipleLine',
      },
      {
        fieldId: 'embedCode',
        settings: {
          helpText: 'This must be an "iframe" or "script" snippet',
        },
        widgetId: 'multipleLine',
      },
      {
        fieldId: 'anotherField',
        widgetId: 'singleLine',
        settings: {
          helpText: 'some prior value',
        },
      },
    ],
  },
}

const to: { [id: string]: IEditorInterface } = {
  'menu': {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: {
        sys: {
          id: '7yx6ovlj39n5',
          type: 'Link',
          linkType: 'Space',
        },
      },
      version: 14,
      createdAt: '2018-03-27T18:04:12.981Z',
      createdBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      updatedAt: '2018-04-06T20:02:28.673Z',
      updatedBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      contentType: {
        sys: {
          id: 'menu',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    controls: [
      {
        fieldId: 'name',
        widgetId: 'singleLine',
      },
      {
        fieldId: 'topButton',
        widgetId: 'entryLinkEditor',
      },
      {
        fieldId: 'items',
        widgetId: 'entryLinksEditor',
      },
    ],
  },
  'section-video-highlight': {
    sys: {
      id: 'default',
      type: 'EditorInterface',
      space: {
        sys: {
          id: '7yx6ovlj39n5',
          type: 'Link',
          linkType: 'Space',
        },
      },
      version: 4,
      createdAt: '2018-03-29T21:49:59.179Z',
      createdBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      updatedAt: '2018-03-29T21:51:13.861Z',
      updatedBy: {
        sys: {
          id: '0SUbYs2vZlXjVR6bH6o83O',
          type: 'Link',
          linkType: 'User',
        },
      },
      contentType: {
        sys: {
          id: 'section-video-highlight',
          type: 'Link',
          linkType: 'ContentType',
        },
      },
    },
    controls: [
      {
        fieldId: 'tag',
        widgetId: 'dropdown',
      },
      {
        fieldId: 'title',
        widgetId: 'singleLine',
      },
      {
        fieldId: 'subtext',
        settings: {
          helpText: 'This text will be subdued beneath the title',
        },
        widgetId: 'singleLine',
      },
      {
        fieldId: 'embedCode',
        settings: {
          helpText: 'This must be an "iframe" or "script" snippet',
        },
        widgetId: 'custom-editor-extension',
      },
      {
        fieldId: 'anotherField',
        widgetId: 'singleLine',
        settings: {
          helpText: 'This is a change in settings only',
        },
      },
    ],
  },
}

test('explicitly writes default on initial', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(null, to.menu, async (chunk) => chunks.push(chunk), { varname: 'menu' })

  const written = chunks.join('')
  t.regex(written, /menu\.changeEditorInterface\('name', 'singleLine'\)/)
  t.regex(written, /menu\.changeEditorInterface\('topButton', 'entryLinkEditor'\)/)
  t.regex(written, /menu\.changeEditorInterface\('items', 'entryLinksEditor'\)/)
})

test('writes nothing if no diff', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(from.menu, to.menu, async (chunk) => chunks.push(chunk))

  const written = chunks.join('')
  t.deepEqual(written, '')
})

test('writes changes for diffs', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(from['section-video-highlight'],
    to['section-video-highlight'], async (chunk) => chunks.push(chunk))

  const written = chunks.join('')

  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('tag', 'dropdown'\)/)
  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('subtext', 'singleLine'/)
  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('embedCode', 'custom-editor-extension'/)

  t.notRegex(written, /'title'/)
})

test('opens content type for edit if varname not set in context', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(from['section-video-highlight'],
    to['section-video-highlight'], async (chunk) => chunks.push(chunk))

  const written = chunks.join('')
  t.regex(written, /var sectionVideoHighlight = migration\.editContentType\('section-video-highlight'/)
})

test('does not reopen content type if variable already was written', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(null, to.menu, async (chunk) => chunks.push(chunk), { varname: 'menu' })

  const written = chunks.join('')
  t.notRegex(written, /var menu/)
  t.notRegex(written, /migration.editContentType/)
})

test('writes help text if present', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(from['section-video-highlight'],
    to['section-video-highlight'], async (chunk) => chunks.push(chunk))

  const written = chunks.join('')
  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('tag', 'dropdown'\)/)
  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('subtext', 'singleLine', {/)
})

test('writes change if settings changed', async (t) => {
  const chunks: string[] = []

  await writeEditorInterfaceChange(from['section-video-highlight'],
    to['section-video-highlight'], async (chunk) => chunks.push(chunk))

  const written = chunks.join('')
  t.regex(written, /sectionVideoHighlight\.changeEditorInterface\('anotherField', 'singleLine', {/)
})
