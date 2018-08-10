import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Player } from 'video-react'

import Checkbox from '../NasaCheckbox'
import Limit from '../../config/limit.js'

import styles from './NasaSearch.scss'
import Search from '../../images/svg/search.svg'
import Close from '../../images/svg/close.svg'

import {
  fetchDataAction,
  clearAction,
  updateTextAction,
  //getVideoAction
} from '../../redux/actions/actions.js'

@connect(
  store => {
    return {
      results: store.main.results,
      text: store.main.text,
    }
  },
  dispatch => {
    return {
      updateTextFromInput: (payload, media) =>
        dispatch(fetchDataAction(payload, media)),
      clear: () => dispatch(clearAction()),
      updateText: payload => dispatch(updateTextAction(payload)),
      //getVideoAction: payload => dispatch(getVideoAction(payload))
    }
  },
)
export default class NasaSearch extends Component {
  constructor(props) {
    super(props)
    this.updateTextFromInput = this.updateTextFromInput.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clear = this.clear.bind(this)
  }

  updateTextFromInput() {
    const image = document.querySelector('#Image').checked ? 'image' : ''
    const video = document.querySelector('#Video').checked ? 'video' : ''
    let media = `${image},${video}`

    this.props.updateTextFromInput(this.props.text, media, false)
  }

  /*getVideoAction(src) {
    console.log("hello");
    this.props.getVideoAction(src);
  }*/

  clear() {
    this.props.updateText('')
    this.props.clear()
  }

  renderResponse() {
    const {
      resultHeader,
      resultHeader__container,
      resultHeader__container__link,
      resultHeader__container__link__img,
    } = styles
    let count = 0
    if (this.props.results) {
      if (this.props.results.resultCollection.length > 0 && this.props.text) {
        return (
          <div className={resultHeader}>
            {this.props.results.resultCollection.map((x, y) => {
              count++
              let key = x.data
              let photographer = x.data[0].photographer || 'Nasa',
                description = x.data[0].description || '',
                src = x.links[0].href || '',
                keywords = x.data[0].keywords || 'No Tags',
                mediaType = x.data[0].media_type || '',
                nasaId = x.data[0].nasa_id || ''

              if (count <= Limit) {
                if (mediaType === 'image') {
                  return (
                    <div
                      id={nasaId}
                      key={`resultHeader-${count}`}
                      className={resultHeader__container}
                    >
                      <a className={resultHeader__container__link} href={src}>
                        <img
                          className={resultHeader__container__link__img}
                          src={src}
                          alt={keywords[0]}
                        />
                      </a>
                      <p>Taken By: {photographer} </p>
                      <p>{description}</p>
                      <p>Tags: {keywords}</p>
                    </div>
                  )
                } else {
                  //this.getVideoAction(src);
                  return (
                    <div
                      id={nasaId}
                      key={`resultHeader-${count}`}
                      className={resultHeader__container}
                    >
                      <Player playsInline src={src} />
                      <p>Filmed By: {photographer} </p>
                      <p>{description}</p>
                      <p>Tags: {keywords}</p>
                    </div>
                  )
                }
              }
            })}
          </div>
        )
      } else {
        return (
          <div className={resultHeader}>
            <p>sorry no results found!</p>
          </div>
        )
      }
    }
  }

  handleInputChange(e) {
    this.props.updateText(e.target.value)
  }

  renderResults() {
    const {
      searchHeader__container,
      searchHeader__container__input,
      searchHeader__container__input__svgSearch,
      searchHeader__container__input__svg,
      searchHeader__container__input__svgClose,
      searchHeader__container__checkbox,
    } = styles

    return (
      <div className={searchHeader__container}>
        <div className={searchHeader__container__input}>
          <input
            type="text"
            value={this.props.text ? decodeURIComponent(this.props.text) : ''}
            onChange={this.handleInputChange}
            aria-required="true"
            aria-describedby="placeholder"
            placeholder={'Please enter search term... e.g "Orion"'}
            onKeyPress={e => {
              e.key === 'Enter' ? this.updateTextFromInput() : ''
            }}
          />
          {this.props.text ? (
            <a
              className={searchHeader__container__input__svg}
              onClick={this.clear}
            >
              <Close className={searchHeader__container__input__svgClose} />
            </a>
          ) : (
            <a
              className={searchHeader__container__input__svg}
              onClick={this.updateTextFromInput}
            >
              <Search className={searchHeader__container__input__svgSearch} />
            </a>
          )}
        </div>
        <div className={searchHeader__container__checkbox}>
          <Checkbox
            label="Image"
            handleCheckboxChange={this.toggleCheckbox}
            mediaType="Image"
          />
          <Checkbox
            label="Video"
            handleCheckboxChange={this.toggleCheckbox}
            mediaType="Video"
          />
        </div>
        {this.renderResponse()}
      </div>
    )
  }

  render() {
    const { searchHeader, searchHeader__title } = styles
    return (
      <div className={searchHeader}>
        <div className={searchHeader__title}>
          <h2>
            <strong>Nasa Search</strong>
          </h2>
        </div>
        {this.renderResults()}
      </div>
    )
  }
}
