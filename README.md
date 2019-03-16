# adapt-backgroundScroll

**Background Scroll** is a *presentation component* Created by Dan storey.

The Background Scroll extension allows fixed fullscreen background images to be placed on articles or blocks. Images fade in as the learner scrolls.
 
[**Click here for an interactive demo**](https://danielstorey.github.io/adapt-demo-course/#/id/co-main)

##Installation

Run the following from the command line: `adapt install adapt-backgroundScroll`

### Attributes

contentObjects.json

**_bgScroll** (object): contains the following properties:

>**_isEnabled** (boolean): Enable the extension on the content object

>**_children** (string): `articles` or `blocks`. Select whether background images should be placed on articles or blocks.

articles.json / blocks.json

**_bgScroll** (object): contains the following properties:

>**src** (string): The background image path

## Limitations

No known limitations

----------------------------
**Version number:**  3.0.2
**Framework versions:**  >=3.0.0
**Author / maintainer:** Dan Storey
