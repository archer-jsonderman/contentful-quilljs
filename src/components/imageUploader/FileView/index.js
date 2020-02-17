import React from "react"
import PropTypes from "prop-types"
import {
  Heading,
  Button,
  Paragraph,
  Asset,
  TextField
} from "@contentful/forma-36-react-components"
import { init, locations } from 'contentful-ui-extensions-sdk';

import Dropzone from "../Dropzone"

import "./fileview.css"

export default function FileView(props) {
  const file = props.file
  const type = file.contentType.split("/")[0]
  const prettySize = `${(file.details.size / 1000000).toFixed(2)} MB`
  const bg = {
    backgroundImage: `url(${file.url})`
  }


  return (
	  <>
	  
    <Dropzone
      className={`file-view viewport ${
        type === "image" ? "image-file" : "non-image-file"
      }`}
      isDraggingOver={props.isDraggingOver}
      onDrop={props.onDropFiles}
      onDragOverStart={props.onDragOverStart}
      onDragOverEnd={props.onDragOverEnd}
    >
   
      {type === "image" ? (
        <header style={bg} />
      ) : (
        <header>
          <Asset type={type} className="file-type-icon" />
        </header>
      )}
      <section className="details">
        <main>
          <nav className="buttonset">
	          <Heading className="filename">{file.fileName}</Heading>
	          
	        </nav>

          
          {type === "image" ? (
            <Paragraph >
              <strong>Dimensions:</strong> {file.details.image.width}x
              {file.details.image.height}
            </Paragraph>
          ) : null}
          <Paragraph >
            <strong>Size:</strong> {prettySize}
          </Paragraph>
          <Button
	            buttonType="muted"
	            className="button"
	            onClick={props.onClickRemove}
	          >
	            Remove
	          </Button>
        </main>
              </section>
    </Dropzone>
    
        </>
  )
}
