import { Button, Form, Input } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useRef } from 'react';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StyledForm } from './styles';

const LoginPage: React.FC = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  console.log('Test', emailRef, passwordRef);

  const singUp = (e: any) => {};

  const onFinish = (values: any) => {
    console.log('Success:', values);
    signInWithEmailAndPassword(auth, values.username, values.password);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <StyledForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input ref={emailRef} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password ref={passwordRef} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  );
};

export default LoginPage;
