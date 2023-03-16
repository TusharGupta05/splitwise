import { DatePicker, Table, Select, Card, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import { useSearchParams } from 'react-router-dom';
import SelectUsers from '../../components/selectusers';
import EditableComponent from './components/EditableComponent';
import { EXPENSE_DETAILS, DESCRIPTORS } from '../../../../constants/expenseDetails.constants';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import TRANSACTIONS_REDUCER from '../../../../redux/constants/transactionsReducer.actionTypes';
import NumberInput from '../../components/numberinput/NumberInput';
import TextInput from '../../components/textinput/TextInput';
import reduxStore from '../../../../redux';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import CATEGORY_OPTIONS from '../../constants/categories.constants';
import calculateSplittedAmounts from '../../../../helpers/calculateSplittedAmounts';
import EditableSelect from '../../components/editableselect/EditableSelect';
import { capitalizeFirst } from '../../../../helpers/capitalizeFirst';

const renderColumn =
  (property, handleChange) =>
  (_, { key: index }) => {
    const onChange = handleChange(index, property);
    const path = [REDUCER_NAMES.TRANSACTIONS, index, property];

    const childComponentProps = {
      onChange,
      disabled: [EXPENSE_DETAILS.CATEGORY, EXPENSE_DETAILS.DATE, EXPENSE_DETAILS.DESCRIPTION].findIndex((val) => val === property) === -1,
    };
    switch (property) {
      case EXPENSE_DETAILS.PAID_BY:
        childComponentProps.style = { width: '100px' };
        return <EditableComponent path={path} {...{ childComponentProps }} component={SelectUsers} />;
      case EXPENSE_DETAILS.AMOUNT:
        childComponentProps.style = { width: '80px' };
        return <EditableComponent path={path} {...{ childComponentProps }} component={NumberInput} />;
      case EXPENSE_DETAILS.SPLIT_BETWEEN:
        childComponentProps.style = { width: '150px' };
        childComponentProps.mode = 'multiple';
        childComponentProps.removeIcon = '';
        return <EditableComponent path={path} {...{ childComponentProps }} component={Select} />;
      case EXPENSE_DETAILS.DESCRIPTION:
        childComponentProps.style = { width: '120px' };
        return <EditableComponent path={path} {...{ childComponentProps }} component={TextInput} />;
      case EXPENSE_DETAILS.DATE:
        childComponentProps.allowClear = false;
        childComponentProps.style = { width: '120px' };
        return <EditableComponent path={path} {...{ childComponentProps }} component={DatePicker} />;
      case EXPENSE_DETAILS.CATEGORY:
        childComponentProps.mode = 'tag';
        childComponentProps.style = { width: '100px' };
        childComponentProps.placeholder = 'Select Category';
        childComponentProps.options = CATEGORY_OPTIONS.map((option) => ({ value: option.toLowerCase(), label: option }));
        childComponentProps.defaultValue = {
          value: reduxStore.getState()[path[0]][path[1]][path[2]].toLowerCase(),
          label: capitalizeFirst(reduxStore.getState()[path[0]][path[1]][path[2]]),
        };
        childComponentProps.onChange = (newValue) => onChange(newValue.label);
        return <EditableSelect {...childComponentProps} />;

      case EXPENSE_DETAILS.SPLITTED_PARTS:
        return (
          <Card>
            {Object.entries(calculateSplittedAmounts({ ...reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][index] })).map(([user, amount]) => (
              <div key={user}>
                {user}: {amount}
                <br />
              </div>
            ))}
          </Card>
        );
      default:
        return null;
    }
  };

const renderCustomFilter = ({ selectedKeys, setSelectedKeys, confirm }) => (
  <Input
    autoFocus
    value={selectedKeys[0]}
    placeholder="Search Description"
    onChange={(e) => {
      setSelectedKeys(e.target.value ? [e.target.value] : []);
    }}
    onPressEnter={() => {
      confirm();
    }}
    style={{ marginBottom: 8, display: 'block' }}
  />
);

const renderFilterIcon = (filtered) => <SearchOutlined style={{ color: filtered ? '#1ac29f' : undefined }} />;

