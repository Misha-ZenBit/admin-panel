import { Avatar, List, Checkbox, Divider } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import React, { useState } from 'react';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const plainOptions1 = ['Apple1', 'Pear1', 'Orange1'];
const plainOptions2 = ['Apple2', 'Pear2', 'Orange2'];
const plainOptions3 = ['Apple3', 'Pear4', 'Orange5'];

const data = [
  {
    id: 0,
    title: 'Ant Design Title 1',
  },
  {
    id: 1,
    title: 'Ant Design Title 2',
  },
  {
    id: 2,
    title: 'Ant Design Title 3',
  },
  {
    id: 3,
    title: 'Ant Design Title 4',
  },
];

const Affirmation: React.FC = () => {
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>();
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <>
      <h1 style={{ marginLeft: 40 }}>Affirmation Page</h1>
      <input type="text" />
      <button style={{ marginLeft: 20 }}>Add</button>
      <button style={{ marginLeft: 10 }}>Delete</button>
      <List
        itemLayout="horizontal"
        dataSource={data}
        style={{ marginLeft: 40 }}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={<a href="https://ant.design">{item.title}</a>}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
            <br />
            {/* <Checkbox
              indeterminate={indeterminate}
              onChange={onCheckAllChange}
              checked={checkAll}
              style={{ marginRight: 20 }}
            >
              Check all
            </Checkbox> */}
            <br />
            {/* <Divider /> */}
            <CheckboxGroup
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Affirmation;
