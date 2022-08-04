import { Button, Form, Input, notification } from 'antd';
import 'antd/dist/antd.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { getDocs, doc, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { adminRef, affirmationRef, categoriesRef, db } from '../../Firebase';
import { StyledForm } from './styles';
import md5 from 'md5';
import { Auth } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import createSound from '../../assets/create.mp3';
import useSound from 'use-sound';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [playCreate] = useSound(createSound, { volume: 0.1 });
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
    const password = md5(values.password);
    if (
      password === adminFromBd?.password &&
      values.email === adminFromBd?.email
    ) {
      localStorage.setItem('isLogin', 'true');
      navigate(`/categories`);
      setTimeout(() => {
        notification.success({
          message: 'Successfully logged!',
        });
        playCreate();
      }, 250);
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
