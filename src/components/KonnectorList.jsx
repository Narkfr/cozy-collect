import React from 'react'
import { translate } from 'cozy-ui/react/I18n'
import KonnectorTile from './KonnectorTile'
import { popupCenter } from '../lib/popup'

const VOTING_LINK = 'https://framaforms.org/cozy-collect-1494574386'

const KonnectorList = ({ t, konnectors, showVoting = false }) => (
  <div className="connector-list">
    {konnectors.map(konnector => {
      const categories = konnector.categories.map(category =>
        t(`category.${category}`)
      )
      return (
        <KonnectorTile
          konnector={konnector}
          subtitle={categories.join(', ')}
          route={`${konnector.slug}`}
        />
      )
    })}
    {showVoting && (
      <a
        className="item-wrapper col-voting-item"
        onClick={() => popupCenter(VOTING_LINK, 'connectorVoting', 700, 650)}
      >
        <header className="item-header">
          <img
            className="item-icon"
            src={require('../assets/icons/konnectors/icon-voting.svg')}
          />
        </header>
        <p className="item-title item-voting-text">{t('connector.voting')}</p>
      </a>
    )}
  </div>
)

export default translate()(KonnectorList)
