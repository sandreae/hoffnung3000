import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { initializeForm, createNewConversation } from '../actions/inbox'
import { MessageForm } from '../forms'
import { replaceTo } from '../actions/redirect'
import { translate } from '../../../common/services/i18n'

class ConversationsNew extends Component {
  static propTypes = {
    createNewConversation: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    initializeForm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    receiverAnimals: PropTypes.array,
    replaceTo: PropTypes.func.isRequired,
  }

  static defaultProps = {
    receiverAnimals: [],
  }

  componentWillMount() {
    if (this.props.receiverAnimals.length === 0) {
      this.props.replaceTo('/inbox')
      return
    }

    this.props.initializeForm()
  }

  onSubmit(values) {
    const { text, title } = values
    const animalIds = this.props.receiverAnimals.map(animal => animal.id)

    this.props.createNewConversation(animalIds, title, text)
  }

  renderReceiverNames() {
    const names = this.props.receiverAnimals.map(animal => animal.name)

    return (
      <p>
        <strong>
          { translate('views.inbox.messageTo') }
        </strong>
        &nbsp;
        { names.join(', ') }
      </p>
    )
  }

  render() {
    return (
      <section>
        <h1>{ translate('views.inbox.conversationNewTitle') }</h1>
        <Link className="button" to="/inbox">
          { translate('views.inbox.backToConversations') }
        </Link>
        <hr />
        { this.renderReceiverNames() }
        <MessageForm
          errorMessage={this.props.errorMessage}
          isLoading={this.props.isLoading}
          onSubmit={this.onSubmit}
        />
      </section>
    )
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }
}

function mapStateToProps(state) {
  const { errorMessage, isLoading } = state.inbox
  const location = state.routing.location

  let receiverAnimals = []
  if (location.query && location.query.receiverAnimals) {
    receiverAnimals = location.query.receiverAnimals
  }

  return {
    errorMessage,
    isLoading,
    receiverAnimals,
  }
}

export default connect(
  mapStateToProps, {
    createNewConversation,
    initializeForm,
    replaceTo,
  }
)(ConversationsNew)
