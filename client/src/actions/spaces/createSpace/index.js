import httpStatusCodes from 'http-status-codes'

import history from '../../../utils/history'
import { createAction } from '../../../utils/redux'
import { createSpaceLinkSelector } from '../../../reducers/context/selectors'
import {
  SPACE_CREATION_START,
  SPACE_CREATION_SUCCESS,
  SPACE_CREATION_FAILURE,
} from '../types'
import { createSpace } from '../../../api/spaces'
import { mapToSpace } from '../../../views/shapes/SpaceShape'
import { showAlertAboveAllSuccess, showAlertAboveAll } from '../../alertNotifications'


const spaceCreationStart = () => createAction(SPACE_CREATION_START)
const spaceCreationSuccess = () => createAction(SPACE_CREATION_SUCCESS)
const spaceCreationFailure = (errors = {}) => createAction(SPACE_CREATION_FAILURE, errors)

export default (params) => (
  (dispatch, getState) => {
    const createSpaceLink = createSpaceLinkSelector(getState())
    dispatch(spaceCreationStart())

    return createSpace(createSpaceLink, { space: params })
      .then(response => {
        if (response.status === httpStatusCodes.OK) {
          const space = mapToSpace(response.payload.space)
          const redirect = space.links?.show ? `/spaces/${space.id}` : '/spaces'

          dispatch(spaceCreationSuccess())
          dispatch(showAlertAboveAllSuccess({ message: 'Space has been successfully created.' }))

          history.push(redirect)
        } else {
          const { payload } = response

          if (payload?.errors) {
            const message = payload.errors[0]
            dispatch(spaceCreationFailure(payload))
            dispatch(showAlertAboveAll({ message: message }))
          } else {
            dispatch(showAlertAboveAll({ message: 'Something went wrong!' }))
          }
        }
      }).catch(e => console.error(e))
  }
)
