import * as React from 'react'

const Empty = () => (
  <div className="empty-notif">
    No document found. Waiting...
  </div>
)


const Sync = () => (
  <div className="empty-notif">
    Database Syncing....
  </div>
)

const Notification = {
  Empty,
  Sync,
}

export default Notification