const Transactions = () => {
  const [filterParams, setFilterParams] = useSearchParams();
  const dispatch = useDispatch();
  const transactionsNum = useSelector((store) => store[REDUCER_NAMES.TRANSACTIONS].length, shallowEqual);
  const { registeredUsers } = reduxStore.getState()[REDUCER_NAMES.AUTH];

  const transactions = Array.from([...Array(transactionsNum).keys()].map((val) => ({ key: val })));
  const handleChange = useCallback(
    (index, key) =>
      _debounce((value) => {
        dispatch({ type: TRANSACTIONS_REDUCER.HANDLE_UPDATE_EXPENSE, payload: { index, key, value } });
      }, 1000),
    [dispatch],
  );
  const filters = {
    [EXPENSE_DETAILS.PAID_BY]: registeredUsers.map((registeredUser) => ({
      text: registeredUser[USER_PROFILE.USERNAME],
      value: registeredUser[USER_PROFILE.USERNAME],
    })),
    [EXPENSE_DETAILS.SPLIT_BETWEEN]: registeredUsers.map((registeredUser) => ({
      text: registeredUser[USER_PROFILE.USERNAME],
      value: registeredUser[USER_PROFILE.USERNAME],
    })),
    [EXPENSE_DETAILS.DESCRIPTION]: transactions.map(
      (transaction) => reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][transaction.key][EXPENSE_DETAILS.DESCRIPTION],
    ),
  };

  return (
    <Table
      scroll={{ x: 400 }}
      dataSource={transactions}
      columns={Object.values(EXPENSE_DETAILS)
        .slice(0, 6)
        .map((column) => ({
          align: 'center',
          title: DESCRIPTORS[column],
          dataIndex: column,
          key: column,
          render: renderColumn(column, handleChange),
          filters:
            EXPENSE_DETAILS.PAID_BY === column || EXPENSE_DETAILS.SPLIT_BETWEEN === column || EXPENSE_DETAILS.DESCRIPTION === column
              ? filters[column]
              : null,
          sorter:
            column === EXPENSE_DETAILS.AMOUNT
              ? (record1, record2) =>
                  reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record1.key][column] -
                  reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record2.key][column]
              : null,
          defaultSortOrder: column === EXPENSE_DETAILS.AMOUNT && filterParams.getAll(column) ? filterParams.getAll(column)[0] : undefined,
          sortDirections: column === EXPENSE_DETAILS.AMOUNT ? ['ascend', 'descend'] : null,
          defaultFilteredValue:
            (column === EXPENSE_DETAILS.PAID_BY || column === EXPENSE_DETAILS.SPLIT_BETWEEN || column === EXPENSE_DETAILS.DESCRIPTION) &&
            filterParams.getAll(column).length > 0
              ? filterParams.getAll(column)
              : null,
          filterIcon: column === EXPENSE_DETAILS.DESCRIPTION ? renderFilterIcon : null,

          filterDropdown: column === EXPENSE_DETAILS.DESCRIPTION ? renderCustomFilter : null,
          onFilter: (value, record) => {
            if (column === EXPENSE_DETAILS.DESCRIPTION) {
              return reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record.key][column].toLowerCase().includes(value.toLowerCase());
            }
            if (column === EXPENSE_DETAILS.PAID_BY && reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record.key][column] === value) {
              return true;
            } else if (
              column === EXPENSE_DETAILS.SPLIT_BETWEEN &&
              reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record.key][column].findIndex((user) => user === value) !== -1
            ) {
              return true;
            }
            return false;
          },
        }))}
      onChange={(_, fil, sortOrder) => {
        const newSearchParams = new URLSearchParams();
        Object.entries(fil).forEach(([filterName, filterValue]) => {
          filterValue?.forEach((val) => {
            newSearchParams.append(filterName, val);
          });
        });
        if (sortOrder && sortOrder.order) {
          newSearchParams.append(EXPENSE_DETAILS.AMOUNT, sortOrder.order);
        }

        setFilterParams(newSearchParams);
      }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Transactions;

// const App: React.FC = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef<InputRef>(null);

//   const handleSearch = (
//     selectedKeys: string[],
//     confirm: (param?: FilterConfirmProps) => void,
//     dataIndex: DataIndex,
//   ) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   const handleReset = (clearFilters: () => void) => {
//     clearFilters();
//     setSearchText('');
//   };

//   const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//           style={{ marginBottom: 8, display: 'block' }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText((selectedKeys as string[])[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered: boolean) => (
//       <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         .toString()
//         .toLowerCase()
//         .includes((value as string).toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns: ColumnsType<DataType> = [
//     {
//       title: 'Name',
//       dataIndex: 'name',
//       key: 'name',
//       width: '30%',
//       ...getColumnSearchProps('name'),
//     },
//     {
//       title: 'Age',
//       dataIndex: 'age',
//       key: 'age',
//       width: '20%',
//       ...getColumnSearchProps('age'),
//     },
//     {
//       title: 'Address',
//       dataIndex: 'address',
//       key: 'address',
//       ...getColumnSearchProps('address'),
//       sorter: (a, b) => a.address.length - b.address.length,
//       sortDirections: ['descend', 'ascend'],
//     },
//   ];

//   return <Table columns={columns} dataSource={data} />;
// };

// export default App;
