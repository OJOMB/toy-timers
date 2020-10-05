import React from 'react'
import { Menu } from 'semantic-ui-react'

export default class MenuTabular extends React.Component {
  state = { activeItem: 'Timers' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu tabular>
        <Menu.Item
          name="Timers"
          active={activeItem === "timers"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name="More Timers"
          active={activeItem === "photos"}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}