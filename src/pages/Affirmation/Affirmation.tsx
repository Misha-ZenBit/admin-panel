import { Avatar, List, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';

const Affirmation: React.FC = () => {
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <>
      <h1 style={{ marginLeft: 40}}>Affirmation Page</h1>
      <button style={{ marginLeft: 20}}>Add</button>
      <button style={{ marginLeft: 10}}>Delete</button>
      <List
    itemLayout="horizontal"
    dataSource={data}
    style={{ marginLeft: 40}}
    renderItem={item => (
      <List.Item>
        <Checkbox style={{ marginRight: 10}} onChange={onChange}></Checkbox>
        <List.Item.Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
  />
    </>
  );
};

export default Affirmation;
