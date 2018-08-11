import React, { Component } from 'react'
import { connect } from 'react-redux'
import LazyLoad from 'react-lazyload'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
} from 'video-react'

import Checkbox from '../NasaCheckbox'
import Limit from '../../config/limit.js'

import styles from './NasaSearch.scss'
import Search from '../../images/svg/search.svg'
import Close from '../../images/svg/close.svg'

import {
  fetchDataAction,
  clearAction,
  updateTextAction,
} from '../../redux/actions/actions.js'
@connect(
  store => {
    return {
      results: store.main.results,
      text: store.main.text,
      video: store.main.video,
    }
  },
  dispatch => {
    return {
      updateTextFromInput: (payload, media) =>
        dispatch(fetchDataAction(payload, media)),
      clear: () => dispatch(clearAction()),
      updateText: payload => dispatch(updateTextAction(payload)),
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
      resultHeader__container__title,
      resultHeader__container__photographer,
      resultHeader__container__description,
      resultHeader__container__video,
    } = styles
    let count = 0

    if (this.props.results) {
      if (this.props.results.resultCollection.length > 0 && this.props.text) {
        return (
          <div className={resultHeader}>
            {this.props.results.resultCollection.map(x => {
              count++
              let photographer = x.data[0].photographer || 'Nasa',
                title = x.data[0].title || 'Nasa Photo',
                description = x.data[0].description || '',
                src = x.links[0].href || '',
                mediaType = x.data[0].media_type || '',
                nasaId = x.data[0].nasa_id || ''
              if (count <= Limit) {
                if (mediaType === 'image') {
                  return (
                    <LazyLoad key={`resultHeader-${count}`} height={200}>
                      <div id={nasaId} className={resultHeader__container}>
                        <a className={resultHeader__container__link} href={src}>
                          <img
                            className={resultHeader__container__link__img}
                            src={src}
                            alt={title}
                          />
                        </a>
                        <p className={resultHeader__container__title}>
                          <b>Title:</b> {title}
                        </p>
                        <p className={resultHeader__container__photographer}>
                          <b>Taken By:</b> {photographer}
                        </p>
                        <p className={resultHeader__container__description}>
                          <b>Description:</b> {description}
                        </p>
                      </div>
                    </LazyLoad>
                  )
                } else {
                  {
                    //TODO: Static Link for now to style otherwise it would be using the this.props.video
                  }
                  this.props.results.video =
                    'https://images-assets.nasa.gov/video/jsc2018m000132_SoYouWant_E1_SOCIALmedia/jsc2018m000132_SoYouWant_E1_SOCIALmedia~orig.mp4'
                  return (
                    <LazyLoad key={`resultHeader-${count}`} height={200}>
                      <div id={nasaId} className={resultHeader__container}>
                        <Player
                          className={resultHeader__container__video}
                          playsInline
                          src={this.props.results.video}
                        >
                          <ControlBar>
                            <ReplayControl seconds={10} order={1.1} />
                            <ForwardControl seconds={10} order={1.1} />
                            <CurrentTimeDisplay order={4.1} />
                            <TimeDivider order={4.2} />
                            <PlaybackRateMenuButton
                              rates={[5, 2, 1, 0.5, 0.1]}
                              order={7.1}
                            />
                          </ControlBar>
                        </Player>
                        <p className={resultHeader__container__title}>
                          <b>Title:</b> {title}
                        </p>
                        <p className={resultHeader__container__photographer}>
                          <b>Filmed By:</b> {photographer}
                        </p>
                        <p className={resultHeader__container__description}>
                          <b>Description:</b> {description}
                        </p>
                      </div>
                    </LazyLoad>
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
