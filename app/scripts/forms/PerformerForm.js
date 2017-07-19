import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import { FormInput } from '../components'
import { translate } from '../services/i18n'

const validate = values => {
  const errors = {}
  if (!values.title) {
    errors.title = translate('forms.performer.errors.titleRequired')
  } else if (values.title.length < 3) {
    errors.title = translate(
      'forms.performer.errors.titleMinLength', { len: 3 }
    )
  }

  if (!values.description) {
    errors.description = translate('forms.performer.errors.descriptionRequired')
  } else if (values.description.length < 10) {
    errors.description = translate(
      'forms.performer.errors.descriptionMinLength', { len: 10 }
    )
  } else if (values.description.length > 60) {
    errors.description = translate(
      'forms.performer.errors.descriptionMaxLength', { len: 60 }
    )
  }

  return errors
}

class PerformerForm extends Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    handleSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
  }

  static defaultProps = {
    errorMessage: undefined,
    isLoading: false,
  }

  renderErrorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="form__error">
          { this.props.errorMessage }
        </div>
      )
    }
    return null
  }

  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        { this.renderErrorMessage() }
        <h2>{ translate('forms.performer.basicInformation') }</h2>
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.performer.title')}
          name="title"
          type="text"
        />
        <Field
          component={FormInput}
          disabled={this.props.isLoading}
          label={translate('forms.performer.description')}
          name="description"
          type="text"
        />
        <button
          className="form__submit button button--blue"
          disabled={this.props.isLoading}
          type="submit"
        >
          { translate('forms.performer.submit') }
        </button>
      </form>
    )
  }
}

export default reduxForm({
  enableReinitialize: true,
  form: 'performer',
  validate,
})(PerformerForm)
