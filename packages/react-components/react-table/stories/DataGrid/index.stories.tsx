import {
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  DataGridSelectionCell,
} from '@fluentui/react-components';
import descriptionMd from './DataGridDescription.md';

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  subcomponents: {
    DataGridHeader,
    DataGridHeaderCell,
    DataGridBody,
    DataGridRow,
    DataGridCell,
    DataGridSelectionCell,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd].join('\n'),
      },
    },
  },
};
