import Infinite from 'react-infinite'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchList } from '../actions/infiniteList'
import { translate } from '../services/i18n'

const LIST_ITEM_HEIGHT = 175
const INFINITE_LOAD_OFFSET = 50

export default function asInfiniteList(WrappedListItemComponent) {
  class InfiniteListContainer extends Component {
    static propTypes = {
      currentPageIndex: PropTypes.number.isRequired,
      fetchList: PropTypes.func.isRequired,
      isLoading: PropTypes.bool.isRequired,
      listItems: PropTypes.array.isRequired,
      onClick: PropTypes.func,
      onEditClick: PropTypes.func,
      resourceName: PropTypes.string.isRequired,
      totalPageCount: PropTypes.number,
    }

    static defaultProps = {
      onClick: undefined,
      onEditClick: undefined,
    }

    static defaultProps = {
      totalPageCount: undefined,
    }

    componentDidMount() {
      this.props.fetchList(this.props.resourceName, 0)
    }

    onInfiniteLoad() {
      if (this.props.currentPageIndex === this.props.totalPageCount) {
        return
      }

      this.props.fetchList(
        this.props.resourceName,
        this.props.currentPageIndex + 1,
      )
    }

    renderSpinner() {
      if (!this.props.isLoading) {
        return null
      }

      return (
        <p className="infinite-list-container__spinner">
          { translate('common.loading') }
        </p>
      )
    }

    renderListItems() {
      return this.props.listItems.map((item, index) => {
        return (
          <WrappedListItemComponent
            item={item}
            key={index}
            onClick={this.props.onClick}
            onEditClick={this.props.onEditClick}
          />
        )
      })
    }

    render() {
      return (
        <Infinite
          className="infinite-list-container"
          elementHeight={LIST_ITEM_HEIGHT}
          infiniteLoadBeginEdgeOffset={INFINITE_LOAD_OFFSET}
          isInfiniteLoading={this.props.isLoading}
          loadingSpinnerDelegate={this.renderSpinner()}
          useWindowAsScrollContainer={true}
          onInfiniteLoad={this.onInfiniteLoad}
        >
          { this.renderListItems() }
        </Infinite>
      )
    }

    constructor(props) {
      super(props)

      this.onInfiniteLoad = this.onInfiniteLoad.bind(this)
    }
  }

  function mapStateToProps(state) {
    return state.infiniteList
  }

  return connect(
    mapStateToProps, {
      fetchList,
    }
  )(InfiniteListContainer)
}
