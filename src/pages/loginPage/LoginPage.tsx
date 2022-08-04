import { Button, Form, Input, notification } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { adminRef, affirmationRef, categoriesRef, db } from '../../Firebase';
import { StyledForm } from './styles';
import md5 from 'md5';
import { Auth } from '../../types/types';

const LoginPage: React.FC = () => {
  const email = 'admin@urenough.com';
  const password = 'ur-enough';
  const [adminFromBd, setAdminFromBd] = useState<Auth>();

  useEffect(() => {
    getAdmin();
  }, []);

  const getAdmin = async () => {
    await getDocs(adminRef)
      .then((resposne) => {
        const admin = resposne.docs.map((doc) => ({
          data: doc.data(),
        }));
        admin.forEach((e) => {
          const newArray = {
            email: e.data.email,
            password: e.data.password,
          };
          setAdminFromBd(newArray);
        });
      })
      .catch((error) =>
        notification.error({ message: error.message as string })
      );
  };

  const onFinish = (values: Auth): void => {
    console.log('Test', values.password, values.email);
    const password = md5(values.password);

    if (
      password === adminFromBd?.password &&
      values.email === adminFromBd?.email
    ) {
      console.log('Da', password, adminFromBd?.password);
    } else {
      notification.error({
        message: 'Wrong email or password!',
      });
    }
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
        onFinish={onFinish as ((values: unknown) => void) | undefined}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
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
