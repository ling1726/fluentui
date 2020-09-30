import { isConformant } from '@fluentui/react-conformance';
import * as path from 'path';

import { Text } from './Text';

describe('Text', () => {
  isConformant({
    componentPath: path.join(__dirname, 'Text.tsx'),
    Component: Text,
    displayName: 'Text',
    disabledTests: ['has-docblock', 'as-renders-html', 'as-passes-as-value', 'as-renders-react-class', 'as-renders-fc'],
  });
});
