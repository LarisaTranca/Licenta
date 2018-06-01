import React, { Component } from 'react';
import { Separator, Container, Header, Content, List, ListItem, Text, Icon, Left, Body, Right, Switch } from 'native-base';
export default class Settings extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Separator bordered>
            <Text>Custom Units</Text>
          </Separator>
          <ListItem>
          <Left>
            <Text>Temperature</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <ListItem>
          <Left>
            <Text>Precipitation</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <ListItem>
          <Left>
            <Text>Speed</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
              </Right>
          </ListItem>
          <Separator bordered>
            <Text>Notifications</Text>
          </Separator>
          <ListItem icon>
              <Left>
                <Icon name="notifications" />
              </Left>
              <Body>
                <Text>Weather Push Notifications</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
        </Content>
      </Container>
    );
  }
}