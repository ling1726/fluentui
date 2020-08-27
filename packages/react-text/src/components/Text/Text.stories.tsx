import { Flex } from '@fluentui/react-flex';
import * as React from 'react';

import { Text } from './Text';

const TextBox: React.FC = props => (
  <Flex horizontalAlign="center" verticalAlign="center" style={{ background: '#F8F8F8', flexGrow: 1, height: 100 }}>
    {props.children}
  </Flex>
);

export const TextSizeStories = () => (
  <Flex column>
    <Flex horizontalAlign="center">
      <TextBox>
        <Text size="100">This is size 100</Text>
      </TextBox>
      <TextBox>
        <Text size="200">This is size 200</Text>
      </TextBox>
      <TextBox>
        <Text size="300">This is size 300</Text>
      </TextBox>
    </Flex>
    <Flex horizontalAlign="center">
      <TextBox>
        <Text size="400">This is size 400</Text>
      </TextBox>
      <TextBox>
        <Text size="500">This is size 500</Text>
      </TextBox>
      <TextBox>
        <Text size="600">This is size 600</Text>
      </TextBox>
    </Flex>
    <Flex horizontalAlign="center">
      <TextBox>
        <Text size="700">This is size 700</Text>
      </TextBox>
      <TextBox>
        <Text size="800">This is size 800</Text>
      </TextBox>
      <TextBox>
        <Text size="900">This is size 900</Text>
      </TextBox>
    </Flex>
    <TextBox>
      <Text size="1000">This is size 1000</Text>
    </TextBox>
  </Flex>
);
