import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import Spinner from 'cozy-ui/react/Spinner'
import styles from '../styles/konnectorInstall'

import AccountConnectionData from './AccountConnectionData'
import AccountLoginForm from './AccountLoginForm'
import DescriptionContent from './DescriptionContent'
import KonnectorSuccess from './KonnectorSuccess'

import { ACCOUNT_ERRORS } from '../lib/accounts'

export const KonnectorInstall = ({
  t,
  account,
  connector,
  deleting,
  disableSuccessTimeout,
  driveUrl,
  error,
  fields,
  isTimeout,
  isUnloading,
  oAuthTerminated,
  onCancel,
  editing,
  onDelete,
  onSubmit,
  submit,
  submitting,
  success,
  successMessage,
  successMessages,
  trigger,
  allRequiredFieldsAreFilled,
  displayAdvanced,
  toggleAdvanced,
  isFetching,
  isValid,
  isSuccess,
  dirty
}) => {
  const securityIcon = require('../assets/icons/color/icon-cloud-lock.svg')
  const { hasDescriptions, editor } = connector

  return (
    <div className={styles['col-account-connection-content']}>
      <div className={styles['col-account-connection-form']}>
        {error &&
          error.message !== ACCOUNT_ERRORS.LOGIN_FAILED && (
            <DescriptionContent
              cssClassesObject={{ 'coz-error': true }}
              title={t('connection.error.default.title')}
              messages={[
                t('connection.error.default.description', {
                  name: connector.name
                })
              ]}
            />
          )}

        <DescriptionContent
          title={t('account.config.title', { name: connector.name })}
          messages={
            !success && hasDescriptions && hasDescriptions.connector
              ? [t(`connector.${connector.slug}.description.connector`)]
              : []
          }
        >
          {!connector.oauth && (
            <p className={styles['col-account-connection-security']}>
              <svg>
                <use xlinkHref={securityIcon} />
              </svg>
              {t('account.config.security')}
            </p>
          )}
        </DescriptionContent>

        {isFetching ? (
          <div className={styles['col-account-connection-fetching']}>
            <Spinner size="xxlarge" middle="true" />
          </div>
        ) : !success ? (
          <AccountLoginForm
            connectorSlug={connector.slug}
            konnectorName={connector.name}
            disableSuccessTimeout={disableSuccessTimeout}
            error={error && error.message === ACCOUNT_ERRORS.LOGIN_FAILED}
            fields={fields}
            editing={editing}
            isValid={isValid}
            dirty={dirty}
            isSuccess={isSuccess}
            isFetching={isFetching}
            forceEnabled={!!error}
            isOAuth={connector.oauth}
            isUnloading={isUnloading}
            oAuthTerminated={oAuthTerminated}
            onSubmit={onSubmit}
            submitting={submitting}
            allRequiredFieldsAreFilled={allRequiredFieldsAreFilled}
            displayAdvanced={displayAdvanced}
            toggleAdvanced={toggleAdvanced}
          />
        ) : (
          <KonnectorSuccess
            connector={connector}
            account={account}
            driveUrl={driveUrl}
            folderId={trigger && trigger.message.folder_to_save}
            isTimeout={isTimeout}
            isUnloading={isUnloading}
            onCancel={onCancel}
            success={success}
            title={successMessage}
            messages={successMessages}
          />
        )}
        {!isFetching &&
          editor && (
            <p className={styles['col-account-connection-editor']}>
              {t('account.editor_detail', { editor })}
            </p>
          )}
      </div>

      <AccountConnectionData connector={connector} />
    </div>
  )
}

export default translate()(KonnectorInstall)
