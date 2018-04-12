import {expect} from 'chai'

import {IContentType} from './model'
import {writeCreate} from './create'

describe('writeCreate', () => {
  const contentType: IContentType = {
    "sys": {
      "space": {
        "sys": {
          "type": "Link",
          "linkType": "Space",
          "id": "7yx6ovlj39n5"
        }
      },
      "id": "menu",
      "type": "ContentType",
      "createdAt": "2018-03-27T18:04:12.590Z",
      "updatedAt": "2018-04-06T20:02:28.519Z",
      "environment": {
        "sys": {
          "id": "gburgett",
          "type": "Link",
          "linkType": "Environment"
        }
      },
      "createdBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "0SUbYs2vZlXjVR6bH6o83O"
        }
      },
      "updatedBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "0SUbYs2vZlXjVR6bH6o83O"
        }
      },
      "publishedCounter": 8,
      "version": 16,
      "publishedBy": {
        "sys": {
          "type": "Link",
          "linkType": "User",
          "id": "0SUbYs2vZlXjVR6bH6o83O"
        }
      },
      "publishedVersion": 15,
      "firstPublishedAt": "2018-03-27T18:04:12.855Z",
      "publishedAt": "2018-04-06T20:02:28.519Z"
    },
    "displayField": "name",
    "name": "Menu",
    "description": "A Menu contains a number of Menu Buttons or other Menus, which will be rendered as drop-downs.",
    "fields": [
      {
        "id": "name",
        "name": "Menu Name",
        "type": "Symbol",
        "localized": false,
        "required": true,
        "validations": [
        ],
        "disabled": false,
        "omitted": false
      },
      {
        "id": "topButton",
        "name": "Top Button",
        "type": "Link",
        "localized": false,
        "required": false,
        "validations": [
          {
            "linkContentType": [
              "menuButton"
            ],
            "message": "The Top Button must be a button linking to a URL or page.  If the menu is a dropdown, this button is visible when it is collapsed."
          }
        ],
        "disabled": false,
        "omitted": false,
        "linkType": "Entry"
      },
      {
        "id": "items",
        "name": "Items",
        "type": "Array",
        "localized": false,
        "required": false,
        "validations": [
        ],
        "disabled": false,
        "omitted": false,
        "items": {
          "type": "Link",
          "validations": [
            {
              "linkContentType": [
                "menu",
                "menuButton"
              ],
              "message": "The items must be either buttons or drop-down menus"
            }
          ],
          "linkType": "Entry"
        }
      },
      {
        "id": "sideMenu",
        "name": "Side Menu",
        "type": "Link",
        "localized": false,
        "required": false,
        "validations": [
          {
            "linkContentType": [
              "menu"
            ],
            "message": "The Side Menu must be a Menu"
          }
        ],
        "disabled": false,
        "omitted": false,
        "linkType": "Entry"
      }
    ]
  }

  it('dumps content type', async () => {

    const buf = new Buffer('')
    const chunks: string[] = []

    await writeCreate(contentType, async (chunk) => chunks.push(chunk))

    const written = chunks.join('')
    expect(written).to.include("migration.createContentType('menu")
    expect(written).to.include("displayField: 'name'")
    expect(written).to.include("name: 'Menu'")
    expect(written).to.include("description: 'A Menu contains")
  })

  it('dumps simple fields', async () => {

    const buf = new Buffer('')
    const chunks: string[] = []

    await writeCreate(contentType, async (chunk) => chunks.push(chunk))

    const written = chunks.join('')
    expect(written).to.include("menu.createField('name")
    expect(written).to.include("name: 'Menu Name'")
  })
})