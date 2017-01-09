# adapt-backgroundScroll

**Background Scroll** is a *presentation component* Created by Dan storey.

The Background Scroll component displays items of text over fullscreen images. As the learner scrolls to each new text item the background image gradually changes. The opacity of the images is linked to the learner's scroll position, making the transitions feel completely connected to the learner's interaction.
 
[**Click here for an interactive demo**](https://danielstorey.github.io/adapt-demo-course/#/id/co-main)

##Installation

Run the following from the command line: `adapt install adapt-backgroundScroll`

## Settings Overview

The attributes listed below are used in *components.json* to configure **Background Scroll**, and are properly formatted as JSON in [*example.json*](https://github.com/danielstorey/adapt-backgroundScroll/example.json).

### Attributes

For core model attributes see [**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes). The attributes listed below are specific to the `Background Scroll` component.

**_component** (string): This value must be: `backgroundScroll`.

**_items** (array): Each item represents an image with its accompanying text and contains values for **image**, **title** and **body**.

>**image** (string): The path to the image, eg `course/en/images/background-1.jpg`. Since the image is set as a background to a div it doesn't need an `alt` attribute.

>**title** (string): (Optional) The title to display for this item.

>**body** (string): The body text to display for this item.

## Limitations

No known limitations

----------------------------
**Version number:**  1.0.2
**Framework versions:**  2.0
**Author / maintainer:** Dan Storey
