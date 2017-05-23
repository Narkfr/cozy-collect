import React, { Component } from 'react'
import statefulForm from '../lib/statefulForm'

import AccountLoginForm from './AccountLoginForm'
import DataItem from './DataItem'
import ReactMarkdown from 'react-markdown'

class AccountConnection extends Component {
  render () {
    const { t, connector, fields, error, submitting } = this.props
    let { dirty } = this.props
    const { name, description } = connector

    // If there is no field displayed, the form is dirty by default.
    dirty = dirty || Object.values(fields).every(field => field.type === 'hidden' || field.advanced)
    return (
      <div className='account-connection'>
        <div className='account-description'>
          <h3>{t('title description')}</h3>
          <p>
            <ReactMarkdown
              source={
                t(description)
              }
              renderers={{Link: props => <a href={props.href} target='_blank'>{props.children}</a>}}
            />
          </p>
          <h3>{t('dataType title')}</h3>
          <ul className='account-datas'>
            {connector.dataType && connector.dataType.map(data =>
              <DataItem
                dataType={data}
                hex={connector.color.hex}
              />
            )}
          </ul>
          <p>{` ${connector.name} ${t('dataType disclaimer')} `}</p>
        </div>
        <div className='account-login'>
          <h3>{t('account config title', {name: name})}</h3>
          <div className={'account-form' + (error ? ' error' : '')}>
            <AccountLoginForm
              t={t}
              fields={fields}
            />
            <div className='account-form-controls'>
              <button
                disabled={!dirty && !connector.oauth}
                aria-busy={submitting ? 'true' : 'false'}
                onClick={connector.oauth
                  ? () => this.props.oauth(connector.slug)
                  : () => this.props.submit()}
              >
                {t('account config button')}
              </button>
              {error === 'bad credentials' &&
                <p className='errors'>{t('account config bad credentials')}</p>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default statefulForm()(AccountConnection)